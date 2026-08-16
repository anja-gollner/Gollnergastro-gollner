/* Gollner Gastro CMS – Frontend-Logik (Vanilla JS, spricht /api/*).
   Gleiche Bauweise wie beim Schildbacherhof, aber ohne Events und ohne
   Öffnungszeiten — die gibt es hier nicht. */
(() => {
  const app = document.getElementById('app');
  const toastEl = document.getElementById('toast');

  const state = { csrf: '', basis: null };

  // ── Helpers ─────────────────────────────────────────────
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let toastTimer;
  function toast(msg, isErr = false) {
    toastEl.textContent = msg;
    toastEl.className = 'toast' + (isErr ? ' err' : '');
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toastEl.hidden = true), 3200);
  }

  async function api(path, { method = 'GET', body = null, form = null } = {}) {
    const opts = { method, headers: {} };
    if (state.csrf) opts.headers['X-CSRF'] = state.csrf;
    if (form) { opts.body = form; }
    else if (body) { opts.headers['Content-Type'] = 'application/json'; opts.body = JSON.stringify(body); }
    const res = await fetch('/api/' + path, opts);
    let data = {};
    try { data = await res.json(); } catch (_) {}
    if (!res.ok) throw new Error(data.error || ('Fehler ' + res.status));
    return data;
  }

  // ── Boot ────────────────────────────────────────────────
  async function boot() {
    try {
      const s = await api('session.php');
      state.csrf = s.csrf;
      if (s.setupNeeded) return renderSetup();
      if (!s.authenticated) return renderLogin();
      return renderDashboard();
    } catch (e) {
      app.className = '';
      app.innerHTML = `<div class="auth"><div class="card"><h2>Verbindung fehlgeschlagen</h2>
        <p class="muted">${esc(e.message)}</p>
        <p class="hint">Läuft die Seite auf einem Server mit PHP? Lokal: <code>php -S localhost:8000</code> im Ordner <code>public/</code>.</p>
      </div></div>`;
    }
  }

  // ── Setup (Erstanmeldung) ───────────────────────────────
  function renderSetup() {
    app.className = '';
    app.innerHTML = `<div class="auth"><form class="card" id="f">
      <p class="eyebrow">Erste Einrichtung</p>
      <h2>Passwort festlegen</h2>
      <p class="hint">Lege ein Passwort für dein CMS fest (mind. 8 Zeichen). Merk es dir gut.</p>
      <div class="field" style="margin-top:1rem">
        <label>Neues Passwort</label>
        <input type="password" id="p1" autocomplete="new-password" required minlength="8" />
      </div>
      <div class="field">
        <label>Passwort wiederholen</label>
        <input type="password" id="p2" autocomplete="new-password" required minlength="8" />
      </div>
      <button class="btn btn-primary" style="width:100%">Einrichten &amp; anmelden</button>
      <p class="err-text" id="err"></p>
    </form></div>`;
    document.getElementById('f').addEventListener('submit', async (e) => {
      e.preventDefault();
      const p1 = document.getElementById('p1').value, p2 = document.getElementById('p2').value;
      const err = document.getElementById('err');
      if (p1 !== p2) { err.textContent = 'Die Passwörter stimmen nicht überein.'; return; }
      try {
        const r = await api('login.php', { method: 'POST', body: { action: 'setup', password: p1 } });
        state.csrf = r.csrf; toast('Eingerichtet – willkommen!'); renderDashboard();
      } catch (ex) { err.textContent = ex.message; }
    });
  }

  // ── Login ───────────────────────────────────────────────
  function renderLogin() {
    app.className = '';
    app.innerHTML = `<div class="auth"><form class="card" id="f">
      <p class="eyebrow">Gollner Gastro</p>
      <h2>CMS-Login</h2>
      <div class="field" style="margin-top:1rem">
        <label>Passwort</label>
        <input type="password" id="p" autocomplete="current-password" required />
      </div>
      <button class="btn btn-primary" style="width:100%">Anmelden</button>
      <p class="err-text" id="err"></p>
    </form></div>`;
    document.getElementById('f').addEventListener('submit', async (e) => {
      e.preventDefault();
      const err = document.getElementById('err');
      try {
        const r = await api('login.php', { method: 'POST', body: { password: document.getElementById('p').value } });
        state.csrf = r.csrf; renderDashboard();
      } catch (ex) { err.textContent = ex.message; }
    });
  }

  // ── Dashboard ───────────────────────────────────────────
  async function renderDashboard() {
    app.className = '';
    app.innerHTML = `
      <div class="topbar">
        <div class="brand">Gollner Gastro <small>CMS</small></div>
        <div class="actions">
          <a class="btn btn-ghost btn-sm" href="/" target="_blank">Website ansehen ↗</a>
          <button class="btn btn-ghost btn-sm" id="pw">Passwort ändern</button>
          <button class="btn btn-ghost btn-sm" id="logout">Abmelden</button>
        </div>
      </div>
      <div class="wrap stack">
        <section>
          <div class="section-title">
            <div><p class="eyebrow">Basisdaten</p><h2>Kontakt &amp; Adresse</h2></div>
          </div>
          <p class="muted" style="margin:-.4rem 0 1.2rem;font-size:.9rem">
            Was hier steht, erscheint überall auf der Website – im Impressum genauso wie
            in der Fußzeile. Änderungen sind sofort live. Ein Feld leer lassen heißt:
            es gilt wieder der ursprünglich eingetragene Wert.
          </p>
          <div id="basisListe"><p class="muted">wird geladen …</p></div>
        </section>

        <div class="divider"></div>

        <section>
          <div class="section-title"><div><p class="eyebrow">Gollner¹⁹</p><h2>Karten hochladen</h2></div></div>
          <p class="muted" style="margin:-.4rem 0 1.2rem;font-size:.9rem">
            Der Dateiname ist egal – die Datei wird beim Hochladen automatisch richtig abgelegt.
          </p>
          <div class="row">
            ${pdfCard('Speisekarte', 'speisekarte.pdf')}
            ${pdfCard('Wochenmenü', 'wochenmenue.pdf')}
          </div>
        </section>

        <div class="divider"></div>

        <section>
          <div class="section-title"><div><p class="eyebrow">Server</p><h2>Funktioniert hier alles?</h2></div></div>
          <p class="muted" style="margin:-.4rem 0 1.2rem;font-size:.9rem">
            Prüft, ob dieser Webhoster alles kann, was die Website braucht. Einmal nach
            dem Umzug ansehen – danach nur noch, wenn etwas klemmt.
          </p>
          <div id="statusListe"><p class="muted">wird geprüft …</p></div>
        </section>
      </div>`;

    document.getElementById('logout').onclick = async () => { await api('logout.php', { method: 'POST' }); renderLogin(); };
    document.getElementById('pw').onclick = renderPasswordModal;
    document.querySelectorAll('[data-pdf]').forEach((el) => el.addEventListener('submit', onPdfUpload));

    try {
      // vorgabe.json trägt die beim Bauen eingetragenen Ausgangswerte,
      // stammdaten.php nur das, was jemand davon überschrieben hat.
      const [vg, st] = await Promise.all([api('vorgabe.json'), api('stammdaten.php')]);
      state.basis = basisZusammenfuehren(vg, st);
    } catch (e) { toast(e.message, true); }
    renderBasis();
    renderStatus();
  }

  // ── Basisdaten ──────────────────────────────────────────
  /** Ausgangswerte und Überschreibungen zu dem verschmelzen, was gerade gilt. */
  function basisZusammenfuehren(vorgabe, stamm) {
    const v = vorgabe || {}, s = stamm || {};
    return {
      telefon:    s.telefon    ?? v.telefon    ?? '',
      telefonRoh: s.telefonRoh ?? v.telefonRoh ?? '',
      email:      s.email      ?? v.email      ?? '',
      adresse: {
        strasse: s.adresse?.strasse ?? v.adresse?.strasse ?? '',
        plz:     s.adresse?.plz     ?? v.adresse?.plz     ?? '',
        ort:     s.adresse?.ort     ?? v.adresse?.ort     ?? ''
      },
      social: {
        Instagram: s.social?.Instagram ?? v.social?.Instagram ?? '',
        Facebook:  s.social?.Facebook  ?? v.social?.Facebook  ?? ''
      }
    };
  }

  function renderBasis() {
    const el = document.getElementById('basisListe');
    if (!el) return;
    const b = state.basis;
    if (!b) { el.innerHTML = `<p class="muted">Basisdaten konnten nicht geladen werden.</p>`; return; }

    el.innerHTML = `
      <div class="card" style="margin-bottom:1rem">
        <h3 style="font-size:1.05rem;margin-bottom:.8rem">Kontakt</h3>
        <div class="row">
          <div class="field"><label>Telefon <span class="hint">(so wie es dasteht)</span></label>
            <input type="text" data-b="telefon" value="${esc(b.telefon)}" placeholder="0660 66 500 65" /></div>
          <div class="field"><label>Telefon zum Anwählen <span class="hint">(ohne Leerzeichen)</span></label>
            <input type="text" data-b="telefonRoh" value="${esc(b.telefonRoh)}" placeholder="+436606650065" /></div>
        </div>
        <div class="field"><label>E-Mail</label>
          <input type="email" data-b="email" value="${esc(b.email)}" /></div>
      </div>

      <div class="card" style="margin-bottom:1rem">
        <h3 style="font-size:1.05rem;margin-bottom:.8rem">Adresse</h3>
        <div class="field"><label>Straße und Hausnummer</label>
          <input type="text" data-b="adresse.strasse" value="${esc(b.adresse.strasse)}" /></div>
        <div class="row">
          <div class="field"><label>PLZ</label>
            <input type="text" data-b="adresse.plz" value="${esc(b.adresse.plz)}" /></div>
          <div class="field"><label>Ort</label>
            <input type="text" data-b="adresse.ort" value="${esc(b.adresse.ort)}" /></div>
        </div>
        <p class="hint">Die Kartenlinks „Route planen" und „Auf der Karte" werden hieraus gebaut – die musst du nicht extra ändern.</p>
      </div>

      <div class="card" style="margin-bottom:1rem">
        <h3 style="font-size:1.05rem;margin-bottom:.8rem">Profile</h3>
        <div class="field"><label>Instagram</label>
          <input type="url" data-b="social.Instagram" value="${esc(b.social.Instagram)}" placeholder="https://www.instagram.com/…" /></div>
        <div class="field"><label>Facebook</label>
          <input type="url" data-b="social.Facebook" value="${esc(b.social.Facebook)}" placeholder="https://www.facebook.com/…" /></div>
      </div>

      <button class="btn btn-primary" id="saveBasis">Basisdaten speichern</button>`;

    el.querySelectorAll('[data-b]').forEach((inp) => {
      inp.addEventListener('input', () => {
        const [a, c] = inp.dataset.b.split('.');
        if (c) state.basis[a][c] = inp.value; else state.basis[a] = inp.value;
      });
    });

    el.querySelector('#saveBasis').onclick = saveBasis;
  }

  async function saveBasis() {
    const b = state.basis;
    try {
      await api('stammdaten.php', {
        method: 'POST',
        body: {
          telefon: b.telefon, telefonRoh: b.telefonRoh, email: b.email,
          adresse: b.adresse, social: b.social
        }
      });
      toast('Basisdaten gespeichert – sofort live');
    } catch (e) { toast(e.message, true); }
  }

  // ── Server-Diagnose ─────────────────────────────────────
  async function renderStatus() {
    const el = document.getElementById('statusListe');
    if (!el) return;
    try {
      const d = await api('status.php');
      el.innerHTML = `<div class="card">${d.pruefungen.map((p) => `
        <div style="display:flex;gap:.7rem;align-items:flex-start;padding:.55rem 0;border-bottom:1px solid rgba(0,0,0,.07)">
          <span style="font-size:1.05rem;line-height:1.4">${p.ok ? '✅' : '⚠️'}</span>
          <div style="flex:1;min-width:0">
            <div><strong>${esc(p.name)}</strong> — <span class="muted">${esc(p.wert)}</span></div>
            ${p.ok ? '' : `<div class="hint" style="margin-top:.15rem">${esc(p.hilfe)}</div>`}
          </div>
        </div>`).join('')}
        <p class="muted" style="margin-top:.8rem;font-size:.9rem">
          ${d.alles_ok
            ? 'Alles in Ordnung — der Server kann alles, was gebraucht wird.'
            : 'Die markierten Punkte bitte beim Hoster klären. Die Website läuft trotzdem, einzelne Funktionen aber eingeschränkt.'}
        </p>
      </div>`;
    } catch (e) {
      el.innerHTML = `<p class="muted">Diagnose nicht möglich: ${esc(e.message)}</p>`;
    }
  }

  // ── Karten-PDFs ─────────────────────────────────────────
  function pdfCard(label, target) {
    return `<form class="card" data-pdf="${target}">
      <h3 style="font-size:1.15rem;margin-bottom:.3rem">${label}</h3>
      <p class="hint">Aktuelle Datei: <a href="/pdf/${target}" target="_blank">/pdf/${target}</a></p>
      <div class="field" style="margin-top:.8rem"><input type="file" accept="application/pdf" required /></div>
      <button class="btn btn-dark btn-sm">Hochladen</button>
      <span class="muted" style="font-size:.82rem;margin-left:.6rem" data-status></span>
    </form>`;
  }

  async function onPdfUpload(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const target = formEl.getAttribute('data-pdf');
    const file = formEl.querySelector('input[type=file]').files[0];
    const status = formEl.querySelector('[data-status]');
    if (!file) return;
    status.textContent = 'lädt …';
    const fd = new FormData(); fd.append('type', 'pdf'); fd.append('target', target); fd.append('file', file);
    try { await api('upload.php', { method: 'POST', form: fd }); status.textContent = '✓ aktualisiert'; toast(target + ' aktualisiert'); }
    catch (ex) { status.textContent = ''; toast(ex.message, true); }
  }

  // ── Passwort ändern ─────────────────────────────────────
  function renderPasswordModal() {
    const bg = document.createElement('div');
    bg.className = 'modal-bg';
    bg.innerHTML = `<form class="card modal" id="pf" style="max-width:440px">
      <h2>Passwort ändern</h2>
      <div class="field"><label>Aktuelles Passwort</label><input type="password" id="cur" autocomplete="current-password" required /></div>
      <div class="field"><label>Neues Passwort</label><input type="password" id="nw" autocomplete="new-password" required minlength="8" /></div>
      <p class="err-text" id="pferr"></p>
      <div style="display:flex;gap:.6rem;justify-content:flex-end">
        <button type="button" class="btn btn-ghost" id="pcancel">Abbrechen</button>
        <button class="btn btn-primary">Ändern</button>
      </div>
    </form>`;
    document.body.appendChild(bg);
    const close = () => bg.remove();
    bg.addEventListener('click', (e) => { if (e.target === bg) close(); });
    bg.querySelector('#pcancel').onclick = close;
    bg.querySelector('#pf').addEventListener('submit', async (e) => {
      e.preventDefault();
      try {
        await api('password.php', { method: 'POST', body: { current: bg.querySelector('#cur').value, next: bg.querySelector('#nw').value } });
        toast('Passwort geändert'); close();
      } catch (ex) { bg.querySelector('#pferr').textContent = ex.message; }
    });
  }

  boot();
})();

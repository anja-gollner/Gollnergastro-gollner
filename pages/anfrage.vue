<script setup>
useSeo({
  title: 'Anfrage senden — Gollner Gastro',
  description: 'Catering, Betriebsverpflegung oder eine Feier im Gollner¹⁹: Anlass, Datum, Ort und Gästezahl genügen. Wir melden uns mit einem unverbindlichen Angebot zurück.'
})

const form = reactive({
  anliegen: 'Catering & Events',
  name: '', email: '', phone: '', firma: '', message: '',
  datum: '', personen: '', ort: '', tage: '',
  website: '' // Honeypot (muss leer bleiben)
})
const sent = ref(false)
const sending = ref(false)
const error = ref('')

const anliegenOptionen = [
  'Catering & Events',
  'Betriebsverpflegung',
  'Foodtruck',
  'Gollner¹⁹ — Tisch oder Feier',
  'Sonstiges'
]

async function submit() {
  if (sending.value) return // schützt vor Doppelklick bei langsamer Verbindung
  error.value = ''
  if (form.website) return // Bot
  if (!form.name || !form.email) { error.value = 'Bitte Name und E-Mail angeben.'; return }
  sending.value = true
  try {
    await $fetch('/api/contact.php', { method: 'POST', body: { ...form } })
    sent.value = true
  } catch (e) {
    error.value = `Senden ist gerade nicht möglich. Bitte ruft uns an unter ${BETRIEB.telefon} oder schreibt an ${BETRIEB.email}.`
  } finally {
    sending.value = false
  }
}

const feld = 'w-full bg-beige border border-ink/15 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-forest/40 focus:border-forest'
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Anfrage"
      title="Erzählt uns davon."
      text="Anlass, Datum, Ort und ungefähre Gästezahl genügen für den Anfang. Wir melden uns mit einem unverbindlichen Angebot zurück."
    />

    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <!-- Formular -->
        <div v-reveal>
          <form v-if="!sent" @submit.prevent="submit" class="space-y-5">
            <div>
              <label for="f-anliegen" class="eyebrow block mb-2">Worum geht es?</label>
              <select id="f-anliegen" v-model="form.anliegen" :class="feld">
                <option v-for="o in anliegenOptionen" :key="o">{{ o }}</option>
              </select>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label for="f-name" class="eyebrow block mb-2">Name</label>
                <input id="f-name" v-model="form.name" required autocomplete="name" :class="feld" />
              </div>
              <div>
                <label for="f-email" class="eyebrow block mb-2">E-Mail</label>
                <input id="f-email" v-model="form.email" type="email" required autocomplete="email" :class="feld" />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-5">
              <div>
                <label for="f-phone" class="eyebrow block mb-2">Telefon <span class="text-muted normal-case tracking-normal">(optional)</span></label>
                <input id="f-phone" v-model="form.phone" type="tel" autocomplete="tel" :class="feld" />
              </div>
              <div>
                <label for="f-firma" class="eyebrow block mb-2">Firma <span class="text-muted normal-case tracking-normal">(optional)</span></label>
                <input id="f-firma" v-model="form.firma" autocomplete="organization" :class="feld" />
              </div>
            </div>

            <!-- Felder je nach Anliegen: bei der Betriebsverpflegung zählen
                 Teamgröße und Tage, bei Feiern Datum, Gästezahl und Ort. -->
            <div v-if="form.anliegen === 'Betriebsverpflegung'" class="grid sm:grid-cols-3 gap-5">
              <div>
                <label for="f-start" class="eyebrow block mb-2">Ab wann</label>
                <input id="f-start" v-model="form.datum" type="date" :class="feld" />
              </div>
              <div>
                <label for="f-team" class="eyebrow block mb-2">Teamgröße</label>
                <input id="f-team" v-model="form.personen" type="number" min="1" :class="feld" />
              </div>
              <div>
                <label for="f-tage" class="eyebrow block mb-2">Tage/Woche</label>
                <input id="f-tage" v-model="form.tage" type="number" min="1" max="7" :class="feld" />
              </div>
            </div>

            <div v-else-if="form.anliegen !== 'Sonstiges'" class="grid sm:grid-cols-3 gap-5">
              <div>
                <label for="f-datum" class="eyebrow block mb-2">Datum</label>
                <input id="f-datum" v-model="form.datum" type="date" :class="feld" />
              </div>
              <div>
                <label for="f-gaeste" class="eyebrow block mb-2">Gäste</label>
                <input id="f-gaeste" v-model="form.personen" type="number" min="1" :class="feld" />
              </div>
              <div>
                <label for="f-ort" class="eyebrow block mb-2">Ort</label>
                <input id="f-ort" v-model="form.ort" :class="feld" />
              </div>
            </div>

            <div>
              <label for="f-msg" class="eyebrow block mb-2">Nachricht</label>
              <textarea id="f-msg" v-model="form.message" rows="4" :class="feld"
                        placeholder="Was schwebt euch vor?"></textarea>
            </div>

            <!-- Honeypot -->
            <input v-model="form.website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />

            <p v-if="error" class="text-forest text-sm font-medium" role="alert">{{ error }}</p>

            <button type="submit" class="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                    :disabled="sending">
              {{ sending ? 'Wird gesendet …' : 'Anfrage senden' }}
            </button>
          </form>

          <div v-else class="bg-beige rounded-2xl p-10 text-center" role="status">
            <div class="font-display text-3xl mb-2">Danke!</div>
            <p class="text-muted">Wir haben eure Anfrage erhalten und melden uns so schnell wie möglich.</p>
          </div>
        </div>

        <!-- Kontaktinfos -->
        <aside v-reveal:120 class="space-y-6">
          <div>
            <h2 class="eyebrow mb-2">Lieber direkt?</h2>
            <p class="text-ink leading-relaxed">
              <a :href="'tel:' + BETRIEB.telefonRoh" class="hover:text-forest">{{ BETRIEB.telefon }}</a><br>
              <a :href="'mailto:' + BETRIEB.email" class="hover:text-forest">{{ BETRIEB.email }}</a>
            </p>
            <p class="text-muted text-[0.92rem] mt-2">
              Julia Neuhold ist erste Ansprechperson für Buchungen und Catering-Anfragen.
            </p>
          </div>

          <div>
            <h2 class="eyebrow mb-2">Adresse</h2>
            <address class="not-italic text-ink leading-relaxed">
              {{ BETRIEB.name }}<br>
              {{ BETRIEB.adresse.strasse }}<br>{{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ort }}
            </address>
            <div class="mt-3 flex flex-wrap gap-2">
              <a :href="BETRIEB.route" target="_blank" rel="noopener" class="btn btn-primary !py-2 !px-5 text-sm">Route planen →</a>
              <a :href="BETRIEB.karte" target="_blank" rel="noopener" class="btn btn-ghost !py-2 !px-5 text-sm">Auf der Karte ↗</a>
            </div>
          </div>

          <div>
            <h2 class="eyebrow mb-2">Einzugsgebiet</h2>
            <p class="text-muted leading-relaxed text-[0.95rem]">
              Hartberg und die Oststeiermark, dazu der Großraum Graz — weitere
              Strecken bis Wien auf Anfrage.
            </p>
          </div>

          <div>
            <h2 class="eyebrow mb-2">Folgt uns</h2>
            <div class="flex flex-wrap gap-2">
              <a v-for="s in BETRIEB.social" :key="s.name" :href="s.url" target="_blank" rel="noopener"
                 class="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-sm
                        transition-colors hover:border-forest hover:text-forest">
                {{ s.name }} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>

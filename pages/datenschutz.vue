<script setup>
useSeo({
  title: 'Datenschutzerklärung — Gollner Gastro GmbH',
  description: 'Wie wir personenbezogene Daten verarbeiten: Hosting, Anfrageformular, externe Links und eure Rechte nach der DSGVO.'
})
</script>

<template>
  <div>
    <PageHeader eyebrow="Datenschutz" title="Datenschutzerklärung" text="Informationen zur Verarbeitung personenbezogener Daten (DSGVO)." />

    <section class="bg-cream py-16 md:py-24">
      <div class="container-x max-w-2xl space-y-8 leading-relaxed text-muted">
        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Verantwortliche Stelle</h2>
          <address class="not-italic">
            {{ BETRIEB.name }}<br>
            {{ BETRIEB.adresse.strasse }}, {{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ort }}<br>
            Telefon: <a :href="'tel:' + BETRIEB.telefonRoh" class="text-forest">{{ BETRIEB.telefon }}</a> ·
            E-Mail: <a :href="'mailto:' + BETRIEB.email" class="text-forest">{{ BETRIEB.email }}</a>
          </address>
        </div>

        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Hosting und Server-Logfiles</h2>
          <p>Diese Website wird bei der World4You Internet Services GmbH gehostet; die Server stehen in Österreich. Beim Aufruf werden automatisch technische Daten verarbeitet (IP-Adresse, Datum und Uhrzeit, abgerufene Seite, Browsertyp), die der Auslieferung und Sicherheit dienen und nach spätestens 30 Tagen gelöscht werden. Rechtsgrundlage: berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO).</p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Anfrageformular</h2>
          <p>Wenn Sie uns über das Formular oder per E-Mail kontaktieren, verarbeiten wir die angegebenen Daten (Name, E-Mail-Adresse, optional Telefonnummer und Firma sowie Ihre Angaben zum Anliegen) ausschließlich zur Bearbeitung der Anfrage. Die Übermittlung erfolgt an unsere E-Mail-Adresse; eine Weitergabe an Dritte findet nicht statt. Rechtsgrundlage: Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO.</p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Cookies</h2>
          <p>Diese Website setzt <strong class="text-ink">keine Cookies</strong> — weder zu Analyse- noch zu Werbezwecken. Es findet kein Tracking statt, und es kommen keine Dienste wie Google Analytics zum Einsatz. Aus demselben Grund gibt es hier auch keinen Cookie-Hinweis.</p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Schriftarten</h2>
          <p>Die verwendeten Schriftarten werden von unserem eigenen Server ausgeliefert. Es besteht <strong class="text-ink">keine Verbindung zu Google Fonts</strong> oder anderen externen Anbietern, und es wird keine IP-Adresse an Dritte übertragen.</p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Karten und externe Links</h2>
          <p>Wir binden keine Kartendienste direkt ein. Die Links „Route planen" und „Auf der Karte" sowie die Verweise auf Instagram, Facebook und den Schildbacherhof führen erst nach einem Klick zum jeweiligen Anbieter — dort gelten dessen Datenschutzbestimmungen, für die wir nicht verantwortlich sind. Ohne Klick werden keine Daten an diese Anbieter übermittelt.</p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Speicherdauer</h2>
          <p>Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Anfragen löschen wir spätestens nach drei Jahren, sofern kein Vertragsverhältnis daraus entstanden ist.</p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-ink mb-2">Ihre Rechte</h2>
          <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung (Art. 15–18 DSGVO), auf Datenübertragbarkeit (Art. 20 DSGVO) sowie auf Widerspruch (Art. 21 DSGVO). Zudem können Sie sich bei der Aufsichtsbehörde beschweren (Art. 77 DSGVO) — in Österreich bei der Datenschutzbehörde, <a href="https://www.dsb.gv.at" target="_blank" rel="noopener" class="text-forest">dsb.gv.at</a>.</p>
        </div>
      </div>
    </section>
  </div>
</template>

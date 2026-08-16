<script setup>
useSeo({
  title: 'Impressum — Gollner Gastro GmbH',
  description: 'Impressum und Offenlegung gemäß § 5 ECG und § 25 MedienG. Gollner Gastro GmbH, Schildbach 42, 8230 Hartberg Umgebung.'
})
</script>

<template>
  <div>
    <PageHeader eyebrow="Impressum" title="Impressum" text="Angaben gemäß § 5 ECG und § 25 MedienG." />

    <section class="bg-cream py-16 md:py-24">
      <div class="container-x max-w-2xl space-y-8 leading-relaxed">
        <div>
          <p class="font-display text-xl">{{ BETRIEB.name }}</p>
          <address class="not-italic text-muted">
            {{ BETRIEB.adresse.strasse }}<br>
            {{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ort }}, {{ BETRIEB.adresse.land }}
          </address>
          <p class="text-muted mt-2">
            Telefon: <a :href="'tel:' + BETRIEB.telefonRoh" class="text-forest">{{ BETRIEB.telefon }}</a><br>
            E-Mail: <a :href="'mailto:' + BETRIEB.email" class="text-forest">{{ BETRIEB.email }}</a>
          </p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-forest mb-2">Unternehmensdaten</h2>
          <p class="text-muted">
            Rechtsform: Gesellschaft mit beschränkter Haftung<br>
            Geschäftsführer: {{ BETRIEB.geschaeftsfuehrer }}<br>
            Prokura: {{ BETRIEB.prokura.join(' · ') }}<br>
            Firmenbuchnummer: {{ BETRIEB.firmenbuch }}<br>
            Firmenbuchgericht: {{ BETRIEB.firmenbuchgericht }}<br>
            UID-Nummer: {{ BETRIEB.uid }}<br>
            Unternehmensgegenstand: Gastronomie, Catering und Betriebsverpflegung
          </p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-forest mb-2">Behörden & Kammer</h2>
          <p class="text-muted">
            Gewerbe-/Aufsichtsbehörde: {{ BETRIEB.behoerde }}<br>
            Kammerzugehörigkeit: {{ BETRIEB.kammer }}<br>
            Berufsrecht: Gewerbeordnung, abrufbar unter
            <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener" class="text-forest">www.ris.bka.gv.at</a>
          </p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-forest mb-2">Online-Streitbeilegung</h2>
          <p class="text-muted">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" class="text-forest">ec.europa.eu/consumers/odr</a>.
            Wir sind weder verpflichtet noch bereit, an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <div>
          <h2 class="font-display text-2xl text-forest mb-2">Haftungsausschluss</h2>
          <p class="text-muted">
            Wir übernehmen keine Gewähr für die Aktualität, Richtigkeit und Vollständigkeit der
            bereitgestellten Informationen. Haftungsansprüche, die sich auf Schäden materieller
            oder ideeller Art beziehen und durch die Nutzung oder Nichtnutzung der Informationen
            verursacht wurden, sind ausgeschlossen, sofern kein nachweislich vorsätzliches oder
            grob fahrlässiges Verschulden vorliegt.
          </p>
          <p class="text-muted mt-3">
            Für Inhalte externer Links übernehmen wir keine Verantwortung — für diese ist
            ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeo({
  title: 'Catering für Firmenfeier & Hochzeit — Gollner Gastro',
  description: 'Buffet, BBQ, Fingerfood und Foodtruck für Firmenfeiern, Hochzeiten und Vereinsfeste. Auf Wunsch mit Getränkeservice und eigenem Personal — Hartberg, Graz und Umgebung.',
  bild: '/images/catering-grill.jpg'
})

const leistungen = [
  { titel: 'Buffet & Menü',       text: 'Österreichische Küche, saisonal und regional. Vom rustikalen Buffet bis zum mehrgängigen Menü für besondere Anlässe.' },
  { titel: 'BBQ & Grill',         text: 'Live-Cooking am Grill — Fleisch, Gemüse und Beilagen frisch vor Ort zubereitet.' },
  { titel: 'Fingerfood & Snacks', text: 'Kreative Häppchen für Empfänge, Weinproben und After-Work-Events.' },
  { titel: 'Foodtruck',           text: 'Unser eigener Foodtruck kommt direkt zu euch — mit frisch zubereiteten Gerichten für Festivals, Firmenevents und mehr.' },
  { titel: 'Getränkeservice',     text: 'Ausschank mit eigenem Personal — von der Bar beim Empfang bis zur Betreuung am Tisch.' },
  { titel: 'Personal & Service',  text: 'Erfahrenes Servicepersonal für euren Event — von Auf- und Abbau bis zum letzten Teller.' }
]

const anlaesse = [
  'Firmenfeiern', 'Hochzeiten', 'Vereinsfeste', 'Erntedank',
  'Produktpräsentationen', 'Weihnachtsfeiern', 'Jubiläen', 'After-Work-Events'
]

// Nummeriert, weil die Reihenfolge hier tatsächlich Information trägt
const ablauf = [
  { titel: 'Anfrage',    text: 'Anlass, Datum, Ort und ungefähre Gästezahl — mehr brauchen wir für den Anfang nicht.' },
  { titel: 'Beratung',   text: 'Wir stimmen Menü, Service und Budget gemeinsam mit euch ab.' },
  { titel: 'Angebot',    text: 'Ihr bekommt ein unverbindliches, transparentes Angebot.' },
  { titel: 'Euer Event', text: 'Anlieferung, Aufbau, Service und Abbau — ihr feiert, wir kümmern uns.' }
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Catering & Events"
      title="Euer Event. Unser Genuss."
      image="/images/catering-grill.jpg"
      text="Von der kleinen Privatfeier bis zur großen Firmenveranstaltung — wir bringen Buffet, BBQ, Fingerfood und unseren Foodtruck direkt zu euch."
    />

    <!-- Leistungen -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Was wir mitbringen</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Sechs Bausteine, <span class="text-forest">frei kombinierbar.</span>
        </h2>

        <div class="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3 border-b border-ink/10">
          <div v-for="(l, i) in leistungen" :key="l.titel" v-reveal="i * 70"
               class="py-6 border-t border-ink/10">
            <h3 class="font-display text-xl md:text-2xl leading-tight mb-2">{{ l.titel }}</h3>
            <p class="text-muted leading-relaxed text-[0.95rem]">{{ l.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Anlässe -->
    <section class="bg-ink text-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow-dunkel mb-3">Wofür wir kochen</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-10">
          Anlässe, die wir <span class="text-leaf">regelmäßig</span> begleiten.
        </h2>
        <ul class="flex flex-wrap gap-2.5">
          <li v-for="(a, i) in anlaesse" :key="a" v-reveal="i * 40"
              class="rounded-full border border-cream/20 px-5 py-2.5 text-[0.95rem] text-cream/85
                     transition-colors duration-300 hover:border-leaf hover:text-leaf">
            {{ a }}
          </li>
        </ul>
        <p v-reveal:200 class="mt-8 text-cream/60 max-w-xl leading-relaxed">
          Euer Anlass ist nicht dabei? Erzählt uns trotzdem davon — wir richten
          auch aus, was hier nicht steht.
        </p>
      </div>
    </section>

    <!-- Ablauf -->
    <section class="bg-beige py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">So läuft es ab</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Von der Anfrage bis zum Abbau.
        </h2>
        <ol class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(s, i) in ablauf" :key="s.titel" v-reveal="i * 80"
              class="rounded-2xl bg-cream border border-ink/10 p-7">
            <span class="grid h-9 w-9 place-items-center rounded-full bg-forest text-cream
                         font-display text-sm mb-4">{{ i + 1 }}</span>
            <h3 class="font-display text-xl leading-tight mb-2">{{ s.titel }}</h3>
            <p class="text-muted leading-relaxed text-[0.95rem]">{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Eindrücke -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x grid gap-5 sm:grid-cols-2">
        <div v-reveal.left class="group overflow-hidden rounded-2xl aspect-[4/3]">
          <img src="/images/catering-grill.jpg" alt="Live-Cooking am Grill beim Catering"
               class="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105" />
        </div>
        <div v-reveal:100.right class="group overflow-hidden rounded-2xl aspect-[4/3]">
          <img src="/images/kantine-2.jpg" alt="Buffet mit frisch zubereiteten Speisen"
               class="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-ink text-cream py-20">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p v-reveal class="eyebrow-dunkel mb-2">Etwas geplant?</p>
          <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)]">Holt euch ein Angebot.</h2>
          <p v-reveal:80 class="text-cream/65 mt-2 max-w-md leading-relaxed">Unverbindlich und transparent.</p>
        </div>
        <div v-reveal:120 class="flex flex-wrap gap-3">
          <NuxtLink to="/anfrage" class="btn btn-primary">Anfrage senden</NuxtLink>
          <a :href="'tel:' + BETRIEB.telefonRoh" class="btn btn-ghost border-cream/40 text-cream hover:text-leaf hover:border-leaf">
            {{ BETRIEB.telefon }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

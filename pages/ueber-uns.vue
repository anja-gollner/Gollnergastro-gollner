<script setup>
useSeo({
  title: 'Über uns — Familie Gollner seit 1967',
  description: 'Was als Familientradition im Schildbacherhof begann, lebt seit Dezember 2025 als Gollner Gastro GmbH weiter. Die Geschichte, die Werte und das Team dahinter.',
  bild: '/images/windhof-terrasse.jpg'
})

const stationen = [
  { jahr: 'Seit 1967',      titel: 'Die Wurzeln',
    text: 'Seit über 50 Jahren ist die Familie Gollner in der steirischen Gastronomie tief verwurzelt. Leidenschaft für gutes Essen, regionale Produkte und echte Gastfreundschaft waren von Anfang an der Kern — und sind es bis heute.' },
  { jahr: 'Der Ursprung',   titel: 'Schildbacherhof in Hartberg',
    text: 'Der Schildbacherhof ist das Herzstück dieser Geschichte — mittags Wirtshaus, abends Restaurant. Küchenchef Florian Gollner prägt hier einen Stil, der Heimat und Anspruch vereint. Das Haus wird als eigenständiges Unternehmen bis heute aktiv weitergeführt.' },
  { jahr: 'Dezember 2025',  titel: 'Gründung der Gollner Gastro GmbH',
    text: 'Aus der gelebten Familientradition heraus entstand die Gollner Gastro GmbH — mit dem Anspruch, mehr Menschen und Betriebe mit echter, handwerklicher Gastronomie zu erreichen.' },
  { jahr: 'Heute',          titel: 'Zwei Marken, eine Familie',
    text: 'Schildbacherhof und Gollner Gastro GmbH bestehen parallel — als eigenständige Unternehmen mit gemeinsamen Wurzeln und Familienmitgliedern an der Spitze.' }
]

const werte = [
  { titel: 'Familiäre Werte',        text: 'Gastronomie ist für uns keine Branche — sie ist eine Berufung, die von Generation zu Generation weitergegeben wird.' },
  { titel: 'Saisonal & regional',    text: 'Wir kochen im Rhythmus der Jahreszeiten und arbeiten mit Produzenten aus der Region zusammen.' },
  { titel: 'Qualität vor Komplexität', text: 'Ein gutes Produkt braucht keine Verkleidung. Wir respektieren den Rohstoff und lassen ihn für sich sprechen.' }
]

const team = [
  { name: 'Peter Gollner',   rolle: 'Geschäftsführung',
    text: 'Peter Gollner ist der Gründer und das unternehmerische Herzstück der Gollner Gastro GmbH. Mit über zwei Jahrzehnten Erfahrung in der Gastronomie — geprägt durch den Familienbetrieb Schildbacherhof — hat er im Dezember 2025 den nächsten Schritt gewagt und ein eigenständiges Unternehmen aufgebaut. Er verantwortet die strategische Ausrichtung und hält alle Fäden zusammen.' },
  { name: 'Florian Gollner', rolle: 'Prokurist & Küchenchef',
    text: 'Florian Gollner ist Küchenchef aus Leidenschaft. Aufgewachsen in der Welt des Schildbacherhofs, hat er sein Handwerk von der Pike auf gelernt und zu einem unverwechselbaren Stil weiterentwickelt: bodenständige Küche mit klarem Anspruch. Als Prokurist trägt er auch unternehmerische Verantwortung.' },
  { name: 'Julia Neuhold',   rolle: 'Assistenz der Geschäftsführung & Prokuristin',
    text: 'Julia Neuhold verantwortet die Abläufe im Hintergrund. Als Assistentin der Geschäftsführung und Prokuristin ist sie erste Ansprechperson für Buchungen, Catering-Anfragen und die gesamte organisatorische Koordination — verlässlich, präzise und immer erreichbar.' }
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Unsere Geschichte"
      title="Tradition trifft Leidenschaft."
      image="/images/windhof-terrasse.jpg"
      text="Was als Familientradition im Schildbacherhof in Hartberg begann, lebt seit Dezember 2025 als Gollner Gastro GmbH weiter — mit denselben Werten und mehr Reichweite."
    />

    <!-- Chronologie -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Vom Wirtshaus zur Gastronomiegruppe</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Vier Stationen bis <span class="text-forest">heute.</span>
        </h2>

        <ol class="relative border-l border-ink/15 pl-7 md:pl-9 space-y-10 max-w-3xl">
          <li v-for="(s, i) in stationen" :key="s.titel" v-reveal="i * 90" class="relative">
            <span class="absolute -left-[2.1rem] md:-left-[2.6rem] top-1.5 h-3 w-3 rounded-full bg-forest ring-4 ring-cream"></span>
            <p class="eyebrow mb-1.5">{{ s.jahr }}</p>
            <h3 class="font-display text-2xl md:text-[1.7rem] leading-tight mb-2">{{ s.titel }}</h3>
            <p class="text-muted leading-relaxed">{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- Zitat -->
    <section class="bg-ink text-cream py-20 md:py-28 relative overflow-hidden">
      <img src="/images/gg-monogramm-creme.png" alt="" aria-hidden="true"
           class="pointer-events-none select-none absolute -right-16 top-1/2 -translate-y-1/2 h-[80%] w-auto opacity-[0.04] hidden md:block" />
      <div class="container-x max-w-3xl relative">
        <blockquote v-reveal>
          <p class="font-display italic text-[clamp(1.5rem,3.4vw,2.4rem)] leading-snug">
            Was am Schildbacherhof begann, trägt heute einen neuen Namen —
            aber <span class="text-leaf">dieselbe Seele.</span>
          </p>
        </blockquote>
      </div>
    </section>

    <!-- Werte -->
    <section class="bg-beige py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Was uns antreibt</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Unsere Werte.
        </h2>
        <div class="grid gap-x-12 sm:grid-cols-3 border-b border-ink/10">
          <div v-for="(w, i) in werte" :key="w.titel" v-reveal="i * 80" class="py-7 border-t border-ink/10">
            <h3 class="font-display text-xl md:text-2xl leading-tight mb-2">{{ w.titel }}</h3>
            <p class="text-muted leading-relaxed text-[0.95rem]">{{ w.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Das Team</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Die Menschen hinter <span class="text-forest">Gollner Gastro.</span>
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
          <article v-for="(p, i) in team" :key="p.name" v-reveal="i * 90"
                   class="rounded-2xl bg-beige border border-ink/10 p-7 transition-colors duration-500 hover:border-forest/40">
            <h3 class="font-display text-2xl leading-tight">{{ p.name }}</h3>
            <p class="eyebrow mt-1.5 mb-3">{{ p.rolle }}</p>
            <p class="text-muted leading-relaxed text-[0.95rem]">{{ p.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Verweis auf den Schildbacherhof -->
    <section class="bg-ink text-cream py-20">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p v-reveal class="eyebrow-dunkel mb-2">Schwesterbetrieb</p>
          <h2 v-reveal class="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight max-w-xl">
            Der Schildbacherhof ist weiterhin aktiv — mittags Wirtshaus, abends Restaurant.
          </h2>
        </div>
        <a v-reveal:120 :href="BETRIEB.schwester.url" target="_blank" rel="noopener" class="btn btn-primary shrink-0">
          Zum Schildbacherhof ↗
        </a>
      </div>
    </section>
  </div>
</template>

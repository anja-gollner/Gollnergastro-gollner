<script setup>
useSeo({
  title: 'Gollner Gastro — Catering, Betriebsverpflegung & Golfrestaurant',
  description: 'Catering, Buffet und Foodtruck, tägliche Betriebsverpflegung und das Golfrestaurant Gollner¹⁹ am Thalersee. Österreichische Küche, saisonal und regional — von Graz bis Wien.'
})
useFirmaSchema()

// Was das Unternehmen antreibt
const werte = [
  { titel: 'Familiäre Werte', text: 'Gastronomie ist für uns keine Branche — sie ist eine Berufung, die von Generation zu Generation weitergegeben wird.' },
  { titel: 'Saisonal & regional', text: 'Wir kochen im Rhythmus der Jahreszeiten und arbeiten mit Produzenten aus der Region zusammen.' },
  { titel: 'Qualität vor Komplexität', text: 'Ein gutes Produkt braucht keine Verkleidung. Wir respektieren den Rohstoff und lassen ihn für sich sprechen.' }
]

// Die Stationen bis heute. Nummeriert, weil hier die Reihenfolge
// tatsächlich Information trägt — es ist eine Chronologie.
const stationen = [
  { jahr: 'Seit 1967', titel: 'Die Wurzeln', text: 'Seit über 50 Jahren ist Familie Gollner in der steirischen Gastronomie verwurzelt.' },
  { jahr: 'Der Ursprung', titel: 'Schildbacherhof', text: 'Mittags Wirtshaus, abends Restaurant — das Herzstück dieser Geschichte in Hartberg.' },
  { jahr: 'Dezember 2025', titel: 'Gollner Gastro GmbH', text: 'Gegründet mit dem Anspruch, mehr Menschen und Betriebe mit handwerklicher Gastronomie zu erreichen.' },
  { jahr: 'Heute', titel: 'Zwei Marken, eine Familie', text: 'Beide Häuser bestehen eigenständig — mit gemeinsamen Wurzeln und Familienmitgliedern an der Spitze.' }
]

const team = [
  { name: 'Peter Gollner',  rolle: 'Geschäftsführung', text: 'Gründer und unternehmerisches Herzstück. Über zwei Jahrzehnte Erfahrung, geprägt durch den Familienbetrieb — verantwortet die strategische Ausrichtung.' },
  { name: 'Florian Gollner', rolle: 'Prokurist & Küchenchef', text: 'Küchenchef aus Leidenschaft, aufgewachsen in der Welt des Schildbacherhofs. Bodenständige Küche mit klarem Anspruch.' },
  { name: 'Julia Neuhold',  rolle: 'Assistenz der Geschäftsführung & Prokuristin', text: 'Erste Ansprechperson für Buchungen, Catering-Anfragen und die gesamte organisatorische Koordination.' }
]
</script>

<template>
  <div>
    <SiteHero />

    <!-- Herkunft -->
    <section class="relative bg-ink text-cream overflow-hidden py-24 md:py-32">
      <div aria-hidden="true"
           class="pointer-events-none select-none absolute -top-10 -right-2 md:right-6 leading-none font-display font-medium text-cream/[0.045] text-[34vw] md:text-[18rem]">
        1967
      </div>

      <div class="container-x relative">
        <div class="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16">
          <div>
            <p v-reveal class="eyebrow-dunkel mb-5">Unsere Geschichte</p>
            <!-- Als h2, nicht als Absatz: das ist die Überschrift dieses
                 Abschnitts. Sonst springt die Gliederung von h1 direkt auf h3. -->
            <h2 v-reveal class="font-display text-[clamp(1.8rem,4.2vw,3.2rem)] leading-snug">
              Was als Familientradition im Schildbacherhof begann, lebt seit Dezember 2025
              als Gollner Gastro weiter — <span class="text-leaf">mit denselben Werten
              und mehr Reichweite.</span>
            </h2>
            <NuxtLink to="/ueber-uns" v-reveal:200 class="mt-8 inline-flex items-center gap-2 font-display text-leaf hover:gap-3 transition-all">
              Die ganze Geschichte <span>→</span>
            </NuxtLink>
          </div>

          <!-- Chronologie -->
          <ol v-reveal:160.right class="relative border-l border-cream/15 pl-6 space-y-7 lg:mt-2">
            <li v-for="s in stationen" :key="s.titel" class="relative">
              <span class="absolute -left-[1.72rem] top-1.5 h-2.5 w-2.5 rounded-full bg-leaf ring-4 ring-ink"></span>
              <p class="eyebrow-dunkel mb-1">{{ s.jahr }}</p>
              <h3 class="font-display text-xl leading-tight">{{ s.titel }}</h3>
              <p class="text-cream/65 text-[0.95rem] leading-relaxed mt-1">{{ s.text }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <BereichGrid />

    <!-- Werte -->
    <section class="bg-beige py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Was uns antreibt</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Unsere Werte.
        </h2>
        <div class="grid gap-x-12 sm:grid-cols-3 border-b border-ink/10">
          <div v-for="(w, i) in werte" :key="w.titel" v-reveal="i * 80"
               class="py-7 border-t border-ink/10">
            <h3 class="font-display text-xl md:text-2xl leading-tight mb-2">{{ w.titel }}</h3>
            <p class="text-muted leading-relaxed text-[0.95rem]">{{ w.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Zitat -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x max-w-3xl">
        <blockquote v-reveal class="relative">
          <span aria-hidden="true" class="absolute -left-2 -top-6 font-display text-forest/15 text-[7rem] leading-none select-none">„</span>
          <p class="relative font-display italic text-[clamp(1.5rem,3.4vw,2.4rem)] leading-snug">
            Was am Schildbacherhof begann, trägt heute einen neuen Namen —
            aber dieselbe Seele. Wir glauben daran, dass Menschen durch gutes
            Essen verbunden werden.
          </p>
        </blockquote>
      </div>
    </section>

    <!-- Team -->
    <section class="bg-ink text-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow-dunkel mb-3">Das Team</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Die Menschen hinter <span class="text-leaf">Gollner Gastro.</span>
        </h2>

        <div class="grid gap-6 md:grid-cols-3">
          <article v-for="(p, i) in team" :key="p.name" v-reveal="i * 90"
                   class="rounded-2xl border border-cream/15 bg-cream/[0.03] p-7
                          transition-colors duration-500 hover:border-leaf/40">
            <h3 class="font-display text-2xl leading-tight">{{ p.name }}</h3>
            <p class="eyebrow-dunkel mt-1.5 mb-3">{{ p.rolle }}</p>
            <p class="text-cream/70 leading-relaxed text-[0.95rem]">{{ p.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-beige py-20">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p v-reveal class="eyebrow mb-2">Etwas zu feiern?</p>
          <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)]">Erzählt uns davon.</h2>
          <p v-reveal:80 class="text-muted mt-2 max-w-md leading-relaxed">
            Anlass, Datum, Ort und ungefähre Gästezahl genügen für den Anfang.
          </p>
        </div>
        <div v-reveal:120 class="flex flex-wrap gap-3">
          <NuxtLink to="/anfrage" class="btn btn-primary">Anfrage senden</NuxtLink>
          <a :href="'tel:' + BETRIEB.telefonRoh" class="btn btn-ghost">{{ BETRIEB.telefon }}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeo({
  title: 'Betriebsverpflegung & Kantine — Gollner Gastro',
  description: 'Täglich frisch gekochte Mittagsmenüs für euer Team — österreichisch, saisonal, ausgewogen. Wir kommen mit eigenem Equipment in euren Betrieb, ab drei Tagen pro Woche.',
  bild: '/images/kantine-1.jpg'
})

const merkmale = ['Täglich frisch gekocht', 'Regional & saisonal', 'Snack-Automaten optional']

const leistungen = [
  { titel: 'Frisch gekochte Menüs', text: 'Täglich wechselnde Mittagsmenüs — österreichisch, saisonal, ausgewogen. Hauptspeise mit Beilage und Salat.' },
  { titel: 'Vegetarische Option',   text: 'Täglich mindestens eine vegetarische oder vegane Alternative — vollwertig und ohne Kompromiss beim Geschmack.' },
  { titel: 'Vor-Ort-Service',       text: 'Wir kommen direkt in euren Betrieb — mit eigenem Equipment, Ausgabe und Reinigung.' },
  { titel: 'Snack-Automaten',       text: 'Ergänzend zum Mittagessen: Snack- und Getränkeautomaten für den ganzen Tag, auf Wunsch inklusive.' },
  { titel: 'Flexible Modelle',      text: 'Von drei Tagen pro Woche bis täglich — wir passen uns euren Betriebszeiten und Teamgrößen an.' },
  { titel: 'Regionale Zutaten',     text: 'Kurze Lieferwege, steirische Qualität — wir arbeiten mit regionalen Lieferanten zusammen.' }
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Betriebsverpflegung"
      title="Täglich frisch. Für euer Team."
      image="/images/kantine-1.jpg"
      text="Moderne Betriebsverpflegung für Unternehmen — ausgewogen, regional und täglich frisch gekocht. Wir kommen zu euch und bringen die Kantine mit."
    />

    <!-- Kernmerkmale -->
    <section class="bg-cream pt-16 md:pt-20">
      <div class="container-x">
        <ul class="grid gap-4 sm:grid-cols-3">
          <li v-for="(m, i) in merkmale" :key="m" v-reveal="i * 80"
              class="rounded-2xl bg-beige border border-ink/10 px-6 py-5 font-display text-lg">
            {{ m }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Leistungen -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Was wir bieten</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Eine Kantine, <span class="text-forest">ohne eigene Küche.</span>
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

    <!-- Eindrücke -->
    <section class="bg-ink text-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow-dunkel mb-3">Einblicke</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          So sieht das <span class="text-leaf">bei uns aus.</span>
        </h2>
        <div class="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(b, i) in ['/images/kantine-1.jpg','/images/kantine-2.jpg','/images/kantine-3.jpg']" :key="b"
               v-reveal.scale="i * 80" class="group overflow-hidden rounded-2xl aspect-[4/3]">
            <img :src="b" alt="Betriebsverpflegung von Gollner Gastro"
                 class="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105" />
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-beige py-20">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p v-reveal class="eyebrow mb-2">Für euren Betrieb</p>
          <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)]">Rechnen wir es durch.</h2>
          <p v-reveal:80 class="text-muted mt-2 max-w-md leading-relaxed">
            Sagt uns Teamgröße und gewünschte Tage — wir melden uns mit einem Vorschlag.
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

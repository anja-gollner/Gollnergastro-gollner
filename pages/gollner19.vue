<script setup>
useSeo({
  title: 'Gollner¹⁹ — Golfrestaurant am Thalersee',
  description: 'Unser Golfrestaurant am Grazer Golfclub Thalersee, an den Standorten Windhof und Steinfeld. Österreichische Küche inmitten der Natur — auch ohne Golfrunde.',
  bild: '/images/windhof-terrasse.jpg'
})

const standorte = [
  {
    name: 'Windhof',
    bild: '/images/windhof-terrasse.jpg',
    text: 'Die große Terrasse mit Blick über den Platz und die Hügel. Hier gibt es das Wochenmenü und die Karte — von der schnellen Jause bis zum Mittagessen in Ruhe.'
  },
  {
    name: 'Steinfeld',
    bild: '/images/steinfeld-terrasse.jpg',
    text: 'Der zweite Standort am Golfclub — direkt am Geschehen, unkompliziert und mit demselben Anspruch in der Küche.'
  }
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="Gollner¹⁹"
      title="Genuss inmitten der Natur."
      image="/images/windhof-terrasse.jpg"
      text="Unser Golfrestaurant am Grazer Golfclub Thalersee — an den beiden Standorten Windhof und Steinfeld. Einkehren können übrigens alle, nicht nur Golferinnen und Golfer."
    />

    <!-- Standorte -->
    <section class="bg-cream py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Zwei Standorte</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight max-w-2xl mb-12">
          Am Thalersee, <span class="text-forest">zweimal.</span>
        </h2>

        <div class="grid gap-8 md:grid-cols-2">
          <article v-for="(s, i) in standorte" :key="s.name" v-reveal="i * 100"
                   class="group rounded-2xl overflow-hidden bg-beige border border-ink/10
                          transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_55px_-30px_rgba(33,28,21,.5)]">
            <div class="aspect-[16/10] overflow-hidden">
              <img :src="s.bild" :alt="`Gollner19 ${s.name}`"
                   class="w-full h-full object-cover transition duration-[800ms] ease-out group-hover:scale-105" />
            </div>
            <div class="p-7">
              <h3 class="font-display text-3xl mb-2">{{ s.name }}</h3>
              <p class="text-muted leading-relaxed">{{ s.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Karten -->
    <section class="bg-beige py-20 md:py-28">
      <div class="container-x">
        <p v-reveal class="eyebrow mb-3">Speisekarten</p>
        <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)] mb-8">Wochenmenü &amp; Karte</h2>
        <KartenViewer :karten="[
          { schluessel: 'wochenmenue', label: 'Wochenmenü Windhof' },
          { schluessel: 'speisekarte', label: 'Speisekarte' }
        ]" />
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-ink text-cream py-20">
      <div class="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p v-reveal class="eyebrow-dunkel mb-2">Größere Runde?</p>
          <h2 v-reveal class="font-display text-[clamp(1.8rem,4vw,3rem)]">Reserviert bei uns.</h2>
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

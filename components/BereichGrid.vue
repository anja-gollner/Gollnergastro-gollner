<script setup>
// Drei Karten statt fünf wie beim Schildbacherhof — bei drei Bereichen lohnt
// kein horizontales Pin-Scrolling, die passen nebeneinander auf den Schirm.
</script>

<template>
  <section class="bg-cream py-20 md:py-28">
    <div class="container-x">
      <p v-reveal class="eyebrow mb-3">Unsere Leistungen</p>
      <h2 v-reveal class="font-display text-[clamp(1.9rem,4.5vw,3.4rem)] leading-tight max-w-2xl">
        Drei Bereiche, <span class="text-forest">eine Handschrift.</span>
      </h2>
      <p v-reveal:80 class="mt-4 text-muted max-w-xl leading-relaxed mb-12">
        Maßgeschneiderte Gastronomielösungen für Unternehmen, Vereine und Privatfeiern.
      </p>

      <div class="grid gap-5 sm:gap-6 md:grid-cols-3">
        <NuxtLink
          v-for="(b, i) in BEREICHE" :key="b.slug" :to="'/' + b.slug"
          v-reveal.scale="i * 90"
          class="group relative block overflow-hidden rounded-2xl bg-ink aspect-[4/5]
                 transition-shadow duration-500 hover:shadow-[0_45px_75px_-38px_rgba(33,28,21,.75)]"
        >
          <!-- Kräftigerer Verlauf als beim Schildbacherhof: Kantine und
               Golfterrasse sind Tageslichtaufnahmen, auf denen heller Text
               sonst untergeht. -->
          <div class="absolute inset-0 transition-transform duration-[800ms] ease-out group-hover:scale-[1.06]">
            <img :src="b.bild" alt="" class="w-full h-full object-cover brightness-[0.82]" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20"></div>
          <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink to-transparent"></div>

          <!-- Nummer auf dunklem Kreis, sonst verschwindet sie auf hellen Bildern -->
          <span class="absolute top-4 right-4 grid place-items-center h-12 w-12 rounded-full
                       bg-ink/55 backdrop-blur-sm font-display text-[1.5rem] leading-none text-cream/70
                       transition-colors duration-500 group-hover:bg-forest group-hover:text-cream">{{ b.no }}</span>

          <div class="absolute inset-x-0 bottom-0 p-6 text-cream">
            <h3 class="font-display text-2xl md:text-[1.7rem] leading-tight">{{ b.titel }}</h3>
            <p class="text-[0.95rem] leading-relaxed text-cream/70 mt-1">{{ b.kurz }}</p>
            <p class="text-[0.95rem] leading-relaxed text-cream/0 max-h-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-32 group-hover:mt-2 group-hover:text-cream/80">
              {{ b.text }}
            </p>
            <span class="mt-4 inline-flex items-center gap-1.5 font-display text-sm text-leaf transition-colors duration-300 group-hover:text-cream">
              Mehr erfahren
              <span class="transition-transform duration-300 ease-out group-hover:translate-x-1.5">→</span>
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

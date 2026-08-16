<template>
  <section class="relative min-h-screen flex items-end overflow-hidden">
    <!-- Das Catering-Foto ist deutlich heller als die Innenaufnahmen des
         Schildbacherhofs. Ohne kräftigere Abdunklung konkurriert es mit der
         Schrift, und das helle Laubgrün verliert auf den hellen Stellen. -->
    <div class="absolute inset-0 z-0">
      <img src="/images/catering-grill.jpg" alt=""
           class="hero-zoom w-full h-full object-cover blur-[6px] brightness-[0.38] saturate-[0.85]" />
      <div class="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/70 to-ink/95"></div>
      <div class="absolute inset-0 bg-ink/30"></div>
    </div>

    <!-- Monogramm als grosses, ruhiges Wasserzeichen — greift die Marke auf,
         ohne mit der Schrift zu konkurrieren -->
    <img src="/images/gg-monogramm-creme.png" alt="" aria-hidden="true"
         class="pointer-events-none select-none absolute -right-12 top-1/2 -translate-y-1/2
                h-[70vh] w-auto opacity-[0.05] hidden md:block" />

    <div class="container-x relative z-10 pb-[12vh] pt-32 text-cream">
      <p v-reveal class="eyebrow-dunkel mb-5">Catering · Kantine · Golfrestaurant</p>

      <h1 class="font-display font-medium leading-[0.95] tracking-tight text-[clamp(3rem,9vw,7.5rem)]">
        <span v-reveal class="block">Genuss mit</span>
        <span v-reveal:120 class="block italic text-leaf">Anspruch.</span>
      </h1>

      <p v-reveal:240 class="mt-7 max-w-xl text-lg text-cream/85 leading-relaxed">
        Vom Catering über moderne Betriebsverpflegung bis zum Golfrestaurant
        Gollner¹⁹ — wir gestalten kulinarische Erlebnisse, die begeistern.
        Österreichische Küche mit Herz, saisonal und regional.
      </p>

      <div v-reveal:360 class="mt-9 flex flex-wrap gap-3">
        <NuxtLink to="/anfrage" class="btn btn-primary">Anfrage senden</NuxtLink>
        <NuxtLink to="/ueber-uns" class="btn btn-ghost border-cream/40 text-cream hover:text-leaf hover:border-leaf">
          Unsere Geschichte
        </NuxtLink>
      </div>

      <div v-reveal:480 class="mt-12 flex flex-wrap gap-x-7 gap-y-2 text-[0.78rem] tracking-[0.12em] uppercase text-cream/60">
        <span>Buffet &amp; BBQ</span><span>Foodtruck</span><span>Betriebsverpflegung</span><span>Golfrestaurant</span>
      </div>
    </div>
  </section>
</template>

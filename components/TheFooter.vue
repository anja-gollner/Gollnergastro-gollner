<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-cream">
    <div class="container-x py-16 grid gap-10 md:grid-cols-4">
      <div class="md:col-span-2">
        <NuxtLink to="/" class="inline-flex items-center gap-3 mb-5" aria-label="Gollner Gastro — Startseite">
          <img src="/images/gg-creme.png" alt="" class="h-14 md:h-16 w-auto" />
          <span class="leading-none">
            <span class="block font-display text-2xl tracking-wide">GOLLNER</span>
            <span class="block text-[0.6rem] tracking-[0.34em] text-cream/60">GASTRO GMBH</span>
          </span>
        </NuxtLink>
        <p class="text-cream/60 max-w-sm leading-relaxed">
          Catering, Betriebsverpflegung und Golfrestaurant aus Hartberg.
          Österreichische Küche mit Herz — saisonal und regional, von Graz bis Wien.
        </p>

        <div class="mt-6 flex flex-wrap gap-3">
          <a v-for="s in BETRIEB.social" :key="s.name" :href="s.url" target="_blank" rel="noopener"
             class="inline-flex items-center gap-2 rounded-full border border-cream/20 px-4 py-2 text-sm
                    transition-colors hover:border-leaf hover:text-leaf">
            {{ s.name }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <div>
        <h2 class="eyebrow-dunkel mb-4">Kontakt</h2>
        <address class="not-italic text-cream/80 leading-relaxed">
          {{ BETRIEB.adresse.strasse }}<br>{{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ort }}<br>
          <a :href="'tel:' + BETRIEB.telefonRoh" class="hover:text-leaf">{{ BETRIEB.telefon }}</a><br>
          <a :href="'mailto:' + BETRIEB.email" class="hover:text-leaf">{{ BETRIEB.email }}</a>
        </address>
        <a :href="BETRIEB.route" target="_blank" rel="noopener"
           class="mt-3 inline-flex items-center gap-1.5 text-sm text-leaf hover:text-cream transition-colors">
          Route planen <span aria-hidden="true">→</span>
        </a>
      </div>

      <div>
        <h2 class="eyebrow-dunkel mb-4">Leistungen</h2>
        <ul class="text-cream/80 leading-relaxed space-y-1.5">
          <li v-for="b in BEREICHE" :key="b.slug">
            <NuxtLink :to="'/' + b.slug" class="hover:text-leaf transition-colors">{{ b.titel }}</NuxtLink>
          </li>
        </ul>

        <h2 class="eyebrow-dunkel mt-7 mb-3">Schwesterbetrieb</h2>
        <a :href="BETRIEB.schwester.url" target="_blank" rel="noopener"
           class="text-cream/80 hover:text-leaf transition-colors">
          {{ BETRIEB.schwester.name }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>

    <div class="container-x py-6 border-t border-cream/15 flex flex-wrap justify-between gap-3 text-cream/50 text-[0.8rem]">
      <span>© {{ year }} {{ BETRIEB.name }}</span>
      <span class="flex flex-wrap gap-5">
        <NuxtLink to="/impressum" class="hover:text-leaf">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz" class="hover:text-leaf">Datenschutz</NuxtLink>
        <NuxtLink to="/agb" class="hover:text-leaf">AGB</NuxtLink>
      </span>
    </div>
  </footer>
</template>

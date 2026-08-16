<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink text-cream">
    <div class="container-x py-16 grid gap-10 md:grid-cols-4">
      <div class="md:col-span-2">
        <NuxtLink to="/" class="inline-block mb-6" aria-label="Gollner Gastro — Startseite">
          <img src="/images/logo-voll-creme.png" alt="Gollner Gastro GmbH" class="h-28 md:h-32 w-auto" />
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
          {{ BETRIEB.adresse.strasse }}<br>{{ BETRIEB.adresse.plz }} {{ BETRIEB.adresse.ort }}
          <!-- Telefon und E-Mail als eigene Zeilen mit Polsterung statt als
               Textzeilen: am Handy sind das die wichtigsten Tippziele, und mit
               reiner Zeilenhöhe wären sie nur 20px hoch — zu wenig zum Treffen. -->
          <a :href="'tel:' + BETRIEB.telefonRoh" class="block py-1.5 hover:text-leaf">{{ BETRIEB.telefon }}</a>
          <a :href="'mailto:' + BETRIEB.email" class="block pb-1.5 hover:text-leaf">{{ BETRIEB.email }}</a>
        </address>
        <a :href="BETRIEB.route" target="_blank" rel="noopener"
           class="mt-1 inline-flex items-center gap-1.5 py-1.5 text-sm text-leaf hover:text-cream transition-colors">
          Route planen <span aria-hidden="true">→</span>
        </a>
      </div>

      <div>
        <h2 class="eyebrow-dunkel mb-4">Leistungen</h2>
        <ul class="text-cream/80 leading-relaxed -my-1">
          <li v-for="b in BEREICHE" :key="b.slug">
            <NuxtLink :to="'/' + b.slug" class="block py-1.5 hover:text-leaf transition-colors">{{ b.titel }}</NuxtLink>
          </li>
        </ul>

        <h2 class="eyebrow-dunkel mt-6 mb-2">Schwesterbetrieb</h2>
        <a :href="BETRIEB.schwester.url" target="_blank" rel="noopener"
           class="inline-block py-1.5 text-cream/80 hover:text-leaf transition-colors">
          {{ BETRIEB.schwester.name }} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>

    <div class="container-x py-6 border-t border-cream/15 flex flex-wrap justify-between gap-3 text-cream/50 text-[0.8rem]">
      <span>© {{ year }} {{ BETRIEB.name }}</span>
      <span class="flex flex-wrap gap-5 -my-1.5">
        <NuxtLink to="/impressum" class="py-1.5 hover:text-leaf">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz" class="py-1.5 hover:text-leaf">Datenschutz</NuxtLink>
        <NuxtLink to="/agb" class="py-1.5 hover:text-leaf">AGB</NuxtLink>
      </span>
    </div>
  </footer>
</template>

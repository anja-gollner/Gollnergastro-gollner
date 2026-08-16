<script setup>
defineProps({ eyebrow: String, title: String, text: String, image: String })
</script>

<template>
  <section class="relative isolate overflow-hidden bg-ink text-cream pt-40 pb-20 md:pb-24">
    <!-- optionales Hintergrundbild -->
    <template v-if="image">
      <img :src="image" alt="" class="absolute inset-0 -z-10 w-full h-full object-cover opacity-70 scale-105" />
      <div class="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/45"></div>
      <div class="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-transparent"></div>
    </template>

    <!-- weiche Farbschimmer (immer sichtbar) -->
    <div aria-hidden="true" class="absolute -z-10 -top-24 -left-24 h-96 w-96 rounded-full bg-forest/25 blur-3xl"></div>
    <div aria-hidden="true" class="absolute -z-10 -bottom-28 right-0 h-80 w-80 rounded-full bg-leaf/15 blur-3xl"></div>

    <div class="container-x max-w-3xl">
      <p class="ph-in eyebrow text-leaf mb-5 flex items-center gap-3">
        <span class="h-px w-8 bg-leaf/60"></span>{{ eyebrow }}
      </p>
      <h1 class="ph-in ph-d1 font-display text-[clamp(2.6rem,7.5vw,5.2rem)] leading-[0.95]">{{ title }}</h1>
      <p v-if="text" class="ph-in ph-d2 mt-6 text-cream/75 leading-relaxed max-w-xl">{{ text }}</p>
    </div>

    <!-- untere Hairline, läuft ein -->
    <div class="ph-line absolute bottom-0 left-0 h-px bg-cream/15"></div>
  </section>
</template>

<style scoped>
@keyframes phRise {
  from { opacity: 0; transform: translateY(26px); filter: blur(7px); }
  to   { opacity: 1; transform: none;             filter: blur(0); }
}
.ph-in { opacity: 0; animation: phRise .9s cubic-bezier(.16,1,.3,1) forwards; }
.ph-d1 { animation-delay: .12s; }
.ph-d2 { animation-delay: .24s; }

@keyframes phLine { from { width: 0; } to { width: 100%; } }
.ph-line { width: 0; animation: phLine 1.3s cubic-bezier(.16,1,.3,1) .35s forwards; }

@media (prefers-reduced-motion: reduce) {
  .ph-in { opacity: 1; animation: none; }
  .ph-line { width: 100%; animation: none; }
}
</style>

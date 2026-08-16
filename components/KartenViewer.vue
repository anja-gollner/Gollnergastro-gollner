<script setup>
// Zeigt eine oder mehrere PDF-Karten. Ab Laptop als eingebettetes PDF,
// am Handy als Seitenbilder — dort ist ein PDF im Rahmen unbrauchbar.
// Liegen keine Seitenbilder vor (Webhoster ohne Imagick), erscheinen bewusst
// Knöpfe statt einer unlesbaren oder veralteten Karte.
const props = defineProps({
  karten: { type: Array, required: true }   // [{ schluessel, label }]
})

const { stand, laden, karte } = useKarten()
const geladen = ref(false)
const aktiv = ref(props.karten[0].schluessel)

onMounted(async () => { await laden(); geladen.value = true })

// Nur Karten zeigen, die am Server auch wirklich liegen. Sonst führte ein
// Umschalter ins Leere, solange eine Datei noch nicht hochgeladen ist —
// sobald sie da ist, erscheint der Reiter von selbst.
const verfuegbar = computed(() => {
  if (!geladen.value || !Object.keys(stand.value).length) return props.karten
  return props.karten.filter(k => stand.value[k.schluessel])
})

watch(verfuegbar, (liste) => {
  if (liste.length && !liste.some(k => k.schluessel === aktiv.value)) {
    aktiv.value = liste[0].schluessel
  }
})

const aktuell = computed(() => {
  const k = verfuegbar.value.find(k => k.schluessel === aktiv.value) || props.karten[0]
  return karte(k.schluessel, k.label)
})
</script>

<template>
  <div>
    <!-- Umschalter nur, wenn es wirklich mehrere Karten gibt -->
    <div v-if="verfuegbar.length > 1" v-reveal class="inline-flex p-1 rounded-full bg-ink/[0.06] border border-ink/10 mb-6">
      <button v-for="k in verfuegbar" :key="k.schluessel" @click="aktiv = k.schluessel"
              class="rounded-full px-5 py-2 text-sm font-display transition-colors duration-300"
              :class="aktiv === k.schluessel ? 'bg-ink text-cream' : 'text-ink/65 hover:text-ink'">
        {{ k.label }}
      </button>
    </div>

    <div v-reveal class="rounded-2xl overflow-hidden border border-ink/15 bg-cream shadow-[0_30px_60px_-35px_rgba(33,28,21,.45)]">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 px-5 py-3.5 border-b border-ink/10">
        <div class="flex items-center gap-2.5 min-w-0">
          <span class="h-2 w-2 rounded-full bg-forest shrink-0"></span>
          <span class="font-display text-lg">{{ aktuell.label }}</span>
          <span v-if="aktuell.seiten.length > 1" class="text-muted text-sm shrink-0">
            · {{ aktuell.seiten.length }} Seiten
          </span>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <a :href="aktuell.src" target="_blank" rel="noopener" class="btn btn-ghost !py-1.5 !px-4 text-[0.82rem]">Als PDF ↗</a>
          <a :href="aktuell.src" download class="btn btn-dark !py-1.5 !px-4 text-[0.82rem]">Herunterladen</a>
        </div>
      </div>

      <!-- Erst laden, wenn feststeht welche Karten es gibt. Sonst fordert der
           Rahmen kurz eine Datei an, die noch nicht hochgeladen ist (404). -->
      <div v-if="!geladen" class="grid place-items-center py-20 text-muted text-sm">
        Karte wird geladen …
      </div>

      <template v-else>
        <transition name="swap" mode="out-in">
          <iframe :key="aktiv" :src="aktuell.src" :title="aktuell.label"
                  class="hidden lg:block w-full bg-cream" style="height:78vh"></iframe>
        </transition>

        <div class="lg:hidden">
        <div v-if="aktuell.seiten.length" class="bg-beige/40">
          <img v-for="(bild, i) in aktuell.seiten" :key="bild" :src="bild"
               :alt="`${aktuell.label}, Seite ${i + 1} von ${aktuell.seiten.length}`"
               loading="lazy" decoding="async"
               class="w-full h-auto block border-b border-ink/10 last:border-b-0" />
          <p class="px-5 py-3 text-muted text-[0.82rem] text-center">
            {{ aktuell.seiten.length }} {{ aktuell.seiten.length === 1 ? 'Seite' : 'Seiten' }} · zum Vergrößern aufziehen
          </p>
        </div>
        <div v-else class="p-8 text-center">
          <p class="font-display text-xl mb-1">{{ aktuell.label }}</p>
          <p class="text-muted text-sm mb-5">Die Karte öffnet sich als PDF.</p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <a :href="aktuell.src" target="_blank" rel="noopener" class="btn btn-primary">Karte öffnen ↗</a>
            <a :href="aktuell.src" download class="btn btn-ghost">Herunterladen</a>
          </div>
        </div>
        </div>
      </template>
    </div>

    <p v-if="aktuell.stand" class="mt-4 text-muted text-sm">Stand: {{ aktuell.stand }}.</p>
  </div>
</template>

<style scoped>
.swap-enter-active, .swap-leave-active { transition: opacity .35s ease; }
.swap-enter-from, .swap-leave-to { opacity: 0; }
</style>

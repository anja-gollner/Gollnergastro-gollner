<script setup>
const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

const links = [
  { to: '/ueber-uns', label: 'Über uns' },
  { to: '/catering', label: 'Catering' },
  { to: '/kantine', label: 'Kantine' },
  { to: '/gollner19', label: 'Gollner¹⁹' }
]

const onScroll = () => { scrolled.value = window.scrollY > 24 }
const onResize = () => { if (window.innerWidth >= 768) open.value = false }
const onKeydown = (e) => { if (e.key === 'Escape') open.value = false }

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

watch(open, (v) => {
  if (typeof document !== 'undefined') document.body.style.overflow = v ? 'hidden' : ''
})
watch(() => route.path, () => { open.value = false })

// Dunkle Schrift nur, wenn das helle Panel sichtbar ist.
const dark = computed(() => scrolled.value && !open.value)
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-500"
    :class="(scrolled && !open)
      ? 'bg-cream/80 backdrop-blur-xl border-b border-ink/10 shadow-[0_8px_30px_-12px_rgba(33,28,21,0.25)]'
      : 'bg-transparent border-b border-transparent'"
  >
    <nav class="container-x flex items-center justify-between" :class="(scrolled && !open) ? 'py-3' : 'py-5'">
      <!-- Logo: Monogramm + Wortmarke. Zwei Fassungen, weil das Monogramm
           einfarbig ist und je nach Untergrund die Farbe wechseln muss. -->
      <NuxtLink
        to="/"
        class="relative z-[60] flex items-center gap-3 transition-opacity duration-300"
        :class="open ? 'opacity-0 pointer-events-none' : 'opacity-100'"
        :aria-hidden="open ? 'true' : undefined"
        :tabindex="open ? -1 : undefined"
        aria-label="Gollner Gastro — Startseite"
      >
        <img
          :src="dark ? '/images/gg-tanne.png' : '/images/gg-creme.png'"
          alt=""
          class="w-auto transition-all duration-500"
          :class="dark ? 'h-8 md:h-9' : 'h-10 md:h-12'"
        />
        <span class="leading-none transition-colors duration-500" :class="dark ? 'text-ink' : 'text-cream'">
          <span class="block font-display tracking-wide" :class="dark ? 'text-[1.05rem]' : 'text-[1.15rem]'">GOLLNER</span>
          <span class="block text-[0.55rem] tracking-[0.34em] opacity-70">GASTRO GMBH</span>
        </span>
      </NuxtLink>

      <!-- Desktop-Links -->
      <div
        class="hidden md:flex items-center gap-8 text-[0.92rem] transition-colors duration-500"
        :class="dark ? 'text-ink' : 'text-cream'"
      >
        <NuxtLink
          v-for="l in links" :key="l.to" :to="l.to"
          class="nav-link transition-opacity hover:opacity-100"
          :class="route.path === l.to ? 'is-active opacity-100' : 'opacity-80'"
        >{{ l.label }}</NuxtLink>
      </div>

      <NuxtLink
        to="/anfrage"
        class="hidden md:inline-flex btn !py-2 !px-5 text-[0.85rem] transition-all duration-500"
        :class="dark
          ? 'bg-forest text-cream hover:bg-ink border border-transparent'
          : 'border border-cream/40 text-cream hover:bg-cream hover:text-forest'"
      >Anfrage senden</NuxtLink>

      <!-- Burger -->
      <button
        class="md:hidden relative z-[60] w-9 h-9 flex flex-col items-center justify-center gap-[7px]"
        :class="dark ? 'text-ink' : 'text-cream'"
        @click="open = !open" :aria-expanded="open"
        :aria-label="open ? 'Menü schließen' : 'Menü öffnen'"
      >
        <span class="block w-7 h-[2px] bg-current rounded-full transition-all duration-300"
              :class="open ? 'translate-y-[4.5px] rotate-45' : ''"></span>
        <span class="block w-7 h-[2px] bg-current rounded-full transition-all duration-300"
              :class="open ? '-translate-y-[4.5px] -rotate-45' : ''"></span>
      </button>
    </nav>

    <!-- Mobile-Vollbild-Menü -->
    <transition name="overlay">
      <div
        v-if="open"
        class="md:hidden fixed inset-0 z-50 bg-ink/95 backdrop-blur-xl text-cream
               overflow-y-auto overscroll-contain"
        role="dialog" aria-modal="true" aria-label="Hauptmenü"
      >
        <div class="min-h-full flex flex-col pt-24 [@media(max-height:520px)]:pt-20">
          <div class="flex-1 flex flex-col justify-center px-[8vw] py-4 gap-1">
            <NuxtLink
              v-for="(l, i) in links" :key="l.to" :to="l.to"
              class="menu-item font-display leading-tight py-1.5 flex items-center gap-4
                     text-[clamp(1.75rem,min(10vw,6.4vh),3.25rem)]
                     hover:text-leaf transition-colors"
              :style="{ animationDelay: (80 + i * 70) + 'ms' }"
              @click="open = false"
            >
              <span class="text-leaf text-base font-sans tabular-nums opacity-60">0{{ i + 1 }}</span>
              {{ l.label }}
            </NuxtLink>
          </div>

          <div
            class="menu-item px-[8vw] pb-10 pt-6 border-t border-cream/15"
            :style="{ animationDelay: (80 + links.length * 70) + 'ms' }"
          >
            <NuxtLink to="/anfrage" class="btn btn-primary w-full" @click="open = false">
              Anfrage senden →
            </NuxtLink>
            <NuxtLink to="/" class="mt-6 inline-block" @click="open = false" aria-label="Gollner Gastro — Startseite">
              <img src="/images/gg-creme.png" alt="Gollner Gastro" class="h-10 w-auto opacity-70 transition-opacity hover:opacity-100" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.overlay-enter-active, .overlay-leave-active { transition: opacity .4s ease, transform .4s cubic-bezier(.16,1,.3,1); }
.overlay-enter-from, .overlay-leave-to { opacity: 0; transform: translateY(-12px); }
</style>

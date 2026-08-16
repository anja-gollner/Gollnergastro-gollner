// v-reveal: dezenter Einblend-Effekt beim Reinscrollen (SSR-sicher, no-JS = sichtbar)
export default defineNuxtPlugin((nuxtApp) => {
  const io = typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement
            const delay = Number(el.dataset.revealDelay || 0)
            setTimeout(() => el.classList.add('is-in'), delay)
            obs.unobserve(el)
          }
        })
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })
    : null

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (!io) return
      // Delay aus value (v-reveal="120") ODER Argument (v-reveal:120)
      const delay = Number(binding.value ?? binding.arg ?? 0)
      if (delay) el.dataset.revealDelay = String(delay)
      el.classList.add('reveal-ready')
      // Richtung/Stil über Modifier: v-reveal.left / .right / .scale
      if (binding.modifiers.left)  el.classList.add('r-left')
      if (binding.modifiers.right) el.classList.add('r-right')
      if (binding.modifiers.scale) el.classList.add('r-scale')
      io.observe(el)
    },
    unmounted(el: HTMLElement) {
      io?.unobserve(el)
    }
  })
})

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Grundtöne wie beim Schildbacherhof — beide Häuser gehören sichtbar zusammen
        cream:  '#F4EFE3',  // warmer heller Grundton
        beige:  '#E6DBC4',  // tieferes Beige (Panels/Flächen)
        ink:    '#211C15',  // warmes Anthrazit (Text/dunkle Sektionen)
        muted:  '#6F6A5E',  // gedämpfter Text

        // Akzent: Tannengrün statt Terrakotta.
        // Ein einzelnes Dunkelgrün reicht nicht — auf ink hat es nur 1,6:1
        // Kontrast und verschwindet. Deshalb ein Paar:
        forest: '#2C4636',  // auf hellem Grund (9,0:1) — Knöpfe, Eyebrows, Flächen
        leaf:   '#8FA37E'   // auf dunklem Grund (6,2:1) — dort die Rolle von forest
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      maxWidth: { content: '1280px' }
    }
  },
  plugins: []
}

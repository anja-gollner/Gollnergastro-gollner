// Einzige Quelle für alle Firmendaten. Footer, Anfrage, Impressum, Datenschutz
// und die strukturierten Daten für Google lesen ausschließlich von hier.
// Gleiche Bauweise wie beim Schildbacherhof — dort standen Telefonnummer und
// E-Mail an vier Stellen im Code, im Impressum eine andere als im Footer.
//
// Die Werte hier sind der Ausgangsstand. Im CMS unter „Basisdaten" lassen sie
// sich am Server überschreiben; `plugins/stammdaten.client.ts` holt das beim
// Laden ab und schreibt es über das Objekt. Weil `BETRIEB` reaktiv ist, ziehen
// alle Stellen im Code automatisch nach — dort muss nichts angepasst werden.

// `reactive` wird in Nuxt sonst automatisch eingebunden. Hier steht der Import
// trotzdem, weil nuxt.config.ts diese Datei beim Bauen direkt lädt, um die
// Ausgangswerte fürs CMS herauszuschreiben — außerhalb von Nuxt gäbe es die
// automatische Einbindung nicht.
import { reactive } from 'vue'

const ADRESSE = {
  strasse: 'Schildbach 42',
  plz: '8230',
  ort: 'Hartberg Umgebung',
  land: 'Österreich',
  landCode: 'AT'
}

export const BETRIEB = reactive({
  name: 'Gollner Gastro GmbH',
  kurz: 'Gollner Gastro',
  gegruendet: 'Dezember 2025',
  wurzelnSeit: 1967,

  adresse: ADRESSE,

  telefonRoh: '+436606650065',
  telefon: '0660 66 500 65',
  email: 'office@gollner-gastro.at',

  geschaeftsfuehrer: 'Peter Gollner',
  prokura: ['Florian Gollner', 'Julia Neuhold'],
  firmenbuch: 'FN 668854 i',
  firmenbuchgericht: 'Landesgericht für Zivilrechtssachen Graz',
  uid: 'ATU82862127',
  behoerde: 'Bezirkshauptmannschaft Hartberg-Fürstenfeld',
  kammer: 'Wirtschaftskammer Steiermark, Sparte Tourismus und Freizeitwirtschaft',

  domain: 'https://gollner-gastro.at',
  vorschaubild: '/images/catering-grill.jpg',

  kueche: 'Österreichisch, saisonal und regional',
  preisklasse: '€€',

  // Als Getter statt als fertiger Text: sonst würde eine im CMS geänderte
  // Adresse zwar im Impressum stehen, der Kartenlink aber weiter zur alten
  // führen. So wird bei jedem Zugriff neu aus der aktuellen Adresse gebaut.
  get adresseZeile(): string {
    return `${this.adresse.strasse}, ${this.adresse.plz} ${this.adresse.ort}`
  },
  get mapsZiel(): string {
    return encodeURIComponent(`${this.name}, ${this.adresseZeile}`)
  },
  get karte(): string {
    return `https://www.google.com/maps/search/?api=1&query=${this.mapsZiel}`
  },
  get route(): string {
    return `https://www.google.com/maps/dir/?api=1&destination=${this.mapsZiel}`
  },

  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/gollnergastro/' },
    { name: 'Facebook',  url: 'https://www.facebook.com/profile.php?id=61588468455254' }
  ],

  // Das Schwesterunternehmen — beide bestehen eigenständig nebeneinander
  schwester: { name: 'Der Schildbacherhof', url: 'https://schildbacherhof.at' }
})

/**
 * Übernimmt die im CMS gespeicherten Basisdaten.
 *
 * Bewusst Feld für Feld statt per Object.assign: die gespeicherte Datei
 * enthält nur, was jemand geändert hat, und ein pauschales Zuweisen würde
 * z. B. beim Überschreiben der Adresse das Land mitlöschen. Alles Unbekannte
 * wird ignoriert.
 */
export function stammdatenUebernehmen(d: Record<string, any> | null | undefined): void {
  if (!d || typeof d !== 'object') return

  for (const k of ['telefon', 'telefonRoh', 'email'] as const) {
    if (typeof d[k] === 'string' && d[k]) BETRIEB[k] = d[k]
  }

  if (d.adresse && typeof d.adresse === 'object') {
    for (const k of ['strasse', 'plz', 'ort'] as const) {
      if (typeof d.adresse[k] === 'string' && d.adresse[k]) BETRIEB.adresse[k] = d.adresse[k]
    }
  }

  if (d.social && typeof d.social === 'object') {
    for (const eintrag of BETRIEB.social) {
      const url = d.social[eintrag.name]
      if (typeof url === 'string' && url) eintrag.url = url
    }
  }
}

// Die drei Geschäftsfelder — an einer Stelle, damit Startseite, Navigation
// und Footer nicht auseinanderlaufen.
export const BEREICHE = [
  {
    no: '01',
    slug: 'catering',
    titel: 'Catering & Events',
    kurz: 'Buffet, BBQ und Foodtruck für jeden Anlass.',
    text: 'Buffets, Grillveranstaltungen, Fingerfood und Foodtruck — auf Wunsch mit Personal und Getränkeausschank.',
    bild: '/images/catering-grill.jpg'
  },
  {
    no: '02',
    slug: 'kantine',
    titel: 'Betriebsverpflegung',
    kurz: 'Frisch gekocht, täglich, direkt vor Ort.',
    text: 'Täglich frisch gekochte, ausgewogene Mahlzeiten für eure Mitarbeiter — österreichisch, saisonal und regional.',
    bild: '/images/kantine-1.jpg'
  },
  {
    no: '03',
    slug: 'gollner19',
    titel: 'Gollner¹⁹',
    kurz: 'Genuss inmitten der Natur am Thalersee.',
    text: 'Unser Golfrestaurant am Grazer Golfclub Thalersee — an den beiden Standorten Windhof und Steinfeld.',
    bild: '/images/windhof-terrasse.jpg'
  }
]

export function useBetrieb() {
  return { BETRIEB, BEREICHE }
}

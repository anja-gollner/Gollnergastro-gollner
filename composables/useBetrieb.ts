// Einzige Quelle für alle Firmendaten. Footer, Anfrage, Impressum, Datenschutz
// und die strukturierten Daten für Google lesen ausschließlich von hier.
// Gleiche Bauweise wie beim Schildbacherhof — dort standen Telefonnummer und
// E-Mail an vier Stellen im Code, im Impressum eine andere als im Footer.

const ADRESSE = {
  strasse: 'Schildbach 42',
  plz: '8230',
  ort: 'Hartberg Umgebung',
  land: 'Österreich',
  landCode: 'AT'
}

const ZIEL = encodeURIComponent(`Gollner Gastro GmbH, ${ADRESSE.strasse}, ${ADRESSE.plz} ${ADRESSE.ort}`)

export const BETRIEB = {
  name: 'Gollner Gastro GmbH',
  kurz: 'Gollner Gastro',
  gegruendet: 'Dezember 2025',
  wurzelnSeit: 1967,

  adresse: ADRESSE,
  adresseZeile: `${ADRESSE.strasse}, ${ADRESSE.plz} ${ADRESSE.ort}`,

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

  karte: `https://www.google.com/maps/search/?api=1&query=${ZIEL}`,
  route: `https://www.google.com/maps/dir/?api=1&destination=${ZIEL}`,

  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/gollnergastro/' },
    { name: 'Facebook',  url: 'https://www.facebook.com/gollnergastro' }
  ],

  // Das Schwesterunternehmen — beide bestehen eigenständig nebeneinander
  schwester: { name: 'Der Schildbacherhof', url: 'https://schildbacherhof.at' }
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

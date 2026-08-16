# Gollner Gastro — Website (Nuxt 3 + Tailwind)

Schwesterseite zum [Schildbacherhof](https://schildbacherhof.at) — gleiche Technik,
gleiche Bausteine, gleiche Schriften. Unterschied: **Tannengrün statt Terrakotta.**

## Lokal starten
```bash
npm install
npm run dev        # http://localhost:3000
```

## Bauen (statisch, für FileZilla)
```bash
npm run generate   # erzeugt .output/public/
```

## Farbwelt (tailwind.config.js)
Grundtöne wie beim Schildbacherhof: cream `#F4EFE3` · beige `#E6DBC4` · ink `#211C15`.

Der Akzent ist ein **Paar**, keine Einzelfarbe:
- `forest` `#2C4636` — auf hellem Grund (Kontrast 9,0:1): Knöpfe, Eyebrows, Flächen
- `leaf` `#8FA37E` — auf dunklem Grund (6,2:1): dort übernimmt es die Rolle von forest

Grund: Ein einzelnes Dunkelgrün hat auf `ink` nur 1,6:1 Kontrast und verschwindet.
Terrakotta beim Schildbacherhof funktionierte auf beiden Gründen, Dunkelgrün nicht.
Für Eyebrows auf dunklen Sektionen gibt es deshalb `.eyebrow-dunkel`.

Schriften: Fraunces (Display) + Inter (Text), lokal in `public/fonts/` — keine
Verbindung zu Google.

## Bilder
Die Fotos stammen aus der bisherigen WordPress-Seite. Sie sind deutlich **heller**
als die Innenaufnahmen des Schildbacherhofs — deshalb sind Hero und Karten hier
kräftiger abgedunkelt (`brightness` + stärkere Verläufe). Beim Austausch der Fotos
diese Werte prüfen.

## Favicon
GG-Monogramm cremefarben auf Tannengrün (`public/favicon.ico`, `favicon-16/32.png`,
`apple-touch-icon.png`). Bewusst eine grüne Kachel — so ist der Tab im Browser vom
Schildbacherhof (cremefarbene Kachel) zu unterscheiden.

## Speisekarten
Aktuell liegen unter `public/pdf/` **vorläufig die Karten des Schildbacherhofs**
(`speisekarte.pdf`, `wochenmenue.pdf`) — bis die echten Gollner19-Karten da sind.

Die Seitenbilder unter `public/pdf/seiten/` erzeugt `api/menus.php` beim ersten
Abruf nach einem Upload neu; hier liegen sie zusätzlich vorgeneriert, damit sie
auch ohne Imagick am Server vorhanden sind. Reiter erscheinen nur für Karten,
die tatsächlich am Server liegen.

## CMS
Unter `/admin/` liegt ein kleines, passwortgeschütztes CMS (PHP), mit dem sich
**Basisdaten** (Telefon, E-Mail, Adresse, Social-Profile) und die **Karten-PDFs**
ohne Code pflegen lassen. Alles Weitere in **[CMS.md](CMS.md)**.

Technisch hängt das an drei Stellen zusammen:

- `composables/useBetrieb.ts` ist `reactive` — deshalb ziehen alle Stellen im Code
  automatisch nach, ohne dass man sie einzeln anfassen müsste.
- `plugins/stammdaten.client.ts` holt beim Laden die gespeicherten Werte vom Server.
- `nuxt.config.ts` schreibt beim Bauen `public/api/vorgabe.json` — die Ausgangswerte,
  die das CMS anzeigt, solange nichts überschrieben ist. Damit steht die
  Telefonnummer weiterhin an genau **einer** Stelle im Code.

## Server
`public/.htaccess` wird mitgebaut und muss mit hochgeladen werden (FileZilla blendet
Dateien mit Punkt am Anfang aus — „Versteckte Dateien anzeigen" einschalten). Sie
erzwingt HTTPS, entfernt `www.`, liefert die eigene 404-Seite aus und schaltet
Komprimierung sowie Caching ein.

## Stand
Alle neun Seiten sind gebaut: Startseite, Über uns, Catering, Kantine, Gollner19,
Anfrage, Impressum, Datenschutz, AGB. Dazu robots.txt und sitemap.xml.

Das Anfrageformular schickt an `api/contact.php` (Empfänger und Absender oben in
der Datei einstellbar). **Vor dem Livegang eine echte Testanfrage abschicken** und
prüfen, ob sie im Postfach landet — nicht nur im Spam.

Die Seite läuft laut bisheriger Datenschutzerklärung bei **World4You**; klassisches
Hosting mit PHP genügt, Node wird nicht gebraucht.

### Offen
- echte Gollner19-Karten (aktuell die des Schildbacherhofs)
- Porträt von Julia Neuhold (steht bewusst ohne Foto im Hintergrund)
- eigene Fotos für Catering und Anfrage — dort greifen wir auf die vorhandenen zurück
- Texte der AGB sind aus der WordPress-Seite übernommen und nicht anwaltlich geprüft

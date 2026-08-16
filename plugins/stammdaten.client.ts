// Holt die im CMS gepflegten Basisdaten und überschreibt damit die Werte,
// die beim Bauen der Seite eingetragen waren.
//
// Warum überhaupt zur Laufzeit? Die Website ist eine statische Seite — beim
// Ändern im CMS wird sie nicht neu gebaut, es liegt ja kein Node am Webspace.
// Der ausgelieferte Quelltext trägt also bis zum nächsten Hochladen noch den
// alten Stand; dieser Aufruf korrigiert ihn im Browser, bevor jemand es sieht.
//
// Bewusst nicht `await`: hängt der Server oder fehlt PHP, soll die Seite
// trotzdem sofort benutzbar sein und einfach beim eingebauten Stand bleiben.
export default defineNuxtPlugin(() => {
  $fetch<Record<string, any>>('/api/stammdaten.php', { retry: 0, timeout: 5000 })
    .then(stammdatenUebernehmen)
    .catch(() => {
      /* Kein PHP, Datei fehlt, offline — dann gilt der eingebaute Stand. */
    })
})

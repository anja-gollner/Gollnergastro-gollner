<?php
// Server-Diagnose fürs CMS: beantwortet nach dem Upload die Frage
// "kann dieser Webhoster alles, was die Website braucht?"
//
// Nur für Eingeloggte — die Antworten verraten Details über die Serverkonfiguration.
require __DIR__ . '/_bootstrap.php';
require_auth();

function schreibbar(string $pfad): bool {
  if (is_dir($pfad)) return is_writable($pfad);
  $eltern = dirname($pfad);
  return is_dir($eltern) && is_writable($eltern);
}

$imagickPdf = false;
if (class_exists('Imagick')) {
  try { $imagickPdf = !empty(Imagick::queryFormats('PDF')); } catch (Throwable $e) { $imagickPdf = false; }
}

$pruefungen = [
  [
    'name'  => 'PHP-Version',
    'ok'    => version_compare(PHP_VERSION, '8.0', '>='),
    'wert'  => PHP_VERSION,
    'hilfe' => 'Ab PHP 8.0. Ältere Versionen beim Hoster umstellen.'
  ],
  [
    'name'  => 'E-Mail-Versand',
    'ok'    => function_exists('mail'),
    'wert'  => function_exists('mail') ? 'mail() verfügbar' : 'mail() gesperrt',
    'hilfe' => 'Ohne mail() kommen Anfragen aus dem Kontaktformular nicht an. '
             . 'Prüft zusätzlich mit einer echten Testanfrage, ob die Mail auch im Postfach landet.'
  ],
  [
    'name'  => 'Karten als Bildseiten',
    'ok'    => $imagickPdf,
    'wert'  => $imagickPdf ? 'Imagick mit PDF-Unterstützung' : (class_exists('Imagick') ? 'Imagick ohne PDF' : 'Imagick fehlt'),
    'hilfe' => 'Wird gebraucht, damit nach einem Upload neue Seitenbilder fürs Handy entstehen. '
             . 'Fehlt es, zeigt die Website am Handy Knöpfe zum Öffnen der PDF — die Karte bleibt erreichbar.'
  ],
  [
    'name'  => 'Ordner content/ beschreibbar',
    'ok'    => schreibbar(CONTENT_DIR),
    'wert'  => schreibbar(CONTENT_DIR) ? 'ja' : 'nein',
    'hilfe' => 'Nötig, damit die Basisdaten gespeichert werden können. '
             . 'Per FileZilla auf 755 (ggf. 775) setzen.'
  ],
  [
    'name'  => 'Ordner pdf/ beschreibbar',
    'ok'    => schreibbar(PDF_DIR),
    'wert'  => schreibbar(PDF_DIR) ? 'ja' : 'nein',
    'hilfe' => 'Nötig für den Upload von Speisekarte und Wochenmenü.'
  ],
  [
    'name'  => 'Upload-Grenze',
    'ok'    => true,
    'wert'  => 'max. ' . ini_get('upload_max_filesize') . ' pro Datei',
    'hilfe' => 'Liegt eine Speisekarte darüber, lehnt der Server den Upload ab.'
  ]
];

json_out([
  'pruefungen' => $pruefungen,
  'alles_ok'   => !in_array(false, array_column($pruefungen, 'ok'), true)
]);

<?php
// Datei-Upload: die Karten-PDFs.
require __DIR__ . '/_bootstrap.php';
require_auth();
require_csrf();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['error' => 'method not allowed'], 405);
if (!isset($_FILES['file'])) json_out(['error' => 'Keine Datei erhalten.'], 422);

$type = (string)($_POST['type'] ?? '');
$f    = $_FILES['file'];

if ($f['error'] !== UPLOAD_ERR_OK) json_out(['error' => 'Upload-Fehler (' . $f['error'] . ').'], 422);
if ($f['size'] > 25 * 1024 * 1024) json_out(['error' => 'Datei zu groß (max. 25 MB).'], 422);
if (!is_uploaded_file($f['tmp_name'])) json_out(['error' => 'Ungültiger Upload.'], 422);

// ── PDF (Speisekarte / Wochenmenü) ──
if ($type === 'pdf') {
  $target  = (string)($_POST['target'] ?? '');
  $allowed = ['speisekarte.pdf', 'wochenmenue.pdf'];
  if (!in_array($target, $allowed, true)) json_out(['error' => 'Unbekanntes Ziel.'], 422);

  $fh = fopen($f['tmp_name'], 'rb');
  $head = $fh ? fread($fh, 5) : '';
  if ($fh) fclose($fh);
  if (strncmp($head, '%PDF-', 5) !== 0) json_out(['error' => 'Das ist keine gültige PDF-Datei.'], 422);

  if (!is_dir(PDF_DIR)) @mkdir(PDF_DIR, 0775, true);
  if (!move_uploaded_file($f['tmp_name'], PDF_DIR . '/' . $target)) {
    json_out(['error' => 'Speichern fehlgeschlagen – Schreibrechte auf /pdf?'], 500);
  }
  json_out(['ok' => true, 'path' => '/pdf/' . $target]);
}

// Bilder werden hier — anders als beim Schildbacherhof, wo es Event-Bilder
// gibt — nicht hochgeladen. Fotos liegen fest im Projekt.
json_out(['error' => 'Unbekannter Upload-Typ.'], 422);

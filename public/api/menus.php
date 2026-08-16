<?php
// Öffentlich lesbar (kein Login): Änderungsdatum der Karten-PDFs und die
// daraus erzeugten Seitenbilder.
//
// Warum Seitenbilder? Ein PDF in einem eingebetteten Rahmen ist am Handy
// unbrauchbar: eine A4-Seite in ~340 px Breite ist unlesbar, iOS zeigt nur die
// erste Seite ohne Scrollen, manche Android-Browser zeigen gar nichts. Als
// Bilder lässt sich die Karte normal scrollen und zoomen.
//
// Erzeugt wird beim ersten Abruf nach einem Upload — und beim Build lokal
// vorbereitet, damit die Bilder auch dann vorliegen, wenn der Webhoster keine
// PDF-Verarbeitung erlaubt. Ist das PDF neuer als die Bilder und lässt sich
// nichts erzeugen, liefern wir bewusst eine leere Liste: dann zeigt die
// Website die Knöpfe zum Öffnen statt einer veralteten Karte.
require __DIR__ . '/_bootstrap.php';

header('Cache-Control: no-cache, max-age=0');

define('SEITEN_DIR', PDF_DIR . '/seiten');
const KARTEN = ['speisekarte', 'wochenmenue'];
const MAX_SEITEN = 12;   // Sicherheitsnetz gegen versehentlich riesige PDFs

/** Kann dieser Server PDFs in Bilder umwandeln? */
function kann_wandeln(): bool {
  if (!class_exists('Imagick')) return false;
  try {
    $formate = Imagick::queryFormats('PDF');
    return !empty($formate);
  } catch (Throwable $e) {
    return false;
  }
}

/** Vorhandene Seitenbilder einer Karte, aufsteigend sortiert. */
function vorhandene_seiten(string $key): array {
  $treffer = glob(SEITEN_DIR . '/' . $key . '-*.jpg') ?: [];
  natsort($treffer);
  return array_values($treffer);
}

/** Erzeugt die Seitenbilder neu. Gibt false zurück, wenn es nicht geht. */
function seiten_erzeugen(string $key, string $pdf): bool {
  if (!kann_wandeln()) return false;
  if (!is_dir(SEITEN_DIR) && !@mkdir(SEITEN_DIR, 0775, true)) return false;

  foreach (vorhandene_seiten($key) as $alt) @unlink($alt);

  try {
    $im = new Imagick();
    $im->setResolution(150, 150);          // scharf genug zum Zoomen
    $im->readImage($pdf);
    $im = $im->coalesceImages();

    $i = 0;
    foreach ($im as $seite) {
      if (++$i > MAX_SEITEN) break;
      $seite->setImageBackgroundColor('white');
      $seite = $seite->flattenImages();    // Transparenz auf Weiß legen
      $seite->setImageFormat('jpeg');
      $seite->setImageCompressionQuality(82);
      $seite->thumbnailImage(1400, 0);     // Breite 1400 px, Höhe proportional
      $seite->stripImage();
      $seite->writeImage(SEITEN_DIR . '/' . $key . '-' . $i . '.jpg');
    }
    $im->clear();
    return $i > 0;
  } catch (Throwable $e) {
    return false;
  }
}

$out = [];
foreach (KARTEN as $key) {
  $pdf = PDF_DIR . '/' . $key . '.pdf';
  if (!is_file($pdf)) continue;

  $stand = @filemtime($pdf) ?: 0;
  $seiten = vorhandene_seiten($key);

  // Veraltet = keine Bilder da, oder das PDF ist neuer als das erste Bild.
  $veraltet = !$seiten || (@filemtime($seiten[0]) ?: 0) < $stand;
  if ($veraltet) {
    $seiten = seiten_erzeugen($key, $pdf) ? vorhandene_seiten($key) : [];
  }

  $out[$key] = [
    'v'       => $stand,
    'updated' => $stand ? date('c', $stand) : null,
    // Relative URLs mit Zeitstempel, damit der Browser-Cache nicht die alte Karte hält
    'seiten'  => array_map(fn($p) => '/pdf/seiten/' . basename($p) . '?v=' . $stand, $seiten)
  ];
}

json_out($out);

<?php
// Basisdaten: Telefon, E-Mail, Adresse, Social-Profile, Öffnungszeiten.
//
// GET  = öffentlich lesen (die Website holt das beim Laden ab und überschreibt
//        damit die beim Bauen eingetragenen Werte)
// POST = speichern, nur eingeloggt
//
// Gespeichert wird ausschließlich, was tatsächlich abweicht: eine leere Datei
// bedeutet "es gilt alles so, wie es im Code steht". Dadurch kann man mit
// „Feld leeren" jederzeit zum Ausgangswert zurück, und ein Fehler hier legt
// die Website nicht lahm — sie fällt einfach auf die eingebauten Werte zurück.
require __DIR__ . '/_bootstrap.php';

define('STAMM_FILE', CONTENT_DIR . '/stammdaten.json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  header('Cache-Control: no-cache, max-age=0');
  $raw  = is_file(STAMM_FILE) ? (file_get_contents(STAMM_FILE) ?: '{}') : '{}';
  $data = json_decode($raw, true);
  json_out(is_array($data) ? $data : []);
}

if ($method !== 'POST') json_out(['error' => 'method not allowed'], 405);

require_auth();
require_csrf();

$body = read_json_body();
$out  = [];

/** Freitext: Steuerzeichen raus, Länge begrenzen. Leer = nicht übernehmen. */
function feld($wert, int $max): string {
  if (!is_string($wert)) return '';
  $wert = preg_replace('/[\x00-\x1F\x7F]/u', '', $wert);
  return mb_substr(trim($wert), 0, $max);
}

// ── Kontakt ──────────────────────────────────────────────────────────
if (($v = feld($body['telefon'] ?? null, 40)) !== '') $out['telefon'] = $v;

// Die Wählnummer landet in einem tel:-Link. Nur Ziffern und die üblichen
// Trennzeichen zulassen, sonst könnte hier Unsinn im href stehen.
if (($v = feld($body['telefonRoh'] ?? null, 30)) !== '') {
  if (!preg_match('/^\+?[0-9 \/()\-]{6,30}$/', $v)) {
    json_out(['error' => 'Die Wählnummer darf nur Ziffern, +, /, ( ) und - enthalten.'], 422);
  }
  $out['telefonRoh'] = preg_replace('/[^\+0-9]/', '', $v);
}

if (($v = feld($body['email'] ?? null, 120)) !== '') {
  if (!filter_var($v, FILTER_VALIDATE_EMAIL)) {
    json_out(['error' => 'Die E-Mail-Adresse sieht nicht gültig aus.'], 422);
  }
  $out['email'] = $v;
}

// ── Adresse ──────────────────────────────────────────────────────────
$adr = [];
foreach (['strasse' => 80, 'plz' => 10, 'ort' => 80] as $k => $max) {
  if (($v = feld($body['adresse'][$k] ?? null, $max)) !== '') $adr[$k] = $v;
}
if ($adr) $out['adresse'] = $adr;

// ── Social-Profile ───────────────────────────────────────────────────
// Nur https-Adressen: ein „javascript:"-Link im Footer wäre sonst eine
// offene Tür, und die Buttons öffnen ein neues Fenster.
$social = [];
foreach (['Instagram', 'Facebook'] as $netz) {
  $v = feld($body['social'][$netz] ?? null, 250);
  if ($v === '') continue;
  if (!filter_var($v, FILTER_VALIDATE_URL) || stripos($v, 'https://') !== 0) {
    json_out(['error' => "Die $netz-Adresse muss mit https:// beginnen."], 422);
  }
  $social[$netz] = $v;
}
if ($social) $out['social'] = $social;

// ── Öffnungszeiten ───────────────────────────────────────────────────
// Wochenplan als Minuten ab Mitternacht, je Tag bis zu zwei Zeitfenster.
// Ein Tag ohne Fenster ist ein Ruhetag — das ist etwas anderes als "nicht
// gesetzt", deshalb wird der komplette Plan übernommen, sobald er mitkommt.
if (isset($body['oeffnung']) && is_array($body['oeffnung'])) {
  $plan = [];
  foreach ($body['oeffnung'] as $tag) {
    if (!is_array($tag)) continue;
    $dow = filter_var($tag['dow'] ?? null, FILTER_VALIDATE_INT);
    if ($dow === false || $dow < 0 || $dow > 6) continue;

    $slots = [];
    foreach ((array)($tag['slots'] ?? []) as $s) {
      if (!is_array($s) || count($s) < 2) continue;
      $von = filter_var($s[0], FILTER_VALIDATE_INT);
      $bis = filter_var($s[1], FILTER_VALIDATE_INT);
      if ($von === false || $bis === false) continue;
      if ($von < 0 || $bis > 1440 || $bis <= $von) continue;
      $slots[] = [$von, $bis];
      if (count($slots) >= 2) break;
    }
    // Zweites Fenster darf nicht vor dem ersten enden
    usort($slots, fn($a, $b) => $a[0] <=> $b[0]);
    if (count($slots) === 2 && $slots[1][0] < $slots[0][1]) {
      json_out(['error' => 'Die beiden Zeitfenster eines Tages überschneiden sich.'], 422);
    }
    $plan[] = ['dow' => $dow, 'slots' => $slots];
  }
  if (count($plan) !== 7) json_out(['error' => 'Der Wochenplan muss sieben Tage enthalten.'], 422);
  $out['oeffnung'] = $plan;
}

// ── Schreiben ────────────────────────────────────────────────────────
if (!is_dir(CONTENT_DIR)) @mkdir(CONTENT_DIR, 0775, true);

// Vorherigen Stand wegsichern: wenn hier jemand versehentlich alles leert,
// liegt die letzte Fassung noch daneben.
if (is_file(STAMM_FILE)) @copy(STAMM_FILE, STAMM_FILE . '.bak');

$json = json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
if (@file_put_contents(STAMM_FILE, $json, LOCK_EX) === false) {
  json_out(['error' => 'Speichern fehlgeschlagen – Schreibrechte auf /content?'], 500);
}

json_out(['ok' => true, 'stammdaten' => $out]);

<?php
// Erstanmeldung (Setup) und normaler Login.
require __DIR__ . '/_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['error' => 'method not allowed'], 405);

$body   = read_json_body();
$action = (string)($body['action'] ?? 'login');
$pass   = (string)($body['password'] ?? '');

// ── Erst-Setup: Passwort festlegen, solange noch keiner existiert ──
if ($action === 'setup') {
  if (is_setup()) json_out(['error' => 'Es ist bereits ein Passwort gesetzt.'], 400);
  if (strlen($pass) < 8) json_out(['error' => 'Das Passwort muss mindestens 8 Zeichen haben.'], 422);

  $hash = password_hash($pass, PASSWORD_DEFAULT);
  $php  = "<?php\n// Automatisch erzeugt – NICHT von Hand bearbeiten. Passwort über das CMS ändern.\nreturn "
        . var_export(['hash' => $hash, 'created' => date('c')], true) . ";\n";

  if (@file_put_contents(AUTH_FILE, $php, LOCK_EX) === false) {
    json_out(['error' => 'Zugang konnte nicht gespeichert werden – fehlen Schreibrechte im Ordner /api?'], 500);
  }
  session_regenerate_id(true);
  $_SESSION['admin_ok'] = true;
  json_out(['ok' => true, 'csrf' => csrf_token()]);
}

// ── Normaler Login ──
$c = creds();
if (!$c) json_out(['error' => 'setup-needed'], 409);

usleep(400000); // kleine Verzögerung gegen Brute-Force
if (!password_verify($pass, $c['hash'])) {
  json_out(['error' => 'Falsches Passwort.'], 401);
}
session_regenerate_id(true);
$_SESSION['admin_ok'] = true;
json_out(['ok' => true, 'csrf' => csrf_token()]);

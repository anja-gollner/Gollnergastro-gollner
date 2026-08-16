<?php
// Passwort ändern (eingeloggt).
require __DIR__ . '/_bootstrap.php';
require_auth();
require_csrf();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_out(['error' => 'method not allowed'], 405);

$body    = read_json_body();
$current = (string)($body['current'] ?? '');
$next    = (string)($body['next'] ?? '');

$c = creds();
if (!$c) json_out(['error' => 'Kein Zugang gesetzt.'], 409);
if (!password_verify($current, $c['hash'])) json_out(['error' => 'Aktuelles Passwort ist falsch.'], 401);
if (strlen($next) < 8) json_out(['error' => 'Das neue Passwort muss mindestens 8 Zeichen haben.'], 422);

$hash = password_hash($next, PASSWORD_DEFAULT);
$php  = "<?php\n// Automatisch erzeugt – NICHT von Hand bearbeiten.\nreturn "
      . var_export(['hash' => $hash, 'created' => date('c')], true) . ";\n";

if (@file_put_contents(AUTH_FILE, $php, LOCK_EX) === false) {
  json_out(['error' => 'Speichern fehlgeschlagen (Schreibrechte /api?).'], 500);
}
json_out(['ok' => true]);

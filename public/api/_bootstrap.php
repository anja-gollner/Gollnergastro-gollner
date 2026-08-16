<?php
// Gemeinsame Basis für alle API-Endpunkte des Schildbacherhof-CMS.
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
  session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax']);
  session_start();
}

header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

define('API_DIR',     __DIR__);
define('ROOT_DIR',    dirname(__DIR__));               // = Webroot (public/)
define('CONTENT_DIR', ROOT_DIR . '/content');
define('EVENTS_FILE', CONTENT_DIR . '/events.json');
define('AUTH_FILE',   API_DIR . '/auth.php');          // wird beim Setup erzeugt
define('PDF_DIR',     ROOT_DIR . '/pdf');
define('IMG_DIR',     ROOT_DIR . '/images');

function json_out($data, int $code = 200): void {
  http_response_code($code);
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function read_json_body(): array {
  $raw = file_get_contents('php://input');
  $d = json_decode($raw ?: '[]', true);
  return is_array($d) ? $d : [];
}

/** Zugangsdaten aus auth.php laden (oder null, wenn noch kein Setup). */
function creds(): ?array {
  if (!is_file(AUTH_FILE)) return null;
  $c = @include AUTH_FILE;
  return (is_array($c) && !empty($c['hash'])) ? $c : null;
}

function is_setup(): bool { return creds() !== null; }

function require_auth(): void {
  if (empty($_SESSION['admin_ok'])) json_out(['error' => 'unauthorized'], 401);
}

function csrf_token(): string {
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
  return $_SESSION['csrf'];
}

function require_csrf(): void {
  $sent = $_SERVER['HTTP_X_CSRF'] ?? '';
  if (!is_string($sent) || !hash_equals($_SESSION['csrf'] ?? '', $sent)) {
    json_out(['error' => 'bad csrf'], 403);
  }
}

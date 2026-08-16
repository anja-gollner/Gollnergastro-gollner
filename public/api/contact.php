<?php
// Kontaktformular → E-Mail an Gollner Gastro.
// Öffentlicher Endpunkt (kein Login). Schutz über Honeypot + Validierung.
declare(strict_types=1);

// ─────────────────────────────────────────────────────────────
//  EINSTELLUNGEN  (bei Bedarf hier anpassen)
// ─────────────────────────────────────────────────────────────
$TO        = 'office@gollner-gastro.at';   // Empfänger der Anfragen
$FROM      = 'office@gollner-gastro.at';   // Absender — MUSS ein real existierendes
                                            // Postfach eurer Domain sein, sonst stufen
                                            // viele Mailserver die Nachricht als Spam ein.
$FROM_NAME = 'Gollner Gastro Website';
// ─────────────────────────────────────────────────────────────

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function out($data, int $code = 200): void {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}
function clean(string $s): string {        // Header-Injection verhindern
  return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $s));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') out(['error' => 'method not allowed'], 405);

$raw  = file_get_contents('php://input');
$body = json_decode($raw ?: '{}', true);
if (!is_array($body)) out(['error' => 'ungültige Daten'], 422);

// Honeypot: echtes Feld muss leer sein → bei Befüllung „still" abbrechen.
if (!empty($body['website'])) out(['ok' => true]);

$name  = clean((string)($body['name'] ?? ''));
$email = clean((string)($body['email'] ?? ''));

if ($name === '' || $email === '') out(['error' => 'Bitte Name und E-Mail angeben.'], 422);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) out(['error' => 'Bitte eine gültige E-Mail angeben.'], 422);

$anliegen = clean((string)($body['anliegen'] ?? 'Anfrage')) ?: 'Anfrage';
$phone    = clean((string)($body['phone'] ?? ''));
$datum    = clean((string)($body['datum'] ?? ''));
$bis      = clean((string)($body['bis'] ?? ''));
$personen = clean((string)($body['personen'] ?? ''));
$ort      = clean((string)($body['ort'] ?? ''));
$message  = trim((string)($body['message'] ?? ''));
if (mb_strlen($message) > 5000) $message = mb_substr($message, 0, 5000) . ' …';

// ── E-Mail-Text zusammenbauen ──
$L = [];
$L[] = "Neue Anfrage über gollner-gastro.at";
$L[] = str_repeat('─', 32);
$L[] = "Anliegen:  $anliegen";
$L[] = "Name:      $name";
$L[] = "E-Mail:    $email";
if ($phone)    $L[] = "Telefon:   $phone";
if ($datum)    $L[] = "Termin:    $datum";
if ($bis)      $L[] = "bis:       $bis";
if ($personen) $L[] = "Personen:  $personen";
if ($ort)      $L[] = "Ort:       $ort";
$L[] = "";
$L[] = "Nachricht:";
$L[] = $message !== '' ? $message : '(keine)';
$L[] = "";
$L[] = str_repeat('─', 32);
$L[] = "Gesendet: " . date('d.m.Y H:i');
$bodyText = implode("\n", $L);

// ── Betreff (UTF-8-sicher) ──
$subjectRaw = "Website-Anfrage: $anliegen – $name";
$subject = function_exists('mb_encode_mimeheader')
  ? mb_encode_mimeheader($subjectRaw, 'UTF-8')
  : $subjectRaw;

// ── Header ──
$fromName = function_exists('mb_encode_mimeheader') ? mb_encode_mimeheader($FROM_NAME, 'UTF-8') : $FROM_NAME;
$replyName = function_exists('mb_encode_mimeheader') ? mb_encode_mimeheader($name, 'UTF-8') : $name;
$headers   = [
  "From: $fromName <$FROM>",
  "Reply-To: $replyName <$email>",
  "Content-Type: text/plain; charset=UTF-8",
  "Content-Transfer-Encoding: 8bit",
  "MIME-Version: 1.0",
  "X-Mailer: GollnerGastro-Web",
];

// envelope sender (hilft gegen Spam-Einstufung), nur wenn erlaubt
$params = "-f$FROM";
$ok = @mail($TO, $subject, $bodyText, implode("\r\n", $headers), $params);
if (!$ok) $ok = @mail($TO, $subject, $bodyText, implode("\r\n", $headers)); // Fallback ohne -f

if (!$ok) out(['error' => 'Die Nachricht konnte nicht gesendet werden. Bitte direkt an office@gollner-gastro.at.'], 500);

out(['ok' => true]);

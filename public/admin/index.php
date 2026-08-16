<?php
// Gollner Gastro CMS – Admin-Oberfläche.
// Reine HTML-Hülle; die Logik läuft in app.js und spricht /api/* an.
header('Cache-Control: no-store');
?>
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow" />
  <title>CMS · Gollner Gastro</title>
  <!-- Schriften lokal, wie auf der Website auch — keine Verbindung zu Google -->
  <link rel="stylesheet" href="/fonts/fonts.css" />
  <link rel="stylesheet" href="admin.css" />
</head>
<body>
  <div id="app" class="loading">Lädt …</div>
  <div id="toast" class="toast" hidden></div>
  <script src="app.js" defer></script>
</body>
</html>

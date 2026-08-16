<?php
// Liefert den aktuellen Anmeldestatus + CSRF-Token.
require __DIR__ . '/_bootstrap.php';

json_out([
  'authenticated' => !empty($_SESSION['admin_ok']),
  'setupNeeded'   => !is_setup(),
  'csrf'          => csrf_token(),
]);

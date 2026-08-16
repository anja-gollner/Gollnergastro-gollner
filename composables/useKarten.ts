// Holt Änderungsdatum und Seitenbilder der Karten-PDFs (api/menus.php).
// Gleiche Lösung wie beim Schildbacherhof: der Zeitstempel landet als ?v= in
// der URL, sonst zeigt der Browser nach einem Upload noch die alte Karte.
// Die Seitenbilder braucht es fürs Handy — ein A4-PDF in ~340 px Rahmen ist
// unlesbar, iOS zeigt dort ohnehin nur die erste Seite.
export function useKarten() {
  const stand = useState<Record<string, any>>('karten', () => ({}))

  async function laden() {
    try {
      const d: any = await $fetch('/api/menus.php', { cache: 'no-cache' })
      if (d && typeof d === 'object' && !Array.isArray(d)) stand.value = d
    } catch (e) {
      // Kein PHP (Dev-Server): dann ohne Zeitstempel und ohne Seitenbilder
    }
  }

  function karte(schluessel: string, label: string) {
    const s = stand.value[schluessel]
    const basis = `/pdf/${schluessel}.pdf`
    return {
      label,
      src: s?.v ? `${basis}?v=${s.v}` : basis,
      seiten: Array.isArray(s?.seiten) ? s.seiten : [],
      stand: s?.updated
        ? new Date(s.updated).toLocaleDateString('de-AT', { day: '2-digit', month: 'long', year: 'numeric' })
        : null
    }
  }

  return { stand, laden, karte }
}

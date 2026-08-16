<script setup>
useSeo({
  title: 'AGB — Gollner Gastro GmbH',
  description: 'Allgemeine Geschäftsbedingungen der Gollner Gastro GmbH: Geltungsbereich, Vertragsabschluss, Preise, Stornobedingungen, Haftung und Gerichtsstand.'
})

// Inhalte aus den bestehenden AGB übernommen. Die Stornofristen sind der
// Punkt, den Kundinnen und Kunden am häufigsten suchen — deshalb steht
// er nicht im Fließtext versteckt, sondern zusätzlich als klare Übersicht.
const punkte = [
  { titel: 'Geltungsbereich',
    text: 'Diese Bedingungen gelten für alle Leistungen der Gollner Gastro GmbH gegenüber ihren Kundinnen und Kunden. Abweichende Vereinbarungen bedürfen der schriftlichen Bestätigung.' },
  { titel: 'Vertragsabschluss',
    text: 'Angebote des Auftragnehmers sind freibleibend. Ein Vertrag kommt durch schriftliche Bestätigung des Auftragnehmers oder durch die Erbringung der Leistung zustande.' },
  { titel: 'Leistungen & Preise',
    text: 'Der Leistungsumfang richtet sich nach dem jeweiligen Angebot. Alle Preise verstehen sich in Euro inklusive der gesetzlichen Mehrwertsteuer.' },
  { titel: 'Stornierung & Rücktritt',
    text: 'Bei Stornierung fallen 30 % des Auftragswertes an. Bei Stornierung weniger als 48 Stunden vor dem Termin beträgt die Stornogebühr 100 %.' },
  { titel: 'Haftung',
    text: 'Die Haftung des Auftragnehmers ist auf Vorsatz und grobe Fahrlässigkeit beschränkt.' },
  { titel: 'Gerichtsstand & anwendbares Recht',
    text: 'Es gilt österreichisches Recht. Erfüllungsort und Gerichtsstand ist Graz.' }
]
</script>

<template>
  <div>
    <PageHeader
      eyebrow="AGB"
      title="Allgemeine Geschäftsbedingungen"
      text="Gültig für alle Leistungen der Gollner Gastro GmbH."
    />

    <section class="bg-cream py-16 md:py-24">
      <div class="container-x max-w-2xl">
        <!-- Stornofristen vorweg: die meistgesuchte Angabe -->
        <div class="rounded-2xl bg-beige border border-ink/10 p-6 mb-12">
          <p class="eyebrow mb-3">Auf einen Blick</p>
          <dl class="space-y-2 text-[0.95rem]">
            <div class="flex gap-3">
              <dt class="text-muted w-40 shrink-0">Stornierung</dt>
              <dd class="m-0 text-ink">30 % des Auftragswertes</dd>
            </div>
            <div class="flex gap-3">
              <dt class="text-muted w-40 shrink-0">Weniger als 48 h vorher</dt>
              <dd class="m-0 text-forest font-medium">100 % des Auftragswertes</dd>
            </div>
            <div class="flex gap-3">
              <dt class="text-muted w-40 shrink-0">Preise</dt>
              <dd class="m-0 text-ink">in Euro, inkl. gesetzlicher MwSt.</dd>
            </div>
            <div class="flex gap-3">
              <dt class="text-muted w-40 shrink-0">Gerichtsstand</dt>
              <dd class="m-0 text-ink">Graz, österreichisches Recht</dd>
            </div>
          </dl>
        </div>

        <ol class="space-y-8">
          <li v-for="(p, i) in punkte" :key="p.titel" class="flex gap-5">
            <span class="font-display text-forest/50 text-lg pt-0.5 w-6 shrink-0 tabular-nums">{{ i + 1 }}</span>
            <div>
              <h2 class="font-display text-xl md:text-2xl leading-tight mb-2">{{ p.titel }}</h2>
              <p class="text-muted leading-relaxed">{{ p.text }}</p>
            </div>
          </li>
        </ol>

        <p class="mt-12 text-muted text-sm">
          Fragen zu einzelnen Punkten? Ruft uns an unter
          <a :href="'tel:' + BETRIEB.telefonRoh" class="text-forest">{{ BETRIEB.telefon }}</a>
          oder schreibt an
          <a :href="'mailto:' + BETRIEB.email" class="text-forest">{{ BETRIEB.email }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

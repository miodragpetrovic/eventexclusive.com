// app/pakete/page.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Currency = 'CHF' | 'EUR' | 'USD' | 'GBP';

type PlanId = 'free' | 'pro' | 'premium';

type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  highlight?: boolean;
  basePriceChf: number;
  features: string[];
  badge?: string;
};

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Essential',
    tagline: 'Ein Listing für 12 Monate – ideal zum Start.',
    basePriceChf: 0,
    badge: '1 Jahr kostenlos',
    features: [
      '1 Location-Eintrag',
      'Laufzeit 12 Monate',
      'Basis-Listing im Verzeichnis',
      'Eingangsprüfung durch EventPlaces',
      'Anfragen via Kontaktformular',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    tagline: 'Mehr Sichtbarkeit für aktive Event-Locations.',
    basePriceChf: 180,
    highlight: true,
    badge: 'Beliebteste Wahl',
    features: [
      'Bis zu 3 Location-Einträge',
      'Laufzeit 12 Monate',
      'Hervorgehobene Darstellung im Listing',
      'Priorisierte Platzierung in Suchergebnissen',
      'Statistiken zu Anfragen (monatlich)',
      'Direkte Kontaktanfragen per E-Mail',
    ],
  },
  {
    id: 'premium',
    name: 'Signature',
    tagline: 'Für Markenhotels & Signature Venues.',
    basePriceChf: 380,
    badge: 'Für anspruchsvolle Häuser',
    features: [
      'Bis zu 8 Location-Einträge',
      'Laufzeit 12 Monate',
      'Top-Platzierung & kuratierte Empfehlungen',
      'Individuelles Branding im Profil',
      'Detaillierte Reporting-Insights',
      'Priorisierter Account-Support',
    ],
  },
];

// Approximate static exchange rates relative to CHF
const EXCHANGE_RATES: Record<Currency, number> = {
  CHF: 1,
  EUR: 0.95,
  USD: 1.05,
  GBP: 0.83,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  CHF: 'CHF',
  EUR: '€',
  USD: '$',
  GBP: '£',
};

export default function PackagesPage() {
  const [currency, setCurrency] = useState<Currency>('CHF');

  const pricesByPlan = useMemo(() => {
    const rate = EXCHANGE_RATES[currency];
    const roundToFive = (value: number) =>
      Math.round(value / 5) * 5; // simple rounding for nicer numbers

    const entries: [PlanId, number][] = PLANS.map(plan => [
      plan.id,
      plan.basePriceChf === 0 ? 0 : roundToFive(plan.basePriceChf * rate),
    ]);

    return Object.fromEntries(entries) as Record<PlanId, number>;
  }, [currency]);

  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pb-20 md:pt-14">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
              Pakete für Location-Anbieter
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-50 md:text-3xl">
              Wähle das passende EventPlaces Paket
            </h1>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-neutral-400 md:text-[13px]">
              Alle Pakete laufen 12 Monate und richten sich an Restaurants &
              Event-Locations, die regelmäßig Marken, Agenturen und private
              Gäste beherbergen. Upgrade ist jederzeit möglich.
            </p>
          </div>

          {/* Currency switcher */}
          <div className="flex flex-col items-start gap-2 text-[11px] text-neutral-400 md:items-end">
            <span>Preise pro Jahr – exkl. MwSt.</span>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-[#101010] p-1 shadow-[0_12px_35px_rgba(0,0,0,0.85)]">
              {(['CHF', 'EUR', 'USD', 'GBP'] as Currency[]).map(cur => {
                const isActive = cur === currency;
                return (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => setCurrency(cur)}
                    className={[
                      'rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] transition',
                      isActive
                        ? 'bg-[#d1b371] text-[#151515]'
                        : 'text-neutral-300 hover:bg-neutral-900',
                    ].join(' ')}
                  >
                    {cur}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        {/* Plans grid */}
        <section className="grid gap-5 md:grid-cols-3">
          {PLANS.map(plan => {
            const price = pricesByPlan[plan.id];
            const isHighlight = plan.highlight;

            return (
              <article
                key={plan.id}
                className={[
                  'relative flex flex-col overflow-hidden rounded-3xl border bg-[#101010] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.9)] transition',
                  isHighlight
                    ? 'border-[#d1b371]/80 bg-gradient-to-b from-[#151515] via-[#101010] to-[#050505] scale-[1.01]'
                    : 'border-neutral-900 hover:border-[#d1b371]/50',
                ].join(' ')}
              >
                {/* Top accent line */}
                <div
                  className={[
                    'absolute inset-x-6 top-0 h-[2px] rounded-b-full',
                    isHighlight
                      ? 'bg-gradient-to-r from-transparent via-[#d1b371] to-transparent'
                      : 'bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent',
                  ].join(' ')}
                />

                {/* Badge row */}
                {(plan.badge || isHighlight) && (
                  <div className="mb-3 flex justify-between pt-1.5">
                    {plan.badge && (
                      <span className="inline-flex items-center rounded-full border border-[#d1b371]/60 bg-[#151515] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d1b371]">
                        {plan.badge}
                      </span>
                    )}
                    {isHighlight && (
                      <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                        Empfohlen
                      </span>
                    )}
                  </div>
                )}

                {/* Title + tagline */}
                <div className="mb-4">
                  <h2 className="text-sm font-semibold text-neutral-50">
                    {plan.name}
                  </h2>
                  <p className="mt-1 text-[12px] text-neutral-400">
                    {plan.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-4 flex items-baseline gap-1">
                  {price === 0 ? (
                    <>
                      <span className="text-2xl font-semibold text-neutral-50">
                        0
                      </span>
                      <span className="text-xs font-medium text-neutral-300">
                        {CURRENCY_SYMBOLS[currency]} / 12 Monate
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl font-semibold text-neutral-50">
                        {price.toLocaleString('de-CH')}
                      </span>
                      <span className="text-xs font-medium text-neutral-300">
                        {CURRENCY_SYMBOLS[currency]} / Jahr
                      </span>
                    </>
                  )}
                </div>

                {/* Billing info */}
                <p className="mb-4 text-[11px] text-neutral-500">
                  Laufzeit 12 Monate, keine automatische Verlängerung ohne
                  Rückbestätigung. Rechnungsstellung in{' '}
                  <span className="text-neutral-300">{currency}</span>.
                </p>

                {/* Features */}
                <ul className="mb-6 flex flex-1 flex-col gap-2 text-[12px] text-neutral-300">
                  {plan.features.map(item => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px]"
                    >
                      <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#d1b371]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-auto">
                  {plan.id === 'free' ? (
                    <Link
                      href="/registrieren"
                      className={[
                        'inline-flex w-full items-center justify-center rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition',
                        isHighlight
                          ? 'border-[#d1b371]/80 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] text-[#151515] shadow-[0_16px_40px_rgba(0,0,0,0.9)] hover:scale-[1.02] active:scale-[0.99]'
                          : 'border-neutral-700 bg-[#151515] text-neutral-100 hover:border-[#d1b371]/60 hover:bg-[#181818] hover:text-[#d1b371]',
                      ].join(' ')}
                    >
                      Kostenlos starten
                    </Link>
                  ) : (
                    <Link
                      href="/kontakt"
                      className={[
                        'inline-flex w-full items-center justify-center rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition',
                        isHighlight
                          ? 'border-[#d1b371]/80 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] text-[#151515] shadow-[0_16px_40px_rgba(0,0,0,0.9)] hover:scale-[1.02] active:scale-[0.99]'
                          : 'border-neutral-700 bg-[#151515] text-neutral-100 hover:border-[#d1b371]/60 hover:bg-[#181818] hover:text-[#d1b371]',
                      ].join(' ')}
                    >
                      Paket anfragen
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {/* Footnote */}
        <p className="mt-8 max-w-3xl text-[11px] text-neutral-500">
          Die hier dargestellten Preise dienen als Richtwert. Währungsumrechnung
          erfolgt auf Basis eines internen Fixkurses und kann von aktuellen
          Marktwerten abweichen. Für individuelle Konditionen (Multi-Property,
          Agenturen, Hotelgruppen) kontaktiere bitte direkt das EventPlaces
          Team.
        </p>
      </div>
    </main>
  );
}

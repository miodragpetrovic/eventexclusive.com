// app/kontakt/page.tsx
'use client';

import { useState } from 'react';

export default function KontaktPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add your API call (fetch/axios) to send the form
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pb-20 md:pt-14">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d1b371]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#d1b371]/5 blur-3xl" />
        </div>

        {/* Header */}
        <header className="relative mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
              Kontakt &amp; Beratung
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-50 md:text-3xl">
              Sprich mit dem EventPlaces Team
            </h1>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-neutral-400 md:text-[13px]">
              Ob neue Location, Paket-Anfrage oder kuratierte Venue-Vorschläge
              für ein konkretes Event – wir melden uns persönlich und
              unverbindlich zurück.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 text-[11px] text-neutral-400 md:items-end">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full border border-neutral-800 bg-[#121212] px-3 py-1">
                Antwort in der Regel innerhalb von{' '}
                <span className="ml-1 font-medium text-neutral-100">
                  24 Stunden
                </span>
              </span>
              <span className="inline-flex items-center rounded-full border border-neutral-800 bg-[#121212] px-3 py-1">
                Sprachen:{' '}
                <span className="ml-1 font-medium text-neutral-100">
                  DE • EN • FR • IT
                </span>
              </span>
            </div>
          </div>
        </header>

        {/* Layout: info column + form card */}
        <div className="relative grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
          {/* Info column */}
          <section className="space-y-4">
            <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.9)]">
              <h2 className="text-sm font-semibold text-neutral-50">
                Direktkontakt
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-neutral-400">
                Für dringende Anfragen zu Event-Daten oder kurzfristigen
                Projekten erreichst du uns bevorzugt per E-Mail. Bitte füge
                grobe Eckdaten (Ort, Datum, Gästezahl) direkt hinzu.
              </p>

              <div className="mt-4 space-y-2 text-[12px] text-neutral-200">
                <p>
                  E-Mail:{' '}
                  <a
                    href="mailto:hello@eventplaces.com"
                    className="text-[#d1b371] underline-offset-2 hover:underline"
                  >
                    hello@eventplaces.com
                  </a>
                </p>
                <p>
                  Telefon (Schweiz):{' '}
                  <span className="text-neutral-100">+41 (0) XX XXX XX XX</span>
                </p>
              </div>

              <div className="mt-4 grid gap-2 text-[11px] text-neutral-400">
                <p className="font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Typische Anfragen
                </p>
                <ul className="space-y-1 text-[12px]">
                  <li>• Location-Vorschläge für Brand-Events &amp; Dinners</li>
                  <li>• Interesse an einem EventPlaces Paket</li>
                  <li>• Aufnahme einer neuen Location ins Portal</li>
                  <li>• Fragen zu bestehenden Einträgen &amp; Profilen</li>
                </ul>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 text-[12px] text-neutral-300">
              <h3 className="text-sm font-semibold text-neutral-50">
                Offices &amp; Märkte
              </h3>
              <div className="mt-3 grid gap-3 text-[12px] md:grid-cols-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Schweiz / D-A-CH
                  </p>
                  <p className="mt-1 text-neutral-300">
                    Zürich • Remote / Hybrid
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    Fokus: D-A-CH, Italien, Frankreich
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    International
                  </p>
                  <p className="mt-1 text-neutral-300">
                    Partner in London, Dubai &amp; Barcelona
                  </p>
                  <p className="mt-1 text-[11px] text-neutral-500">
                    Fokus: Key City Venues &amp; Signature Restaurants
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Form card */}
          <section className="rounded-3xl border border-neutral-900 bg-[#101010]/95 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.95)] md:p-6">
            {/* Top accent line */}
            <div className="mb-4 h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-[#d1b371] to-transparent" />

            <div className="mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d1b371]">
                Anfrage senden
              </p>
              <p className="mt-1 text-[12px] text-neutral-400">
                Teile uns kurz mit, worum es geht. Je konkreter deine Angaben,
                desto gezielter können wir passende Locations oder Pakete
                vorschlagen.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <FormField
                  label="Firma / Marke"
                  id="company"
                  placeholder="Hotel / Restaurant / Brand / Agentur"
                />
                <FormField
                  label="Name"
                  id="name"
                  placeholder="Vor- und Nachname"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <FormField
                  label="E-Mail"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                />
                <FormField
                  label="Telefon (optional)"
                  id="phone"
                  placeholder="+41 ..."
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <FormSelect
                  label="Anliegen"
                  id="topic"
                  options={[
                    'Allgemeine Anfrage',
                    'Paket &amp; Konditionen',
                    'Neue Location listen',
                    'Locations für konkretes Event',
                    'Kooperation / Partnerschaft',
                  ]}
                />
                <FormField
                  label="Land / Stadt"
                  id="region"
                  placeholder="z.B. Schweiz, Zürich"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <FormField
                  label="Datum oder Zeitraum (optional)"
                  id="date"
                  placeholder="z.B. Q4 2025, 12.09.2025"
                />
                <FormField
                  label="Gästezahl (optional)"
                  id="guests"
                  placeholder="z.B. 40–80 Gäste"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300"
                >
                  Kurzbeschreibung
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Kurzbeschreibung deines Anliegens: Art des Events, gewünschtes Setting, Timing, besondere Anforderungen..."
                  className="w-full rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-2 text-[13px] text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-[#d1b371]/80 focus:bg-[#171717] focus:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]"
                />
              </div>

              {submitted && (
                <p className="text-[11px] text-[#d1b371]">
                  Vielen Dank für deine Nachricht. Wir melden uns in der Regel
                  innerhalb von 24 Stunden mit einem persönlichen Feedback.
                </p>
              )}

              <div className="mt-4 flex flex-col gap-3 text-[11px] text-neutral-400 md:flex-row md:items-center md:justify-between">
                <p>
                  Mit dem Absenden bestätigst du, dass wir dich per E-Mail
                  und – falls angegeben – telefonisch kontaktieren dürfen.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full border border-[#d1b371]/80 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1b1b1b] shadow-[0_12px_35px_rgba(0,0,0,0.9)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  Nachricht senden
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

/* Helper components */

type FormFieldProps = {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
};

function FormField({
  label,
  id,
  type = 'text',
  placeholder,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-2 text-[13px] text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-[#d1b371]/80 focus:bg-[#171717] focus:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]"
      />
    </div>
  );
}

type FormSelectProps = {
  label: string;
  id: string;
  options: string[];
};

function FormSelect({ label, id, options }: FormSelectProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          className="w-full appearance-none rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-2 pr-8 text-[13px] text-neutral-100 outline-none transition focus:border-[#d1b371]/80 focus:bg-[#171717] focus:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]"
        >
          {options.map(option => (
            <option key={option} value={option} className="bg-[#151515]">
              {option}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-neutral-500">
          ▼
        </span>
      </div>
    </div>
  );
}

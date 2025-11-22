// app/registrieren/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10">
        {/* Pozadinski suptilni glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d1b371]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#d1b371]/5 blur-3xl" />
        </div>

        {/* Card */}
        <div className="relative w-full max-w-md rounded-3xl border border-neutral-800/90 bg-[#121212]/95 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.9)] backdrop-blur">
          {/* Gornja zlatna linija */}
          <div className="absolute inset-x-6 top-0 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-[#d1b371] to-transparent" />

          {/* Header */}
          <div className="mb-6 pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
              Registrierung
            </p>
            <h1 className="mt-1 text-lg font-medium text-neutral-50">
              Erstelle deinen EventPlaces Account
            </h1>
            <p className="mt-2 text-[12px] leading-relaxed text-neutral-400">
              Verwalte deine Locations, Anfragen und Inserate in einer
              professionellen Oberfläche – global, kuratiert und premium.
            </p>
          </div>

          {/* Forma */}
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField
                label="Vorname"
                id="firstName"
                autoComplete="given-name"
                placeholder="Max"
              />
              <FormField
                label="Nachname"
                id="lastName"
                autoComplete="family-name"
                placeholder="Mustermann"
              />
            </div>

            <FormField
              label="Unternehmen / Marke"
              id="company"
              autoComplete="organization"
              placeholder="EventPlaces GmbH"
            />

            <FormField
              label="E-Mail"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField
                label="Land"
                id="country"
                placeholder="Schweiz, Deutschland, ..."
              />
              <FormField
                label="Telefon (optional)"
                id="phone"
                autoComplete="tel"
                placeholder="+41 ..."
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <PasswordField
                label="Passwort"
                id="password"
                show={showPassword}
                onToggle={() => setShowPassword(prev => !prev)}
              />
              <PasswordField
                label="Passwort wiederholen"
                id="passwordRepeat"
                show={showPasswordRepeat}
                onToggle={() => setShowPasswordRepeat(prev => !prev)}
              />
            </div>

            {/* Terms */}
            <div className="mt-2 space-y-2 text-[11px] text-neutral-400">
              <p>
                Mit der Registrierung akzeptierst du unsere{' '}
                <Link
                  href="/agb"
                  className="text-[#d1b371] underline-offset-2 hover:underline"
                >
                  AGB
                </Link>{' '}
                und{' '}
                <Link
                  href="/datenschutz"
                  className="text-[#d1b371] underline-offset-2 hover:underline"
                >
                  Datenschutzbestimmungen
                </Link>
                .
              </p>
            </div>

            {/* Submit */}
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#d1b371]/70 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#1b1b1b] shadow-[0_18px_45px_rgba(0,0,0,0.9)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Konto erstellen
              </button>

              <p className="text-center text-[11px] text-neutral-400">
                Bereits ein Account?{' '}
                <Link
                  href="/login"
                  className="text-[#d1b371] underline-offset-2 hover:underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Mali hint dolje */}
        <p className="mt-6 text-center text-[11px] text-neutral-500">
          EventPlaces • Premium Locations &amp; Venues Worldwide
        </p>
      </div>
    </main>
  );
}

// Pomoćne komponente

type FormFieldProps = {
  label: string;
  id: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
};

function FormField({
  label,
  id,
  type = 'text',
  autoComplete,
  placeholder,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-300"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-800 bg-[#141414] px-3 py-2 text-[13px] text-neutral-100 outline-none ring-0 transition placeholder:text-neutral-500 focus:border-[#d1b371]/80 focus:bg-[#171717] focus:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]"
      />
    </div>
  );
}

type PasswordFieldProps = {
  label: string;
  id: string;
  show: boolean;
  onToggle: () => void;
};

function PasswordField({ label, id, show, onToggle }: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-300"
      >
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-neutral-800 bg-[#141414] pr-1 text-[13px] transition focus-within:border-[#d1b371]/80 focus-within:bg-[#171717] focus-within:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]">
        <input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          className="w-full rounded-xl bg-transparent px-3 py-2 text-[13px] text-neutral-100 outline-none"
        />
        <button
          type="button"
          onClick={onToggle}
          className="px-2 text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400 hover:text-[#d1b371]"
        >
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}

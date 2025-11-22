// app/login/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-4 py-10">
        {/* suptilni glow u pozadini */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d1b371]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#d1b371]/5 blur-3xl" />
        </div>

        {/* CARD */}
        <div className="relative w-full max-w-md rounded-3xl border border-neutral-800/90 bg-[#121212]/95 p-6 shadow-[0_28px_80px_rgba(0,0,0,0.9)] backdrop-blur">
          {/* gornja zlatna linija */}
          <div className="absolute inset-x-6 top-0 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-[#d1b371] to-transparent" />

          {/* HEADER */}
          <div className="mb-6 pt-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
              Login
            </p>
            <h1 className="mt-1 text-lg font-medium text-neutral-50">
              Willkommen zurück bei EventPlaces
            </h1>
            <p className="mt-2 text-[12px] leading-relaxed text-neutral-400">
              Melde dich an, um deine Locations, Buchungen und Inserate zu
              verwalten – alles an einem Ort, global und kuratiert.
            </p>
          </div>

          {/* FORMA */}
          <form className="space-y-4">
            <FormField
              label="E-Mail"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />

            <PasswordField
              label="Passwort"
              id="password"
              show={showPassword}
              onToggle={() => setShowPassword(prev => !prev)}
            />

            {/* remember + forgot */}
            <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-400">
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border border-neutral-700 bg-transparent text-[#d1b371] focus:ring-0"
                />
                <span className="select-none">
                  Eingeloggt bleiben
                </span>
              </label>
              <Link
                href="/passwort-vergessen"
                className="text-[#d1b371] underline-offset-2 hover:underline"
              >
                Passwort vergessen?
              </Link>
            </div>

            {/* SUBMIT */}
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#d1b371]/70 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#1b1b1b] shadow-[0_18px_45px_rgba(0,0,0,0.9)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                Login
              </button>

              <p className="text-center text-[11px] text-neutral-400">
                Noch kein Account?{' '}
                <Link
                  href="/register"
                  className="text-[#d1b371] underline-offset-2 hover:underline"
                >
                  Jetzt registrieren
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* mali hint dolje */}
        <p className="mt-6 text-center text-[11px] text-neutral-500">
          EventPlaces • Premium Locations &amp; Venues Worldwide
        </p>
      </div>
    </main>
  );
}

/* POMOĆNE KOMPONENTE – iste logike kao na register stranici */

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
        className="block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300"
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
        className="block whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300"
      >
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-neutral-800 bg-[#141414] pr-1 text-[13px] transition focus-within:border-[#d1b371]/80 focus-within:bg-[#171717] focus-within:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]">
        <input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          autoComplete="current-password"
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

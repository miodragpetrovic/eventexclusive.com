// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Plus, Languages, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/blog', label: 'Blog' },
  { href: '/kontakt', label: 'Kontakt' },
];

const LANGUAGES = [
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'it', label: 'Italiano', short: 'IT' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const supportedCodes = LANGUAGES.map(l => l.code);

    if (segments.length === 0) {
      startTransition(() => router.push(`/${langCode}`));
      return;
    }

    const possibleLang = segments[0];

    if (supportedCodes.includes(possibleLang)) {
      segments[0] = langCode;
    } else {
      segments.unshift(langCode);
    }

    const newPath = '/' + segments.join('/');
    startTransition(() => router.push(newPath));
  };

  const currentLang = (() => {
    const segments = pathname.split('/').filter(Boolean);
    const supportedCodes = LANGUAGES.map(l => l.code);
    if (segments.length > 0 && supportedCodes.includes(segments[0])) {
      return segments[0];
    }
    return 'de';
  })();

  const closeAllOverlays = () => {
    setIsLangModalOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-[#121212]/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
          {/* LOGO – ekskluzivni monogram */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#252525] to-black shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
              <div className="absolute inset-[1px] rounded-2xl border border-white/5" />
              <div className="absolute inset-[6px] rounded-[0.9rem] border border-[#d1b371]/40" />
              <span className="text-[11px] font-semibold tracking-[0.32em] text-[#d1b371] uppercase">
                EP
              </span>
            </div>
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-semibold tracking-[0.14em] text-neutral-50 uppercase">
                EventPlaces
              </span>
              <span className="text-[11px] text-neutral-400">
                Curated Global Venues
              </span>
            </div>
          </Link>

          {/* CENTRALNI MENU – desktop */}
          <div className="hidden items-center gap-9 text-[13px] font-medium tracking-[0.22em] uppercase text-neutral-300 md:flex">
            {NAV_ITEMS.map(item => {
              const isActive =
                item.href === '/'
                  ? pathname === '/' || pathname === ''
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'relative pb-1 transition-all',
                    'hover:text-[#d1b371]',
                    isActive ? 'text-[#d1b371]' : 'text-neutral-300',
                  ].join(' ')}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-[2px] mx-auto h-[1.5px] origin-center rounded-full bg-[#d1b371]/70" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* DESNO – desktop + mobilni trigger */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Language trigger (desktop) */}
            <button
              type="button"
              onClick={() => setIsLangModalOpen(true)}
              className="hidden items-center gap-1.5 rounded-full border border-neutral-700/80 bg-black/40 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-200 shadow-[0_8px_20px_rgba(0,0,0,0.55)] transition hover:border-neutral-500 hover:bg-black/70 md:inline-flex"
            >
              <Languages className="h-3.5 w-3.5" />
              <span>{currentLang.toUpperCase()}</span>
            </button>

            {/* Login / Registrieren – desktop */}
            <div className="hidden items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300 sm:flex md:flex">
              <Link
                href="/login"
                className="transition hover:text-[#d1b371]"
              >
                Login
              </Link>
              <span className="h-4 w-px bg-neutral-700" />
              <Link
                href="/register"
                className="transition hover:text-[#d1b371]"
              >
                Registrieren
              </Link>
            </div>

            {/* Inserieren – premium dugme sa plus ikonom (desktop) */}
            <Link
              href="/inserieren"
              className="hidden items-center gap-1.5 rounded-full border border-[#d1b371]/60 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#1b1b1b] shadow-[0_14px_35px_rgba(0,0,0,0.65)] transition-transform hover:scale-[1.02] active:scale-[0.99] md:inline-flex"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1f1f1f]">
                <Plus className="h-3 w-3 text-[#d1b371]" />
              </span>
              <span>Inserieren</span>
            </Link>

            {/* Hamburger – samo mobilni */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-black/40 p-2 text-neutral-200 shadow-[0_8px_20px_rgba(0,0,0,0.65)] transition hover:border-neutral-500 hover:bg-black/70 md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg md:hidden">
          <div className="flex h-full flex-col">
            {/* Top bar u overlay-u */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <Link href="/" onClick={closeAllOverlays} className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#252525] to-black shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
                  <div className="absolute inset-[1px] rounded-2xl border border-white/5" />
                  <div className="absolute inset-[6px] rounded-[0.9rem] border border-[#d1b371]/40" />
                  <span className="text-[10px] font-semibold tracking-[0.32em] text-[#d1b371] uppercase">
                    EP
                  </span>
                </div>
                <span className="text-xs font-semibold tracking-[0.16em] text-neutral-50 uppercase">
                  EventPlaces
                </span>
              </Link>

              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-black/40 p-2 text-neutral-200 transition hover:border-neutral-500 hover:bg-black/70"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Sadržaj menija */}
            <div className="mt-2 flex-1 space-y-6 px-6 pb-8 pt-4">
              {/* Navigacija */}
              <nav className="space-y-4">
                {NAV_ITEMS.map(item => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/' || pathname === ''
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAllOverlays}
                      className={[
                        'block text-sm font-medium tracking-[0.20em] uppercase',
                        isActive ? 'text-[#d1b371]' : 'text-neutral-200',
                      ].join(' ')}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Separator */}
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-700/70 to-transparent" />

              {/* Auth + Inserieren */}
              <div className="space-y-3">
                <div className="flex flex-col gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-300">
                  <Link
                    href="/login"
                    onClick={closeAllOverlays}
                    className="w-fit transition hover:text-[#d1b371]"
                  >
                    Login
                  </Link>
                  <Link
                    href="/registrieren"
                    onClick={closeAllOverlays}
                    className="w-fit transition hover:text-[#d1b371]"
                  >
                    Registrieren
                  </Link>
                </div>

                <Link
                  href="/inserieren"
                  onClick={closeAllOverlays}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#d1b371]/60 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#1b1b1b] shadow-[0_14px_35px_rgba(0,0,0,0.65)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1f1f1f]">
                    <Plus className="h-3 w-3 text-[#d1b371]" />
                  </span>
                  <span>Inserieren</span>
                </Link>
              </div>

              {/* Language switcher unutar mobilnog menija */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
                  Sprache
                </p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(lang => {
                    const isActive = lang.code === currentLang;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        disabled={isPending && isActive}
                        onClick={() => {
                          handleLanguageChange(lang.code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={[
                          'flex items-center justify-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]',
                          isActive
                            ? 'border-[#d1b371] bg-[#d1b371]/15 text-[#d1b371]'
                            : 'border-neutral-700 text-neutral-200 hover:border-[#d1b371]/60 hover:text-[#d1b371]',
                        ].join(' ')}
                      >
                        {lang.short}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGE MODAL – i dalje postoji za desktop / širi ekran */}
      {isLangModalOpen && (
        <div
          className="fixed inset-0 z-50 hidden items-center justify-center bg-black/70 backdrop-blur-md md:flex"
          aria-modal="true"
          role="dialog"
        >
          <div className="relative w-full max-w-md rounded-3xl border border-neutral-800/90 bg-[#121212] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.85)]">
            <div className="absolute inset-x-5 top-0 h-[2px] rounded-b-full bg-gradient-to-r from-transparent via-[#d1b371] to-transparent" />

            <div className="mb-5 flex items-start justify-between gap-3 pt-1.5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
                  Language
                </p>
                <h2 className="mt-1 text-sm font-medium text-neutral-50">
                  Interface & content language
                </h2>
                <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-400">
                  Wähle deine bevorzugte Sprache für die Darstellung von
                  Locations, Preisen und Inhalten im Portal.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsLangModalOpen(false)}
                className="text-[11px] uppercase tracking-[0.22em] text-neutral-400 transition hover:text-neutral-100"
              >
                Close
              </button>
            </div>

            <div className="space-y-2.5">
              {LANGUAGES.map(lang => {
                const isActive = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    disabled={isPending && isActive}
                    onClick={() => {
                      setIsLangModalOpen(false);
                      handleLanguageChange(lang.code);
                    }}
                    className={[
                      'group flex w-full items-center justify-between rounded-2xl border px-3.5 py-2.5 text-left transition',
                      isActive
                        ? 'border-[#d1b371]/90 bg-[#1a1a1a]'
                        : 'border-neutral-800 bg-[#151515] hover:border-neutral-600 hover:bg-[#181818]',
                    ].join(' ')}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={[
                          'flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-semibold tracking-[0.18em]',
                          isActive
                            ? 'border-[#d1b371] bg-[#d1b371]/15 text-[#d1b371]'
                            : 'border-neutral-600 text-neutral-400 group-hover:border-[#d1b371]/60 group-hover:text-[#d1b371]',
                        ].join(' ')}
                      >
                        {lang.short}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-neutral-50">
                          {lang.label}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          Portal & Emails
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <span className="rounded-full bg-[#d1b371]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#d1b371]">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-3">
              <p className="text-[11px] text-neutral-500">
                Du kannst die Sprache jederzeit im Header anpassen.
              </p>
              <button
                type="button"
                onClick={() => setIsLangModalOpen(false)}
                className="rounded-full border border-neutral-700 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-200 transition hover:border-neutral-500 hover:bg-[#181818]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

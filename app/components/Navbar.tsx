// app/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/blog', label: 'Blog' },
  { href: '/kontakt', label: 'Kontakt' },
];

const LANGUAGES = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (langCode: string) => {
    // Pretpostavka: /de/... /en/... itd.
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      // na početnoj, npr. "/"
      startTransition(() => router.push(`/${langCode}`));
      return;
    }

    // ako prvi segment već izgleda kao jezik, zameni ga
    const possibleLang = segments[0];
    const supportedCodes = LANGUAGES.map(l => l.code);

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

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-800 bg-[#212121]/90 backdrop-blur supports-[backdrop-filter]:bg-[#212121]/70">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20 md:px-6">
        {/* Logo levo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-sm font-semibold tracking-[0.2em] uppercase text-[#d1b371]">
            EP
          </div>
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-medium text-neutral-100">
              EventPlaces
            </span>
            <span className="text-[11px] text-neutral-400">
              Premium Locations
            </span>
          </div>
        </div>

        {/* Menu u sredini */}
        <div className="hidden gap-8 text-sm font-medium tracking-wide uppercase text-neutral-300 md:flex">
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
                  'relative transition-colors hover:text-[#d1b371]',
                  isActive ? 'text-[#d1b371]' : 'text-neutral-300',
                ].join(' ')}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#d1b371]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desno: jezik + auth + inserieren */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language switcher */}
          <div className="flex items-center rounded-full border border-neutral-700 bg-neutral-900/70 px-2 py-1 text-xs uppercase text-neutral-200">
            {LANGUAGES.map(lang => {
              const isActive = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  className={[
                    'rounded-full px-2 py-0.5 transition',
                    isActive
                      ? 'bg-[#d1b371] text-[#212121] shadow-sm'
                      : 'hover:bg-neutral-800',
                  ].join(' ')}
                  disabled={isPending && isActive}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          {/* Login / Registrieren */}
          <div className="hidden items-center gap-3 text-xs font-medium uppercase text-neutral-300 sm:flex">
            <Link
              href="/login"
              className="transition hover:text-[#d1b371]"
            >
              Login
            </Link>
            <span className="h-4 w-px bg-neutral-700" />
            <Link
              href="/registrieren"
              className="transition hover:text-[#d1b371]"
            >
              Registrieren
            </Link>
          </div>

          {/* Inserieren dugme */}
          <Link
            href="/inserieren"
            className="rounded-full border border-[#d1b371]/40 bg-[#d1b371] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#212121] shadow-sm transition hover:border-[#d1b371] hover:bg-[#e3c995] active:scale-[0.98]"
          >
            Inserieren
          </Link>
        </div>
      </nav>
    </header>
  );
}

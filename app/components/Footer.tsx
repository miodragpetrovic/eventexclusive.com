'use client';

import Link from 'next/link';
import { Instagram, Linkedin, Globe2, Mail } from 'lucide-react';
import type { ReactNode } from 'react';

type FooterLink = {
  label: string;
  href: string;
};

const FOOTER_NAV: {
  discover: readonly FooterLink[];
  providers: readonly FooterLink[];
  company: readonly FooterLink[];
  legal: readonly FooterLink[];
} = {
  discover: [
    { label: 'Home', href: '/' },
    { label: 'Locations entdecken', href: '/locations' },
    { label: 'Inspiration & Stories', href: '/blog' },
  ],
  providers: [
    { label: 'Für Location-Besitzer', href: '/inserieren' },
    { label: 'Für Agenturen', href: '/fuer-agenturen' },
    { label: 'Preise & Pakete', href: '/pakete' }, // path sam uskladio s tvojom pakete stranicom
  ],
  company: [
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Kontakt', href: '/kontakt' },
    { label: 'Presse', href: '/presse' },
  ],
  legal: [
    { label: 'AGB', href: '/agb' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Impressum', href: '/impressum' },
  ],
};

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-[#050505] text-neutral-300">
      <div className="mx-auto max-w-6xl px-4 pt-4 md:px-6">
        {/* Gold accent line */}
        <div className="h-[1px] w-full rounded-full bg-gradient-to-r from-transparent via-[#d1b371]/70 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-8 pt-8 md:px-6 md:pb-10 md:pt-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand block */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              {/* Monogram logo */}
              <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#252525] to-black shadow-[0_14px_35px_rgba(0,0,0,0.7)]">
                <div className="absolute inset-[1px] rounded-2xl border border-white/5" />
                <div className="absolute inset-[5px] rounded-[0.85rem] border border-[#d1b371]/40" />
                <span className="text-[10px] font-semibold tracking-[0.32em] text-[#d1b371] uppercase">
                  EP
                </span>
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-[0.14em] text-neutral-50 uppercase">
                  EventPlaces
                </span>
                <span className="text-[11px] text-neutral-400">
                  Premium Locations &amp; Venues Worldwide
                </span>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-relaxed text-neutral-400">
              EventPlaces kuratiert herausragende Event-Locations weltweit – von
              ikonischen Stadträumen bis zu versteckten Boutique-Venues. Für
              Marken, die mehr als nur einen Raum suchen.
            </p>

            {/* Social + contact icons */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <SocialIcon href="https://instagram.com" label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="/kontakt" label="Kontakt">
                <Mail className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="/locations" label="Global locations">
                <Globe2 className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid flex-1 grid-cols-2 gap-6 text-[12px] md:grid-cols-4">
            <FooterColumn title="Entdecken" links={FOOTER_NAV.discover} />
            <FooterColumn title="Für Anbieter" links={FOOTER_NAV.providers} />
            <FooterColumn title="Unternehmen" links={FOOTER_NAV.company} />
            <FooterColumn title="Rechtliches" links={FOOTER_NAV.legal} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-neutral-900 pt-4 text-[11px] text-neutral-500 md:flex-row md:items-center">
          <p>© {currentYear} EventPlaces. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
              Crafted for premium hospitality &amp; events.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: readonly FooterLink[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-[12px] text-neutral-300 transition hover:text-[#d1b371]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type SocialIconProps = {
  href: string;
  label: string;
  children: ReactNode;
};

function SocialIcon({ href, label, children }: SocialIconProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 bg-black/40 text-neutral-300 shadow-[0_10px_30px_rgba(0,0,0,0.7)] transition hover:border-[#d1b371]/80 hover:text-[#d1b371]"
    >
      {children}
    </Link>
  );
}

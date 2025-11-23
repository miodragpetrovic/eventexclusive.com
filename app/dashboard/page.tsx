// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import {
  BarChart2,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Plus,
  User,
  X,
} from 'lucide-react';

type TabKey = 'overview' | 'listings' | 'inquiries' | 'profile';

type UserListing = {
  id: string;
  name: string;
  city: string;
  country: string;
  status: 'online' | 'offline' | 'pending';
  viewsThisMonth: number;
  inquiriesThisMonth: number;
};

type Inquiry = {
  id: string;
  date: string;
  requester: string;
  type: string;
  guests: string;
  status: 'new' | 'answered' | 'archived';
};

const MOCK_LISTINGS: UserListing[] = [
  {
    id: 'l1',
    name: 'Aurum Fine Dining Zürich',
    city: 'Zürich',
    country: 'Schweiz',
    status: 'online',
    viewsThisMonth: 238,
    inquiriesThisMonth: 5,
  },
  {
    id: 'l2',
    name: 'Skyline Dachrestaurant',
    city: 'Zürich',
    country: 'Schweiz',
    status: 'pending',
    viewsThisMonth: 96,
    inquiriesThisMonth: 2,
  },
];

const MOCK_INQUIRIES: Inquiry[] = [
  {
    id: 'i1',
    date: '15.01.2025',
    requester: 'Brand Agency X',
    type: 'Brand Dinner',
    guests: '40–60',
    status: 'new',
  },
  {
    id: 'i2',
    date: '18.01.2025',
    requester: 'Corporate Client Z',
    type: 'Executive Lunch',
    guests: '20–25',
    status: 'answered',
  },
];

export default function UserDashboardPage() {
  const [tab, setTab] = useState<TabKey>('overview');
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Simple derived totals
  const totalViews = MOCK_LISTINGS.reduce(
    (sum, l) => sum + l.viewsThisMonth,
    0,
  );
  const totalInquiries = MOCK_LISTINGS.reduce(
    (sum, l) => sum + l.inquiriesThisMonth,
    0,
  );
  const onlineListings = MOCK_LISTINGS.filter(
    l => l.status === 'online',
  ).length;

  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="flex min-h-screen">
        {/* Sidebar – desktop */}
        <aside className="hidden w-64 flex-col border-r border-neutral-900 bg-[#080808] px-4 py-5 md:flex">
          <div className="mb-6 flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#252525] to-black shadow-[0_14px_35px_rgba(0,0,0,0.7)]">
              <div className="absolute inset-[1px] rounded-2xl border border-white/5" />
              <div className="absolute inset-[4px] rounded-[0.8rem] border border-[#d1b371]/40" />
              <span className="text-[9px] font-semibold tracking-[0.32em] text-[#d1b371] uppercase">
                EP
              </span>
            </div>
            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-300">
                EventPlaces
              </p>
              <p className="text-[11px] text-neutral-500">
                Location Dashboard
              </p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1 text-[13px]">
            <SideNavItem
              icon={<BarChart2 className="h-4 w-4" />}
              label="Übersicht"
              active={tab === 'overview'}
              onClick={() => setTab('overview')}
            />
            <SideNavItem
              icon={<Globe2 className="h-4 w-4" />}
              label="Meine Listings"
              active={tab === 'listings'}
              onClick={() => setTab('listings')}
            />
            <SideNavItem
              icon={<Mail className="h-4 w-4" />}
              label="Anfragen"
              active={tab === 'inquiries'}
              onClick={() => setTab('inquiries')}
            />
            <SideNavItem
              icon={<User className="h-4 w-4" />}
              label="Profil &amp; Paket"
              active={tab === 'profile'}
              onClick={() => setTab('profile')}
            />
          </nav>

          <div className="mt-6 border-t border-neutral-900 pt-4 text-[11px] text-neutral-500">
            <p>Dieses Dashboard ist nur für registrierte Location-Accounts sichtbar.</p>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-neutral-900 bg-[#050505]/95 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsNavOpen(o => !o)}
            className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-[#101010] p-1.5 text-neutral-200"
          >
            {isNavOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
          <div className="flex flex-col items-center leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-200">
              EventPlaces
            </span>
            <span className="text-[10px] text-neutral-500">Dashboard</span>
          </div>
          <User className="h-4 w-4 text-[#d1b371]" />
        </div>

        {isNavOpen && (
          <div className="fixed inset-x-0 top-[44px] z-20 border-b border-neutral-900 bg-[#050505] px-4 py-3 text-[13px] md:hidden">
            <div className="flex flex-col gap-1">
              <MobileNavItem
                label="Übersicht"
                active={tab === 'overview'}
                onClick={() => {
                  setTab('overview');
                  setIsNavOpen(false);
                }}
              />
              <MobileNavItem
                label="Meine Listings"
                active={tab === 'listings'}
                onClick={() => {
                  setTab('listings');
                  setIsNavOpen(false);
                }}
              />
              <MobileNavItem
                label="Anfragen"
                active={tab === 'inquiries'}
                onClick={() => {
                  setTab('inquiries');
                  setIsNavOpen(false);
                }}
              />
              <MobileNavItem
                label="Profil & Paket"
                active={tab === 'profile'}
                onClick={() => {
                  setTab('profile');
                  setIsNavOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <section className="flex-1 bg-[#050505] md:ml-0">
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-10">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
                  Dashboard
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-tight text-neutral-50 md:text-2xl">
                  {tabTitle(tab)}
                </h1>
                <p className="mt-1 text-[12px] text-neutral-400 md:text-[13px]">
                  {tabDescription(tab)}
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#d1b371]/80 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#151515] shadow-[0_12px_35px_rgba(0,0,0,0.9)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <Plus className="h-3.5 w-3.5" />
                Neues Listing
              </button>
            </div>

            {/* Tabs */}
            {tab === 'overview' && (
              <OverviewSection
                totalViews={totalViews}
                totalInquiries={totalInquiries}
                onlineListings={onlineListings}
              />
            )}
            {tab === 'listings' && (
              <ListingsSectionUser listings={MOCK_LISTINGS} />
            )}
            {tab === 'inquiries' && (
              <InquiriesSection inquiries={MOCK_INQUIRIES} />
            )}
            {tab === 'profile' && <ProfileSection />}
          </div>
        </section>
      </div>
    </main>
  );
}

/* Small helpers */

type SideNavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
};

function SideNavItem({ icon, label, active, onClick }: SideNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] transition ${
        active
          ? 'bg-[#151515] text-neutral-50 shadow-[0_12px_30px_rgba(0,0,0,0.9)] border border-[#d1b371]/60'
          : 'text-neutral-300 hover:bg-[#151515] hover:text-neutral-50 border border-transparent'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

type MobileNavItemProps = {
  label: string;
  active?: boolean;
  onClick: () => void;
};

function MobileNavItem({ label, active, onClick }: MobileNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl px-3 py-2 text-[13px] ${
        active
          ? 'bg-[#151515] text-neutral-50 border border-[#d1b371]/60'
          : 'bg-[#101010] text-neutral-300 border border-neutral-800'
      }`}
    >
      <span>{label}</span>
      {active && <BarChart2 className="h-3.5 w-3.5 text-[#d1b371]" />}
    </button>
  );
}

/* Tab titles */

function tabTitle(tab: TabKey): string {
  switch (tab) {
    case 'overview':
      return 'Übersicht & Performance';
    case 'listings':
      return 'Meine Listings';
    case 'inquiries':
      return 'Anfragen';
    case 'profile':
      return 'Profil & Paket';
  }
}

function tabDescription(tab: TabKey): string {
  switch (tab) {
    case 'overview':
      return 'Schneller Überblick über Sichtbarkeit, Anfragen und den Status deiner Listings.';
    case 'listings':
      return 'Verwalte deine EventPlaces-Listings, bearbeite Inhalte und behalte den Status im Blick.';
    case 'inquiries':
      return 'Eingehende Anfragen von Brands, Agenturen und privaten Hosts.';
    case 'profile':
      return 'Stammdaten deiner Location, Paket-Informationen und Rechnungsdetails.';
  }
}

/* OVERVIEW SECTION */

type OverviewProps = {
  totalViews: number;
  totalInquiries: number;
  onlineListings: number;
};

function OverviewSection({
  totalViews,
  totalInquiries,
  onlineListings,
}: OverviewProps) {
  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="space-y-4">
        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Views im laufenden Monat"
            value={totalViews.toLocaleString('de-CH')}
            hint="Summe aller Profilaufrufe deiner Listings"
          />
          <StatCard
            label="Anfragen im laufenden Monat"
            value={totalInquiries.toString()}
            hint="Neue Kontaktanfragen über EventPlaces"
          />
          <StatCard
            label="Online Listings"
            value={onlineListings.toString()}
            hint="Freigeschaltete Einträge"
          />
        </div>

        {/* Simple insight box */}
        <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 text-[12px] text-neutral-300 shadow-[0_18px_60px_rgba(0,0,0,0.9)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Hinweise &amp; nächste Schritte
          </p>
          <ul className="mt-3 space-y-2 text-[12px] text-neutral-400">
            <li>
              • Halte Bilder und Texte deiner Listings aktuell – besonders
              bei saisonalen Angeboten.
            </li>
            <li>
              • Beantworte neue Anfragen möglichst innerhalb von 24 Stunden,
              um die Conversion hoch zu halten.
            </li>
            <li>
              • Nutze den Hinweis &quot;Bemerkungen&quot; im Anfrage-Reply, um
              Sonderkonditionen klar zu kommunizieren.
            </li>
          </ul>
        </div>
      </div>

      {/* Mini "chart" placeholder */}
      <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 text-[12px] text-neutral-300 shadow-[0_18px_60px_rgba(0,0,0,0.9)]">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Entwicklung (Mock)
        </p>
        <p className="mb-3 text-[12px] text-neutral-400">
          Hier könntest du später eine einfache Chart-Komponente für
          Views/Anfragen pro Monat integrieren.
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2 text-[11px] text-neutral-400">
          {['Okt', 'Nov', 'Dez', 'Jan'].map((m, idx) => (
            <div
              key={m}
              className="flex flex-col items-center gap-1 rounded-2xl border border-neutral-800 bg-[#111111] px-2 py-3"
            >
              <span className="text-neutral-500">{m}</span>
              <div className="flex h-14 w-full items-end justify-center">
                <div
                  className="w-2 rounded-full bg-[#d1b371]"
                  style={{ height: `${30 + idx * 10}%` }}
                />
              </div>
              <span className="text-[10px] text-neutral-500">
                Views / Anfragen
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type StatCardProps = {
  label: string;
  value: string;
  hint?: string;
};

function StatCard({ label, value, hint }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-[#101010] px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.85)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-neutral-50">
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-[11px] text-neutral-500">{hint}</p>
      )}
    </div>
  );
}

/* LISTINGS SECTION (USER VIEW) */

type ListingsSectionUserProps = {
  listings: UserListing[];
};

function ListingsSectionUser({ listings }: ListingsSectionUserProps) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:p-5">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        Deine Listings
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {listings.map(listing => (
          <article
            key={listing.id}
            className="flex flex-col rounded-2xl border border-neutral-900 bg-[#111111] p-4 text-[12px] text-neutral-300 shadow-[0_14px_40px_rgba(0,0,0,0.85)]"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  Listing
                </p>
                <h2 className="text-sm font-semibold text-neutral-50">
                  {listing.name}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-neutral-400">
                  <MapPin className="h-3 w-3" />
                  {listing.city}, {listing.country}
                </p>
              </div>
              <ListingStatusBadgeUser status={listing.status} />
            </div>

            <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-neutral-300">
              <span className="inline-flex items-center rounded-full border border-neutral-800 bg-[#151515] px-2 py-1">
                Views (Monat):{' '}
                <span className="ml-1 text-neutral-100">
                  {listing.viewsThisMonth}
                </span>
              </span>
              <span className="inline-flex items-center rounded-full border border-neutral-800 bg-[#151515] px-2 py-1">
                Anfragen (Monat):{' '}
                <span className="ml-1 text-neutral-100">
                  {listing.inquiriesThisMonth}
                </span>
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
              <button className="rounded-full border border-neutral-700 bg-[#151515] px-3 py-1 uppercase tracking-[0.18em] text-neutral-100 hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]">
                Details bearbeiten
              </button>
              <button className="rounded-full border border-neutral-700 bg-[#151515] px-3 py-1 uppercase tracking-[0.18em] text-neutral-200 hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]">
                Medien / Bilder
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ListingStatusBadgeUser({
  status,
}: {
  status: UserListing['status'];
}) {
  const base =
    'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]';

  if (status === 'online') {
    return (
      <span
        className={`${base} border-emerald-500/40 bg-emerald-500/10 text-emerald-200`}
      >
        Online
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span
        className={`${base} border-amber-500/40 bg-amber-500/10 text-amber-200`}
      >
        In Prüfung
      </span>
    );
  }

  return (
    <span
      className={`${base} border-neutral-600/60 bg-neutral-700/20 text-neutral-200`}
    >
      Offline
    </span>
  );
}

/* INQUIRIES SECTION */

type InquiriesSectionProps = {
  inquiries: Inquiry[];
};

function InquiriesSection({ inquiries }: InquiriesSectionProps) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:p-5">
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Anfragen
        </p>
        <p className="text-[11px] text-neutral-400">
          Übersicht über Anfragen, die über EventPlaces eingegangen sind.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-[12px]">
          <thead className="border-b border-neutral-800 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
            <tr>
              <th className="px-2 py-2">Datum</th>
              <th className="px-2 py-2">Anfragende Partei</th>
              <th className="px-2 py-2">Anlass</th>
              <th className="px-2 py-2">Gästezahl</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(inquiry => (
              <tr
                key={inquiry.id}
                className="border-b border-neutral-900/60 last:border-b-0"
              >
                <td className="px-2 py-2 text-neutral-300">
                  {inquiry.date}
                </td>
                <td className="px-2 py-2 text-neutral-100">
                  {inquiry.requester}
                </td>
                <td className="px-2 py-2 text-neutral-300">
                  {inquiry.type}
                </td>
                <td className="px-2 py-2 text-neutral-300">
                  {inquiry.guests}
                </td>
                <td className="px-2 py-2">
                  <InquiryStatus status={inquiry.status} />
                </td>
                <td className="px-2 py-2 text-right">
                  <button className="rounded-full border border-neutral-700 bg-[#151515] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-100 hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]">
                    Anfrage öffnen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InquiryStatus({ status }: { status: Inquiry['status'] }) {
  const base =
    'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]';

  if (status === 'new') {
    return (
      <span
        className={`${base} border-[#d1b371]/60 bg-[#d1b371]/10 text-[#d1b371]`}
      >
        Neu
      </span>
    );
  }

  if (status === 'answered') {
    return (
      <span
        className={`${base} border-emerald-500/40 bg-emerald-500/10 text-emerald-200`}
      >
        Beantwortet
      </span>
    );
  }

  return (
    <span
      className={`${base} border-neutral-600/60 bg-neutral-700/20 text-neutral-200`}
    >
      Archiviert
    </span>
  );
}

/* PROFILE SECTION */

function ProfileSection() {
  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 text-[12px] text-neutral-300 shadow-[0_18px_60px_rgba(0,0,0,0.9)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Profil &amp; Stammdaten
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <ProfileField label="Account-Name" value="Hotel Aurora / EventPlaces Demo" />
          <ProfileField label="Primäre E-Mail" value="sales@hotel-aurora.ch" />
          <ProfileField label="Land" value="Schweiz" />
          <ProfileField label="Stadt" value="Zürich" />
          <ProfileField label="Sprache" value="Deutsch (DE)" />
          <ProfileField label="Kontakt-Telefon" value="+41 (0) XX XXX XX XX" />
        </div>

        <button className="mt-4 rounded-full border border-neutral-700 bg-[#151515] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-100 hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]">
          Profil bearbeiten
        </button>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 text-[12px] text-neutral-300 shadow-[0_18px_60px_rgba(0,0,0,0.9)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Paket &amp; Laufzeit
          </p>
          <p className="mt-3 text-[12px] text-neutral-300">
            Aktives Paket:{' '}
            <span className="font-semibold text-neutral-50">
              Professional
            </span>
          </p>
          <p className="mt-1 text-[12px] text-neutral-400">
            Laufzeit bis:{' '}
            <span className="text-neutral-100">31.12.2025</span>
          </p>
          <p className="mt-1 text-[11px] text-neutral-500">
            Paketwechsel oder Verlängerung auf Anfrage beim EventPlaces Team.
          </p>

          <button className="mt-4 rounded-full border border-[#d1b371]/80 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#151515] shadow-[0_12px_35px_rgba(0,0,0,0.9)] hover:scale-[1.02] active:scale-[0.99]">
            Paket-Übersicht ansehen
          </button>
        </div>

        <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 text-[11px] text-neutral-400 shadow-[0_18px_60px_rgba(0,0,0,0.9)]">
          <p className="mb-2 font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Rechnungsdetails (Demo)
          </p>
          <p>Rechnungsadresse und VAT-Nummer kannst du später direkt hier verwalten.</p>
        </div>
      </div>
    </div>
  );
}

type ProfileFieldProps = {
  label: string;
  value: string;
};

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="space-y-0.5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
        {label}
      </p>
      <p className="text-[12px] text-neutral-200">{value}</p>
    </div>
  );
}

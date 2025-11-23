// app/admin/page.tsx
'use client';

import { useState } from 'react';
import {
  Check,
  Globe,
  Mail,
  Menu,
  PenSquare,
  Shield,
  User,
  X,
  XCircle,
} from 'lucide-react';

type SectionKey = 'users' | 'listings' | 'emails' | 'blog';

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'provider' | 'viewer';
  status: 'active' | 'pending' | 'blocked';
};

type ListingRow = {
  id: string;
  title: string;
  location: string;
  owner: string;
  status: 'pending' | 'approved' | 'rejected';
};

type EmailRow = {
  id: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  createdAt: string;
  source: 'Kontakt' | 'Paket' | 'Listing';
};

const MOCK_USERS: UserRow[] = [
  {
    id: 'u1',
    name: 'Admin Account',
    email: 'admin@eventplaces.com',
    role: 'admin',
    status: 'active',
  },
  {
    id: 'u2',
    name: 'Hotel Aurora',
    email: 'sales@hotel-aurora.ch',
    role: 'provider',
    status: 'active',
  },
  {
    id: 'u3',
    name: 'Test Location',
    email: 'info@test-location.de',
    role: 'provider',
    status: 'pending',
  },
];

const MOCK_LISTINGS: ListingRow[] = [
  {
    id: 'l1',
    title: 'Aurum Fine Dining Zürich',
    location: 'Zürich, Schweiz',
    owner: 'Hotel Aurora',
    status: 'approved',
  },
  {
    id: 'l2',
    title: 'Rooftop Brasserie Barcelona',
    location: 'Barcelona, Spanien',
    owner: 'Rooftop Brasserie',
    status: 'pending',
  },
  {
    id: 'l3',
    title: 'Mayfair Private Dining Rooms',
    location: 'London, UK',
    owner: 'Mayfair Group',
    status: 'rejected',
  },
];

const MOCK_EMAILS: EmailRow[] = [
  {
    id: 'e1',
    fromName: 'Max Mustermann',
    fromEmail: 'max@example.com',
    subject: 'Anfrage Paket Professional',
    createdAt: '2025-01-15 09:32',
    source: 'Paket',
  },
  {
    id: 'e2',
    fromName: 'Hotel Aurora',
    fromEmail: 'sales@hotel-aurora.ch',
    subject: 'Neue Location hinzufügen',
    createdAt: '2025-01-16 14:05',
    source: 'Listing',
  },
  {
    id: 'e3',
    fromName: 'Agentur Studio X',
    fromEmail: 'events@studiox.de',
    subject: 'Locations für Brand Dinner in Zürich',
    createdAt: '2025-01-17 11:48',
    source: 'Kontakt',
  },
];

const BLOG_LANGS = ['de', 'en', 'fr', 'it'] as const;
type BlogLang = (typeof BLOG_LANGS)[number];

type BlogDraft = Record<
  BlogLang,
  {
    title: string;
    summary: string;
    content: string;
  }
>;

const INITIAL_BLOG_DRAFT: BlogDraft = {
  de: { title: '', summary: '', content: '' },
  en: { title: '', summary: '', content: '' },
  fr: { title: '', summary: '', content: '' },
  it: { title: '', summary: '', content: '' },
};

export default function AdminDashboardPage() {
  const [section, setSection] = useState<SectionKey>('users');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [blogLang, setBlogLang] = useState<BlogLang>('de');
  const [blogDraft, setBlogDraft] = useState<BlogDraft>(INITIAL_BLOG_DRAFT);

  const handleBlogChange = (
    lang: BlogLang,
    field: keyof BlogDraft[BlogLang],
    value: string,
  ) => {
    setBlogDraft(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}
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
              <p className="text-[11px] text-neutral-500">Admin Dashboard</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1 text-[13px]">
            <SideNavItem
              icon={<User className="h-4 w-4" />}
              label="Users"
              active={section === 'users'}
              onClick={() => setSection('users')}
            />
            <SideNavItem
              icon={<Globe className="h-4 w-4" />}
              label="Listings"
              active={section === 'listings'}
              onClick={() => setSection('listings')}
            />
            <SideNavItem
              icon={<Mail className="h-4 w-4" />}
              label="E-Mails"
              active={section === 'emails'}
              onClick={() => setSection('emails')}
            />
            <SideNavItem
              icon={<PenSquare className="h-4 w-4" />}
              label="Blog Studio"
              active={section === 'blog'}
              onClick={() => setSection('blog')}
            />
          </nav>

          <div className="mt-6 border-t border-neutral-900 pt-4 text-[11px] text-neutral-500">
            <p>Nur für interne Nutzung. Änderungen wirken sich direkt auf das Portal aus, sobald Backend angebunden ist.</p>
          </div>
        </aside>

        {/* Mobile top bar */}
        <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-neutral-900 bg-[#050505]/95 px-4 py-3 md:hidden">
          <button
            type="button"
            onClick={() => setIsNavOpen(open => !open)}
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
            <span className="text-[10px] text-neutral-500">Admin</span>
          </div>
          <Shield className="h-4 w-4 text-[#d1b371]" />
        </div>

        {isNavOpen && (
          <div className="fixed inset-x-0 top-[44px] z-20 border-b border-neutral-900 bg-[#050505] px-4 py-3 text-[13px] md:hidden">
            <div className="flex flex-col gap-1">
              <MobileNavItem
                label="Users"
                active={section === 'users'}
                onClick={() => {
                  setSection('users');
                  setIsNavOpen(false);
                }}
              />
              <MobileNavItem
                label="Listings"
                active={section === 'listings'}
                onClick={() => {
                  setSection('listings');
                  setIsNavOpen(false);
                }}
              />
              <MobileNavItem
                label="E-Mails"
                active={section === 'emails'}
                onClick={() => {
                  setSection('emails');
                  setIsNavOpen(false);
                }}
              />
              <MobileNavItem
                label="Blog Studio"
                active={section === 'blog'}
                onClick={() => {
                  setSection('blog');
                  setIsNavOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <section className="flex-1 bg-[#050505] md:ml-0">
          <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 md:px-6 md:pb-14 md:pt-10">
            {/* Section header */}
            <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
                  Admin
                </p>
                <h1 className="mt-1 text-xl font-semibold tracking-tight text-neutral-50 md:text-2xl">
                  {sectionTitle(section)}
                </h1>
                <p className="mt-1 text-[12px] text-neutral-400 md:text-[13px]">
                  {sectionDescription(section)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 text-[11px] text-neutral-400">
                <span className="inline-flex items-center rounded-full border border-neutral-800 bg-[#101010] px-3 py-1">
                  <span className="mr-1 h-[6px] w-[6px] rounded-full bg-[#3fbf6b]" />
                  Internal view only
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-800 bg-[#101010] px-3 py-1">
                  <Shield className="mr-1 h-3 w-3" />
                  Admin access
                </span>
              </div>
            </div>

            {/* Section content */}
            {section === 'users' && <UsersSection />}
            {section === 'listings' && <ListingsSection />}
            {section === 'emails' && <EmailsSection />}
            {section === 'blog' && (
              <BlogSection
                lang={blogLang}
                draft={blogDraft}
                onChange={handleBlogChange}
                onLangChange={setBlogLang}
              />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

/* Section helpers */

function sectionTitle(section: SectionKey): string {
  switch (section) {
    case 'users':
      return 'Userverwaltung';
    case 'listings':
      return 'Listings & Freigaben';
    case 'emails':
      return 'E-Mails & Kontaktanfragen';
    case 'blog':
      return 'Blog Studio – Mehrsprachige Artikel';
  }
}

function sectionDescription(section: SectionKey): string {
  switch (section) {
    case 'users':
      return 'Verwalte Benutzer, Rollen und Account-Status der EventPlaces Plattform.';
    case 'listings':
      return 'Prüfe neue Location-Einträge, passe Details an und entscheide über Freigabe.';
    case 'emails':
      return 'Überblick über eingehende Kontaktanfragen und Formular-E-Mails aus dem Portal.';
    case 'blog':
      return 'Erstelle und verwalte Blog-Artikel in Deutsch, Englisch, Französisch und Italienisch.';
  }
}

/* Sidebar / nav components */

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
      <span className="text-[13px]">{label}</span>
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
      {active && <Check className="h-4 w-4 text-[#d1b371]" />}
    </button>
  );
}

/* USERS SECTION */

function UsersSection() {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:p-5">
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Users &amp; Rollen
        </p>
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-[#151515] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-100 hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]"
        >
          + New user
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-[12px]">
          <thead className="border-b border-neutral-800 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
            <tr>
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">E-Mail</th>
              <th className="px-2 py-2">Rolle</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_USERS.map(user => (
              <tr
                key={user.id}
                className="border-b border-neutral-900/60 last:border-b-0"
              >
                <td className="px-2 py-2 text-neutral-100">{user.name}</td>
                <td className="px-2 py-2 text-neutral-300">
                  {user.email}
                </td>
                <td className="px-2 py-2">
                  <span className="inline-flex items-center rounded-full border border-neutral-700 bg-[#151515] px-2 py-0.5 text-[11px] capitalize text-neutral-200">
                    {user.role}
                  </span>
                </td>
                <td className="px-2 py-2">
                  <UserStatusPill status={user.status} />
                </td>
                <td className="px-2 py-2 text-right">
                  <button className="text-[11px] text-neutral-400 underline-offset-2 hover:text-[#d1b371] hover:underline">
                    Edit
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

function UserStatusPill({ status }: { status: UserRow['status'] }) {
  const base =
    'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]';

  if (status === 'active') {
    return (
      <span
        className={`${base} border-emerald-500/40 bg-emerald-500/10 text-emerald-300`}
      >
        <span className="mr-1 h-[6px] w-[6px] rounded-full bg-emerald-400" />
        Active
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span
        className={`${base} border-amber-500/40 bg-amber-500/10 text-amber-200`}
      >
        <span className="mr-1 h-[6px] w-[6px] rounded-full bg-amber-400" />
        Pending
      </span>
    );
  }

  return (
    <span
      className={`${base} border-red-500/40 bg-red-500/10 text-red-200`}
    >
      <span className="mr-1 h-[6px] w-[6px] rounded-full bg-red-400" />
      Blocked
    </span>
  );
}

/* LISTINGS SECTION */

function ListingsSection() {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:p-5">
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          Listings &amp; Freigaben
        </p>
        <div className="flex gap-2 text-[11px]">
          <button className="rounded-full border border-neutral-700 bg-[#151515] px-3 py-1.5 uppercase tracking-[0.2em] text-neutral-200 hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]">
            + New listing
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-[12px]">
          <thead className="border-b border-neutral-800 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
            <tr>
              <th className="px-2 py-2">Titel</th>
              <th className="px-2 py-2">Ort</th>
              <th className="px-2 py-2">Owner</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2 text-right">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LISTINGS.map(listing => (
              <tr
                key={listing.id}
                className="border-b border-neutral-900/60 last:border-b-0"
              >
                <td className="px-2 py-2 text-neutral-100">
                  {listing.title}
                </td>
                <td className="px-2 py-2 text-neutral-300">
                  {listing.location}
                </td>
                <td className="px-2 py-2 text-neutral-300">
                  {listing.owner}
                </td>
                <td className="px-2 py-2">
                  <ListingStatusPill status={listing.status} />
                </td>
                <td className="px-2 py-2 text-right">
                  <div className="inline-flex gap-1 text-[11px]">
                    <button className="rounded-full border border-neutral-700 bg-[#151515] px-2 py-1 uppercase tracking-[0.16em] text-neutral-200 hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]">
                      Edit
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2 py-1 uppercase tracking-[0.16em] text-emerald-200 hover:bg-emerald-500/20">
                      <Check className="h-3 w-3" />
                      Approve
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-full border border-red-500/60 bg-red-500/10 px-2 py-1 uppercase tracking-[0.16em] text-red-200 hover:bg-red-500/20">
                      <XCircle className="h-3 w-3" />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ListingStatusPill({
  status,
}: {
  status: ListingRow['status'];
}) {
  const base =
    'inline-flex items-center rounded-full border px-2 py-0.5 text-[11px]';

  if (status === 'approved') {
    return (
      <span
        className={`${base} border-emerald-500/40 bg-emerald-500/10 text-emerald-200`}
      >
        <Check className="mr-1 h-3 w-3" />
        Approved
      </span>
    );
  }

  if (status === 'pending') {
    return (
      <span
        className={`${base} border-amber-500/40 bg-amber-500/10 text-amber-200`}
      >
        Pending
      </span>
    );
  }

  return (
    <span
      className={`${base} border-red-500/40 bg-red-500/10 text-red-200`}
    >
      Rejected
    </span>
  );
}

/* EMAILS SECTION */

function EmailsSection() {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:p-5">
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
          E-Mails &amp; Formulare
        </p>
        <div className="text-[11px] text-neutral-400">
          Datenquelle: Kontaktformular, Paketseite, Listings (Mock-Daten).
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-[12px]">
          <thead className="border-b border-neutral-800 text-[11px] uppercase tracking-[0.16em] text-neutral-400">
            <tr>
              <th className="px-2 py-2">Absender</th>
              <th className="px-2 py-2">E-Mail</th>
              <th className="px-2 py-2">Betreff</th>
              <th className="px-2 py-2">Quelle</th>
              <th className="px-2 py-2">Eingang</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_EMAILS.map(email => (
              <tr
                key={email.id}
                className="border-b border-neutral-900/60 last:border-b-0"
              >
                <td className="px-2 py-2 text-neutral-100">
                  {email.fromName}
                </td>
                <td className="px-2 py-2 text-neutral-300">
                  {email.fromEmail}
                </td>
                <td className="px-2 py-2 text-neutral-300">
                  {email.subject}
                </td>
                <td className="px-2 py-2">
                  <span className="inline-flex items-center rounded-full border border-neutral-700 bg-[#151515] px-2 py-0.5 text-[11px] text-neutral-200">
                    {email.source}
                  </span>
                </td>
                <td className="px-2 py-2 text-neutral-400">
                  {email.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* BLOG SECTION – 4 languages */

type BlogSectionProps = {
  lang: BlogLang;
  draft: BlogDraft;
  onLangChange: (lang: BlogLang) => void;
  onChange: (
    lang: BlogLang,
    field: keyof BlogDraft[BlogLang],
    value: string,
  ) => void;
};

function BlogSection({
  lang,
  draft,
  onLangChange,
  onChange,
}: BlogSectionProps) {
  const labels: Record<BlogLang, string> = {
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    it: 'Italiano',
  };

  const activeDraft = draft[lang];

  return (
    <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:p-5">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Blog Studio
          </p>
          <p className="mt-1 text-[12px] text-neutral-400">
            Erstelle einen mehrsprachigen Artikel. Jeder Tab repräsentiert eine
            Sprache mit eigenem Titel, Summary und Content.
          </p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-[#151515] p-1 text-[11px]">
          {BLOG_LANGS.map(code => {
            const active = code === lang;
            return (
              <button
                key={code}
                type="button"
                onClick={() => onLangChange(code)}
                className={`rounded-full px-3 py-1 uppercase tracking-[0.16em] ${
                  active
                    ? 'bg-[#d1b371] text-[#151515]'
                    : 'text-neutral-300 hover:bg-neutral-900'
                }`}
              >
                {labels[code]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
              Titel ({labels[lang]})
            </label>
            <input
              value={activeDraft.title}
              onChange={e => onChange(lang, 'title', e.target.value)}
              placeholder="z.B. Signature Restaurants für Brand Dinners in Zürich"
              className="w-full rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-2 text-[13px] text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-[#d1b371]/80 focus:bg-[#171717] focus:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
              Kurzintro / Summary
            </label>
            <textarea
              value={activeDraft.summary}
              onChange={e => onChange(lang, 'summary', e.target.value)}
              rows={3}
              placeholder="1–3 Sätze für die Vorschau im Blog-Listing."
              className="w-full rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-2 text-[13px] text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-[#d1b371]/80 focus:bg-[#171717] focus:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
              Inhalt ({labels[lang]})
            </label>
            <textarea
              value={activeDraft.content}
              onChange={e => onChange(lang, 'content', e.target.value)}
              rows={8}
              placeholder="Artikeltext in der gewählten Sprache. Du kannst später ein Rich-Text-Editor integrieren."
              className="w-full rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-2 text-[13px] text-neutral-100 outline-none transition placeholder:text-neutral-500 focus:border-[#d1b371]/80 focus:bg-[#171717] focus:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]"
            />
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-neutral-900 bg-[#0f0f0f] p-4 text-[12px] text-neutral-300">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Artikel-Status (Preview)
          </p>
          <div className="rounded-2xl border border-neutral-800 bg-[#101010] p-3">
            <p className="text-[11px] text-neutral-400">
              Sprache aktiv: <span className="text-neutral-100">{labels[lang]}</span>
            </p>
            <p className="mt-2 text-[11px] text-neutral-500">
              Sobald Backend angebunden ist, kannst du hier:
            </p>
            <ul className="mt-1 space-y-1 text-[11px] text-neutral-400">
              <li>• Draft speichern</li>
              <li>• Artikel veröffentlichen / offline nehmen</li>
              <li>• Slugs &amp; SEO-Infos pro Sprache verwalten</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-[#101010] p-3 text-[11px] text-neutral-400">
            <p className="mb-2 font-semibold text-neutral-300">
              Aktuelle Eingabe ({labels[lang]})
            </p>
            <p className="mb-1 text-[12px] font-semibold text-neutral-50">
              {activeDraft.title || 'Kein Titel eingegeben'}
            </p>
            <p className="mb-1 text-[11px] text-neutral-400">
              {activeDraft.summary || 'Keine Summary eingegeben'}
            </p>
            <p className="line-clamp-4 text-[11px] text-neutral-500">
              {activeDraft.content || 'Noch kein Inhalt eingegeben.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            <button
              type="button"
              className="rounded-full border border-neutral-700 bg-[#151515] px-4 py-1.5 uppercase tracking-[0.22em] text-neutral-200 hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]"
            >
              Draft speichern (mock)
            </button>
            <button
              type="button"
              className="rounded-full border border-[#d1b371]/80 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-4 py-1.5 uppercase tracking-[0.22em] text-[#151515] shadow-[0_12px_35px_rgba(0,0,0,0.9)] hover:scale-[1.02] active:scale-[0.99]"
            >
              Publizieren (später)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

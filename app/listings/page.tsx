// app/locations/page.tsx
'use client';

import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';

type Venue = {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  capacity: string;
  type: string;
  image: string;
  tags: string[];
};

const VENUE_TYPES = [
  'Alle Location-Typen',
  'Fine Dining',
  'Private Dining',
  'Dachrestaurant',
  'Brasserie',
  'Signature Bar & Restaurant',
];

const COUNTRIES = [
  { code: 'all', name: 'Alle Länder' },
  { code: 'ch', name: 'Schweiz' },
  { code: 'de', name: 'Deutschland' },
  { code: 'fr', name: 'Frankreich' },
  { code: 'it', name: 'Italien' },
  { code: 'es', name: 'Spanien' },
  { code: 'gb', name: 'Vereinigtes Königreich' },
];

const CITIES = [
  'Alle Städte',
  'Zürich',
  'Berlin',
  'München',
  'Paris',
  'Mailand',
  'Barcelona',
  'London',
];

const MOCK_VENUES: Venue[] = [
  {
    id: 'ep-zrh-finedining-001',
    name: 'Aurum Fine Dining Zürich',
    city: 'Zürich',
    country: 'Schweiz',
    countryCode: 'ch',
    capacity: '40–80 Gäste',
    type: 'Fine Dining',
    image:
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Executive Dinner', 'Lake View', 'Private Room'],
  },
  {
    id: 'ep-zrh-rooftop-002',
    name: 'Skyline Dachrestaurant',
    city: 'Zürich',
    country: 'Schweiz',
    countryCode: 'ch',
    capacity: '60–140 Gäste',
    type: 'Dachrestaurant',
    image:
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80',
    tags: ['Brand Event', 'Sunset', 'City View'],
  },
  {
    id: 'ep-ber-brasserie-003',
    name: 'Brasserie am Kanal',
    city: 'Berlin',
    country: 'Deutschland',
    countryCode: 'de',
    capacity: '80–160 Gäste',
    type: 'Brasserie',
    image:
      'https://images.unsplash.com/photo-1534643958680-27c0b2752b24?auto=format&fit=crop&w=1200&q=80',
    tags: ['Produktlaunch', 'Casual Chic', 'Terrasse'],
  },
  {
    id: 'ep-muc-private-004',
    name: 'Private Dining München',
    city: 'München',
    country: 'Deutschland',
    countryCode: 'de',
    capacity: '20–40 Gäste',
    type: 'Private Dining',
    image:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    tags: ['C-Level Dinner', 'Abgeschlossene Räume', 'Sommelier'],
  },
  {
    id: 'ep-par-finedining-005',
    name: 'Salon Lumière',
    city: 'Paris',
    country: 'Frankreich',
    countryCode: 'fr',
    capacity: '50–90 Gäste',
    type: 'Fine Dining',
    image:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Press Dinner', 'Parisian Classic', 'Michelin-Partner'],
  },
  {
    id: 'ep-mil-signature-006',
    name: 'Milano Signature Bar & Restaurant',
    city: 'Mailand',
    country: 'Italien',
    countryCode: 'it',
    capacity: '70–150 Gäste',
    type: 'Signature Bar & Restaurant',
    image:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    tags: ['Aftershow', 'Cocktail Reception', 'Design Interior'],
  },
  {
    id: 'ep-bcn-rooftop-007',
    name: 'Rooftop Brasserie Barcelona',
    city: 'Barcelona',
    country: 'Spanien',
    countryCode: 'es',
    capacity: '60–120 Gäste',
    type: 'Dachrestaurant',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sommer-Event', 'Pool', 'Meerblick'],
  },
  {
    id: 'ep-lon-private-008',
    name: 'Mayfair Private Dining Rooms',
    city: 'London',
    country: 'Vereinigtes Königreich',
    countryCode: 'gb',
    capacity: '10–40 Gäste',
    type: 'Private Dining',
    image:
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=80',
    tags: ['Board Dinner', 'Diskret', 'Zentral'],
  },
];

export default function LocationsPage() {
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('all');
  const [city, setCity] = useState('Alle Städte');
  const [type, setType] = useState('Alle Location-Typen');
  const [minCapacity, setMinCapacity] = useState('');
  const [sort, setSort] = useState<'empfohlen' | 'kapazitaet'>('empfohlen');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredVenues = useMemo(() => {
    let venues = [...MOCK_VENUES];

    if (search.trim()) {
      const q = search.toLowerCase();
      venues = venues.filter(
        v =>
          v.name.toLowerCase().includes(q) ||
          v.city.toLowerCase().includes(q) ||
          v.country.toLowerCase().includes(q) ||
          v.type.toLowerCase().includes(q),
      );
    }

    if (country !== 'all') {
      venues = venues.filter(v => v.countryCode === country);
    }

    if (city !== 'Alle Städte') {
      venues = venues.filter(v => v.city === city);
    }

    if (type !== 'Alle Location-Typen') {
      venues = venues.filter(v => v.type === type);
    }

    if (minCapacity.trim()) {
      const min = parseInt(minCapacity, 10);
      if (!Number.isNaN(min)) {
        venues = venues.filter(v => {
          const match = v.capacity.match(/^(\d+)/);
          if (!match) return true;
          const minCap = parseInt(match[1], 10);
          return minCap >= min;
        });
      }
    }

    if (sort === 'kapazitaet') {
      venues.sort((a, b) => {
        const aMatch = a.capacity.match(/^(\d+)/);
        const bMatch = b.capacity.match(/^(\d+)/);
        const aMin = aMatch ? parseInt(aMatch[1], 10) : 0;
        const bMin = bMatch ? parseInt(bMatch[1], 10) : 0;
        return aMin - bMin;
      });
    }

    return venues;
  }, [search, country, city, type, minCapacity, sort]);

  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-14 pt-8 md:px-6 md:pb-20 md:pt-10">
        {/* Header */}
        <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
              Kuratierte Restaurant-Locations
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-50 md:text-3xl">
              Fine Dining & Signature Restaurants für Events
            </h1>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-neutral-400 md:text-[13px]">
              Finde exklusive Restaurants für Brand Dinners, C-Level-Events,
              Produktlaunches und private Feiern. Alle Locations werden
              redaktionell geprüft.
            </p>
          </div>

          <div className="hidden flex-col items-end gap-1 text-[11px] text-neutral-400 md:flex">
            <span>
              Zeige{' '}
              <span className="text-neutral-100">
                {filteredVenues.length}
              </span>{' '}
              von {MOCK_VENUES.length} kuratierten Locations
            </span>
            <span>Weitere Städte und Länder folgen sukzessive.</span>
          </div>
        </header>

        {/* Mobile result counter + filter trigger */}
        <div className="mb-4 flex items-center justify-between md:hidden">
          <p className="text-[11px] text-neutral-400">
            {filteredVenues.length} von {MOCK_VENUES.length} Locations
          </p>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-[#111111] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-100 shadow-[0_12px_30px_rgba(0,0,0,0.8)] transition hover:border-[#d1b371]/80 hover:text-[#d1b371]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter &amp; Sortierung
          </button>
        </div>

        {/* Desktop filter bar */}
        <section className="mb-8 hidden rounded-3xl border border-neutral-900 bg-[#101010] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:block">
          <div className="mb-4 flex items-center justify-between gap-4">
            {/* Search */}
            <div className="w-full max-w-md">
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
                Suchbegriff
              </label>
              <div className="flex items-center rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-1.5 text-[13px] transition focus-within:border-[#d1b371]/80 focus-within:bg-[#171717] focus-within:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]">
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Stadt, Restaurantname oder Stichwort..."
                  className="w-full bg-transparent py-1 text-[13px] text-neutral-100 outline-none placeholder:text-neutral-500"
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-end gap-2 text-[11px] text-neutral-400">
              <span className="mb-[2px] uppercase tracking-[0.16em]">
                Sortierung
              </span>
              <div className="inline-flex gap-1 rounded-full border border-neutral-800 bg-[#151515] p-1">
                <button
                  type="button"
                  onClick={() => setSort('empfohlen')}
                  className={[
                    'rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] transition',
                    sort === 'empfohlen'
                      ? 'bg-[#d1b371] text-[#141414]'
                      : 'text-neutral-300 hover:bg-neutral-800',
                  ].join(' ')}
                >
                  Empfohlen
                </button>
                <button
                  type="button"
                  onClick={() => setSort('kapazitaet')}
                  className={[
                    'rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] transition',
                    sort === 'kapazitaet'
                      ? 'bg-[#d1b371] text-[#141414]'
                      : 'text-neutral-300 hover:bg-neutral-800',
                  ].join(' ')}
                >
                  Kapazität
                </button>
              </div>
            </div>
          </div>

          {/* Filter grid */}
          <div className="grid gap-3 text-[12px] md:grid-cols-4">
            <FilterSelect
              label="Land"
              value={country}
              onChange={setCountry}
              options={COUNTRIES.map(c => ({
                value: c.code,
                label: c.name,
              }))}
            />

            <FilterSelect
              label="Stadt"
              value={city}
              onChange={setCity}
              options={CITIES.map(c => ({
                value: c,
                label: c,
              }))}
            />

            <FilterSelect
              label="Location-Typ"
              value={type}
              onChange={setType}
              options={VENUE_TYPES.map(t => ({
                value: t,
                label: t,
              }))}
            />

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
                Mindestkapazität
              </label>
              <div className="flex items-center rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-1.5 text-[13px] transition focus-within:border-[#d1b371]/80 focus-within:bg-[#171717] focus-within:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]">
                <input
                  type="number"
                  min={0}
                  value={minCapacity}
                  onChange={e => setMinCapacity(e.target.value)}
                  placeholder="z.B. 60"
                  className="w-full bg-transparent py-1 text-[13px] text-neutral-100 outline-none placeholder:text-neutral-500"
                />
                <span className="ml-1 text-[11px] text-neutral-500">
                  Gäste
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Results grid */}
        <section>
          {filteredVenues.length === 0 ? (
            <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-6 text-[12px] text-neutral-300">
              <p className="font-medium text-neutral-100">
                Keine Locations mit diesen Filtern gefunden.
              </p>
              <p className="mt-1 text-neutral-400">
                Reduziere die Mindestkapazität, wähle &quot;Alle Länder&quot;
                oder passe deinen Suchbegriff an.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredVenues.map(venue => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Mobile filter modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 backdrop-blur-md md:hidden">
          <div className="w-full max-w-md rounded-t-3xl border border-neutral-900 bg-[#111111] p-4 pb-6 shadow-[0_-24px_80px_rgba(0,0,0,0.95)]">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d1b371]">
                  Filter &amp; Sortierung
                </p>
                <p className="text-[11px] text-neutral-400">
                  Präzisiere deine Suche nach Restaurant-Locations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-neutral-800 bg-[#181818] p-1.5 text-neutral-300 transition hover:border-[#d1b371]/80 hover:text-[#d1b371]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-[12px]">
              {/* Search */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
                  Suchbegriff
                </label>
                <div className="flex items-center rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-1.5 text-[13px] transition focus-within:border-[#d1b371]/80 focus-within:bg-[#171717] focus-within:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]">
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Stadt, Restaurant, Stichwort..."
                    className="w-full bg-transparent py-1 text-[13px] text-neutral-100 outline-none placeholder:text-neutral-500"
                  />
                </div>
              </div>

              {/* Country & City */}
              <FilterSelect
                label="Land"
                value={country}
                onChange={setCountry}
                options={COUNTRIES.map(c => ({
                  value: c.code,
                  label: c.name,
                }))}
              />

              <FilterSelect
                label="Stadt"
                value={city}
                onChange={setCity}
                options={CITIES.map(c => ({
                  value: c,
                  label: c,
                }))}
              />

              <FilterSelect
                label="Location-Typ"
                value={type}
                onChange={setType}
                options={VENUE_TYPES.map(t => ({
                  value: t,
                  label: t,
                }))}
              />

              {/* Min capacity */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
                  Mindestkapazität
                </label>
                <div className="flex items-center rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-1.5 text-[13px] transition focus-within:border-[#d1b371]/80 focus-within:bg-[#171717] focus-within:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]">
                  <input
                    type="number"
                    min={0}
                    value={minCapacity}
                    onChange={e => setMinCapacity(e.target.value)}
                    placeholder="z.B. 60"
                    className="w-full bg-transparent py-1 text-[13px] text-neutral-100 outline-none placeholder:text-neutral-500"
                  />
                  <span className="ml-1 text-[11px] text-neutral-500">
                    Gäste
                  </span>
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
                  Sortierung
                </label>
                <div className="inline-flex gap-1 rounded-full border border-neutral-800 bg-[#151515] p-1">
                  <button
                    type="button"
                    onClick={() => setSort('empfohlen')}
                    className={[
                      'rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] transition',
                      sort === 'empfohlen'
                        ? 'bg-[#d1b371] text-[#141414]'
                        : 'text-neutral-300 hover:bg-neutral-800',
                    ].join(' ')}
                  >
                    Empfohlen
                  </button>
                  <button
                    type="button"
                    onClick={() => setSort('kapazitaet')}
                    className={[
                      'rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] transition',
                      sort === 'kapazitaet'
                        ? 'bg-[#d1b371] text-[#141414]'
                        : 'text-neutral-300 hover:bg-neutral-800',
                    ].join(' ')}
                  >
                    Kapazität
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-400">
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setCountry('all');
                  setCity('Alle Städte');
                  setType('Alle Location-Typen');
                  setMinCapacity('');
                  setSort('empfohlen');
                }}
                className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 underline-offset-2 hover:text-neutral-200 hover:underline"
              >
                Filter zurücksetzen
              </button>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="rounded-full border border-[#d1b371]/70 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1b1b1b] shadow-[0_12px_35px_rgba(0,0,0,0.9)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Ergebnisse anzeigen
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* Helper components */

type FilterSelectProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
};

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: FilterSelectProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-300">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-neutral-800 bg-[#151515] px-3 py-2 pr-8 text-[13px] text-neutral-100 outline-none transition focus:border-[#d1b371]/80 focus:bg-[#171717] focus:shadow-[0_0_0_1px_rgba(209,179,113,0.4)]"
        >
          {options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-[#151515]"
            >
              {opt.label}
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

function VenueCard({ venue }: { venue: Venue }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-900 bg-[#101010] shadow-[0_18px_50px_rgba(0,0,0,0.85)] transition hover:border-[#d1b371]/60 hover:shadow-[0_24px_70px_rgba(0,0,0,0.95)]">
      {/* Image */}
      <div className="relative h-44 overflow-hidden md:h-48">
        <img
          src={venue.image}
          alt={venue.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Country pill */}
        <div className="absolute left-3 top-3 rounded-full border border-[#d1b371]/60 bg-black/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#d1b371]">
          {venue.country}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">
            {venue.city} • {venue.type}
          </p>
          <h2 className="mt-1 text-sm font-semibold text-neutral-50">
            {venue.name}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-neutral-400">
          <span className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-[#141414] px-2 py-1">
            <span className="h-[6px] w-[6px] rounded-full bg-[#d1b371]" />
            {venue.capacity}
          </span>
          {venue.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-neutral-800 bg-[#141414] px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-1 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Verifizierter Eintrag • EventPlaces</span>
          <button
            type="button"
            className="rounded-full border border-neutral-700 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-200 transition hover:border-[#d1b371]/70 hover:bg-[#181818] hover:text-[#d1b371]"
          >
            Details ansehen
          </button>
        </div>
      </div>
    </article>
  );
}

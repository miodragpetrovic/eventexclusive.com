// app/ueber-uns/page.tsx
'use client';

export default function UeberUnsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100">
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6 md:pb-20 md:pt-14">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d1b371]/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#d1b371]/5 blur-3xl" />
        </div>

        {/* Header / Hero */}
        <section className="relative mb-10 md:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
            Über uns
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-50 md:text-3xl">
            EventPlaces – kuratierte Event-Locations weltweit
          </h1>
          <p className="mt-3 max-w-2xl text-[12px] leading-relaxed text-neutral-400 md:text-[13px]">
            EventPlaces bringt Marken, Agenturen und private Hosts mit
            Restaurants &amp; Event-Locations zusammen, die mehr sind als nur
            ein Raum. Unser Anspruch: jede Location ist handverlesen, klar
            positioniert und bereit für besondere Anlässe.
          </p>

          {/* Key stats */}
          <div className="mt-6 grid gap-3 text-[11px] text-neutral-300 md:grid-cols-3">
            <StatBadge
              label="Kuratierte Locations"
              value="100+"
              hint="in Europa &amp; ausgewählten internationalen Metropolen"
            />
            <StatBadge
              label="Fokus"
              value="Brand Events &amp; Fine Dining"
              hint="von C-Level Dinners bis Produktlaunches"
            />
            <StatBadge
              label="Arbeitsweise"
              value="Kuratiert, unabhängig"
              hint="kein Massen-Listing, sondern gezielte Auswahl"
            />
          </div>
        </section>

        {/* Mission & Approach */}
        <section className="relative mb-10 grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-8">
          <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.9)] md:p-6">
            <h2 className="text-sm font-semibold text-neutral-50">
              Unsere Mission
            </h2>
            <p className="mt-2 text-[12px] leading-relaxed text-neutral-300 md:text-[13px]">
              Wir glauben, dass starke Marken und besondere Anlässe Räume
              verdienen, die dies widerspiegeln – atmosphärisch, kulinarisch
              und im Service. EventPlaces wurde gegründet, um genau solche
              Locations sichtbar zu machen und den Weg von der Idee zur
              passenden Venue zu verkürzen.
            </p>
            <p className="mt-3 text-[12px] leading-relaxed text-neutral-400">
              Statt unendlicher Listen und generischer Suchmasken setzen wir
              auf kuratierte Auswahl, klare Informationen und persönliche
              Betreuung. Für Gastgeber:innen, die Wert auf Qualität legen –
              und für Häuser, die diese Qualität konsequent leben.
            </p>

            <div className="mt-4 grid gap-3 text-[12px] md:grid-cols-2">
              <BulletItem
                title="Für Locations"
                text="Mehr Sichtbarkeit bei den richtigen Zielgruppen, klar positioniert und redaktionell aufbereitet."
              />
              <BulletItem
                title="Für Brands &amp; Agenturen"
                text="Zeitersparnis, verlässliche Empfehlungen und direkte Ansprechpartner:innen auf Location-Seite."
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl border border-neutral-900 bg-[#0f0f0f] p-5">
              <h3 className="text-sm font-semibold text-neutral-50">
                Wie wir kuratieren
              </h3>
              <ul className="mt-3 space-y-2 text-[12px] text-neutral-300">
                <li>
                  <span className="mr-2 inline-block h-[6px] w-[6px] rounded-full bg-[#d1b371]" />
                  Fokus auf klaren Konzepten statt &quot;für alles geeignet&quot;.
                </li>
                <li>
                  <span className="mr-2 inline-block h-[6px] w-[6px] rounded-full bg-[#d1b371]" />
                  Prüfung von Lage, Erreichbarkeit, Kapazität &amp;
                  kulinarischem Niveau.
                </li>
                <li>
                  <span className="mr-2 inline-block h-[6px] w-[6px] rounded-full bg-[#d1b371]" />
                  Feedback aus realen Veranstaltungen fließt in die Bewertung
                  ein.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-[#0f0f0f] p-5 text-[12px] text-neutral-300">
              <h3 className="text-sm font-semibold text-neutral-50">
                Wofür EventPlaces nicht steht
              </h3>
              <p className="mt-2 text-[12px] text-neutral-400">
                Keine Massenplattform, keine versteckten Ranking-Gebühren, kein
                &quot;alle Listings sind gleich&quot;. Wir arbeiten bevorzugt
                mit Häusern, die bewusst in ihre Event- &amp; Gastronomie-
                Qualität investieren.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative mb-10">
          <h2 className="mb-4 text-sm font-semibold text-neutral-50 md:text-base">
            Was uns wichtig ist
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <ValueCard
              label="Kuratiert statt beliebig"
              text="Wir listen nur Locations, hinter denen wir auch persönlich stehen können – und nehmen lieber weniger statt zu viele auf."
            />
            <ValueCard
              label="Transparenz &amp; Klarheit"
              text="Klare Angaben zu Kapazitäten, Set-ups und Use-Cases. Keine übertriebenen Versprechen, sondern realistische Szenarien."
            />
            <ValueCard
              label="Langfristige Partnerschaften"
              text="Wir denken in wiederkehrenden Anlässen – von jährlichen Dinners bis zu wiederkehrenden Brand-Events in verschiedenen Städten."
            />
          </div>
        </section>

        {/* For whom section */}
        <section className="relative">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d1b371]">
                Für Locations
              </p>
              <h3 className="mt-2 text-sm font-semibold text-neutral-50">
                Restaurants &amp; Venues mit klarem Profil
              </h3>
              <p className="mt-2 text-[12px] text-neutral-300">
                Du betreibst ein Restaurant oder eine Event-Location, die
                regelmäßig hochwertige Anlässe hostet? EventPlaces hilft dir,
                sichtbarer bei Marken und Agenturen zu werden – ohne dein Team
                mit unqualifizierten Anfragen zu überfluten.
              </p>
              <ul className="mt-3 space-y-1.5 text-[12px] text-neutral-400">
                <li>• Redaktionell aufgebautes Profil statt Standard-Listing</li>
                <li>• Kuratierter Zugang zu passenden Anfragen</li>
                <li>• Pakete für einzelne Häuser und Gruppen</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d1b371]">
                Für Auftraggeber:innen
              </p>
              <h3 className="mt-2 text-sm font-semibold text-neutral-50">
                Marken, Agenturen &amp; private Hosts
              </h3>
              <p className="mt-2 text-[12px] text-neutral-300">
                Ob Marken-Launch, CEO-Dinner, Offsite oder private Feier:
                EventPlaces dient als erste Anlaufstelle, um schnell ein Gefühl
                für passende Städte und Venues zu bekommen – und Anfragen
                gezielt zu platzieren.
              </p>
              <ul className="mt-3 space-y-1.5 text-[12px] text-neutral-400">
                <li>• Inspiration &amp; Vergleich kuratierter Locations</li>
                <li>• Direkter Kontakt zu den Häusern</li>
                <li>• Auf Wunsch: persönliche Vorschlagslisten</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Closing line */}
        <p className="relative mt-10 text-center text-[11px] text-neutral-500">
          EventPlaces • Kuratierte Event-Locations für Marken, die bewusst
          hosten.
        </p>
      </div>
    </main>
  );
}

/* Helper components */

type StatBadgeProps = {
  label: string;
  value: string;
  hint?: string;
};

function StatBadge({ label, value, hint }: StatBadgeProps) {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-[#101010] px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.85)]">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-neutral-50">
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-[11px] text-neutral-500">{hint}</p>
      )}
    </div>
  );
}

type BulletItemProps = {
  title: string;
  text: string;
};

function BulletItem({ title, text }: BulletItemProps) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
        {title}
      </p>
      <p className="mt-1 text-[12px] text-neutral-300">{text}</p>
    </div>
  );
}

type ValueCardProps = {
  label: string;
  text: string;
};

function ValueCard({ label, text }: ValueCardProps) {
  return (
    <div className="rounded-3xl border border-neutral-900 bg-[#101010] p-5 text-[12px] text-neutral-300 shadow-[0_18px_50px_rgba(0,0,0,0.9)]">
      <h3 className="text-sm font-semibold text-neutral-50">
        {label}
      </h3>
      <p className="mt-2 text-[12px] text-neutral-400">{text}</p>
    </div>
  );
}

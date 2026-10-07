import FadeIn from '../components/FadeIn'

const SERVICES = [
  {
    name: 'PPT Making & Improving',
    desc: 'Clean, persuasive slide decks built from your content — or a full visual overhaul of the deck you already have.',
    price: 'from ₹299',
  },
  {
    name: 'Canva Designs',
    desc: 'Social posts, posters, banners and branded graphics designed to actually get noticed.',
    price: 'from ₹149',
  },
  {
    name: 'Resume / CV Making',
    desc: 'ATS-friendly, recruiter-ready resumes tailored to the exact role you are chasing.',
    price: 'from ₹249',
  },
  {
    name: 'Portfolio Making',
    desc: 'A personal portfolio site or PDF that shows off your best work with real polish.',
    price: 'from ₹499',
  },
  {
    name: 'Document Formatting',
    desc: 'Reports, theses and assignments formatted to spec — margins, citations, headers, all of it.',
    price: 'from ₹199',
  },
  {
    name: 'Video & Photo Editing',
    desc: 'Reels, project demos and photo touch-ups edited to a professional standard.',
    price: 'from ₹349',
  },
  {
    name: 'Excel & Data Work',
    desc: 'Spreadsheets, dashboards, formulas and data cleanup that actually make sense.',
    price: 'from ₹299',
  },
  {
    name: 'Notes & Study Material',
    desc: 'Clear, well-organized notes and summaries built for how you actually study.',
    price: 'from ₹149',
  },
  {
    name: 'Website Making',
    desc: 'Simple, elegant personal or project websites, built and deployed for you.',
    price: 'from ₹999',
  },
  {
    name: 'Revision Flash Cards',
    desc: 'Print-ready or digital flash card sets designed for fast, effective recall before exams.',
    price: 'from ₹99',
  },
]

export default function MenuSection() {
  return (
    <section
      id="services"
      className="relative"
      style={{
        background: 'var(--stuvio-cream)',
        borderTop: '1px solid var(--stuvio-border)',
        borderBottom: '1px solid var(--stuvio-border)',
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-20">
          <div>
            <FadeIn>
              <span className="stuvio-label">What We Make</span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2
                className="font-display mt-5"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.12,
                  color: 'var(--stuvio-ink)',
                }}
              >
                Everything your coursework and career need.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                className="mt-6 max-w-xs text-base font-light leading-relaxed"
                style={{ color: 'var(--stuvio-body)' }}
              >
                Ten services, one standard. Prices are honest starting points —
                your final quote depends on scope, and we confirm it before we
                begin.
              </p>
            </FadeIn>
          </div>
          <div>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.name} delay={Math.min(i * 0.05, 0.3)} y={16}>
                <div
                  className="menu-card flex flex-col gap-2 px-5 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8"
                  style={{ borderBottom: '1px solid var(--stuvio-border)' }}
                >
                  <div className="md:max-w-[70%]">
                    <h3
                      className="font-display text-xl md:text-2xl"
                      style={{ color: 'var(--stuvio-ink)' }}
                    >
                      {s.name}
                    </h3>
                    <p
                      className="mt-1.5 text-sm font-light leading-relaxed"
                      style={{ color: 'var(--stuvio-body)' }}
                    >
                      {s.desc}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-sm font-medium"
                    style={{ color: 'var(--stuvio-sage)' }}
                  >
                    {s.price}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

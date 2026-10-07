import FadeIn from '../components/FadeIn'

export default function ExperienceSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--stuvio-bg)' }}
    >
      {/* sage wash, decorative */}
      <div
        aria-hidden
        className="absolute -left-40 top-24 h-96 w-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(78,124,107,0.10) 0%, transparent 70%)',
        }}
      />
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:grid-cols-2 md:gap-20 md:py-36">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <span className="stuvio-label">The Stuvio Approach</span>
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
              A studio, not a marketplace.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p
              className="mt-7 text-base font-light leading-relaxed md:text-lg"
              style={{ color: 'var(--stuvio-body)' }}
            >
              Stuvio is a small team of designers, editors and academic
              specialists. When you hand us a deck, a resume or a dataset, it
              goes to a real person with real taste — not into a queue of
              anonymous gig workers.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p
              className="mt-5 text-base font-light leading-relaxed md:text-lg"
              style={{ color: 'var(--stuvio-body)' }}
            >
              We keep turnaround fast, prices student-friendly, and the
              standard of polish identical whether it's a two-page CV or a
              forty-slide thesis defense. You always know who made your work,
              and you can talk to them directly.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div
              className="mt-9 flex flex-wrap gap-x-10 gap-y-4"
              style={{ color: 'var(--stuvio-sage)' }}
            >
              {['Fast turnaround', 'Honest pricing', 'One consistent standard'].map(
                (t) => (
                  <span
                    key={t}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ background: 'var(--stuvio-coral)' }}
                    />
                    {t}
                  </span>
                )
              )}
            </div>
          </FadeIn>
        </div>
        <FadeIn delay={0.15} className="relative">
          <div
            className="relative h-full min-h-[340px] overflow-hidden md:min-h-[520px]"
            style={{ border: '1px solid var(--stuvio-border)' }}
          >
            <img
              src={`${import.meta.env.BASE_URL}frames/frame_0096.jpg`}
              alt="A designer's desk inside the Stuvio studio, warm afternoon light"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(24,20,16,0.25) 0%, transparent 40%)',
              }}
            />
            <div
              className="absolute bottom-5 left-5 px-4 py-3"
              style={{
                background: 'rgba(250,247,242,0.92)',
                backdropFilter: 'blur(6px)',
                border: '1px solid var(--stuvio-border)',
              }}
            >
              <span className="stuvio-label" style={{ letterSpacing: '0.2em' }}>
                The studio, 4:47 pm
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

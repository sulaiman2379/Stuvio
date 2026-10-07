import FadeIn from '../components/FadeIn'

export default function StorySection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--stuvio-bg)' }}
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <FadeIn className="relative order-2 md:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div
                className="mt-10 overflow-hidden"
                style={{ border: '1px solid var(--stuvio-border)' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}frames/frame_0128.jpg`}
                  alt="Editing bay inside the studio"
                  className="h-64 w-full object-cover md:h-80"
                  loading="lazy"
                />
              </div>
              <div
                className="overflow-hidden"
                style={{ border: '1px solid var(--stuvio-border)' }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}frames/frame_0160.jpg`}
                  alt="Study corner with stacked notebooks"
                  className="h-64 w-full object-cover md:h-80"
                  loading="lazy"
                />
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -bottom-8 -right-8 -z-10 h-48 w-48"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,107,74,0.14) 0%, transparent 70%)',
              }}
            />
          </FadeIn>
          <div className="order-1 flex flex-col justify-center md:order-2">
            <FadeIn>
              <span className="stuvio-label">Our Story</span>
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
                Built by people who've been where you are.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                className="mt-7 text-base font-light leading-relaxed md:text-lg"
                style={{ color: 'var(--stuvio-body)' }}
              >
                Stuvio started the way most student projects do — at 2 a.m.,
                the night before a deadline, fighting with slide layouts and a
                resume that refused to fit on one page.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p
                className="mt-5 text-base font-light leading-relaxed md:text-lg"
                style={{ color: 'var(--stuvio-body)' }}
              >
                The people behind it went on to do this work professionally.
                Now we do it for you — quickly, carefully, and without
                judgment. We remember what it's like, so we built the studio
                we wished existed back then.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p
                className="font-display mt-8 text-xl italic leading-snug md:text-2xl"
                style={{ color: 'var(--stuvio-sage)' }}
              >
                "Hand in work you're proud of. We'll handle the polish."
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

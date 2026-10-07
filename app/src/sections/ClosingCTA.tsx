import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'

const WHATSAPP_URL =
  'https://wa.me/918977860129?text=' +
  encodeURIComponent("Hi Stuvio! I'd like to start a project.")

export default function ClosingCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'var(--stuvio-bg)',
        borderTop: '1px solid var(--stuvio-border)',
      }}
    >
      {/* warm radial glow behind the CTA */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[560px] w-[860px] max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'radial-gradient(ellipse, rgba(255,107,74,0.12) 0%, transparent 70%)',
        }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center md:py-44">
        <FadeIn>
          <span className="stuvio-label">Ready When You Are</span>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2
            className="font-display mt-6"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              color: 'var(--stuvio-ink)',
            }}
          >
            Stop stressing over the deck.
            <br />
            <em style={{ color: 'var(--stuvio-coral)' }}>
              Let us make it beautiful.
            </em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p
            className="mt-7 max-w-[480px] text-base font-light leading-relaxed md:text-lg"
            style={{ color: 'var(--stuvio-body)' }}
          >
            Tell us what you're working on and when it's due. We'll reply with
            a plan and a price — usually within the hour.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block cursor-pointer no-underline"
            style={{
              background: 'var(--stuvio-coral)',
              color: '#fff',
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '1rem 3rem',
            }}
            whileHover={{
              scale: 1.04,
              background: '#FF8A6B',
              boxShadow: '0 14px 36px rgba(255,107,74,0.3)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
        </FadeIn>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import FadeIn from '../components/FadeIn'

const WHATSAPP_URL =
  'https://wa.me/918977860129?text=' +
  encodeURIComponent("Hi Stuvio! I'd like to start a project.")

function WhatsAppIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

export default function ContactStrip() {
  return (
    <footer
      style={{
        background: 'var(--stuvio-cream)',
        borderTop: '1px solid var(--stuvio-border)',
      }}
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 px-6 py-16 text-center md:py-20">
        <FadeIn y={12}>
          <span className="stuvio-label">Talk to Us</span>
        </FadeIn>
        <FadeIn y={12} delay={0.1}>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-3 no-underline"
            style={{
              background: '#1F2430',
              color: '#FAF7F2',
              fontWeight: 500,
              fontSize: '0.95rem',
              letterSpacing: '0.02em',
              padding: '1rem 2.4rem',
              borderRadius: '999px',
            }}
            whileHover={{
              scale: 1.04,
              background: '#25D366',
              color: '#0b241a',
              boxShadow: '0 14px 36px rgba(37,211,102,0.3)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <WhatsAppIcon />
            Chat on WhatsApp · +91 89778 60129
          </motion.a>
        </FadeIn>
        <FadeIn y={12} delay={0.2}>
          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-5">
            <a
              href="tel:+918977860129"
              className="text-base font-medium no-underline transition-colors md:text-lg"
              style={{ color: 'var(--stuvio-ink)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--stuvio-coral)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--stuvio-ink)')
              }
            >
              +91 89778 60129
            </a>
            <span
              aria-hidden
              className="hidden md:inline-block"
              style={{ color: 'var(--stuvio-dim)' }}
            >
              ·
            </span>
            <a
              href="tel:+917995494616"
              className="text-base font-medium no-underline transition-colors md:text-lg"
              style={{ color: 'var(--stuvio-ink)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--stuvio-coral)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--stuvio-ink)')
              }
            >
              +91 79954 94616
            </a>
          </div>
        </FadeIn>
        <FadeIn y={12} delay={0.3}>
          <p
            className="text-xs font-light"
            style={{ color: 'var(--stuvio-dim)' }}
          >
            Stuvio — Student Creative &amp; Academic Services
          </p>
        </FadeIn>
      </div>
    </footer>
  )
}

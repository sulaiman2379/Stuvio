import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'

// Exact number of frames extracted into public/frames (see build pipeline).
const FRAME_COUNT = 241
const FRAME_PATH = (i: number) =>
  `${import.meta.env.BASE_URL}frames/frame_${String(i + 1).padStart(4, '0')}.jpg`

const EASE_OUT = [0.16, 1, 0.3, 1] as const
const WHATSAPP_URL =
  'https://wa.me/918977860129?text=' +
  encodeURIComponent("Hi Stuvio! I'd like to start a project.")

function useDesktopEffects() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setEnabled(fine.matches && !reduced.matches)
    update()
    fine.addEventListener('change', update)
    reduced.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      reduced.removeEventListener('change', update)
    }
  }, [])
  return enabled
}

export default function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const grainRef = useRef<HTMLDivElement>(null)

  const progress = useMotionValue(0)
  const progressRef = useRef(0)
  const wantedRef = useRef(0)
  const currentRef = useRef(-1)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const rafRef = useRef(0)

  const desktopFx = useDesktopEffects()

  // Pointer-reactive parallax (desktop only)
  const rawMx = useMotionValue(0)
  const rawMy = useMotionValue(0)
  const mx = useSpring(rawMx, { stiffness: 60, damping: 20, mass: 0.6 })
  const my = useSpring(rawMy, { stiffness: 60, damping: 20, mass: 0.6 })
  const parX = useTransform(mx, (v) => (desktopFx ? v * -4 : 0))
  const parY = useTransform(my, (v) => (desktopFx ? v * -3 : 0))
  const parXSoft = useTransform(mx, (v) => (desktopFx ? v * -2 : 0))
  const parYSoft = useTransform(my, (v) => (desktopFx ? v * -1.5 : 0))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(canvas.clientHeight * dpr)
      const idx = currentRef.current >= 0 ? currentRef.current : wantedRef.current
      if (draw(idx)) currentRef.current = idx
    }

    const draw = (index: number): boolean => {
      const cw = canvas.width
      const ch = canvas.height
      if (cw === 0 || ch === 0) return false
      const img = imagesRef.current[index]
      ctx.fillStyle = '#FAF7F2'
      ctx.fillRect(0, 0, cw, ch)
      if (!img || !img.complete || img.naturalWidth === 0) return false
      // Ken-Burns micro-zoom: slow, continuous drift tied to scroll progress
      const kb = 1 + 0.035 * progressRef.current
      const scale =
        Math.max(cw / img.naturalWidth, ch / img.naturalHeight) * kb
      const dw = img.naturalWidth * scale
      const dh = img.naturalHeight * scale
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
      return true
    }

    // Preload frames; each frame paints itself if it is the wanted one
    const images: HTMLImageElement[] = new Array(FRAME_COUNT)
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.src = FRAME_PATH(i)
      img.onload = () => {
        if (i === wantedRef.current && currentRef.current !== i) {
          if (draw(i)) currentRef.current = i
        }
      }
      images[i] = img
    }
    imagesRef.current = images

    // rAF loop — no scroll listeners
    const tick = () => {
      const cont = containerRef.current
      if (cont) {
        const rect = cont.getBoundingClientRect()
        const range = cont.offsetHeight - window.innerHeight
        const p = range > 0 ? Math.max(0, Math.min(1, -rect.top / range)) : 0
        progressRef.current = p
        progress.set(p)
        const target = Math.round(p * (FRAME_COUNT - 1))
        wantedRef.current = target
        if (target !== currentRef.current) {
          if (draw(target)) currentRef.current = target
        } else if (currentRef.current >= 0) {
          // keep Ken-Burns drift alive even when the frame index holds
          draw(currentRef.current)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    // Film grain: procedurally generated noise tile (no asset dependency)
    const noise = document.createElement('canvas')
    noise.width = 128
    noise.height = 128
    const nctx = noise.getContext('2d')
    if (nctx && grainRef.current) {
      const data = nctx.createImageData(128, 128)
      for (let i = 0; i < data.data.length; i += 4) {
        const v = Math.floor(Math.random() * 255)
        data.data[i] = v
        data.data[i + 1] = v
        data.data[i + 2] = v
        data.data[i + 3] = 255
      }
      nctx.putImageData(data, 0, 0)
      grainRef.current.style.backgroundImage = `url(${noise.toDataURL()})`
    }

    const onPointerMove = (e: PointerEvent) => {
      rawMx.set((e.clientX / window.innerWidth) * 2 - 1)
      rawMy.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('resize', resize)
    resize()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', resize)
    }
  }, [progress, rawMx, rawMy])

  /* ── Scroll-driven text beats (same progress as the canvas) ── */

  // Beat 1 — identity block: fades / rises out over 0 → 0.12
  const idOpacity = useTransform(progress, [0, 0.1, 0.12], [1, 0.35, 0])
  const idY = useTransform(progress, [0, 0.12], [0, -48])
  const idScale = useTransform(progress, [0, 0.12], [1, 0.97])

  // Beat 2 — right-side paragraph: in ~0.20, out by ~0.46
  const rOpacity = useTransform(progress, [0.2, 0.28, 0.38, 0.46], [0, 1, 1, 0])
  const rX = useTransform(progress, [0.2, 0.28, 0.38, 0.46], [40, 0, 0, 60])
  const rRot = useTransform(
    progress,
    [0.2, 0.28, 0.38, 0.46],
    desktopFx ? [6, 0, 0, -6] : [0, 0, 0, 0]
  )

  // Beat 3 — left-side paragraph: in ~0.50, out by ~0.80
  const lOpacity = useTransform(progress, [0.5, 0.58, 0.72, 0.8], [0, 1, 1, 0])
  const lX = useTransform(progress, [0.5, 0.58, 0.72, 0.8], [-40, 0, 0, -60])
  const lRot = useTransform(
    progress,
    [0.5, 0.58, 0.72, 0.8],
    desktopFx ? [-6, 0, 0, 6] : [0, 0, 0, 0]
  )

  // Beat 4 — closing center title + CTA: in 0.86 → 0.96, holds through 1.0
  const fOpacity = useTransform(progress, [0.86, 0.96], [0, 1])
  const fY = useTransform(progress, [0.86, 0.96], [36, 0])
  const fBlur = useTransform(progress, [0.86, 0.96], [8, 0])
  const fFilter = useTransform(fBlur, (b) => `blur(${b.toFixed(2)}px)`)
  const fBackdrop = useTransform(progress, [0.84, 0.94], [0, 1])

  // Vignette breathes with the beats — heavier under text, lighter in the pauses
  const vOpacity = useTransform(
    progress,
    [0, 0.12, 0.2, 0.46, 0.5, 0.82, 0.9, 1],
    [0.45, 0.3, 0.55, 0.5, 0.55, 0.4, 0.6, 0.6]
  )

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: '600vh' }}>
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: '100vh', background: '#FAF7F2' }}
      >
        {/* Base cinematic layer */}
        <canvas ref={canvasRef} className="block h-full w-full" />

        {/* Atmosphere: grain + scroll-breathing vignette */}
        <div
          ref={grainRef}
          aria-hidden
          className="grain-layer pointer-events-none absolute inset-0"
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: vOpacity,
            background:
              'radial-gradient(ellipse at center, transparent 52%, rgba(24,20,16,0.55) 100%)',
          }}
        />

        {/* Text overlay — never gated behind loading state */}
        <div className="pointer-events-none absolute inset-0">
          {/* Beat 1 — identity */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: idOpacity, y: idY, scale: idScale }}
          >
            <motion.div
              className="relative flex max-w-2xl flex-col items-center px-6 text-center"
              style={{ x: parX, y: parY }}
            >
              <div
                aria-hidden
                className="absolute -inset-x-16 -inset-y-24 -z-10"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(24,20,16,0.55) 0%, rgba(24,20,16,0.22) 55%, transparent 80%)',
                }}
              />
              <motion.span
                className="stuvio-label"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.05, ease: EASE_OUT }}
              >
                Student Creative Services · Est. Today, Built for You
              </motion.span>
              <motion.h1
                className="font-display mt-5"
                style={{
                  fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                  lineHeight: 1.05,
                  color: '#FFF8F0',
                }}
                initial={{ opacity: 0, y: 56, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.3, delay: 0.2, ease: EASE_OUT }}
              >
                Stuvio
              </motion.h1>
              <motion.p
                className="mt-6 max-w-[460px] text-base font-light leading-relaxed md:text-lg"
                style={{ color: '#FAF7F2' }}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.4, ease: EASE_OUT }}
              >
                A small studio of designers, editors and academic specialists
                who turn your coursework, resumes and ideas into work you're
                proud to hand in.
              </motion.p>
              <motion.button
                onClick={scrollToServices}
                className="pointer-events-auto mt-9 cursor-pointer"
                style={{
                  background: 'var(--stuvio-coral)',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '0.9rem 2.6rem',
                  border: 'none',
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.55, ease: EASE_OUT }}
                whileHover={{ scale: 1.04, background: '#FF8A6B' }}
                whileTap={{ scale: 0.98 }}
              >
                See What We Make
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Beat 2 — right-side paragraph */}
          <motion.div
            className="absolute inset-0 flex items-center justify-end"
            style={{
              opacity: rOpacity,
              perspective: 1000,
            }}
          >
            <motion.div
              className="mr-[7vw] max-w-sm px-6 md:px-0"
              style={{
                x: rX,
                rotateY: rRot,
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="stuvio-label">Inside the Studio</span>
              <p
                className="font-display mt-4 text-2xl leading-snug md:text-3xl"
                style={{ color: '#FFF8F0', textShadow: '0 2px 30px rgba(24,20,16,0.5)' }}
              >
                Decks mid-edit, mood boards half-pinned, resumes in their third
                draft — this is what your project looks like while we work on
                it.
              </p>
            </motion.div>
          </motion.div>

          {/* Beat 3 — left-side paragraph */}
          <motion.div
            className="absolute inset-0 flex items-center justify-start"
            style={{
              opacity: lOpacity,
              perspective: 1000,
            }}
          >
            <motion.div
              className="ml-[7vw] max-w-sm px-6 md:px-0"
              style={{
                x: lX,
                rotateY: lRot,
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="stuvio-label">Made for Students</span>
              <p
                className="font-display mt-4 text-2xl leading-snug md:text-3xl"
                style={{ color: '#FFF8F0', textShadow: '0 2px 30px rgba(24,20,16,0.5)' }}
              >
                Real designers, academic rigor, student-friendly prices — and
                turnaround measured in hours, not weeks.
              </p>
            </motion.div>
          </motion.div>

          {/* Beat 4 — closing title + CTA, holds to the end */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            style={{
              opacity: fBackdrop,
              background:
                'radial-gradient(ellipse at center, rgba(24,20,16,0.6) 0%, rgba(24,20,16,0.25) 50%, transparent 78%)',
            }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: fOpacity, y: fY, filter: fFilter }}
          >
            <motion.div
              className="flex max-w-2xl flex-col items-center px-6 text-center"
              style={{ x: parXSoft, y: parYSoft }}
            >
              <span className="stuvio-label">Slots Open This Week</span>
              <h2
                className="font-display mt-5"
                style={{
                  fontSize: 'clamp(2.4rem, 6vw, 5.2rem)',
                  lineHeight: 1.08,
                  color: '#FFF8F0',
                  maxWidth: '18ch',
                }}
              >
                Your best work, made simple.
              </h2>
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto mt-9 inline-block cursor-pointer no-underline"
                style={{
                  background: 'var(--stuvio-coral)',
                  color: '#fff',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  padding: '0.9rem 2.6rem',
                }}
                whileHover={{
                  scale: 1.04,
                  background: '#FF8A6B',
                  boxShadow: '0 12px 32px rgba(255,107,74,0.35)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Project
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

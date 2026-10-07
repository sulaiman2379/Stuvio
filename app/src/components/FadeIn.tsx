import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = '',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

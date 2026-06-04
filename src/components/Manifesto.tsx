import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Lang = 'en' | 'ru'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

const copy = {
  en: {
    eyebrow: '// manifesto',
    title: 'We destroy mediocrity.',
    statements: [
      'The market is trapped in templates.',
      'Agencies sell process — not results.',
      'We build weapons, not deliverables.',
    ],
    closing: 'One standard. No exceptions.',
  },
  ru: {
    eyebrow: '// манифест',
    title: 'Мы уничтожаем посредственность.',
    statements: [
      'Рынок застрял в шаблонах.',
      'Агентства продают процесс — не результат.',
      'Мы создаём оружие, а не просто продукты.',
    ],
    closing: 'Один стандарт. Без исключений.',
  },
}

export default function Manifesto({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-12%' })

  return (
    <section
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden"
    >
      {/* Subtle center radial */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 60%)' }}
        />
      </div>

      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04) 50%, transparent)' }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl w-full">

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/20 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE }}
        >
          {t.eyebrow}
        </motion.p>

        {/* Giant shimmer title */}
        <motion.h2
          className="text-shimmer font-display font-bold leading-[1.06] tracking-tight mb-16"
          style={{ fontSize: 'clamp(36px, 6.5vw, 84px)' }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, ease: EASE, delay: 0.1 }}
        >
          {t.title}
        </motion.h2>

        {/* Statements — staggered reveal with left-aligned hairline */}
        <div className="flex flex-col gap-0 max-w-xl mx-auto mb-16">
          {t.statements.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: EASE, delay: 0.4 + i * 0.15 }}
              className="flex items-center gap-5 py-4 border-b border-white/[0.05]"
            >
              <span
                aria-hidden
                className="font-mono text-[9px] text-white/15 tracking-widest flex-shrink-0 w-6 text-right"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-white/50 text-[15px] leading-relaxed text-left font-body">
                {s}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/30"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
        >
          {t.closing}
        </motion.p>
      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04) 50%, transparent)' }}
      />
    </section>
  )
}

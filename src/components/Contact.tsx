import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Lang = 'en' | 'ru'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

const copy = {
  en: {
    eyebrow: '// contact',
    title: 'Ready to\nDominate?',
    sub: 'We choose who we work with.',
    email: 'ceo@triumphgroup.cc',
  },
  ru: {
    eyebrow: '// контакт',
    title: 'Готовы\nДоминировать?',
    sub: 'Мы выбираем, с кем работаем.',
    email: 'ceo@triumphgroup.cc',
  },
}

export default function Contact({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section
      id="contact"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6"
    >
      {/* Deep vignette radial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(255,255,255,0.025) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl w-full">

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-white/20 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
        >
          {t.eyebrow}
        </motion.p>

        {/* Giant title — opacity + subtle y (no overflow clip = no RU clipping bug) */}
        <motion.h2
          className="font-display font-bold leading-[1.04] tracking-tight whitespace-pre-line mb-4"
          style={{ fontSize: 'clamp(52px, 9vw, 120px)' }}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        >
          <span className="text-gradient">{t.title}</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          className="text-zinc-500 text-[15px] mb-20"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
        >
          {t.sub}
        </motion.p>

        {/* Giant glowing email */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
          className="flex flex-col items-center gap-6"
        >
          <a
            href={`mailto:${t.email}`}
            id="contact-email-link"
            className="group relative font-display font-bold text-white/70 hover:text-white transition-all duration-500"
            style={{ fontSize: 'clamp(20px, 4vw, 52px)' }}
          >
            {/* Glow behind text on hover */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            />
            <span className="relative" style={{
              filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))',
              transition: 'filter 600ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 28px rgba(255,255,255,0.25))')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'drop-shadow(0 0 0px rgba(255,255,255,0))')}
            >
              {t.email}
            </span>
          </a>
        </motion.div>

      </div>

      {/* Bottom hairline */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }}
      />
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type Lang = 'en' | 'ru'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

const copy = {
  en: {
    eyebrow: '// founder',
    name: 'CEO, Triumph Group',
    sig: 'Founder & CEO',
    quote:
      'The market is stuck in templates. Agencies sell process, not results. Triumph Group was created with one purpose — to become a digital weapon for business. We take the chaos of your processes and output pure profit through code and AI.',
  },
  ru: {
    eyebrow: '// основатель',
    name: 'CEO, Triumph Group',
    sig: 'Основатель и CEO',
    quote:
      'Рынок застрял в шаблонах. Агентства продают процесс, а не результат. Triumph Group создавался с одной целью — стать цифровым оружием для бизнеса. Мы забираем хаос ваших процессов и выдаём чистую прибыль через код и ИИ.',
  },
}

export default function Founder({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16 items-start"
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {/* Left — avatar + name */}
        <div className="flex flex-col items-center lg:items-start gap-5">
          <div className="relative w-[180px] h-[180px] rounded-full border border-white/[0.04] bg-[#0c0c0d] flex items-center justify-center overflow-hidden shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] group">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />
            
            {/* Animated rings */}
            <motion.div
              className="absolute inset-4 rounded-full border border-white/[0.03]"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              style={{ borderTopColor: 'rgba(255,255,255,0.1)' }}
            />
            <motion.div
              className="absolute inset-8 rounded-full border border-white/[0.05]"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{ borderLeftColor: 'rgba(255,255,255,0.15)' }}
            />
            <motion.div
              className="absolute inset-[52px] rounded-full border border-white/[0.08]"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ borderRightColor: 'rgba(255,255,255,0.2)' }}
            />
            
            {/* Core */}
            <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
          </div>
          <p className="font-mono text-[12px] text-white/25 tracking-wide text-center lg:text-left">{t.name}</p>
        </div>

        {/* Right — quote */}
        <div className="relative">
          {/* Eyebrow */}
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-8">{t.eyebrow}</p>

          {/* Giant decorative quote mark */}
          <span
            aria-hidden
            className="absolute -top-4 -left-6 lg:-left-10 font-display font-bold text-white/[0.04] select-none pointer-events-none leading-none"
            style={{ fontSize: '160px' }}
          >
            &ldquo;
          </span>

          {/* Statement */}
          <blockquote className="relative z-10">
            <motion.p
              className="font-display text-white/70 leading-[1.65] italic"
              style={{ fontSize: 'clamp(18px, 2.2vw, 26px)' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
            >
              {t.quote.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 4 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.04, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </blockquote>

          {/* Signature line */}
          <div className="mt-10">
            <div
              className="h-px w-20 mb-4"
              style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)' }}
            />
            <p className="font-mono text-[11px] text-white/20 tracking-[0.15em] uppercase">{t.sig}</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

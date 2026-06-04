import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

type Lang = 'en' | 'ru'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

const copy = {
  en: {
    eyebrow: '// about',
    title: 'Not an agency.\nA digital syndicate.',
    body: 'Triumph Group is a closed infrastructure for AI-media and IT solutions. We engineer dominance, not deliverables. Four autonomous tech units, one uncompromising standard.',
    metrics: [
      { value: '×3',  label: 'Average conversion growth',   bar: 0.82 },
      { value: '4',   label: 'Elite autonomous units',       bar: 1.0  },
      { value: 'AI',  label: 'First — always',               bar: 0.96 },
    ],
  },
  ru: {
    eyebrow: '// о нас',
    title: 'Не агентство.\nЦифровой синдикат.',
    body: 'Triumph Group — закрытая инфраструктура для AI-медиа и IT-решений. Мы создаём доминирование, а не просто продукты. Четыре автономных технологических юнита, один бескомпромиссный стандарт.',
    metrics: [
      { value: '×3',  label: 'Рост конверсии в среднем',    bar: 0.82 },
      { value: '4',   label: 'Элитных автономных юнита',    bar: 1.0  },
      { value: 'AI',  label: 'First — всегда',               bar: 0.96 },
    ],
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE } },
}

export default function About({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="about" className="relative py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">

      {/* Background spotlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[120px]" style={{ background: 'rgba(255,255,255,0.025)' }} />
      </div>

      <div ref={ref} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.p variants={fadeUp} className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-5">
            {t.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold tracking-tight leading-[1.15] mb-6 text-gradient whitespace-pre-line"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
          >
            {t.title}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-zinc-400 leading-relaxed text-[16px]">
            {t.body}
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col gap-3 lg:pt-10"
        >
          {t.metrics.map((m) => (
            <motion.div
              key={m.value}
              variants={fadeUp}
              className="spotlight-card group flex flex-col gap-3 px-6 py-5 rounded-xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="font-display text-[40px] font-bold text-gradient leading-none w-20 flex-shrink-0">{m.value}</div>
                <div className="text-[13px] text-zinc-500 font-medium leading-snug">{m.label}</div>
              </div>
              {/* Progress bar */}
              <div className="h-px w-full bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.35))' }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${m.bar * 100}%` } : { width: 0 }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

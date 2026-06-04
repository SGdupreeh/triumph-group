import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { Code2, Sparkles, Network } from 'lucide-react'

type Lang = 'en' | 'ru'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

const copy = {
  en: {
    eyebrow: '// ecosystem',
    title: 'Architecture of Absolute Domination',
    sub: 'One unit is a tool. The full system is a weapon.',
    nodes: [
      { icon: Sparkles, name: 'Labs', desc: 'Generates viral reach and floods traffic.' },
      { icon: Code2,    name: 'Codes', desc: 'Captures traffic on ultra-fast interfaces.' },
      { icon: Network,  name: 'Systems', desc: 'AI agents close leads 24/7 in messengers.' },
    ],
    arrows: ['Traffic', 'Leads', 'Conversion'],
  },
  ru: {
    eyebrow: '// экосистема',
    title: 'Архитектура абсолютного доминирования',
    sub: 'Один юнит — это инструмент. Полная система — оружие.',
    nodes: [
      { icon: Sparkles, name: 'Labs', desc: 'Генерирует вирусный охват и заливает трафик.' },
      { icon: Code2,    name: 'Codes', desc: 'Принимает трафик на сверхбыстрые интерфейсы.' },
      { icon: Network,  name: 'Systems', desc: 'ИИ-агенты дожимают лидов 24/7 в мессенджерах.' },
    ],
    arrows: ['Трафик', 'Лиды', 'Конверсия'],
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
}

/** Animated connector rendered BETWEEN cards in the flex row — never behind them */
function Connector({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 w-16 gap-2 relative">
      {/* Label */}
      <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase whitespace-nowrap">
        {label}
      </span>

      {/* Animated line — lives only in the gap, never behind a card */}
      <div className="relative w-full h-px overflow-visible">
        {/* Static track */}
        <div className="absolute inset-0 bg-white/[0.06]" />
        {/* Animated pulse */}
        <div
          className="absolute top-0 h-px w-6 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            animation: `pulse-slide 1.8s linear ${delay}s infinite`,
          }}
        />
      </div>

      {/* Arrow tip */}
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden>
        <path d="M0 3 L4 1 L4 5 Z" fill="rgba(255,255,255,0.2)" />
      </svg>
    </div>
  )
}

/** Loop-back bar rendered BELOW the cards row */
function LoopBack({ inView }: { inView: boolean }) {
  return (
    <div className="hidden lg:block relative h-8 mt-0 mx-8">
      {/* Left vertical drop */}
      <div className="absolute left-0 top-0 w-px h-full bg-white/[0.05]" />
      {/* Right vertical drop */}
      <div className="absolute right-0 top-0 w-px h-full bg-white/[0.05]" />
      {/* Bottom horizontal return */}
      <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.04]" />
        <div
          className="absolute top-0 h-px w-12 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: inView ? 'pulse-reverse 3s linear infinite' : 'none',
          }}
        />
      </div>
    </div>
  )
}

export default function Flywheel({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section className="relative py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">

      {/* Background spotlight — monochrome only */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[120px]"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        />
      </div>

      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">{t.eyebrow}</p>
        <h2 className="font-display font-bold tracking-tight text-gradient" style={{ fontSize: 'clamp(28px, 4.5vw, 50px)' }}>
          {t.title}
        </h2>
      </motion.div>

      {/* Node graph */}
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="max-w-4xl mx-auto"
      >
        {/* Desktop: flex row with connector elements IN THE GAPS */}
        <div className="hidden lg:flex items-center">
          {t.nodes.map((node, i) => {
            const Icon = node.icon
            return (
              <div key={node.name} className="contents">
                {/* Connector BEFORE card (except first) */}
                {i > 0 && <Connector label={t.arrows[i - 1]} delay={i * 0.6} />}

                <motion.div variants={fadeUp} className="flex-1 min-w-0">
                  <div className="spotlight-card group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300">
                    <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mb-5 group-hover:border-white/20 transition-colors duration-300">
                      <Icon size={24} className="text-white/40 group-hover:text-white/70 transition-colors duration-300" strokeWidth={1.25} />
                    </div>
                    <h3 className="font-display text-[18px] font-semibold text-white/90 mb-2">{node.name}</h3>
                    <p className="text-zinc-500 text-[13px] leading-relaxed">{node.desc}</p>
                    <span className="absolute top-3 right-4 font-mono text-[10px] text-white/10 tracking-widest">0{i + 1}</span>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Loop-back bar — BELOW the cards, never overlapping */}
        <LoopBack inView={inView} />

        {/* Mobile: vertical stack with labels between */}
        <div className="flex flex-col gap-0 lg:hidden">
          {t.nodes.map((node, i) => {
            const Icon = node.icon
            return (
              <div key={node.name}>
                {i > 0 && (
                  <div className="flex items-center justify-center py-3 gap-2">
                    <div className="flex-1 h-px bg-white/[0.06]" />
                    <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">{t.arrows[i - 1]}</span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>
                )}
                <motion.div variants={fadeUp}>
                  <div className="spotlight-card group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] hover:bg-white/[0.05] hover:border-white/[0.15] transition-all duration-300">
                    <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mb-5">
                      <Icon size={24} className="text-white/40" strokeWidth={1.25} />
                    </div>
                    <h3 className="font-display text-[18px] font-semibold text-white/90 mb-2">{node.name}</h3>
                    <p className="text-zinc-500 text-[13px] leading-relaxed">{node.desc}</p>
                    <span className="absolute top-3 right-4 font-mono text-[10px] text-white/10 tracking-widest">0{i + 1}</span>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Sub text */}
      <motion.p
        className="text-center mt-10 text-zinc-600 text-[13px] tracking-[0.1em] uppercase font-mono"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
      >
        {t.sub}
      </motion.p>

      {/* CSS keyframes */}
      <style>{`
        @keyframes pulse-slide {
          0%   { left: -24px; }
          100% { left: calc(100% + 24px); }
        }
        @keyframes pulse-reverse {
          0%   { right: -48px; left: auto; }
          100% { right: calc(100% + 48px); left: auto; }
        }
      `}</style>
    </section>
  )
}

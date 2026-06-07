import { useRef, useEffect } from 'react'
import { Code2, Sparkles, Network } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'ru'

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

function Connector({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 w-24 xl:w-32 gap-2 relative">
      <span className="connector-label opacity-0 font-mono text-[10px] text-white/40 tracking-widest uppercase whitespace-nowrap">
        {label}
      </span>

      <div className="relative w-full h-px overflow-visible mt-2">
        <div className="connector-line absolute left-0 top-0 h-full bg-white/[0.06]" style={{ width: "0%" }} />
        
        <div
          className="connector-pulse absolute top-0 h-px w-6 rounded-full opacity-0"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            animation: `pulse-slide 1.8s linear ${delay}s infinite`,
          }}
        />
      </div>

      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden className="connector-arrow mt-1 opacity-0">
        <path d="M0 3 L4 1 L4 5 Z" fill="rgba(255,255,255,0.4)" />
      </svg>
    </div>
  )
}

export default function Flywheel({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.0,
          start: "top top",
          end: "+=400%", // 4 screens to fully assemble
          invalidateOnRefresh: true,
        }
      })

      // Set initial 3D isometric state
      gsap.set(".engine-3d-scene", { rotateX: 45, rotateZ: -15, rotateY: 10 })
      gsap.set(".flywheel-card", { z: 1500, opacity: 0 })
      
      // Stage 1: Cards fall into place from sky (z-axis)
      tl.to(".flywheel-card", {
        z: 0,
        opacity: 0.6, // Dimmed until fully assembled
        ease: "power3.inOut",
        stagger: 0.4,
        duration: 1.5,
        force3D: true
      })
      
      // Stage 2: Draw the laser connectors
      tl.to(".connector-line", { width: "100%", duration: 0.6, ease: "power2.inOut", stagger: 0.3 }, "+=0.2")
        .to(".connector-arrow", { opacity: 1, duration: 0.3, stagger: 0.3 }, "<")
        .to(".connector-label", { opacity: 1, duration: 0.3, stagger: 0.3 }, "<")
      
      // Hold the 3D view for a brief moment
      tl.to({}, { duration: 0.5 })

      // Stage 3: Flatten out to 2D view for reading
      tl.to(".engine-3d-scene", {
        rotateX: 0,
        rotateZ: 0,
        rotateY: 0,
        ease: "power3.inOut",
        duration: 2.0
      })
      
      // Cards reach full brightness when flattened
      tl.to(".flywheel-card", { opacity: 1, duration: 1.0 }, "<")
      
      // Activates the flowing pulses
      tl.to(".connector-pulse", { opacity: 1, duration: 0.5 }, "-=0.5")

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden bg-[#0c0c0d]">

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[120px]"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        />
      </div>

      <div className="text-center mb-16 lg:mb-24 flex-shrink-0 relative z-20">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">{t.eyebrow}</p>
        <h2 className="font-display font-bold tracking-tight text-gradient" style={{ fontSize: 'clamp(28px, 4.5vw, 50px)' }}>
          {t.title}
        </h2>
      </div>

      <div className="mx-auto lg:w-full lg:overflow-visible perspective-container" style={{ perspective: "1500px" }}>
        {/* Desktop: 3D Assembly Scene */}
        <div className="hidden lg:flex items-center justify-center flex-nowrap px-6 gap-2 xl:gap-4 w-full engine-3d-scene" style={{ transformStyle: 'preserve-3d' }}>
          {t.nodes.map((node, i) => {
            const Icon = node.icon
            return (
              <div key={node.name} className="flex items-center" style={{ transformStyle: 'preserve-3d' }}>
                {i > 0 && <Connector label={t.arrows[i - 1]} delay={i * 0.6} />}

                <div className="w-[300px] xl:w-[350px] flex-shrink-0 flywheel-card" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="spotlight-card group relative flex flex-col items-center text-center p-8 xl:p-10 rounded-2xl bg-[#0c0c0d] backdrop-blur-2xl border border-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_15px_30px_rgba(0,0,0,0.4)] hover:bg-white/[0.03] hover:border-white/[0.15] transition-all duration-300">
                    <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mb-5 xl:mb-6 group-hover:border-white/20 transition-colors duration-300 group-hover:scale-110">
                      <Icon size={28} className="text-white/40 group-hover:text-white/80 transition-colors duration-300" strokeWidth={1.25} />
                    </div>
                    <h3 className="font-display text-[20px] xl:text-[22px] font-semibold text-white/90 mb-3">{node.name}</h3>
                    <p className="text-zinc-500 text-[14px] xl:text-[15px] leading-relaxed px-2 xl:px-4">{node.desc}</p>
                    <span className="absolute top-4 right-5 font-mono text-[11px] text-white/10 tracking-widest font-bold text-4xl opacity-20">0{i + 1}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex flex-col gap-0 lg:hidden px-6">
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
                <div>
                  <div className="spotlight-card group relative flex flex-col items-center text-center p-8 rounded-2xl bg-[#0c0c0d] border border-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                    <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mb-5">
                      <Icon size={24} className="text-white/40" strokeWidth={1.25} />
                    </div>
                    <h3 className="font-display text-[18px] font-semibold text-white/90 mb-2">{node.name}</h3>
                    <p className="text-zinc-500 text-[13px] leading-relaxed">{node.desc}</p>
                    <span className="absolute top-3 right-4 font-mono text-[10px] text-white/10 tracking-widest">0{i + 1}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <p className="text-center mt-16 text-zinc-600 text-[13px] tracking-[0.1em] uppercase font-mono lg:absolute lg:bottom-12 lg:left-0 lg:w-full relative z-20">
        {t.sub}
      </p>

      <style>{`
        @keyframes pulse-slide {
          0%   { left: -24px; }
          100% { left: calc(100% + 24px); }
        }
      `}</style>
    </section>
  )
}

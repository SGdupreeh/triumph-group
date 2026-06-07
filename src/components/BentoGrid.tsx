import { useRef, useEffect } from 'react'
import { Code2, Sparkles, Network, Crown } from 'lucide-react'
import { BorderBeam } from './BorderBeam'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'ru'

const copy = {
  en: {
    eyebrow: '// units',
    title: 'Architecture of Power',
    units: [
      {
        icon: Code2,
        tag: 'CTO · Triumph Codes',
        name: 'Interactive Web & AI',
        desc: 'Premium web interfaces. WebGL, 3D, AI-driven products. Razor-sharp code.',
        skills: ['WebGL', 'Three.js', 'Next.js', 'AI UI'],
        cta: 'View Codes →',
        href: 'https://triumphcodes.cc',
      },
      {
        icon: Sparkles,
        tag: 'CCO · Triumph Labs',
        name: 'AI Content & Motion',
        desc: 'Media viruses at scale. Attention-capturing content, motion, traffic.',
        skills: ['AI Content', 'After Effects', 'Motion', 'Traffic'],
        cta: 'View Labs →',
        href: 'https://triumphlabs.cc',
      },
      {
        icon: Network,
        tag: 'CIO · Triumph Systems',
        name: 'Automation & AI Infra',
        desc: 'Activate AI. Agents, automation, CRM integrations. Business on autopilot.',
        skills: ['AI Agents', 'APIs', 'WhatsApp', 'Automation'],
        cta: 'Activate AI →',
        href: 'https://triumphsystems.cc',
      },
    ],
    ceoTag: 'CEO · Chief Executive',
    ceoName: 'Triumph Group',
    ceoRole: 'Strategy · Architecture · Scale',
    ceoDesc: 'Holds the vision. Controls the architecture. Makes decisions that cannot be unmade.',
    ceoCta: 'Start Integration →',
    ceoEmail: 'ceo@triumphgroup.cc',
  },
  ru: {
    eyebrow: '// юниты',
    title: 'Архитектура Силы',
    units: [
      {
        icon: Code2,
        tag: 'CTO · Triumph Codes',
        name: 'Интерактивный Web & AI',
        desc: 'Инжиниринг премиальных веб-интерфейсов. WebGL, 3D, AI. Без компромиссов.',
        skills: ['WebGL', 'Three.js', 'Next.js', 'AI UI'],
        cta: 'Смотреть Codes →',
        href: 'https://triumphcodes.cc',
      },
      {
        icon: Sparkles,
        tag: 'CCO · Triumph Labs',
        name: 'AI-Контент & Моушн',
        desc: 'Генерируем медиа-вирусы. Контент, захватывающий внимание, моушн, трафик.',
        skills: ['AI-контент', 'After Effects', 'Моушн', 'Трафик'],
        cta: 'Смотреть Labs →',
        href: 'https://triumphlabs.cc',
      },
      {
        icon: Network,
        tag: 'CIO · Triumph Systems',
        name: 'Автоматизация & AI',
        desc: 'Активировать ИИ. Агенты, автоматизация, CRM-интеграции. Бизнес на автопилоте.',
        skills: ['AI-агенты', 'API', 'WhatsApp', 'Автоматизация'],
        cta: 'Активировать ИИ →',
        href: 'https://triumphsystems.cc',
      },
    ],
    ceoTag: 'CEO · Исполнительный директор',
    ceoName: 'Triumph Group',
    ceoRole: 'Стратегия · Архитектура · Масштаб',
    ceoDesc: 'Держит видение. Контролирует архитектуру. Принимает решения, которые нельзя отменить.',
    ceoCta: 'Начать интеграцию →',
    ceoEmail: 'ceo@triumphgroup.cc',
  },
}

export default function BentoGrid({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const sectionRef = useRef<HTMLElement>(null)

  // Extreme GSAP Animations
  useEffect(() => {
    // Disable heavy pin on mobile for better UX
    if (window.innerWidth < 1024) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1, // Smooth scrub
          start: "center center",
          end: "+=120%", // Keep scrolling locked for 1.2 viewport heights
        }
      });

      // 1. Text Reveal (Word by word)
      tl.from(".reveal-word", {
        y: "130%",
        rotateZ: 8,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
        duration: 1
      }, 0); // Start at beginning of timeline

      // 2. Extreme Scale Zoom for Cards
      tl.from(".bento-card", {
        scale: 0.4,
        opacity: 0,
        y: 150,
        stagger: 0.2, // Pop out one by one
        ease: "back.out(2)", // Bouncy overshoot
        duration: 1.5,
        transformOrigin: "center center"
      }, 0.2); // Start slightly after text reveal
      
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="units" ref={sectionRef} className="relative py-20 lg:py-0 lg:min-h-screen lg:flex lg:flex-col lg:justify-center px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">

      {/* Background spotlight — neutral only */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px]" style={{ background: 'rgba(255,255,255,0.015)' }} />
      </div>

      <div className="text-center mb-12">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-4">{t.eyebrow}</p>
        
        {/* Text Reveal Structure */}
        <h2 className="font-display font-bold tracking-tight text-gradient flex flex-wrap justify-center gap-x-[0.3em] gap-y-2" style={{ fontSize: 'clamp(28px, 4.5vw, 50px)' }}>
          {t.title.split(' ').map((word, i) => (
            <span key={i} className="overflow-hidden inline-flex pb-2">
              <span className="reveal-word inline-block origin-bottom-left">{word}</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {t.units.map((unit) => {
          const Icon = unit.icon
          return (
            <article
              key={unit.tag}
              className="bento-card spotlight-card group h-full relative flex flex-col p-7 rounded-2xl bg-white/[0.015] backdrop-blur-2xl border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] hover:bg-white/[0.025] hover:border-white/[0.09] transition-colors duration-300"
            >
              {/* Top-right corner glow — sharp, not bloomy */}
              <div
                aria-hidden
                className="absolute top-0 right-0 w-28 h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-2xl overflow-hidden"
                style={{ background: 'radial-gradient(circle at top right, rgba(255,255,255,0.05), transparent 65%)' }}
              />

              <Icon size={32} className="text-white/25 group-hover:text-white/50 transition-colors duration-300 mb-5" strokeWidth={1.25} />
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/20 mb-2">{unit.tag}</p>
              <h3 className="font-display text-[18px] font-semibold text-white/90 mb-3 leading-snug">{unit.name}</h3>
              <p className="text-zinc-500 text-[13px] leading-relaxed flex-1">{unit.desc}</p>

              <div className="flex flex-wrap gap-1.5 mt-5 mb-5">
                {unit.skills.map((s) => (
                  <span key={s} className="px-2.5 py-1 text-[10px] font-medium rounded-full border border-white/[0.07] text-zinc-600 bg-white/[0.02] tracking-wide">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <a
                  href={unit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center px-3.5 py-2 rounded-lg border border-white/[0.05] text-[12px] font-mono text-white/20 hover:text-white/60 overflow-hidden transition-colors duration-200"
                >
                  <BorderBeam duration={2.6} />
                  <span className="relative z-10">{unit.cta}</span>
                </a>
              </div>
            </article>
          )
        })}

        {/* CEO card — full width */}
        <article className="bento-card spotlight-card md:col-span-3 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 p-7 md:p-8 rounded-2xl bg-white/[0.015] backdrop-blur-2xl border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] hover:bg-white/[0.025] hover:border-white/[0.09] transition-colors duration-300">
          <div className="flex-shrink-0">
            <div className="w-[72px] h-[72px] rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center">
              <Crown size={24} className="text-white/35" strokeWidth={1.25} />
            </div>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/20 mb-1.5">{t.ceoTag}</p>
            <h3 className="font-display text-[20px] font-bold text-gradient leading-tight mb-1">{t.ceoName}</h3>
            <p className="text-zinc-600 text-[12px] mb-3 tracking-wide">{t.ceoRole}</p>
            <p className="text-zinc-500 text-[13px] leading-relaxed max-w-lg">{t.ceoDesc}</p>
          </div>
          <div className="flex flex-col gap-3 items-start md:items-end">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/[0.07] text-white/35 hover:text-white/70 text-[13px] font-medium font-display transition-all duration-200 active:scale-[0.97] whitespace-nowrap overflow-hidden"
            >
              <BorderBeam duration={2.2} color="rgba(255,255,255,0.75)" />
              <span className="relative z-10">{t.ceoCta}</span>
            </a>
            <a href={`mailto:${t.ceoEmail}`} className="font-mono text-[11px] text-white/20 hover:text-white/40 transition-colors">
              {t.ceoEmail}
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

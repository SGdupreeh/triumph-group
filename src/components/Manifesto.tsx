import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'ru'

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
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    
    // Ensure viewport is large enough for pinning
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.0,
          start: "top top",
          end: "+=500%", // 5 screens of scrolling for much slower pacing
          invalidateOnRefresh: true,
        }
      })

      // Set initial state for desktop
      gsap.set(".statement-item, .manifesto-closing", { opacity: 0, y: 20 })

      // 1. Title "Dark Matter" Fall (OPTIMIZED)
      tl.fromTo(titleRef.current, 
        { 
          scale: 8, 
          opacity: 0, 
          filter: "blur(12px)", // Added slight blur back for the initial huge state
          y: 100,
          rotateX: 30, // 3D drop effect instead of blur
          transformOrigin: "center center"
        },
        { 
          scale: 1, 
          opacity: 1, 
          filter: "blur(0px)",
          y: 0, 
          rotateX: 0,
          ease: "power3.inOut", 
          duration: 2.0, // Increased duration
          force3D: true // Hardware acceleration
        }
      )

      // Animate gradient across the text AFTER it lands to avoid scaling repaint issues
      tl.to(titleRef.current, {
        backgroundPositionX: "100%",
        duration: 3,
        ease: "none"
      }, 1.5)

      // Eyebrow appears
      tl.fromTo(".manifesto-eyebrow", { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.5")

      // 2. Statements initial reveal (dimmed)
      tl.fromTo(".statement-item", 
        { opacity: 0, y: 30 }, 
        { opacity: 0.3, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" }, 
        "-=0.2"
      )

      // 3. Spotlight Focus Sequence
      const statements = gsap.utils.toArray(".statement-item")
      statements.forEach((item: HTMLElement, i) => {
        const num = item.querySelector('.statement-num')
        const text = item.querySelector('.statement-text')
        
        // Spotlight ON
        tl.to(item, { opacity: 1, x: 20, duration: 0.8 })
          .to(num, { color: "#22d3ee", duration: 0.8 }, "<") // cyan-400
          .to(text, { color: "#ffffff", duration: 0.8 }, "<")
          
        // HOLD STATE: allow time to read before dimming
        tl.to({}, { duration: 1.5 })
          
        // Spotlight OFF (if not the last item)
        if (i !== statements.length - 1) {
          tl.to(item, { opacity: 0.3, x: 0, duration: 0.8 })
            .to(num, { color: "rgba(255,255,255,0.3)", duration: 0.8 }, "<")
            .to(text, { color: "rgba(255,255,255,0.4)", duration: 0.8 }, "<")
        }
      })

      // Closing statement appears at the very end
      tl.fromTo(".manifesto-closing", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#0c0c0d]"
      style={{ perspective: '1000px' }}
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

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center" style={{ transformStyle: 'preserve-3d' }}>

        {/* Eyebrow */}
        <p className="manifesto-eyebrow font-mono text-[11px] tracking-[0.22em] uppercase text-white/20 mb-12 opacity-0">
          {t.eyebrow}
        </p>

        {/* Giant kinetic title */}
        <h2
          ref={titleRef}
          className="font-display font-bold leading-[1.06] tracking-tight mb-16 text-transparent bg-clip-text text-center origin-center"
          style={{ 
            fontSize: 'clamp(36px, 6.5vw, 84px)',
            backgroundImage: 'linear-gradient(to right, #ffffff 20%, rgba(255,255,255,0.2) 50%, #ffffff 80%)',
            backgroundSize: '200% 100%',
            backgroundPositionX: '100%',
            willChange: 'transform, opacity'
          }}
        >
          {t.title}
        </h2>

        {/* Statements */}
        <div className="flex flex-col gap-0 max-w-xl mx-auto mb-16 w-full">
          {t.statements.map((s, i) => (
            <div
              key={i}
              className="statement-item flex items-center gap-5 py-4 border-b border-white/[0.05]"
            >
              <span
                aria-hidden
                className="statement-num font-mono text-[9px] text-white/30 tracking-widest flex-shrink-0 w-6 text-right transition-colors"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="statement-text text-white/40 text-[15px] leading-relaxed text-left font-body transition-colors">
                {s}
              </p>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <p className="manifesto-closing font-mono text-[11px] tracking-[0.2em] uppercase text-white/30">
          {t.closing}
        </p>
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

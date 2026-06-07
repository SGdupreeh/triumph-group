import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'ru'

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
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  
  // Refs for the rings to animate them independently
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)
  const ring3Ref = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    let isSpeaking = false

    const playVisualizer = () => {
      if (!isSpeaking) return;
      
      // Randomly scale rings rapidly to simulate speech
      gsap.to(ring1Ref.current, {
        scale: 1 + Math.random() * 0.15,
        opacity: 0.5 + Math.random() * 0.5,
        duration: 0.1,
        onComplete: playVisualizer
      })
      gsap.to(ring2Ref.current, {
        scale: 1 + Math.random() * 0.2,
        opacity: 0.4 + Math.random() * 0.4,
        duration: 0.15,
      })
      gsap.to(ring3Ref.current, {
        scale: 1 + Math.random() * 0.25,
        opacity: 0.3 + Math.random() * 0.5,
        duration: 0.12,
      })
      gsap.to(coreRef.current, {
        scale: 1 + Math.random() * 0.3,
        opacity: 0.8 + Math.random() * 0.2,
        duration: 0.08
      })
    }

    const stopVisualizer = () => {
      isSpeaking = false
      // Transition to a calm, slow breathing state
      gsap.to([ring1Ref.current, ring2Ref.current, ring3Ref.current, coreRef.current], {
        scale: 1,
        opacity: 0.5,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          // Slow breathing animation
          gsap.to([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
            scale: 1.05,
            opacity: 0.3,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            stagger: 0.2
          })
          gsap.to(coreRef.current, {
            scale: 1,
            opacity: 1,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          })
        }
      })
    }

    const ctx = gsap.context(() => {
      
      // Initial states
      gsap.set(".founder-eyebrow, .founder-sig, .founder-name, .founder-quote-mark, .sig-line", { opacity: 0 })
      gsap.set(".quote-word", { opacity: 0 })
      
      // Background rotation for rings (runs constantly)
      gsap.to(ring1Ref.current, { rotate: 360, duration: 40, repeat: -1, ease: "linear" })
      gsap.to(ring2Ref.current, { rotate: -360, duration: 30, repeat: -1, ease: "linear" })
      gsap.to(ring3Ref.current, { rotate: 360, duration: 20, repeat: -1, ease: "linear" })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true, // Play animation once
        onEnter: () => {
          const tl = gsap.timeline()
          
          // Reveal peripheral elements
          tl.to([".founder-eyebrow", ".founder-name", ".founder-quote-mark"], {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
          })

          // Start visualizer just before text starts typing
          tl.call(() => {
            isSpeaking = true
            playVisualizer()
          }, [], "-=0.5")

          // Terminal typewriter effect for the quote
          // Extremely fast stagger to simulate data feed
          tl.to(".quote-word", {
            opacity: 1,
            duration: 0, // Instant appearance per word
            stagger: 0.08, // Very fast pacing
            ease: "none"
          })

          // Stop visualizer when text is fully printed
          tl.call(() => {
            stopVisualizer()
          })

          // Reveal signature line at the end
          tl.to([".sig-line", ".founder-sig"], {
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
          }, "+=0.2")
        }
      })

    }, sectionRef)

    return () => {
      ctx.revert()
      isSpeaking = false
      gsap.killTweensOf([ring1Ref.current, ring2Ref.current, ring3Ref.current, coreRef.current])
    }
  }, [lang])

  const words = t.quote.split(' ')

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 lg:px-12 max-w-5xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16 items-start">
        
        {/* Left — avatar + name */}
        <div className="flex flex-col items-center lg:items-start gap-5">
          <div className="relative w-[180px] h-[180px] rounded-full border border-white/[0.04] bg-[#0c0c0d] flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)' }} />
            
            {/* Animated rings */}
            <div
              ref={ring1Ref}
              className="absolute inset-4 rounded-full border border-white/[0.03] origin-center"
              style={{ borderTopColor: 'rgba(255,255,255,0.1)' }}
            />
            <div
              ref={ring2Ref}
              className="absolute inset-8 rounded-full border border-white/[0.05] origin-center"
              style={{ borderLeftColor: 'rgba(255,255,255,0.15)' }}
            />
            <div
              ref={ring3Ref}
              className="absolute inset-[52px] rounded-full border border-white/[0.08] origin-center"
              style={{ borderRightColor: 'rgba(255,255,255,0.2)' }}
            />
            
            {/* Core */}
            <div 
              ref={coreRef}
              className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] origin-center" 
            />
          </div>
          <p className="founder-name font-mono text-[12px] text-white/25 tracking-wide text-center lg:text-left">{t.name}</p>
        </div>

        {/* Right — quote */}
        <div className="relative">
          {/* Eyebrow */}
          <p className="founder-eyebrow font-mono text-[11px] tracking-[0.2em] uppercase text-white/20 mb-8">{t.eyebrow}</p>

          {/* Giant decorative quote mark */}
          <span
            aria-hidden
            className="founder-quote-mark absolute -top-4 -left-6 lg:-left-10 font-display font-bold text-white/[0.04] select-none pointer-events-none leading-none"
            style={{ fontSize: '160px' }}
          >
            &ldquo;
          </span>

          {/* Statement */}
          <blockquote className="relative z-10" ref={quoteRef}>
            <p
              className="font-display text-white/70 leading-[1.65] italic"
              style={{ fontSize: 'clamp(18px, 2.2vw, 26px)' }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  className="quote-word inline-block mr-[0.25em]"
                >
                  {word}
                </span>
              ))}
            </p>
          </blockquote>

          {/* Signature line */}
          <div className="mt-10">
            <div
              className="sig-line h-px w-20 mb-4"
              style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)' }}
            />
            <p className="founder-sig font-mono text-[11px] text-white/20 tracking-[0.15em] uppercase">{t.sig}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

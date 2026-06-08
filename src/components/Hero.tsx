import { useLayoutEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Lang = 'en' | 'ru'

const copy = {
  en: {
    h1: 'AI Infrastructure of the Next Generation',
    sub: 'Lean cyber-agency combining AI-media production, interactive web engineering, and business automation. Built for those who dominate.',
  },
  ru: {
    h1: 'AI\u2011инфраструктура нового поколения',
    sub: 'Кибер-агентство нового типа: AI-медиа, интерактивная веб-разработка и автоматизация бизнеса. Для тех, кто доминирует.',
  },
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring' as const, bounce: 0.25, duration: 1.4 },
  },
}

export default function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang]
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // HTML Overlay Refs
  const linkLabs = useRef<HTMLAnchorElement>(null)
  const linkCodes = useRef<HTMLAnchorElement>(null)
  const linkSystems = useRef<HTMLAnchorElement>(null)

  /* ── Core System Canvas & Scroll Interactive Logic ── */
  useLayoutEffect(() => {
    if (window.innerWidth < 1024) return;
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx || !sectionRef.current) return

    let W = 0, H = 0
    let vmin = 0
    let animId: number

    let rx = 0
    let ry = 0
    let targetRx = 0
    let targetRy = 0

    const animState = {
      zoom: 1,
      speed: 1,
      interactive: 0, // 0 to 1, indicates when pointer events are enabled
      focusValue: 0   // 0=Center, 1=LABS, 2=CODES, 3=SYSTEMS, 4=Center Return
    }

    const ctxGsap = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.0,
          start: "top top",
          end: "+=500%", // 5 steps
          invalidateOnRefresh: true,
        }
      })

      // STAGE 0 (duration 1): Text fades out, Canvas centers, Zoom in.
      tl.to(".hero-content", { 
          opacity: 0, 
          filter: "blur(15px)", 
          x: -100, 
          ease: "power2.inOut", 
          duration: 0.5 
        }, 0)
        .set(".hero-content", { pointerEvents: "none" }, 0.2)
        .fromTo(".hero-canvas-wrapper", { x: "25%" }, { x: "0%", ease: "power2.inOut", duration: 1 }, 0)
        // Zoom deeply to 4.0 for maximum immersion
        .to(animState, { zoom: 4.0, speed: 0, interactive: 1, ease: "power2.inOut", duration: 1 }, 0)
      
      // STAGE 1 (duration 1): Fly to LABS (NO DIP, straight flight)
      tl.to(animState, { focusValue: 1, ease: "power2.inOut", duration: 1 }, 1)
      
      // STAGE 2 (duration 1): Fly to CODES (with arc dip)
      tl.to(animState, { focusValue: 2, ease: "power2.inOut", duration: 1 }, 2)
        .to(animState, { zoom: 2.0, ease: "sine.inOut", duration: 0.5 }, 2)
        .to(animState, { zoom: 4.0, ease: "sine.inOut", duration: 0.5 }, 2.5)
      
      // STAGE 3 (duration 1): Fly to SYSTEMS (with arc dip)
      tl.to(animState, { focusValue: 3, ease: "power2.inOut", duration: 1 }, 3)
        .to(animState, { zoom: 2.0, ease: "sine.inOut", duration: 0.5 }, 3)
        .to(animState, { zoom: 4.0, ease: "sine.inOut", duration: 0.5 }, 3.5)
      
      // STAGE 4 (duration 1): Fly back to Center, Zoom out, Restore text
      tl.to(animState, { focusValue: 4, zoom: 1, speed: 1, interactive: 0, ease: "power2.inOut", duration: 1 }, 4)
        .to(".hero-canvas-wrapper", { x: "25%", ease: "power2.inOut", duration: 1 }, 4)
        .set(".hero-content", { pointerEvents: "auto" }, 4.5)
        .to(".hero-content", { opacity: 1, filter: "blur(0px)", x: 0, ease: "power2.inOut", duration: 0.8 }, 4.2)

    }, sectionRef)

    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        W = canvas.width = parent.offsetWidth
        H = canvas.height = parent.offsetHeight
        vmin = Math.min(W, H)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = ((e.clientX - rect.left) / W) * 2 - 1
      const my = ((e.clientY - rect.top) / H) * 2 - 1
      targetRy = mx * 0.4
      targetRx = my * 0.4
    }

    let globalTime = 0
    let lastTime = Date.now()

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      
      const now = Date.now()
      const delta = (now - lastTime) * 0.001
      lastTime = now
      
      globalTime += delta * animState.speed

      rx += (targetRx - rx) * 0.05
      ry += (targetRy - ry) * 0.05
      
      const finalRy = ry + globalTime * 0.15
      const finalRx = rx + 0.35
      
      const cx = W / 2
      const cy = H / 2
      const fov = 900

      // Calculate raw 3D positions assuming (0,0) is center
      const rawProject = (x: number, y: number, z: number, tiltX = 0, tiltZ = 0) => {
        const y0 = y * Math.cos(tiltX) - z * Math.sin(tiltX)
        const z0 = y * Math.sin(tiltX) + z * Math.cos(tiltX)
        
        const x0 = x * Math.cos(tiltZ) - y0 * Math.sin(tiltZ)
        const y0_1 = x * Math.sin(tiltZ) + y0 * Math.cos(tiltZ)

        const y1 = y0_1 * Math.cos(finalRx) - z0 * Math.sin(finalRx)
        const z1 = y0_1 * Math.sin(finalRx) + z0 * Math.cos(finalRx)
        
        const x2 = x0 * Math.cos(finalRy) + z1 * Math.sin(finalRy)
        const z2 = -x0 * Math.sin(finalRy) + z1 * Math.cos(finalRy)
        
        const perspectiveScale = fov / (fov + z2)
        const finalScale = perspectiveScale * animState.zoom
        
        return { x: x2 * finalScale, y: y1 * finalScale, scale: finalScale, z: z2 }
      }

      const rBase = vmin * 0.085
      
      const orbits = [
        { r: rBase * 1.0, speed: 0.9, phase: 0,          tiltZ: 0.2,  tiltX: 0.15, color: 'rgba(255,255,255,0.2)',  label: 'LABS', ref: linkLabs },
        { r: rBase * 1.8, speed: 0.5, phase: Math.PI/3,  tiltZ: -0.3, tiltX: -0.2, color: 'rgba(255,255,255,0.12)', label: 'CODES', ref: linkCodes },
        { r: rBase * 2.8, speed: 0.3, phase: Math.PI,    tiltZ: 0.4,  tiltX: -0.1, color: 'rgba(255,255,255,0.06)', label: 'SYSTEMS', ref: linkSystems }
      ]

      // Extract raw projection of each planet to calculate camera offset
      const orbitNodes = orbits.map((orbit) => {
        const a = globalTime * orbit.speed + orbit.phase
        const px = Math.cos(a) * orbit.r
        const pz = Math.sin(a) * orbit.r
        return rawProject(px, 0, pz, orbit.tiltX, orbit.tiltZ)
      })

      // Lerp logic for Camera Fly-Through
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t
      let cxOffset = 0, cyOffset = 0
      const fv = animState.focusValue

      if (fv <= 0) {
        cxOffset = 0
        cyOffset = 0
      } else if (fv <= 1) {
        cxOffset = lerp(0, orbitNodes[0].x, fv)
        cyOffset = lerp(0, orbitNodes[0].y, fv)
      } else if (fv <= 2) {
        cxOffset = lerp(orbitNodes[0].x, orbitNodes[1].x, fv - 1)
        cyOffset = lerp(orbitNodes[0].y, orbitNodes[1].y, fv - 1)
      } else if (fv <= 3) {
        cxOffset = lerp(orbitNodes[1].x, orbitNodes[2].x, fv - 2)
        cyOffset = lerp(orbitNodes[1].y, orbitNodes[2].y, fv - 2)
      } else if (fv <= 4) {
        // Fly straight back to center
        cxOffset = lerp(orbitNodes[2].x, 0, fv - 3)
        cyOffset = lerp(orbitNodes[2].y, 0, fv - 3)
      }

      // Apply offset to centering coordinates
      const actualCx = cx - cxOffset
      const actualCy = cy - cyOffset

      orbits.forEach((orbit) => {
        ctx.beginPath()
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.05) {
          const px = Math.cos(a) * orbit.r
          const pz = Math.sin(a) * orbit.r
          const proj = rawProject(px, 0, pz, orbit.tiltX, orbit.tiltZ)
          
          if (a === 0) ctx.moveTo(actualCx + proj.x, actualCy + proj.y)
          else ctx.lineTo(actualCx + proj.x, actualCy + proj.y)
        }
        ctx.strokeStyle = orbit.color
        ctx.lineWidth = 1 * Math.max(1, animState.zoom * 0.4)
        ctx.stroke()
      })

      type DrawNode = { x: number; y: number; z: number; scale: number; type: 'center' | 'sat'; htmlRef?: React.RefObject<HTMLAnchorElement | null>; focusIdx?: number }
      const drawNodes: DrawNode[] = []

      // Center node
      const centerProj = rawProject(0, 0, 0)
      drawNodes.push({
        ...centerProj,
        x: centerProj.x + actualCx,
        y: centerProj.y + actualCy,
        type: 'center'
      })

      orbits.forEach((orbit, i) => {
        const raw = orbitNodes[i]
        drawNodes.push({
          ...raw,
          x: raw.x + actualCx,
          y: raw.y + actualCy,
          type: 'sat',
          htmlRef: orbit.ref,
          focusIdx: i + 1
        })
      })

      drawNodes.sort((a, b) => b.z - a.z)

      const globalPulse = (Math.sin(globalTime * 2) + 1) / 2

      drawNodes.forEach(n => {
        // Prevent depthAlpha from becoming negative if z is large
        const depthAlpha = Math.max(0.1, 1 - (n.z + 100) / 400)
        
        if (n.type === 'center') {
          ctx.beginPath()
          const radius = (4 + globalPulse * 1.5) * n.scale
          ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
          
          // Dim the sun slightly when we are focused on planets
          let sunAlpha = 0.8 + globalPulse * 0.2
          if (animState.focusValue > 0.5 && animState.focusValue < 3.5) {
             sunAlpha *= 0.3
          }
          
          ctx.fillStyle = `rgba(255, 255, 255, ${sunAlpha})`
          ctx.shadowBlur = 30 * n.scale
          ctx.shadowColor = `rgba(255,255,255,${sunAlpha})`
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Satellites rendered by HTML flex containers to guarantee clickability
        if (n.htmlRef && n.htmlRef.current) {
          const el = n.htmlRef.current
          // -10px X translation to center the dot exactly on the projected coordinate, -50% Y to vertically align
          el.style.transform = `translate3d(${n.x}px, ${n.y}px, 0) translate(-10px, -50%) scale(${n.scale})`
          
          let targetAlpha = depthAlpha * (0.4 + animState.interactive * 0.3)
          let isClickable = false
          let isHighlighted = false
          
          if (animState.interactive > 0.1 && n.focusIdx !== undefined) {
             isClickable = true
             const dist = Math.abs(animState.focusValue - n.focusIdx)
             
             if (dist < 0.3 && animState.focusValue < 3.5) {
                 targetAlpha = 1.0 // Spotlight on active planet
                 isHighlighted = true
             } else if (animState.focusValue > 0.3 && animState.focusValue < 3.5) {
                 targetAlpha = depthAlpha * 0.15 // Dim others aggressively
             }
          }
          
          el.style.opacity = targetAlpha.toString()
          el.style.zIndex = Math.round(1000 - n.z).toString()
          el.style.pointerEvents = isClickable ? 'auto' : 'none'
          
          const dot = el.querySelector('.overlay-dot') as HTMLElement
          const text = el.querySelector('.overlay-text') as HTMLElement
          
          if (dot && text) {
            text.style.opacity = isHighlighted ? '1' : '0.5'
            if (isHighlighted) {
              dot.style.boxShadow = `0 0 15px rgba(255,255,255,0.8)`
            } else {
              dot.style.boxShadow = `0 0 5px rgba(255,255,255,0.2)`
            }
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    lastTime = Date.now()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      ctxGsap.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">

      {/* Architectural grid overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          backgroundPosition: 'center',
        }}
      />

      {/* Background radial lights */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[50rem] h-[50rem] rounded-full"
          style={{ background: 'radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.02) 0%, transparent 60%)' }} />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[60rem] h-[60rem]"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.01) 0%, transparent 60%)' }} />
      </div>

      {/* 1. FULL SCREEN CANVAS (No max-w limits) */}
      <div className="hero-canvas-wrapper absolute inset-0 w-full h-[200%] -top-[50%] pointer-events-auto z-10 translate-x-[25%] hidden lg:block">
        <canvas ref={canvasRef} className="w-full h-full" />
        
        {/* HTML Overlays for Clickable Nodes (ALWAYS VISIBLE) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <a ref={linkLabs} href="https://triumphlabs.cc" target="_blank" rel="noopener noreferrer" 
             className="absolute top-0 left-0 flex items-center group cursor-pointer p-2 -m-2 origin-left">
            <div className="overlay-dot w-[6px] h-[6px] rounded-full bg-white transition-all shrink-0" />
            <span className="overlay-text font-mono text-[10px] font-bold text-white transition-all tracking-widest ml-3 group-hover:text-cyan-400">LABS</span>
          </a>

          <a ref={linkCodes} href="https://triumphcodes.cc" target="_blank" rel="noopener noreferrer" 
             className="absolute top-0 left-0 flex items-center group cursor-pointer p-2 -m-2 origin-left">
            <div className="overlay-dot w-[8px] h-[8px] rounded-full bg-white transition-all shrink-0" />
            <span className="overlay-text font-mono text-[10px] font-bold text-white transition-all tracking-widest ml-3 group-hover:text-cyan-400">CODES</span>
          </a>

          <a ref={linkSystems} href="https://triumphsystems.cc" target="_blank" rel="noopener noreferrer" 
             className="absolute top-0 left-0 flex items-center group cursor-pointer p-2 -m-2 origin-left">
            <div className="overlay-dot w-[10px] h-[10px] rounded-full bg-white transition-all shrink-0" />
            <span className="overlay-text font-mono text-[10px] font-bold text-white transition-all tracking-widest ml-3 group-hover:text-cyan-400">SYSTEMS</span>
          </a>
        </div>
      </div>

      {/* 2. TEXT CONTENT (Constrained to max-w-7xl) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center h-full pointer-events-none">
        <motion.div
          className="hero-content w-full lg:w-[60%] text-left pointer-events-auto pt-20"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={item} className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/30 mb-5">
            // triumph.group
          </motion.p>
          <motion.h1 variants={item} className="font-display font-bold leading-[1.04] tracking-tight mb-6 text-shimmer" style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', wordBreak: 'keep-all', overflowWrap: 'anywhere' }}>
            {t.h1}
          </motion.h1>
          <motion.p variants={item} className="font-body text-zinc-400 leading-relaxed max-w-xl mb-10" style={{ fontSize: 'clamp(15px, 1.5vw, 17px)' }}>
            {t.sub}
          </motion.p>
        </motion.div>
      </div>

    </section>
  )
}

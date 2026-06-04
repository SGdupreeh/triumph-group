import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

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
  const canvasRef = useRef<HTMLCanvasElement>(null)

  /* ── Core System Canvas (Minimalist Orbits) ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let animId: number

    let rx = 0
    let ry = 0
    let targetRx = 0
    let targetRy = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        W = canvas.width = parent.offsetWidth
        H = canvas.height = parent.offsetHeight
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mx = ((e.clientX - rect.left) / W) * 2 - 1
      const my = ((e.clientY - rect.top) / H) * 2 - 1
      targetRy = mx * 0.4
      targetRx = my * 0.4
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      
      rx += (targetRx - rx) * 0.05
      ry += (targetRy - ry) * 0.05
      
      const time = Date.now() * 0.001
      
      // Global camera rotation
      const finalRy = ry + time * 0.15
      const finalRx = rx + 0.35 // Slightly less default tilt so user has more control
      
      const cx = W / 2
      const cy = H / 2 // Restored to exact center since canvas is now taller
      const fov = 900

      // 3D Projection helper
      const project = (x: number, y: number, z: number, tiltX = 0, tiltZ = 0) => {
        // 1. Local Orbit Tilt
        let y0 = y * Math.cos(tiltX) - z * Math.sin(tiltX)
        let z0 = y * Math.sin(tiltX) + z * Math.cos(tiltX)
        
        let x0 = x * Math.cos(tiltZ) - y0 * Math.sin(tiltZ)
        let y0_1 = x * Math.sin(tiltZ) + y0 * Math.cos(tiltZ)

        // 2. Global Camera Rotation
        let y1 = y0_1 * Math.cos(finalRx) - z0 * Math.sin(finalRx)
        let z1 = y0_1 * Math.sin(finalRx) + z0 * Math.cos(finalRx)
        
        let x2 = x0 * Math.cos(finalRy) + z1 * Math.sin(finalRy)
        let z2 = -x0 * Math.sin(finalRy) + z1 * Math.cos(finalRy)
        
        const scale = fov / (fov + z2)
        return { x: cx + x2 * scale, y: cy + y1 * scale, z: z2, scale }
      }

      const orbits = [
        { r: 90,  speed: 0.9, phase: 0,          tiltZ: 0.2,  tiltX: 0.15, color: 'rgba(255,255,255,0.2)',  size: 1.5, label: 'LABS' },
        { r: 160, speed: 0.5, phase: Math.PI/3,  tiltZ: -0.3, tiltX: -0.2, color: 'rgba(255,255,255,0.12)', size: 2, label: 'CODES' },
        { r: 240, speed: 0.3, phase: Math.PI,    tiltZ: 0.4,  tiltX: -0.1, color: 'rgba(255,255,255,0.06)', size: 2.5, label: 'SYSTEMS' }
      ]

      // 1. Draw Orbit Lines
      orbits.forEach(orbit => {
        ctx.beginPath()
        for (let a = 0; a <= Math.PI * 2 + 0.1; a += 0.05) {
          const px = Math.cos(a) * orbit.r
          const pz = Math.sin(a) * orbit.r
          const proj = project(px, 0, pz, orbit.tiltX, orbit.tiltZ)
          
          if (a === 0) ctx.moveTo(proj.x, proj.y)
          else ctx.lineTo(proj.x, proj.y)
        }
        ctx.strokeStyle = orbit.color
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // 2. Collect Nodes (Center + 3 Satellites) to draw them with depth sorting
      type DrawNode = { x: number; y: number; z: number; scale: number; type: 'center' | 'sat'; size?: number; label?: string }
      const drawNodes: DrawNode[] = []

      drawNodes.push({
        ...project(0, 0, 0),
        type: 'center'
      })

      orbits.forEach(orbit => {
        const a = time * orbit.speed + orbit.phase
        const px = Math.cos(a) * orbit.r
        const pz = Math.sin(a) * orbit.r
        drawNodes.push({
          ...project(px, 0, pz, orbit.tiltX, orbit.tiltZ),
          type: 'sat',
          size: orbit.size,
          label: orbit.label
        })
      })

      // Sort by depth (Z-index)
      drawNodes.sort((a, b) => b.z - a.z)

      // 3. Draw Nodes
      const globalPulse = (Math.sin(time * 2) + 1) / 2

      drawNodes.forEach(n => {
        // Fade out objects in the far distance
        const depthAlpha = Math.max(0, 1 - (n.z + 200) / 600)
        
        ctx.beginPath()
        if (n.type === 'center') {
          // The Core
          const radius = (4 + globalPulse * 1.5) * n.scale
          ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + globalPulse * 0.2})`
          
          ctx.shadowBlur = 30 * n.scale
          ctx.shadowColor = 'rgba(255,255,255,0.8)'
        } else {
          // Satellites
          const radius = (n.size || 2) * n.scale
          ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * depthAlpha})`
          
          ctx.shadowBlur = 15 * n.scale
          ctx.shadowColor = `rgba(255,255,255,${0.5 * depthAlpha})`
        }
        
        ctx.fill()
        ctx.shadowBlur = 0
        
        if (n.label) {
          ctx.font = `600 ${Math.max(9, 10 * n.scale)}px "JetBrains Mono", monospace`
          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 * depthAlpha})`
          ctx.fillText(n.label.split('').join(String.fromCharCode(8202)), n.x + 12 * n.scale, n.y + 4 * n.scale)
        }
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

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
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[50rem] h-[50rem] rounded-full"
          style={{ background: 'radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.02) 0%, transparent 60%)' }} />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[60rem] h-[60rem]"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.01) 0%, transparent 60%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center h-full">
        
        {/* Left Side — Content */}
        <motion.div
          className="w-full lg:w-[60%] text-left z-20 flex flex-col justify-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Leading detail */}
          <motion.p
            variants={item}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/30 mb-5"
          >
            // triumph.group
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display font-bold leading-[1.04] tracking-tight mb-6 text-shimmer"
            style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', wordBreak: 'keep-all', overflowWrap: 'anywhere' }}
          >
            {t.h1}
          </motion.h1>

          <motion.p
            variants={item}
            className="font-body text-zinc-400 leading-relaxed max-w-xl mb-10"
            style={{ fontSize: 'clamp(15px, 1.5vw, 17px)' }}
          >
            {t.sub}
          </motion.p>
        </motion.div>

        {/* Right Side — Core System Anchor (Canvas) */}
        <div className="hidden lg:block absolute right-[-35%] -top-[50%] h-[200%] w-[100%] pointer-events-auto z-10">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>

    </section>
  )
}

import { motion } from 'framer-motion'

/**
 * Typographic object: justified INFRA / STRUCTURE block.
 *
 * Design math (Space Grotesk Black, tracking-tighter ≈ -0.05em):
 *   Avg char width ≈ 0.62em
 *   STRUCTURE (9 chars) → fits 420px at ~75px:  9 × 0.62 × 75 ≈ 418px ✓
 *   INFRA     (5 chars) → same width at ~135px:  5 × 0.62 × 135 ≈ 419px ✓
 *
 * Both words visually flush-right, creating a monumental typographic rectangle.
 */
export default function HeroTypoObject() {
  return (
    <motion.div
      className="relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none select-none"
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
    >
      {/* Breathing idle */}
      <motion.div
        className="flex flex-col items-start leading-none w-full px-6"
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, repeatType: 'mirror', duration: 7, ease: 'easeInOut' }}
      >
        {/* INFRA — large, gradient */}
        <span
          className="font-display font-black tracking-tighter text-gradient block leading-[0.88]"
          style={{ fontSize: 'clamp(72px, 9.5vw, 130px)' }}
        >
          INFRA
        </span>

        {/* STRUCTURE — smaller, same gradient dimmed */}
        <span
          className="font-display font-black tracking-tighter block leading-[0.88] text-gradient"
          style={{ fontSize: 'clamp(40px, 5.3vw, 72px)', opacity: 0.55 }}
        >
          STRUCTURE
        </span>

        {/* Micro label */}
        <span
          className="font-mono text-[9px] tracking-[0.25em] uppercase mt-4 block"
          style={{ color: 'rgba(255,255,255,0.15)' }}
        >
          // triumph.infra
        </span>
      </motion.div>
    </motion.div>
  )
}

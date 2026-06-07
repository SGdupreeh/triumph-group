import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Puzzle, Zap, MonitorPlay, Code, Wand2, Paintbrush } from 'lucide-react'

const SPRING = { type: 'spring' as const, bounce: 0, duration: 0.8 }

const variants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: SPRING }
  },
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.3 } }
}

export default function ServicesB2C() {
  const [activeTab, setActiveTab] = useState<'packages' | 'modules'>('packages')

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto bg-[#0c0c0d]">
      <div className="flex flex-col items-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-10 text-center text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[rgba(255,255,255,0.55)]">
          Формат работы
        </h2>

        {/* Toggle */}
        <div className="flex p-1 bg-white/[0.02] border border-white/[0.05] rounded-2xl backdrop-blur-3xl relative">
          <button
            onClick={() => setActiveTab('packages')}
            className={`relative px-6 py-3 text-sm font-medium transition-colors z-10 rounded-xl flex items-center gap-2 ${
              activeTab === 'packages' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Rocket size={16} />
            Быстрый запуск (Пакеты)
            {activeTab === 'packages' && (
              <motion.div
                layoutId="b2c-active-tab"
                className="absolute inset-0 bg-white/[0.06] border border-white/[0.08] rounded-xl -z-10"
                transition={SPRING}
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('modules')}
            className={`relative px-6 py-3 text-sm font-medium transition-colors z-10 rounded-xl flex items-center gap-2 ${
              activeTab === 'modules' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Puzzle size={16} />
            Точечный тюнинг (Модули)
            {activeTab === 'modules' && (
              <motion.div
                layoutId="b2c-active-tab"
                className="absolute inset-0 bg-white/[0.06] border border-white/[0.08] rounded-xl -z-10"
                transition={SPRING}
              />
            )}
          </button>
        </div>
      </div>

      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeTab === 'packages' ? (
            <motion.div
              key="packages"
              variants={variants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div variants={variants.item} className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-white">
                  <MonitorPlay size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">Awwwards Landing</h3>
                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                  Сборка премиум-сайта за 7 дней. Включает 3D-интеграции, GSAP-скролл и выверенный Dark Tech UI. Превращаем вашу визитку в кинематографичный опыт.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['WebGL', 'React', 'Framer Motion', '3D'].map(tag => (
                    <span key={tag} className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500 border border-white/[0.05] rounded-full bg-white/[0.01]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={variants.item} className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-3xl rounded-full group-hover:bg-white/[0.04] transition-colors duration-500" />
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] text-white">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3 tracking-tight">Social Media Takeover</h3>
                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                  Пакет ИИ-рендеров (LABS) + Motion-рилсы для взрывного роста охватов. Полный отказ от студий и классических съемок в пользу AI-продакшена.
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {['AI Renders', 'Motion Design', 'Viral Reach'].map(tag => (
                    <span key={tag} className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-zinc-500 border border-white/[0.05] rounded-full bg-white/[0.01]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="modules"
              variants={variants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={variants.item} className="p-8 rounded-3xl bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 flex flex-col">
                <Code className="text-zinc-500 mb-5" size={20} />
                <h4 className="text-lg font-bold text-white mb-2">WebGL / Canvas интеграция</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Внедрение 3D-сцен или шейдеров в ваш текущий сайт для повышения премиальности.
                </p>
              </motion.div>

              <motion.div variants={variants.item} className="p-8 rounded-3xl bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 flex flex-col">
                <Wand2 className="text-zinc-500 mb-5" size={20} />
                <h4 className="text-lg font-bold text-white mb-2">Пакет ИИ-генераций</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Генерация 20 гиперреалистичных изображений продукта или бренда без фотосессий.
                </p>
              </motion.div>

              <motion.div variants={variants.item} className="p-8 rounded-3xl bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 flex flex-col">
                <Paintbrush className="text-zinc-500 mb-5" size={20} />
                <h4 className="text-lg font-bold text-white mb-2">Редизайн интерфейса</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Перевод устаревшего дизайна в парадигму Dark Tech с упором на типографику.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

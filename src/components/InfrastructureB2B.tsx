import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, Database, Bot, Cpu, Network } from 'lucide-react'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

export default function InfrastructureB2B() {
  const [activeTab, setActiveTab] = useState<'contours' | 'systems'>('contours')

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-[#0c0c0d]">
      <div className="flex flex-col items-center mb-20">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[rgba(255,255,255,0.55)]">
          Архитектурные решения
        </h2>

        {/* Terminal Style Toggle */}
        <div className="flex bg-[#0c0c0d] border border-white/[0.04] p-1 font-mono text-xs tracking-[0.15em]">
          <button
            onClick={() => setActiveTab('contours')}
            className={`relative px-8 py-4 transition-colors z-10 flex items-center gap-3 uppercase ${
              activeTab === 'contours' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            [ АВТОНОМНЫЕ КОНТУРЫ ]
            {activeTab === 'contours' && (
              <motion.div
                layoutId="b2b-active-tab"
                className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] -z-10"
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('systems')}
            className={`relative px-8 py-4 transition-colors z-10 flex items-center gap-3 uppercase ${
              activeTab === 'systems' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            [ ИЗОЛИРОВАННЫЕ СИСТЕМЫ ]
            {activeTab === 'systems' && (
              <motion.div
                layoutId="b2b-active-tab"
                className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] -z-10"
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
          </button>
        </div>
      </div>

      <div className="min-h-[450px]">
        <AnimatePresence mode="wait">
          {activeTab === 'contours' ? (
            <motion.div
              key="contours"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {/* Card 1 */}
              <div className="p-10 md:p-12 bg-white/[0.01] border border-white/[0.04] flex flex-col h-full group hover:border-white/[0.1] transition-colors duration-500">
                <div className="flex justify-between items-start mb-16">
                  <Server className="text-zinc-600 group-hover:text-white transition-colors duration-500" size={32} />
                  <span className="font-mono text-xs tracking-widest text-zinc-600">ROI / OPEX</span>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white/[0.9] mb-6">Сингулярность<br/><span className="text-zinc-600">(Full Stack)</span></h3>
                
                <p className="text-zinc-500 text-lg leading-relaxed mb-10 flex-grow">
                  Полная оцифровка. Разработка корпоративного монолита + внедрение ИИ-отдела продаж. Снижение ФОТ на 40% в первые два квартала за счет полной автоматизации коммуникаций.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/[0.04]">
                  <div>
                    <div className="font-display text-3xl font-bold text-white/[0.9] mb-1">-40%</div>
                    <div className="font-mono text-xs text-zinc-600 tracking-wider">ФОНД ОПЛАТЫ ТРУДА</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-white/[0.9] mb-1">24/7</div>
                    <div className="font-mono text-xs text-zinc-600 tracking-wider">UPTIME АГЕНТОВ</div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-10 md:p-12 bg-white/[0.01] border border-white/[0.04] flex flex-col h-full group hover:border-white/[0.1] transition-colors duration-500">
                <div className="flex justify-between items-start mb-16">
                  <Database className="text-zinc-600 group-hover:text-white transition-colors duration-500" size={32} />
                  <span className="font-mono text-xs tracking-widest text-zinc-600">LEAD GEN</span>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white/[0.9] mb-6">Data & Lead Engine</h3>
                
                <p className="text-zinc-500 text-lg leading-relaxed mb-10 flex-grow">
                  Развертывание n8n-инфраструктуры + парсеры. Непрерывная генерация теплых B2B-лидов напрямую в вашу CRM-систему без вмешательства менеджеров.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/[0.04]">
                  <div>
                    <div className="font-display text-3xl font-bold text-white/[0.9] mb-1">100%</div>
                    <div className="font-mono text-xs text-zinc-600 tracking-wider">АВТОМАТИЗАЦИЯ СБОРА</div>
                  </div>
                  <div>
                    <div className="font-display text-3xl font-bold text-white/[0.9] mb-1">&lt;3s</div>
                    <div className="font-mono text-xs text-zinc-600 tracking-wider">LATENCY ИНТЕГРАЦИИ</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="systems"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Module 1 */}
              <div className="p-8 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-300">
                <Bot className="text-zinc-500 mb-8" size={24} />
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Автономный AI-Агент</h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Квалификатор лидов на базе WhatsApp/Telegram. Отвечает на вопросы, закрывает возражения и назначает встречи в календарь.
                </p>
                <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">/ module ready</div>
              </div>

              {/* Module 2 */}
              <div className="p-8 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-300">
                <Cpu className="text-zinc-500 mb-8" size={24} />
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Кастомный LLM</h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  Ассистент, обученный на вашей корпоративной базе знаний. Помогает саппорту мгновенно находить ответы по технической документации.
                </p>
                <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">/ module ready</div>
              </div>

              {/* Module 3 */}
              <div className="p-8 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-300">
                <Network className="text-zinc-500 mb-8" size={24} />
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Технический аудит</h4>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                  PageSpeed оптимизация, рефакторинг узких мест в коде и настройка серверной архитектуры (Docker, CI/CD).
                </p>
                <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">/ module ready</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

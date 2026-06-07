import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutTemplate, Bot, Wand2, Package, Layers } from 'lucide-react'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

export default function InfrastructureB2B() {
  const [activeTab, setActiveTab] = useState<'complexes' | 'modules'>('complexes')

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-[#0c0c0d]">
      <div className="flex flex-col items-center mb-20">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[rgba(255,255,255,0.55)]">
          Архитектурные решения
        </h2>

        {/* Terminal Style Toggle */}
        <div className="flex bg-[#0c0c0d] border border-white/[0.04] p-1 font-mono text-[11px] sm:text-xs tracking-[0.15em] overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('complexes')}
            className={`relative px-6 sm:px-8 py-4 transition-colors z-10 flex items-center gap-3 uppercase whitespace-nowrap ${
              activeTab === 'complexes' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            [ КОМПЛЕКСЫ ПОД КЛЮЧ ]
            {activeTab === 'complexes' && (
              <motion.div
                layoutId="b2b-active-tab"
                className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] -z-10"
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('modules')}
            className={`relative px-6 sm:px-8 py-4 transition-colors z-10 flex items-center gap-3 uppercase whitespace-nowrap ${
              activeTab === 'modules' ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            [ ОТДЕЛЬНЫЕ МОДУЛИ ]
            {activeTab === 'modules' && (
              <motion.div
                layoutId="b2b-active-tab"
                className="absolute inset-0 bg-white/[0.03] border border-white/[0.08] -z-10"
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
          </button>
        </div>
      </div>

      <div className="min-h-[480px]">
        <AnimatePresence mode="wait">
          {activeTab === 'complexes' ? (
            <motion.div
              key="complexes"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {/* Card 1 */}
              <div className="p-10 md:p-12 bg-white/[0.01] border border-white/[0.04] flex flex-col h-full group hover:border-white/[0.1] transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <Package className="text-zinc-600 group-hover:text-white transition-colors duration-500" size={32} />
                  <span className="font-mono text-[10px] tracking-widest text-zinc-600 border border-white/[0.05] px-3 py-1 rounded-full uppercase bg-white/[0.01]">
                    Для старта
                  </span>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white/[0.9] mb-6 relative z-10">
                  Цифровая Упаковка
                </h3>
                
                <p className="text-zinc-500 text-[15px] leading-relaxed mb-10 flex-grow relative z-10">
                  Создаем премиальное лицо вашего бизнеса в сети. Разрабатываем дорогой сайт, который закрывает возражения одним своим видом, и наполняем его ИИ-контентом.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/[0.04] mb-8 relative z-10">
                  <div>
                    <div className="font-display text-2xl font-bold text-white/[0.9] mb-1">100%</div>
                    <div className="font-mono text-[10px] text-zinc-600 tracking-wider">УНИКАЛЬНЫЙ КОД</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white/[0.9] mb-1">14 дней</div>
                    <div className="font-mono text-[10px] text-zinc-600 tracking-wider">СРОК УПАКОВКИ</div>
                  </div>
                </div>

                {/* Price block */}
                <div className="pt-6 border-t border-white/[0.04] relative z-10">
                  <div className="font-mono text-sm tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 150 000 ₽
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-10 md:p-12 bg-white/[0.01] border border-white/[0.04] flex flex-col h-full group hover:border-white/[0.1] transition-colors duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-3xl rounded-full group-hover:bg-white/[0.03] transition-colors duration-500" />
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <Layers className="text-zinc-600 group-hover:text-white transition-colors duration-500" size={32} />
                  <span className="font-mono text-[10px] tracking-widest text-white/[0.8] border border-white/[0.1] px-3 py-1 rounded-full uppercase bg-white/[0.03]">
                    Full Stack
                  </span>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white/[0.9] mb-6 relative z-10">
                  Бизнес-Автоматизация
                </h3>
                
                <p className="text-zinc-500 text-[15px] leading-relaxed mb-10 flex-grow relative z-10">
                  Заменяем рутину алгоритмами. Разрабатываем сайт, подключаем ботов для обработки клиентов в WhatsApp/TG 24/7 и связываем всё с вашей CRM. Вы получаете готовые лиды, а не просто заявки.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/[0.04] mb-8 relative z-10">
                  <div>
                    <div className="font-display text-2xl font-bold text-white/[0.9] mb-1">-40%</div>
                    <div className="font-mono text-[10px] text-zinc-600 tracking-wider">СНИЖЕНИЕ ФОТ</div>
                  </div>
                  <div>
                    <div className="font-display text-2xl font-bold text-white/[0.9] mb-1">&lt;3 сек</div>
                    <div className="font-mono text-[10px] text-zinc-600 tracking-wider">ОТВЕТ КЛИЕНТАМ</div>
                  </div>
                </div>

                {/* Price block */}
                <div className="pt-6 border-t border-white/[0.04] relative z-10">
                  <div className="font-mono text-sm tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 500 000 ₽
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="modules"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Module 1 */}
              <div className="p-8 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <LayoutTemplate className="text-zinc-500" size={24} />
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-white/[0.02] border border-white/[0.05] px-2 py-1 rounded">
                    UNIT: CODES
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Awwwards-Сайт</h4>
                <p className="text-zinc-500 text-[13px] leading-relaxed mb-10 flex-grow">
                  Разработка быстрого, статусного сайта с 3D-анимациями без использования шаблонов и конструкторов. Только чистый код, который выделяет вас среди 99% конкурентов.
                </p>
                <div className="pt-6 border-t border-white/[0.04]">
                  <div className="font-mono text-xs tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 100 000 ₽
                  </div>
                </div>
              </div>

              {/* Module 2 */}
              <div className="p-8 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <Bot className="text-zinc-500" size={24} />
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-white/[0.02] border border-white/[0.05] px-2 py-1 rounded">
                    UNIT: SYSTEMS
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Умный бот-продавец</h4>
                <p className="text-zinc-500 text-[13px] leading-relaxed mb-10 flex-grow">
                  Нейросеть в вашем WhatsApp или Telegram. Знает всё о вашем продукте, общается как живой человек, квалифицирует клиентов и записывает их на встречи 24/7.
                </p>
                <div className="pt-6 border-t border-white/[0.04]">
                  <div className="font-mono text-xs tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 70 000 ₽
                  </div>
                </div>
              </div>

              {/* Module 3 */}
              <div className="p-8 bg-white/[0.01] border border-white/[0.04] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <Wand2 className="text-zinc-500" size={24} />
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest bg-white/[0.02] border border-white/[0.05] px-2 py-1 rounded">
                    UNIT: LABS
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Пакет ИИ-Контента</h4>
                <p className="text-zinc-500 text-[13px] leading-relaxed mb-10 flex-grow">
                  Переупаковка ваших соцсетей. Генерируем 30+ премиальных изображений и моушн-роликов вашего продукта, чтобы соцсети выглядели дорого.
                </p>
                <div className="pt-6 border-t border-white/[0.04]">
                  <div className="font-mono text-xs tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 40 000 ₽
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

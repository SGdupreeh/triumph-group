import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Rocket, Aperture, Fingerprint, LayoutTemplate, MessageSquareText, Image as ImageIcon } from 'lucide-react'

const EASE = [0.23, 1, 0.32, 1] as [number, number, number, number]

export default function ServicesB2C() {
  const [activeTab, setActiveTab] = useState<'complexes' | 'modules'>('complexes')

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto bg-[#0c0c0d]">
      <div className="flex flex-col items-center mb-20">
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[rgba(255,255,255,0.55)]">
          Формат работы
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
                layoutId="b2c-active-tab"
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
                layoutId="b2c-active-tab"
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
              <div className="p-10 md:p-12 bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl flex flex-col h-full group hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 relative overflow-hidden rounded-none sm:rounded-md">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <Rocket className="text-zinc-600 group-hover:text-white transition-colors duration-500" size={32} />
                  <span className="font-mono text-[10px] tracking-widest text-zinc-600 border border-white/[0.05] px-3 py-1 rounded-full uppercase bg-white/[0.01]">
                    Для старта
                  </span>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white/[0.9] mb-6 relative z-10">
                  Цифровой Запуск
                </h3>
                
                <p className="text-zinc-400 text-[15px] leading-relaxed mb-10 flex-grow relative z-10">
                  Создаем кинематографичный лендинг, который продает одним своим видом. Никаких шаблонов — только кастомный код, 3D-анимации и эстетика уровня Apple, чтобы ваши клиенты сразу понимали: вы стоите дорого.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/[0.04] mb-8 relative z-10">
                  <div>
                    <div className="font-display text-xl font-bold text-white/[0.9] mb-1">С 1 секунды</div>
                    <div className="font-mono text-[10px] text-zinc-500 tracking-wider">WOW-ЭФФЕКТ</div>
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-white/[0.9] mb-1">За 7 дней</div>
                    <div className="font-mono text-[10px] text-zinc-500 tracking-wider">СРОК ЗАПУСКА</div>
                  </div>
                </div>

                {/* Price block */}
                <div className="pt-6 border-t border-white/[0.05] relative z-10">
                  <div className="font-mono text-sm tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 150 000 ₽
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-10 md:p-12 bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl flex flex-col h-full group hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-500 relative overflow-hidden rounded-none sm:rounded-md">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-3xl rounded-full group-hover:bg-white/[0.03] transition-colors duration-500" />
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <Aperture className="text-zinc-600 group-hover:text-white transition-colors duration-500" size={32} />
                  <span className="font-mono text-[10px] tracking-widest text-white/[0.8] border border-white/[0.1] px-3 py-1 rounded-full uppercase bg-white/[0.03]">
                    Доминирование
                  </span>
                </div>
                
                <h3 className="text-3xl font-display font-bold text-white/[0.9] mb-6 relative z-10">
                  Социальное Доминирование
                </h3>
                
                <p className="text-zinc-400 text-[15px] leading-relaxed mb-10 flex-grow relative z-10">
                  Полная визуальная переупаковка вашего личного бренда. Делаем Awwwards-сайт и забираем на себя создание ИИ-контента для ваших соцсетей. Вы получаете готовые премиум-материалы, которые собирают охваты.
                </p>
                
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/[0.04] mb-8 relative z-10">
                  <div>
                    <div className="font-display text-xl font-bold text-white/[0.9] mb-1">x10</div>
                    <div className="font-mono text-[10px] text-zinc-500 tracking-wider">К ОХВАТАМ</div>
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-white/[0.9] mb-1">Премиум</div>
                    <div className="font-mono text-[10px] text-zinc-500 tracking-wider">ВИЗУАЛ</div>
                  </div>
                </div>

                {/* Price block */}
                <div className="pt-6 border-t border-white/[0.05] relative z-10">
                  <div className="font-mono text-sm tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 250 000 ₽
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
              <div className="p-8 bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-300 flex flex-col h-full rounded-none sm:rounded-md">
                <div className="flex justify-between items-center mb-8">
                  <LayoutTemplate className="text-zinc-500" size={24} />
                  <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest bg-white/[0.02] border border-white/[0.05] px-2 py-1 rounded">
                    UNIT: CODES
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Awwwards-Визитка</h4>
                <p className="text-zinc-400 text-[13px] leading-relaxed mb-10 flex-grow">
                  Имиджевый сайт-портфолио с плавной кинематикой и минималистичным Dark Tech дизайном. Выделяет вас среди 99% конкурентов в вашей нише.
                </p>
                <div className="pt-6 border-t border-white/[0.05]">
                  <div className="font-mono text-xs tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 80 000 ₽
                  </div>
                </div>
              </div>

              {/* Module 2 */}
              <div className="p-8 bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-300 flex flex-col h-full rounded-none sm:rounded-md">
                <div className="flex justify-between items-center mb-8">
                  <Fingerprint className="text-zinc-500" size={24} />
                  <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest bg-white/[0.02] border border-white/[0.05] px-2 py-1 rounded">
                    UNIT: SYSTEMS
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Умный Клон-Ассистент</h4>
                <p className="text-zinc-400 text-[13px] leading-relaxed mb-10 flex-grow">
                  Обучаем нейросеть на ваших материалах. Она отвечает в Direct и Telegram от вашего имени, копируя ваш стиль общения, и прогревает аудиторию 24/7.
                </p>
                <div className="pt-6 border-t border-white/[0.05]">
                  <div className="font-mono text-xs tracking-widest text-white/[0.6]">
                    <span className="text-zinc-600 mr-2">COST:</span>ОТ 50 000 ₽
                  </div>
                </div>
              </div>

              {/* Module 3 */}
              <div className="p-8 bg-white/[0.015] border border-white/[0.05] backdrop-blur-2xl hover:bg-white/[0.025] hover:border-white/[0.08] transition-all duration-300 flex flex-col h-full rounded-none sm:rounded-md">
                <div className="flex justify-between items-center mb-8">
                  <ImageIcon className="text-zinc-500" size={24} />
                  <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest bg-white/[0.02] border border-white/[0.05] px-2 py-1 rounded">
                    UNIT: LABS
                  </span>
                </div>
                <h4 className="font-display text-xl font-bold text-white/[0.9] mb-4">Пакет AI-Рендеров</h4>
                <p className="text-zinc-400 text-[13px] leading-relaxed mb-10 flex-grow">
                  Создаем 30 высококачественных изображений и промо-роликов с вашим продуктом или образом для постинга в соцсети. Никаких стоковых фото.
                </p>
                <div className="pt-6 border-t border-white/[0.05]">
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

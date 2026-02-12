import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AbhyasForm } from '../types';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/ui/Header';

interface AbhyasProps {
  forms: AbhyasForm[];
}

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const pageTransition = {
  duration: 0.2,
  ease: "easeOut" as const
};

const Abhyas: React.FC<AbhyasProps> = ({ forms }) => {
  const [completed, setCompleted] = useState<string[]>([]);
  const { t, font } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem('bk_abhyas_daily');
    if (saved) {
      const { date, ids } = JSON.parse(saved);
      // Reset if new day
      if (date === new Date().toDateString()) {
        setCompleted(ids);
      }
    }
  }, []);

  const toggleComplete = (id: string) => {
    const newCompleted = completed.includes(id) 
      ? completed.filter(c => c !== id)
      : [...completed, id];
    
    setCompleted(newCompleted);
    localStorage.setItem('bk_abhyas_daily', JSON.stringify({
      date: new Date().toDateString(),
      ids: newCompleted
    }));
  };

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className={`min-h-screen ${font}`}
    >
      <Header title={t('nav.abhyas')}>
        <div className="flex flex-col gap-3 pt-1">
            <div className="flex items-end justify-between">
                <div>
                     <h2 className="text-2xl font-bold text-bk-text font-hindi-title leading-none">
                        {t('abhyas.title')}
                     </h2>
                </div>
            </div>
            
            <p className="text-xs text-bk-text/60 font-sans leading-tight line-clamp-1">
                 {t('abhyas.subtitle')}
            </p>

            <div className="bg-white/50 rounded-lg p-2 flex justify-between items-center shadow-sm border border-white/50">
                <span className="text-xs font-bold text-bk-text/70 font-sans">{t('abhyas.progress')}</span>
                <div className="w-32 h-2 bg-gray-200/50 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-bk-glow to-bk-gold transition-all duration-500"
                        style={{ width: `${(completed.length / 5) * 100}%` }}
                    ></div>
                </div>
            </div>
        </div>
      </Header>

      <div className="px-4 pb-24 pt-4 max-w-2xl mx-auto grid gap-4">
        {forms.map((form, index) => {
          const isDone = completed.includes(form.id);

          return (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.2 }}
              className={`relative bg-white rounded-2xl p-5 shadow-sm border border-transparent hover:border-bk-highlight transition-all duration-300 ${isDone ? 'opacity-70 bg-gray-50' : ''}`}
            >
              <div className="absolute top-4 right-4 z-10">
                <button onClick={() => toggleComplete(form.id)} className="text-bk-accent hover:scale-110 transition-transform active:scale-95">
                  {isDone ? <FaCheckCircle size={24} /> : <FaRegCircle size={24} className="text-gray-300" />}
                </button>
              </div>

              <div className="flex items-center gap-3 mb-2">
                 <div className={`w-2 h-8 rounded-full ${form.color_theme.replace('text-', 'bg-')}`}></div>
                 <div>
                    <h3 className="text-lg font-bold text-bk-text font-hindi-title">
                      {form.hindi_title}
                    </h3>
                    <h4 className="text-xs uppercase tracking-wide text-gray-500 font-sans">{form.title}</h4>
                 </div>
              </div>

              <p className="mt-2 text-sm text-gray-600 leading-relaxed italic border-l-2 border-gray-100 pl-3">
                "{form.description_hindi}"
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Abhyas;
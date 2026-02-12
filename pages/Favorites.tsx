import React, { useState, useEffect } from 'react';
import { Murli } from '../types';
import { getUserProgress, fetchMurlis } from '../services/supabase';
import { FaHeartBroken, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const pageTransition = {
  duration: 0.2,
  ease: "easeOut" as const
};

const Favorites: React.FC = () => {
  const [favMurlis, setFavMurlis] = useState<Murli[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, font } = useLanguage();

  useEffect(() => {
    const loadFavs = async () => {
      const progress = getUserProgress();
      if (progress.favorites.length === 0) {
        setLoading(false);
        return;
      }
      
      const allMurlis = await fetchMurlis();
      const filtered = allMurlis.filter(m => progress.favorites.includes(m.id));
      setFavMurlis(filtered);
      setLoading(false);
    };
    loadFavs();
  }, []);

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className={`pt-4 pb-24 px-4 max-w-2xl mx-auto min-h-screen ${font}`}
    >
      <h2 className="text-2xl font-bold text-bk-text mb-6 flex items-center gap-2 font-hindi-title">
        <FaStar className="text-bk-gold" /> {t('fav.title')}
      </h2>

      {loading ? (
        <div className="text-center mt-10 text-bk-accent animate-pulse font-sans">{t('fav.loading')}</div>
      ) : favMurlis.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400 font-sans">
           <FaHeartBroken size={40} className="mb-4 opacity-50" />
           <p>{t('fav.empty')}</p>
           <p className="text-sm mt-2">{t('fav.emptySub')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {favMurlis.map(murli => (
            <motion.div 
                key={murli.id} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-bk-gold/20"
            >
               <div className="flex justify-between">
                  <span className="text-xs text-gray-400 font-sans">{murli.date}</span>
                  <span className="text-[10px] bg-bk-bg text-bk-text px-2 rounded-full font-sans">{murli.type}</span>
               </div>
               <h3 className="text-lg font-bold text-bk-text mt-2 font-hindi-title">
                 {murli.title_hindi}
               </h3>
               <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                 {murli.content_hindi}
               </p>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Favorites;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaRegStar, FaMicrophoneAlt, FaFeatherAlt, FaArrowLeft, FaYoutube, FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { Murli } from '../types';
import { toggleFavorite, getUserProgress } from '../services/supabase';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/ui/Header';

interface MurlisProps {
  murlis: Murli[];
  searchQuery: string;
  onClearSearch: () => void;
  onUpdateSearch?: (q: string) => void;
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

const Murlis: React.FC<MurlisProps> = ({ murlis, searchQuery, onClearSearch, onUpdateSearch }) => {
  const location = useLocation();
  const [selectedMurli, setSelectedMurli] = useState<Murli | null>(null);
  const [selectedType, setSelectedType] = useState<'Sakar' | 'Avyakt' | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState<number>(18);
  const { t, font, setFont, availableFonts } = useLanguage();

  useEffect(() => {
    const userProgress = getUserProgress();
    setFavorites(userProgress.favorites);
  }, []);

  useEffect(() => {
    // Check for navigation state to open a specific murli
    const state = location.state as { selectedMurliId?: string } | null;
    if (state?.selectedMurliId) {
        const targetId = state.selectedMurliId;
        const targetMurli = murlis.find(m => m.id === targetId);
        if (targetMurli) {
            setSelectedMurli(targetMurli);
            // Clear state
            window.history.replaceState({}, document.title);
        }
    }
  }, [location.state, murlis]);

  const handleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const newFavs = toggleFavorite(id);
    setFavorites(newFavs);
  };

  const isSearchActive = searchQuery && searchQuery.length > 0;
  
  const filteredMurlis = murlis.filter(m => {
    if (isSearchActive) {
        const q = searchQuery.toLowerCase();
        return m.title_hindi.toLowerCase().includes(q) || 
               m.date.includes(searchQuery) ||
               m.content_hindi.toLowerCase().includes(q) ||
               m.type.toLowerCase().includes(q);
    }
    if (selectedType && m.type !== selectedType) return false;
    return true;
  });

  const showCategories = !selectedType && !isSearchActive;

  return (
    <>
      <div className={`min-h-screen ${font}`}>
        <Header 
            title={t('nav.murlis')} 
            onSearch={onUpdateSearch} 
            searchQuery={searchQuery}
        >
             <div className="flex flex-col gap-1 pt-1 pb-2">
                <div className="flex items-end justify-between">
                    <div className="relative">
                        <h2 className="text-3xl font-bold text-bk-text font-hindi-title leading-none mt-2">
                            {t('murlis.title')}
                        </h2>
                    </div>
                </div>

                {/* Sticky Context Navigation Area - Use layout animation for smoothness */}
                <AnimatePresence>
                    {(selectedType || isSearchActive) && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                            transition={{ duration: 0.2 }}
                        >
                            <div className="flex items-center justify-between pt-3">
                                <button 
                                    onClick={() => {
                                    if (isSearchActive) {
                                        onClearSearch();
                                    } else {
                                        setSelectedType(null);
                                    }
                                    }}
                                    className="flex items-center gap-2 text-bk-accent font-bold hover:text-bk-glow transition-colors px-3 py-1.5 rounded-full bg-white/50 border border-bk-accent/10 text-xs shadow-sm active:scale-95"
                                >
                                    <FaArrowLeft size={10} /> <span className="font-sans">{t('murlis.back')}</span>
                                </button>
                                
                                <div className="flex items-center gap-2">
                                    {isSearchActive ? (
                                       <span className="text-[10px] font-sans text-gray-400 bg-white/50 px-2 py-1 rounded-md border border-gray-100">
                                            "{searchQuery}"
                                       </span>
                                    ) : (
                                       <span className="text-[10px] font-bold uppercase tracking-wide text-bk-text/50 bg-white/50 px-2 py-1 rounded-md border border-gray-100 font-sans">
                                            {selectedType}
                                       </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Header>

        <motion.div 
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="pt-4 pb-24 px-4 max-w-2xl mx-auto"
        >
            {showCategories && (
                <div className="grid gap-6 mt-2">
                    <motion.div 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType('Sakar')}
                    className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-2xl shadow-sm border border-orange-100 cursor-pointer flex flex-col items-center text-center gap-4 group hover:shadow-md transition-all duration-200"
                    >
                        <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-200 shadow-inner">
                            <FaMicrophoneAlt size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-bk-text mb-2 font-hindi-title">
                            {t('murlis.sakar.title')}
                            </h3>
                            <p className="text-sm text-gray-600 font-sans leading-relaxed">
                            {t('murlis.sakar.desc')}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div 
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType('Avyakt')}
                    className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-sm border border-purple-100 cursor-pointer flex flex-col items-center text-center gap-4 group hover:shadow-md transition-all duration-200"
                    >
                        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-200 shadow-inner">
                            <FaFeatherAlt size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-bk-text mb-2 font-hindi-title">
                            {t('murlis.avyakt.title')}
                            </h3>
                            <p className="text-sm text-gray-600 font-sans leading-relaxed">
                            {t('murlis.avyakt.desc')}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}

            {!showCategories && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                >
                    {filteredMurlis.length === 0 && (
                        <div className="text-center py-10 text-gray-400 font-sans">
                            {t('murlis.nomatch')}
                        </div>
                    )}
                    
                    {filteredMurlis.map((murli) => {
                    const isFav = favorites.includes(murli.id);
                    
                    return (
                        <div 
                        key={murli.id}
                        className="bg-white rounded-xl shadow-sm border border-transparent hover:border-bk-accent transition-all duration-200 cursor-pointer group relative overflow-hidden active:bg-gray-50"
                        onClick={() => setSelectedMurli(murli)}
                        >
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                            <div className="flex-1 pr-8">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide font-sans ${murli.type === 'Avyakt' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {murli.type}
                                    </span>
                                    <span className="text-xs text-gray-400 font-sans">{murli.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-bk-text leading-snug group-hover:text-bk-accent transition-colors font-hindi-title">
                                {murli.title_hindi}
                                </h3>
                            </div>
                            
                            <button 
                                onClick={(e) => handleFavorite(murli.id, e)}
                                className="absolute top-4 right-4 p-2 rounded-full z-10 hover:scale-110 transition-transform active:scale-95"
                            >
                                {isFav ? (
                                    <FaStar size={22} className="text-red-500 drop-shadow-sm" />
                                ) : (
                                    <FaRegStar size={22} className="text-gray-300 hover:text-red-400" />
                                )}
                            </button>
                            </div>
                            
                            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                            {murli.content_hindi}
                            </p>
                            
                            <div className="mt-3 flex items-center text-xs font-bold text-bk-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            पूरा पढ़ें &rarr;
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </motion.div>
            )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMurli && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'tween', ease: 'circOut', duration: 0.3 }}
            className={`fixed inset-0 z-[100] bg-bk-bg flex flex-col ${font} gpu-accelerated`}
          >
            <div className="flex-none bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between shadow-sm z-10">
               <button 
                  onClick={() => setSelectedMurli(null)}
                  className="p-2 -ml-2 text-bk-text hover:text-bk-accent transition-colors flex items-center gap-1 active:scale-95"
                >
                  <FaArrowLeft />
                  <span className="text-sm font-bold">{t('murlis.back')}</span>
                </button>
                
                <div className="text-center">
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{selectedMurli.date}</div>
                    <div className="text-sm font-bold text-bk-text">{selectedMurli.type}</div>
                </div>

                <button 
                  onClick={() => handleFavorite(selectedMurli.id)}
                  className="p-2 -mr-2 active:scale-90 transition-transform"
                >
                   {favorites.includes(selectedMurli.id) ? (
                        <FaStar size={20} className="text-red-500" />
                    ) : (
                        <FaRegStar size={20} className="text-gray-400" />
                    )}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 bg-bk-bg">
                <div className="max-w-2xl mx-auto">
                    <div className="w-full bg-black rounded-xl overflow-hidden shadow-lg mb-4 aspect-video relative group">
                        {selectedMurli.youtube_id ? (
                            <iframe 
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${selectedMurli.youtube_id}`}
                                title="Murli Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-white/50">
                                <FaYoutube size={48} className="mb-2 text-red-600 opacity-80" />
                                <span className="text-xs">No Video Available</span>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-bk-accent/10 overflow-hidden mb-8">
                        <div className="p-6 pb-4 border-b border-gray-100/50 bg-gradient-to-b from-orange-50/30 to-transparent">
                            <h1 className="text-2xl font-bold text-bk-text mb-4 leading-tight font-hindi-title">
                                {selectedMurli.title_hindi}
                            </h1>
                            
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 shrink-0 font-sans">फ़ॉन्ट:</span>
                                    <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
                                        {availableFonts.map((f) => (
                                            <button 
                                                key={f.class}
                                                onClick={() => setFont(f.class)}
                                                className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 ${f.class} ${font === f.class ? 'bg-white text-bk-accent shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}`}
                                            >
                                                {f.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 font-sans">साइज:</span>
                                     <span className="text-xs text-gray-400 font-sans">A</span>
                                     <input 
                                       type="range" 
                                       min="14" 
                                       max="40" 
                                       step="1"
                                       value={fontSize} 
                                       onChange={(e) => setFontSize(Number(e.target.value))}
                                       className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bk-accent"
                                     />
                                     <span className="text-xl text-bk-text font-sans">A</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                            >
                                <p 
                                    style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
                                    className="whitespace-pre-wrap text-bk-text transition-all duration-200"
                                >
                                    {selectedMurli.content_hindi}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Murlis;
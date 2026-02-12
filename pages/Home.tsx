import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShareAlt, FaSearch, FaCalendarAlt, FaTimes, FaBookOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Murli } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeProps {
  dailyMurli?: Murli;
  onSearch: (query: string) => void;
}

const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 }
};

const pageTransition = {
  duration: 0.3,
  ease: "easeOut" as const
};

const Home: React.FC<HomeProps> = ({ dailyMurli, onSearch }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [activePicker, setActivePicker] = useState<'day' | 'month' | 'year' | null>(null);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Format date in Hindi
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    };
    try {
        setFormattedDate(new Intl.DateTimeFormat('hi-IN-u-nu-latn', options).format(today));
    } catch (e) {
        setFormattedDate(today.toDateString());
    }
  }, []);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: '01', label: 'जनवरी' },
    { value: '02', label: 'फरवरी' },
    { value: '03', label: 'मार्च' },
    { value: '04', label: 'अप्रैल' },
    { value: '05', label: 'मई' },
    { value: '06', label: 'जून' },
    { value: '07', label: 'जुलाई' },
    { value: '08', label: 'अगस्त' },
    { value: '09', label: 'सितंबर' },
    { value: '10', label: 'अक्टूबर' },
    { value: '11', label: 'नवंबर' },
    { value: '12', label: 'दिसंबर' }
  ];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1960 + 1 }, (_, i) => currentYear - i);

  const handleSearch = () => {
    const parts = [];
    if (year) parts.push(year);
    if (month) parts.push(month);
    if (day) parts.push(day.padStart(2, '0'));

    if (parts.length > 0) {
      const query = parts.join('-');
      onSearch(query);
      navigate('/murlis');
    }
  };

  const handleReadFullMurli = () => {
    if (dailyMurli) {
      navigate('/murlis', { state: { selectedMurliId: dailyMurli.id } });
    } else {
      navigate('/murlis');
    }
  };

  const closePicker = () => setActivePicker(null);

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className="min-h-[100dvh] relative flex flex-col items-center justify-start pt-20 pb-8 bg-[#D32F2F] overflow-hidden"
    >
      
      {/* 
         Background Layer - Optimized for Performance
         Using 'gpu-accelerated' class which adds transform: translateZ(0)
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
         <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
            
            <div className="relative flex items-center justify-center">
                
                {/* Rays Layer 1 (Clockwise) */}
                <div className="absolute w-[200vmax] h-[200vmax] animate-spin-slow opacity-40 gpu-accelerated" style={{ willChange: 'transform' }}>
                    <div className="w-full h-full" style={{
                        background: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(255, 255, 255, 0.35) 0deg 4deg, transparent 4deg 12deg)'
                    }}></div>
                </div>

                {/* Rays Layer 2 (Counter-Clockwise) */}
                <div className="absolute w-[200vmax] h-[200vmax] animate-spin-slow opacity-25 gpu-accelerated" style={{ animationDirection: 'reverse', animationDuration: '160s', willChange: 'transform' }}>
                    <div className="w-full h-full" style={{
                        background: 'repeating-conic-gradient(from 20deg at 50% 50%, rgba(255, 235, 59, 0.2) 0deg 2deg, transparent 2deg 15deg)'
                    }}></div>
                </div>

                {/* Glow Gradient */}
                <div className="absolute w-[80vmin] h-[80vmin] bg-[radial-gradient(circle_closest-side,_#FFFFFF_0%,_#FFEB3B_15%,_#FF5722_50%,_transparent_100%)] opacity-80 blur-3xl gpu-accelerated"></div>

                {/* Shiv Baba White Point */}
                <div className="absolute z-10 w-4 h-4 gpu-accelerated">
                     <div className="absolute inset-0 bg-white rounded-full shadow-[0_0_30px_10px_rgba(255,255,255,1),0_0_60px_25px_rgba(255,215,0,0.8)] animate-pulse-slow"></div>
                     <div className="absolute inset-0 bg-white blur-[1px] rounded-full"></div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#B71C1C] opacity-90 gpu-accelerated"></div>
         </div>
      </div>

      {/* Scrollable Content */}
      <div 
        className="relative z-10 w-full max-w-md px-6 flex flex-col items-center text-center space-y-8 mt-4"
      >
        <div>
             <div className="mb-4 inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full shadow-lg">
                <p className="text-white font-bold tracking-wide font-sans text-sm drop-shadow-md uppercase">
                    {formattedDate}
                </p>
             </div>

            <h2 className="text-sm font-bold text-bk-gold uppercase tracking-[0.2em] mb-2 opacity-90 shadow-black drop-shadow-md font-sans">BK-Space</h2>
            <h1 className="text-5xl font-normal text-white mb-2 drop-shadow-xl font-hindi-title">
               ओम शान्ति
            </h1>
            <p className="text-white/95 text-lg font-light tracking-wide drop-shadow-lg font-hindi-title">
              {t('home.subtitle')}
            </p>
        </div>

        {/* Date Search Bar */}
        <div className="w-full relative bg-white/20 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-2 mb-3 text-white/90 text-sm font-bold uppercase tracking-wider font-sans">
                <FaCalendarAlt /> 
                <span>मुरली खोजें</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
                <button 
                    onClick={() => setActivePicker('day')}
                    className="relative w-full bg-white/10 border border-white/30 rounded-lg px-2 py-3 text-white text-center hover:bg-white/20 transition-colors flex flex-col items-center justify-center min-h-[60px]"
                >
                    <span className="text-[10px] text-white/60 uppercase tracking-wider font-bold mb-1">दिन</span>
                    <span className="text-xl font-bold font-sans">{day || '--'}</span>
                </button>

                <button 
                    onClick={() => setActivePicker('month')}
                    className="relative w-full bg-white/10 border border-white/30 rounded-lg px-2 py-3 text-white text-center hover:bg-white/20 transition-colors flex flex-col items-center justify-center min-h-[60px]"
                >
                    <span className="text-[10px] text-white/60 uppercase tracking-wider font-bold mb-1">माह</span>
                    <div className="flex flex-col items-center leading-none">
                        <span className="text-lg font-bold font-hindi-title">{month ? months.find(m => m.value === month)?.label : '--'}</span>
                        {month && <span className="text-[10px] font-sans opacity-80 mt-0.5">{months.find(m => m.value === month)?.value}</span>}
                    </div>
                </button>

                <button 
                    onClick={() => setActivePicker('year')}
                    className="relative w-full bg-white/10 border border-white/30 rounded-lg px-2 py-3 text-white text-center hover:bg-white/20 transition-colors flex flex-col items-center justify-center min-h-[60px]"
                >
                    <span className="text-[10px] text-white/60 uppercase tracking-wider font-bold mb-1">वर्ष</span>
                    <span className="text-xl font-bold font-sans">{year || '--'}</span>
                </button>
            </div>

            <button 
                onClick={handleSearch}
                className="w-full mt-3 bg-white text-bk-accent hover:bg-bk-gold hover:text-bk-text transition-colors font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg active:scale-95 duration-200"
            >
                <FaSearch /> खोजें
            </button>
        </div>

        {/* Daily Pearl Card */}
        <div className="w-full bg-gradient-to-b from-white/25 to-white/10 backdrop-blur-xl rounded-[2rem] p-8 border border-white/30 shadow-[0_15px_50px_rgba(0,0,0,0.25)] text-left relative overflow-hidden group gpu-accelerated">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          <div className="flex justify-between items-start mb-6">
             <div className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider shadow-sm font-sans">
               {t('home.vardan')}
             </div>
             <button className="text-white/80 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
                <FaShareAlt size={18} />
             </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-relaxed drop-shadow-md font-hindi-title">
              "{dailyMurli?.content_hindi}"
            </h3>
          </div>
          
          <div className="border-t border-white/20 pt-4 flex flex-col gap-3">
             <button 
                onClick={handleReadFullMurli}
                className="w-full py-3 bg-white text-bk-accent hover:bg-bk-gold hover:text-bk-text transition-colors rounded-xl font-bold font-sans shadow-md flex items-center justify-center gap-2 active:scale-[0.98] duration-200"
             >
                <FaBookOpen /> {t('home.readMurli')}
             </button>
             
             <div className="text-right mt-1 text-xs font-bold text-white/70 font-sans">
                {dailyMurli?.date || "08/06/1971"}
            </div>
          </div>
        </div>
      </div>

      {/* Picker Modal Overlay - Faster Transitions */}
      <AnimatePresence>
        {activePicker && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={closePicker}
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 10, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.95, y: 10, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden flex flex-col max-h-[70vh]"
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-bk-bg/50">
                        <h3 className="text-lg font-bold text-bk-text font-hindi-title">
                            {activePicker === 'day' && 'दिन चुनें'}
                            {activePicker === 'month' && 'माह चुनें'}
                            {activePicker === 'year' && 'वर्ष चुनें'}
                        </h3>
                        <button onClick={closePicker} className="text-gray-400 hover:text-bk-accent p-1 rounded-full hover:bg-black/5">
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <div className="overflow-y-auto p-4">
                        {/* Day Picker */}
                        {activePicker === 'day' && (
                            <div className="grid grid-cols-7 gap-2">
                                {days.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => { setDay(d.toString()); closePicker(); }}
                                        className={`aspect-square flex items-center justify-center rounded-lg font-bold transition-all text-sm font-sans ${
                                            day === d.toString() 
                                            ? 'bg-bk-accent text-white shadow-md transform scale-105' 
                                            : 'bg-gray-50 text-gray-700 hover:bg-orange-100 active:scale-95'
                                        }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Month Picker */}
                        {activePicker === 'month' && (
                            <div className="grid grid-cols-2 gap-3">
                                {months.map(m => (
                                    <button
                                        key={m.value}
                                        onClick={() => { setMonth(m.value); closePicker(); }}
                                        className={`p-3 rounded-xl font-bold transition-all text-left flex flex-col items-start ${
                                            month === m.value 
                                            ? 'bg-bk-accent text-white shadow-md transform scale-[1.02]' 
                                            : 'bg-gray-50 text-gray-700 hover:bg-orange-100 active:scale-95'
                                        }`}
                                    >
                                        <span className="text-xs opacity-70 mb-1 font-sans">{m.value}</span>
                                        <span className="text-lg leading-none font-hindi-title">{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Year Picker */}
                        {activePicker === 'year' && (
                            <div className="grid grid-cols-4 gap-2">
                                {years.map(y => (
                                    <button
                                        key={y}
                                        onClick={() => { setYear(y.toString()); closePicker(); }}
                                        className={`py-2 rounded-lg font-bold transition-all text-sm font-sans ${
                                            year === y.toString() 
                                            ? 'bg-bk-accent text-white shadow-md transform scale-105' 
                                            : 'bg-gray-50 text-gray-700 hover:bg-orange-100 active:scale-95'
                                        }`}
                                    >
                                        {y}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;
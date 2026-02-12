import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CourseDay } from '../types';
import { toggleCourseDay, getUserProgress } from '../services/supabase';
import { FaCheck, FaBookReader } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import Header from '../components/ui/Header';

interface CourseProps {
  days: CourseDay[];
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

const Course: React.FC<CourseProps> = ({ days }) => {
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const { t, font } = useLanguage();

  useEffect(() => {
    const progress = getUserProgress();
    setCompletedDays(progress.completedCourseDays);
  }, []);

  const handleToggleDay = (dayNum: number) => {
    const newProgress = toggleCourseDay(dayNum);
    setCompletedDays(newProgress);
  };

  const progressPercentage = Math.round((completedDays.length / 7) * 100);

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      className={`min-h-screen ${font}`}
    >
      <Header title={t('nav.course')}>
        <div className="flex flex-col gap-3 pt-1">
             <div className="flex items-end justify-between">
                <div>
                     <h2 className="text-2xl font-bold text-bk-text font-hindi-title leading-none">
                        {t('course.title')}
                     </h2>
                </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-white/50 shadow-sm">
                <div className="flex items-center justify-between text-xs text-bk-text/70 mb-1.5 font-sans">
                <span>{t('course.journey')}</span>
                <span className="font-bold">{progressPercentage}% {t('course.completed')}</span>
                </div>
                <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-bk-accent to-bk-glow transition-all duration-700 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
                </div>
            </div>
        </div>
      </Header>

      <div className="px-4 pb-32 pt-6 max-w-2xl mx-auto space-y-6 relative">
        {/* Connecting Line */}
        <div className="absolute left-[35px] top-6 bottom-10 w-0.5 bg-gray-200 -z-10"></div>

        {days.map((day, index) => {
          const isCompleted = completedDays.includes(day.day);
          const isLocked = index > 0 && !completedDays.includes(days[index - 1].day) && !isCompleted;

          return (
            <div 
              key={day.day}
              className={`flex gap-4 transition-opacity duration-300 ${isLocked ? 'opacity-50 blur-[1px] pointer-events-none' : ''}`}
            >
              <div className="flex flex-col items-center pt-1">
                <div 
                  onClick={() => !isLocked && handleToggleDay(day.day)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-md cursor-pointer transition-transform active:scale-95 z-10 font-sans border-2 border-white ${isCompleted ? 'bg-green-500' : 'bg-bk-accent hover:bg-bk-glow'}`}
                >
                  {isCompleted ? <FaCheck size={14} /> : day.day}
                </div>
              </div>

              <div className="flex-1 bg-white rounded-xl p-5 shadow-sm border border-gray-100 relative group hover:border-bk-highlight transition-all">
                <div className="absolute top-4 right-4 text-gray-100 text-4xl font-hindi-title opacity-20 group-hover:opacity-40 transition-opacity select-none">
                    {day.day}
                </div>
                
                <div className="flex flex-col items-start mb-3 relative z-10">
                  <span className="text-[10px] font-sans font-bold bg-orange-50 text-orange-600 px-2 py-0.5 rounded mb-1">
                    {day.theme_hindi}
                  </span>
                  <h3 className="text-lg font-bold text-bk-text font-hindi-title">
                    {day.title_hindi}
                  </h3>
                </div>
                
                <div className="mb-4 relative z-10">
                  <h4 className="text-[10px] font-bold uppercase text-gray-400 mb-1 font-sans">{t('course.reflection')}</h4>
                  <p className="text-sm text-gray-600 italic leading-relaxed">"{day.reflection_hindi}"</p>
                </div>

                <div className="bg-bk-bg/50 rounded-lg p-3 relative z-10">
                  <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 mb-2 font-sans">
                    <FaBookReader /> {t('course.resources')}
                  </h4>
                  <ul className="list-disc list-inside text-xs text-bk-text space-y-1 font-sans">
                    {day.resources.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => handleToggleDay(day.day)}
                  className={`mt-4 w-full py-2 rounded-lg text-sm font-bold transition-colors font-sans relative z-10 active:scale-[0.98] ${isCompleted ? 'bg-gray-100 text-gray-500' : 'bg-bk-accent text-white hover:bg-bk-glow'}`}
                >
                  {isCompleted ? t('course.markIncomplete') : t('course.markDone')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Course;
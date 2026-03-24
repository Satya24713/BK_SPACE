import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Murlis from './pages/Murlis';
import Abhyas from './pages/Abhyas';
import Course from './pages/Course';
import Favorites from './pages/Favorites';
import AdminUpload from './pages/AdminUpload';

import BottomNav from './components/layout/BottomNav';
import Header from './components/ui/Header'; 

import { fetchMurlis, fetchAbhyas, fetchCourseDays } from './services/supabase';
import { Murli, AbhyasForm, CourseDay } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { t, font } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<{
    murlis: Murli[];
    abhyas: AbhyasForm[];
    course: CourseDay[];
  }>({ murlis: [], abhyas: [], course: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m, a, c] = await Promise.all([
          fetchMurlis(),
          fetchAbhyas(),
          fetchCourseDays()
        ]);
        setData({ 
          murlis: m || [], 
          abhyas: a || [], 
          course: c || [] 
        });
      } catch (error) {
        console.error("Data loading failed:", error);
        setData({ murlis: [], abhyas: [], course: [] });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleResetSearch = () => {
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <div className={`min-h-[100dvh] w-full flex flex-col items-center justify-center bg-bk-bg transition-colors duration-500 ${font}`}>
        <div className="relative flex items-center justify-center w-24 h-24 mb-4">
          <div className="absolute inset-0 border-4 border-[#D32F2F]/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#D32F2F] rounded-full border-t-transparent animate-spin"></div>
          <span className="text-3xl text-[#D32F2F] animate-pulse">ॐ</span>
        </div>
        <p className="text-[#D32F2F] font-medium tracking-widest text-sm uppercase animate-pulse">Awakening</p>
      </div>
    );
  }

  return (
    <div className={`min-h-[100dvh] w-full text-bk-text pb-24 transition-colors duration-300 overflow-x-hidden ${isHome ? 'bg-[#D32F2F]' : 'bg-bk-bg'} ${font}`}>

      {location.pathname === '/favorites' && (
          <Header 
            title={t('nav.favorites')} 
          />
      )}

      <main className="w-full h-full">
        <AnimatePresence mode='wait' initial={false}>
          <Routes location={location}>
            <Route path="/" element={<Home dailyMurli={data.murlis[0]} onSearch={setSearchQuery} />} />
            <Route 
                path="/murlis" 
                element={
                    <Murlis 
                        murlis={data.murlis} 
                        searchQuery={searchQuery} 
                        onUpdateSearch={setSearchQuery}
                        onClearSearch={handleResetSearch} 
                    />
                } 
            />
            <Route path="/abhyas" element={<Abhyas forms={data.abhyas} />} />
            <Route path="/course" element={<Course days={data.course} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin-secret-upload" element={<AdminUpload />} />
          </Routes>
        </AnimatePresence>
      </main>

      <BottomNav onResetSearch={handleResetSearch} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
          <Layout />
      </Router>
    </LanguageProvider>
  );
};

export default App;

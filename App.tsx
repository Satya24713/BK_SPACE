import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Murlis from './pages/Murlis';
import Abhyas from './pages/Abhyas';
import Course from './pages/Course';
import Favorites from './pages/Favorites';

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

  useEffect(() => {
    const loadData = async () => {
      const [m, a, c] = await Promise.all([
        fetchMurlis(),
        fetchAbhyas(),
        fetchCourseDays()
      ]);
      setData({ murlis: m, abhyas: a, course: c });
    };
    loadData();
  }, []);

  const handleResetSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className={`min-h-[100dvh] w-full text-bk-text pb-24 transition-colors duration-300 overflow-x-hidden ${isHome ? 'bg-[#D32F2F]' : 'bg-bk-bg'} ${font}`}>

      {/* Pages now handle their own headers (Murlis, Abhyas, Course). 
          Favorites can reuse a simple header or similar structure. */}
      {location.pathname === '/favorites' && (
          <Header 
            title={t('nav.favorites')} 
          />
      )}

      <main className="w-full h-full">
        {/* mode='wait' ensures the exit animation finishes before enter begins, preventing layout overlap jitter */}
        <AnimatePresence mode='wait' initial={false}>
          <Routes location={location} key={location.pathname}>
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
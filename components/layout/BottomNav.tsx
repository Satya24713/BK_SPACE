
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBookOpen, FaSpa, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { useLanguage } from '../../contexts/LanguageContext';

interface BottomNavProps {
  onResetSearch?: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onResetSearch }) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { path: '/', icon: FaHome, labelKey: 'nav.home' },
    { path: '/murlis', icon: FaBookOpen, labelKey: 'nav.murlis' },
    { path: '/abhyas', icon: FaSpa, labelKey: 'nav.abhyas' },
    { path: '/course', icon: FaCalendarAlt, labelKey: 'nav.course' },
    { path: '/favorites', icon: FaStar, labelKey: 'nav.favorites' },
  ];

  const handleNavClick = (path: string) => {
    // If navigating to Murlis, reset the search query to show the main "Khajana" view
    if (path === '/murlis' && onResetSearch) {
      onResetSearch();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-bk-accent/10 pb-safe">
      <nav className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleNavClick(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive 
                  ? 'text-bk-glow' 
                  : 'text-gray-400 hover:text-bk-accent'
              }`}
            >
              <item.icon size={20} className="mb-1" />
              <span className="text-[10px] font-medium font-sans">{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNav;

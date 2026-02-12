
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaFont } from 'react-icons/fa';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const { fontName, cycleFont } = useLanguage();

  return (
    <button
      onClick={cycleFont}
      className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/30 shadow-sm transition-all duration-300 group overflow-hidden hover:bg-white/10 ${className}`}
      aria-label="Change Font"
    >
      <FaFont size={12} className="text-bk-text/70" />
      <span className="text-sm font-bold text-bk-text min-w-[3ch] text-center">{fontName}</span>
    </button>
  );
};

export default LanguageToggle;

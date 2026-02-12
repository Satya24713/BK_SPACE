import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
  title: string;
  children?: React.ReactNode; 
}

const Header: React.FC<HeaderProps> = ({ onSearch, searchQuery = '', title, children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState(searchQuery);

  useEffect(() => {
    setQuery(searchQuery);
    if (searchQuery && !isSearchOpen) {
        setIsSearchOpen(true);
    }
  }, [searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <header className="sticky top-0 z-40 bg-bk-bg/95 backdrop-blur-md shadow-sm transition-colors duration-300 border-b border-bk-accent/10 gpu-accelerated">
      {/* Top Bar: Title, Lang, Search */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-bk-accent font-hindi-title tracking-wide">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle className="scale-90" />
          
          {onSearch && (
            <div className="flex items-center">
                <div 
                  className={`flex items-center bg-white/50 rounded-full border border-bk-accent/20 overflow-hidden transition-all duration-300 ease-out origin-right ${
                    isSearchOpen ? 'w-32 sm:w-48 opacity-100 mr-2' : 'w-0 opacity-0 border-0'
                  }`}
                >
                  <input 
                      type="text"
                      value={query}
                      onChange={handleSearchChange}
                      placeholder="Search..."
                      className="bg-transparent border-none outline-none w-full px-3 py-1 text-sm text-bk-text placeholder-bk-text/50 font-sans min-w-[120px]"
                  />
                </div>
                
                <button 
                onClick={() => {
                    if (isSearchOpen && query === '') setIsSearchOpen(false);
                    else setIsSearchOpen(true);
                }}
                className="p-2 text-bk-text/60 hover:text-bk-accent rounded-full transition-colors active:scale-95"
                >
                <FaSearch size={16} />
                </button>
            </div>
          )}
        </div>
      </div>

      {/* Extended Sticky Content */}
      {children && (
        <div className="px-4 pb-4">
            {children}
        </div>
      )}
    </header>
  );
};

export default Header;
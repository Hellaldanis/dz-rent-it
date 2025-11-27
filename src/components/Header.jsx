import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useRef, useEffect } from 'react';

export default function Header({ showAddButton = false, hideSearch = false }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { language, toggleLanguage, t } = useLanguage();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary-light dark:border-secondary-dark bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between whitespace-nowrap px-4 py-3">
        <Link to="/" className="flex items-center gap-3 text-primary">
          <div className="size-8">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
              <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-text-light dark:text-text-dark text-xl font-bold tracking-tight">DZ-RentIt</h2>
        </Link>
        
        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 mx-8">
          <Link to="/" className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors">
            {t('home')}
          </Link>
          <Link to="/catalog" className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors">
            {t('categories')}
          </Link>
          <Link to="/contact" className="text-sm font-medium text-text-light dark:text-text-dark hover:text-primary transition-colors">
            {t('contactUs')}
          </Link>
        </nav>
        
        <div className="hidden md:flex flex-1 justify-end items-center gap-8">
          {!hideSearch && (
            <label className="relative flex-grow max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light dark:text-text-muted-dark">search</span>
              <input 
                className="form-input w-full rounded-full border-none bg-secondary-light dark:bg-secondary-dark h-10 placeholder:text-text-muted-light dark:placeholder:text-text-muted-dark pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" 
                placeholder={t('searchPlaceholder')}
                type="search"
              />
            </label>
          )}
          
          <button
            onClick={toggleLanguage}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark font-bold text-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            title={language === 'en' ? 'العربية' : 'English'}
          >
            {language === 'en' ? 'ع' : 'EN'}
          </button>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {showAddButton && (
                <Link 
                  to="/publish"
                  className="flex items-center justify-center gap-2 px-4 h-10 bg-primary text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  <span className="material-symbols-outlined">add</span>
                  <span>{t('addNewItem')}</span>
                </Link>
              )}
              
              <Link 
                to="/dashboard" 
                className="flex items-center justify-center rounded-full h-10 w-10 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                title={t('dashboard')}
              >
                <span className="material-symbols-outlined">dashboard</span>
              </Link>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white text-lg font-bold hover:opacity-90 transition-opacity"
                  title="Profile"
                >
                  {user?.fullName?.charAt(0).toUpperCase()}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 rounded-lg bg-background-light dark:bg-secondary-dark border border-secondary-light dark:border-secondary-dark shadow-lg py-2">
                    <div className="px-4 py-3 border-b border-secondary-light dark:border-secondary-dark">
                      <p className="text-sm font-semibold text-text-light dark:text-text-dark">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-text-muted-light dark:text-text-muted-dark truncate">
                        {user?.email}
                      </p>
                    </div>
                    
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-background-dark transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">person</span>
                      <span>{t('profile')}</span>
                    </Link>
                    
                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-text-light dark:text-text-dark hover:bg-secondary-light dark:hover:bg-background-dark transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">dashboard</span>
                      <span>{t('dashboard')}</span>
                    </Link>
                    
                    <div className="border-t border-secondary-light dark:border-secondary-dark mt-2 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setShowDropdown(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-secondary-light dark:hover:bg-background-dark transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">logout</span>
                        <span>{t('logout')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link 
                to="/login" 
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-secondary-light dark:bg-secondary-dark text-text-light dark:text-text-dark text-sm font-bold transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <span>{t('login')}</span>
              </Link>
              <Link 
                to="/signup" 
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-primary text-white text-sm font-bold transition-opacity hover:opacity-90"
              >
                <span>{t('signup')}</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

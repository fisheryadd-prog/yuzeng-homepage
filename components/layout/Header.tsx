'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useScroll } from '@/hooks/useScroll';
import { NAV_ITEMS } from '@/constants/navigation';

const Header = () => {
  const isScrolled = useScroll(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className={`text-2xl font-bold flex items-center gap-2 ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Fisher老师
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`font-medium transition-all duration-300 hover:text-blue-600 hover:scale-105 ${
                  isScrolled ? 'text-slate-700' : 'text-white'
                }`}
              >
                {index === 2 && <Sparkles className="w-4 h-4 text-purple-600" />}
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-slate-700' : 'text-white'
            }`}
            aria-label={isMobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M6 18l12 12" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            role="navigation"
            aria-label="移动端导航菜单"
            className="md:hidden bg-white/95 backdrop-blur-md shadow-xl rounded-2xl mt-2 p-4 space-y-2"
          >
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-all ${
                  index === 2
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 font-semibold'
                    : 'text-slate-700 hover:bg-purple-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

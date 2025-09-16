import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavLinkItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative text-sm font-medium transition-colors duration-300 ${
          isActive ? 'text-text-main' : 'text-text-sub hover:text-text-main'
        } after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-accent-a after:transition-all after:duration-300 ${
          isActive ? 'after:w-full' : 'after:w-0'
        } hover:after:w-full`
      }
    >
      {children}
    </NavLink>
  );
};


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { to: '/about', label: 'About' },
    { to: '/services', label: 'services' },
    { to: '/contact', label: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-base/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-serif font-bold text-text-main hover:text-accent-a transition-colors">
              富永建具
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLinkItem key={link.to} to={link.to}>
                {link.label}
              </NavLinkItem>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-sub hover:text-text-main focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-a"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
               <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-border text-text-main' : 'text-text-sub hover:bg-border/60 hover:text-text-main'}`}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
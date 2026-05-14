import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Menu, X, Calendar } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Galería', path: '/galeria' },
  { name: 'Promociones', path: '/promociones' },
  { name: 'Nosotros', path: '/nosotros' },
  { name: 'Contacto', path: '/contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto max-w-7xl mx-auto transition-all duration-500 ease-in-out rounded-[2rem] overflow-hidden ${
          scrolled || !isHome
            ? 'bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-3 px-6'
            : 'bg-transparent py-6 px-4'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className={`relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden transition-all duration-500 flex items-center justify-center ${
              scrolled || !isHome ? 'bg-gray-900 shadow-lg' : ''
            }`}>
              {/* Hover gradient effect (same as Reservar button) */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <img 
                src="/images/logo-rg.png" 
                alt="RominaNails Logo" 
                className={`relative z-10 w-full h-full object-cover group-hover:scale-110 transition-all duration-500 ${
                  scrolled || !isHome ? 'p-1.5' : ''
                }`} 
              />
            </div>
            <span className="text-lg sm:text-2xl font-black tracking-tighter">
              <span className="text-pink-500">ROMINA</span>
              <span className={`hidden sm:inline ${
                scrolled || !isHome ? 'text-gray-900' : 'text-white'
              }`}>NAILS</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 bg-black/5 rounded-full px-2 py-1 backdrop-blur-sm border border-white/10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : scrolled || !isHome
                        ? 'text-gray-600 hover:text-pink-500'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-pink-500 rounded-full shadow-[0_4px_15px_rgba(236,72,153,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + Admin + Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            {/* Admin Login Button */}
            <Link
              to="/admin/login"
              className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all duration-300 border ${
                scrolled || !isHome
                  ? 'text-gray-400 border-gray-200 hover:text-pink-500 hover:border-pink-200'
                  : 'text-white/70 border-white/20 hover:text-white hover:bg-white/10'
              }`}
              title="Acceso Administrador"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            <Link
              to="/reservar"
              className="group relative inline-flex items-center gap-2 px-3 py-3 sm:px-6 sm:py-3 bg-gray-900 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-full overflow-hidden transition-all duration-500 hover:pr-8 active:scale-95 shadow-xl shadow-black/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Calendar className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline relative z-10">Reservar</span>
              <div className="absolute right-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 text-white shadow-lg shadow-pink-500/20 active:scale-90 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mt-4 pt-4 border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col gap-2 pb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileOpen(false)}
                    className={`px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] transition-all ${
                      location.pathname === link.path
                        ? 'bg-pink-50 text-pink-500'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

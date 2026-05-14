import { Link } from 'react-router-dom';
import { Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

const footerLinks = [
  { name: 'Inicio', path: '/' },
  { name: 'Servicios', path: '/servicios' },
  { name: 'Galería', path: '/galeria' },
  { name: 'Promociones', path: '/promociones' },
  { name: 'Contacto', path: '/contacto' },
];

const serviceLinks = [
  { name: 'Esmaltado Semipermanente', path: '/servicios' },
  { name: 'Uñas Esculpidas', path: '/servicios' },
  { name: 'Kapping Gel', path: '/servicios' },
  { name: 'Nail Art Diseño', path: '/servicios' },
  { name: 'Manicuría Rusa', path: '/servicios' },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-[#0a090b] text-gray-400 relative overflow-hidden border-t border-pink-500/20">
      {/* Visual top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
      
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Brand & Call to Action */}
        <div className="py-20 flex flex-col items-center text-center border-b border-white/5">
          <Link to="/" className="flex flex-col items-center gap-5 group mb-8">
            <div className="relative w-24 h-24 bg-gray-900 rounded-full overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.4)] group-hover:shadow-[0_0_60px_rgba(236,72,153,0.6)] transition-all duration-500 flex items-center justify-center">
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <img 
                src="/images/logo-rg.png" 
                alt="RominaNails Logo" 
                className="relative z-10 w-full h-full object-cover p-3 group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <span className="text-4xl font-black tracking-tighter text-white">
              <span className="text-pink-500">ROMINA</span>NAILS
            </span>
          </Link>
          <p className="max-w-xl text-gray-500 text-lg leading-relaxed mb-10">
            Tu destino definitivo para el cuidado de manos y pies. Lujo, técnica y pasión en cada diseño.
          </p>
          <div className="flex gap-6">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-white hover:text-black transition-all duration-500"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@estudio_romina_gomez</span>
            </a>
            <button 
              onClick={scrollToTop}
              className="w-14 h-14 flex items-center justify-center bg-pink-500 text-white rounded-2xl shadow-[0_0_20px_rgba(236,72,153,0.4)] hover:scale-110 active:scale-95 transition-all"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Middle Section: Grid */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
          
          {/* Quick Nav */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-10 flex items-center gap-2">
              <div className="w-1 h-4 bg-pink-500 rounded-full"></div>
              Explorar
            </h4>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-8">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm font-bold hover:text-pink-500 transition-colors flex items-center gap-2 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-pink-500 transition-colors"></div>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services top */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-10 flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-500 rounded-full"></div>
              Servicios
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-sm font-bold hover:text-white transition-colors text-gray-500 flex items-center gap-3">
                    <Heart className="w-3 h-3 text-pink-500/40" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.3em] text-xs mb-10 flex items-center gap-2">
              <div className="w-1 h-4 bg-white rounded-full"></div>
              Contacto
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-pink-500" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white mb-1">Visitanos</p>
                  <p className="text-gray-500">Dirección del Salón, Buenos Aires</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-pink-500" />
                </div>
                <div className="text-sm">
                  <p className="font-bold text-white mb-1">WhatsApp</p>
                  <p className="text-gray-500">+54 11 XXXX-XXXX</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-700">
            © {new Date().getFullYear()} ROMINA NAILS — All Rights Reserved
          </p>
          <div className="flex items-center gap-8">
            <Link to="/admin/login" className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-pink-500 transition-colors">
              Admin Portal
            </Link>
            <div className="h-4 w-px bg-white/10 hidden sm:block"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-700 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-pink-500 mx-0.5" fill="currentColor" /> by <span className="text-white">Antigravity</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}


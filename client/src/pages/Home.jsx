import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useEffect, useState } from 'react';

import { servicesService, galleryService, promotionService } from '../services';

const heroSlides = [
  { image: '/images/hero-1.png' },
  { image: '/images/hero-2.png' },
  { image: '/images/hero-3.png' },
];

const testimonials = [
  {
    name: "STAR LASTRE",
    date: "30/07/2025",
    text: "Great service, very reasonable prices, attentive and offers flexible scheduling times. It can be hard to find a place open on Mondays, or open during the morning. I will definitely come back!",
    initial: "S",
    color: "bg-green-600"
  },
  {
    name: "MARIA GOMEZ",
    date: "15/06/2025",
    text: "Excelente atención y profesionalismo. Me dejaron las uñas impecables y el lugar es hermoso. ¡Súper recomendado!",
    initial: "M",
    color: "bg-pink-500"
  },
  {
    name: "LAURA PEREZ",
    date: "02/05/2025",
    text: "El mejor salón de la zona. Las chicas son un amor y trabajan con productos de primera calidad. Siempre salgo feliz.",
    initial: "L",
    color: "bg-purple-500"
  }
];

const faqs = [
  {
    question: "¿Con cuánto tiempo de anticipación debo reservar?",
    answer: "Te recomendamos reservar con al menos 48 horas de anticipación para asegurar el horario que mejor te convenga, especialmente para los fines de semana."
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos efectivo, transferencias bancarias, Mercado Pago y todas las tarjetas de crédito y débito. ¡Tenemos opciones de cuotas sin interés!"
  },
  {
    question: "¿Cuánto dura el esmaltado semipermanente?",
    answer: "Con el cuidado adecuado, nuestro esmaltado semipermanente dura entre 15 y 21 días manteniendo su brillo y sin saltarse."
  },
  {
    question: "¿Cómo debo cuidar mis uñas esculpidas?",
    answer: "Evitá usar tus uñas como herramientas, usá guantes para tareas domésticas y aplicá aceite de cutículas diariamente para mantenerlas hidratadas."
  }
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    servicesService.getAll({ active: true }).then(res => setServices(res.data)).catch(() => {});
    promotionService.getAll().then(res => setPromotions(res.data)).catch(() => {});
    galleryService.getAll().then(res => setGallery(res.data.slice(0, 10))).catch(() => {});
  }, []);

  const destacados = services.slice(0, 4);
  const masBuscados = services.slice(4, 12);

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. HERO CAROUSEL */}
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <img src={slide.image} alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-4"
                >
                  <span className="text-white text-[10px] font-bold uppercase tracking-widest">Turno disponible esta semana</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-white text-4xl md:text-6xl font-bold mb-8"
                >
                  RominaNails
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Link to="/reservar">
                    <button className="bg-white text-gray-900 hover:bg-pink-500 hover:text-white px-10 py-4 font-bold transition-all rounded-full shadow-2xl">
                      Reservar ahora
                    </button>
                  </Link>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* 1.5. MARQUEE PROMOCIONES */}
      <section className="w-full bg-[#0a090b] text-white overflow-hidden py-5 relative z-20 shadow-2xl">
        {/* Top glow border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent"></div>
        {/* Bottom glow border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent"></div>
        <motion.div 
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="flex items-center space-x-12 px-6">
              <div className="flex items-center space-x-4">
                <svg className="w-4 h-4 text-pink-500 fill-pink-500/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                <span className="font-black tracking-[0.2em] uppercase text-xs md:text-sm">Uñas y Pies - 10% OFF</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500/40"></div>
              <div className="flex items-center space-x-4">
                <svg className="w-4 h-4 text-purple-400 fill-purple-400/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                <span className="font-black tracking-[0.2em] uppercase text-xs md:text-sm">Kapping + Deco - 20% OFF</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40"></div>
              <div className="flex items-center space-x-4">
                <svg className="w-4 h-4 text-white fill-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                <span className="font-black tracking-[0.2em] uppercase text-xs md:text-sm">Promo Amigas - 2x1</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 2. SERVICIOS DESTACADOS */}
      {destacados.length > 0 && (
        <section className="relative w-full bg-[#0a090b] py-32 text-white border-b border-gray-900 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-[1400px] mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-pink-400 text-sm mb-3 uppercase tracking-[0.3em] font-bold">Experiencia Premium</p>
              <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 text-white">Servicios Destacados</h2>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-[1px] bg-gradient-to-r from-transparent to-purple-500 w-16"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                <div className="h-[1px] bg-gradient-to-l from-transparent to-purple-500 w-16"></div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destacados.map((service, i) => (
                <motion.div 
                  key={service._id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-pink-500/50 transition-all duration-500 aspect-[4/5] cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(255,105,180,0.15)]"
                >
                  <Link to="/reservar" className="block w-full h-full relative">
                    {i === 0 && <span className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-[10px] font-bold px-4 py-1.5 z-30 tracking-widest rounded-full shadow-[0_4px_15px_rgba(255,105,180,0.4)] backdrop-blur-md">NOVEDAD</span>}
                    {i === 1 && <span className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-[10px] font-bold px-4 py-1.5 z-30 tracking-widest rounded-full shadow-[0_4px_15px_rgba(168,85,247,0.4)] backdrop-blur-md">TENDENCIA</span>}
                    
                    {service.image ? (
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-[#111] flex items-center justify-center text-gray-700 z-0 border-b border-white/5">Sin imagen</div>
                    )}
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a090b] via-[#0a090b]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-20">
                      <h3 className="font-bold text-2xl text-white mb-2 transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">{service.title}</h3>
                      <div className="flex items-center justify-between transform group-hover:-translate-y-2 transition-transform duration-500 delay-75 ease-out">
                        <p className="text-pink-400 text-sm font-bold tracking-wider">DESDE ${(service.price || 0).toLocaleString()}</p>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. COMBOS ESPECIALES */}
      {promotions.length > 0 && (
        <section className="relative w-full bg-[#fdfbfb] pt-20 pb-24 overflow-hidden border-b border-gray-100">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-pink-200/50 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-purple-200/50 to-transparent rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="max-w-[1080px] mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block py-1 px-4 rounded-full bg-pink-100 text-pink-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 border border-pink-200 shadow-sm">Exclusivo</span>
              <h2 className="text-4xl md:text-5xl font-body font-bold mb-4 text-gray-900 tracking-tight">Combos Especiales</h2>
              <p className="text-gray-500 text-base max-w-2xl mx-auto font-medium">Disfrutá de nuestros paquetes diseñados para darte la mejor experiencia al mejor precio.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {promotions.map((promo, idx) => (
                <motion.div 
                  key={promo._id} 
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    type: "spring",
                    stiffness: 140,
                    damping: 18,
                    mass: 0.6,
                    delay: idx * 0.07 
                  }}

                  className="group relative"
                >
                  <div className="h-full min-h-[600px] bg-white rounded-[2.5rem] p-10 lg:p-12 border border-gray-100 flex flex-col relative overflow-hidden z-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_-15px_rgba(236,72,153,0.3)] group-hover:-translate-y-4 transition-all duration-300">
                    
                    {/* Massive Watermark */}
                    <div className="absolute -right-8 -top-12 text-[180px] font-black text-transparent opacity-[0.06] select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out leading-none" style={{ WebkitTextStroke: '2px #000' }}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>

                    {promo.discount > 0 && (
                      <div className="absolute top-6 left-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest shadow-[0_4px_15px_rgba(255,105,180,0.3)] z-20">
                        {promo.discount}% OFF
                      </div>
                    )}

                    <div className="mt-6 mb-4 relative z-20">
                      <h3 className="text-gray-900 font-black text-2xl uppercase tracking-tight leading-tight mb-2 group-hover:text-pink-500 transition-colors duration-300 max-w-[85%]">
                        {promo.title}
                      </h3>
                      <div className="flex items-end gap-2 mt-6">
                        <span className="text-4xl font-black text-gray-900">${(promo.promoPrice || 0).toLocaleString()}</span>
                        <span className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5">Total</span>
                      </div>
                    </div>

                    <div className="w-full h-px bg-gradient-to-r from-gray-100 via-gray-200 to-transparent my-6 relative z-20"></div>

                    <ul className="space-y-3 mb-10 flex-grow relative z-20">
                      {promo.description.split('\n').map((line, i) => (
                         <li key={i} className="flex items-start gap-3 text-gray-600 font-medium text-sm">
                           <div className="w-6 h-6 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-pink-500 group-hover:border-pink-500 transition-colors duration-300">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-pink-500 group-hover:text-white transition-colors duration-300">
                               <polyline points="20 6 9 17 4 12"></polyline>
                             </svg>
                           </div>
                           <span className="leading-relaxed">{line}</span>
                         </li>
                      ))}
                    </ul>

                    <Link to="/promociones" className="w-full relative z-20">
                      <button className="w-full py-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-pink-500 transition-all duration-300 uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(255,105,180,0.4)] flex items-center justify-center gap-2 group/btn">
                        Seleccionar Combo
                        <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. LOS + BUSCADOS */}
      {masBuscados.length > 0 && (
        <section className="relative w-full bg-[#0a090b] py-32 text-white border-b border-gray-900 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-[1400px] mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-purple-400 text-sm mb-3 uppercase tracking-[0.3em] font-bold">Los Clásicos</p>
              <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 text-white">Los + Buscados</h2>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-[1px] bg-gradient-to-r from-transparent to-pink-500 w-16"></div>
                <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(255,105,180,0.8)]"></div>
                <div className="h-[1px] bg-gradient-to-l from-transparent to-pink-500 w-16"></div>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {masBuscados.map((service, i) => (
                <motion.div 
                  key={service._id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                  className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-purple-500/50 transition-all duration-500 aspect-[4/5] cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                >
                  <Link to="/reservar" className="block w-full h-full relative">
                    <span className="absolute top-4 left-4 bg-white/10 text-white text-[10px] font-bold px-4 py-1.5 z-30 tracking-widest rounded-full backdrop-blur-md border border-white/20">MÁS BUSCADO</span>
                    
                    {service.image ? (
                      <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-70 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-[#111] flex items-center justify-center text-gray-700 z-0 border-b border-white/5">Sin imagen</div>
                    )}
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a090b] via-[#0a090b]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-20">
                      <h3 className="font-bold text-xl text-white mb-2 transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">{service.title}</h3>
                      <div className="flex items-center justify-between transform group-hover:-translate-y-2 transition-transform duration-500 delay-75 ease-out">
                        <p className="text-purple-400 text-sm font-bold tracking-wider">DESDE ${(service.price || 0).toLocaleString()}</p>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}


      {/* 4.2. HOW IT WORKS */}
      <section className="w-full bg-[#0a090b] pt-20 pb-24 text-white relative overflow-hidden border-t border-gray-900">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-pink-400 text-sm mb-3 uppercase tracking-[0.3em] font-bold">Reserva simple</p>
            <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 text-white">¿Cómo funciona?</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-pink-500 w-16"></div>
              <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(255,105,180,0.8)]"></div>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-pink-500 w-16"></div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-white/[0.02] border border-white/5 hover:border-pink-500/30 rounded-3xl p-8 text-left overflow-hidden transition-all duration-500 hover:bg-white/[0.04]"
            >
              <div className="absolute -right-4 -top-8 text-[90px] font-bold text-white/[0.02] select-none group-hover:text-pink-500/[0.05] transition-colors duration-500">01</div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,105,180,0.3)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="text-lg font-body font-bold mb-3 text-white group-hover:text-pink-400 transition-colors relative z-10">Seleccioná la promo</h3>
              <p className="text-gray-400 text-xs leading-relaxed relative z-10">Elegí el servicio que desees indicándonos el diseño de tus uñas en nuestro catálogo online.</p>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-white/[0.02] border border-white/5 hover:border-pink-500/30 rounded-3xl p-8 text-left overflow-hidden transition-all duration-500 hover:bg-white/[0.04]"
            >
              <div className="absolute -right-4 -top-8 text-[90px] font-bold text-white/[0.02] select-none group-hover:text-pink-500/[0.05] transition-colors duration-500">02</div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,105,180,0.3)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  <circle cx="12" cy="15" r="2" />
                </svg>
              </div>
              <h3 className="text-lg font-body font-bold mb-3 text-white group-hover:text-pink-400 transition-colors relative z-10">Confirmá tu turno</h3>
              <p className="text-gray-400 text-xs leading-relaxed relative z-10">Seleccioná el día y horario disponible que mejor se adapte a tu rutina y agenda.</p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative bg-white/[0.02] border border-white/5 hover:border-pink-500/30 rounded-3xl p-8 text-left overflow-hidden transition-all duration-500 hover:bg-white/[0.04]"
            >
              <div className="absolute -right-4 -top-8 text-[90px] font-bold text-white/[0.02] select-none group-hover:text-pink-500/[0.05] transition-colors duration-500">03</div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,105,180,0.3)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-body font-bold mb-3 text-white group-hover:text-pink-400 transition-colors relative z-10">Elegí el medio de pago</h3>
              <p className="text-gray-400 text-xs leading-relaxed relative z-10">Aboná online de forma segura con tarjeta o elegí pagar en efectivo en el local.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/reservar" className="inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-4 px-12 rounded-full shadow-[0_10px_25px_rgba(255,105,180,0.4)] hover:shadow-[0_15px_35px_rgba(255,105,180,0.6)] transition-all hover:-translate-y-1 group">
              <span>Reservar turno ahora</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 5. INSTAGRAM FEED */}
      {gallery.length > 0 && (
        <section className="relative w-full bg-[#fdfbfb] py-32 overflow-hidden border-t border-gray-100">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="max-w-[1400px] mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center mb-16 text-center"
            >
              <a href="https://www.instagram.com/estudio_romina_gomez/?hl=es" target="_blank" rel="noreferrer" className="group flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-6 p-[2px]">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-transparent group-hover:bg-transparent transition-colors duration-500">
                    <svg className="w-8 h-8 text-[#bc1888] group-hover:text-white transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                </div>
                <p className="text-pink-500 font-bold tracking-[0.2em] text-xs uppercase mb-2">Seguinos en Instagram</p>
                <h2 className="text-4xl md:text-5xl font-body font-black text-gray-900 group-hover:text-[#bc1888] transition-colors">@estudio_romina_gomez</h2>
              </a>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6">
              {gallery.slice(0, 5).map((img, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={img._id || i}
                >
                  <a href="https://www.instagram.com/estudio_romina_gomez/?hl=es" target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden group relative rounded-[2rem] shadow-sm hover:shadow-[0_20px_40px_rgba(188,24,136,0.15)] transition-all duration-500">
                    <img src={img.image || img.src} alt={img.title || "Instagram feed"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#bc1888]/80 via-[#bc1888]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">
                       <svg className="w-10 h-10 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                       <span className="text-white font-bold text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Ver en IG</span>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <a href="https://www.instagram.com/estudio_romina_gomez/?hl=es" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-gray-200 text-gray-900 font-bold hover:border-[#bc1888] hover:text-[#bc1888] transition-colors uppercase tracking-[0.2em] text-[11px]">
                Ver más publicaciones
              </a>
            </div>
          </div>
        </section>
      )}
      {/* 4.5. TESTIMONIALS */}
      <section className="w-full bg-[#0a090b] py-32 text-white relative overflow-hidden border-t border-gray-900">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-purple-400 text-sm mb-3 uppercase tracking-[0.3em] font-bold">Experiencias reales</p>
            <h2 className="text-4xl md:text-5xl font-body font-bold mb-6 text-white">Lo que dicen <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">nuestras clientas</span></h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-purple-500 w-16"></div>
              <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-purple-500 w-16"></div>
            </div>
          </motion.div>

          <div className="relative px-4 md:px-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              loop
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
              className="pb-20 !px-4"
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <div className="h-full bg-white/[0.02] border border-white/5 hover:border-purple-500/30 rounded-3xl p-8 md:p-10 relative group transition-colors duration-500 flex flex-col justify-between">
                    {/* Giant Quote Mark Background */}
                    <div className="absolute -top-4 right-6 text-8xl font-serif text-white/[0.02] group-hover:text-purple-500/[0.05] transition-colors duration-500 pointer-events-none select-none">"</div>
                    
                    <div>
                      {/* Stars */}
                      <div className="flex space-x-1 mb-6">
                        {[...Array(5)].map((_, idx) => (
                          <svg key={idx} className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        ))}
                      </div>
                      
                      {/* Text */}
                      <p className="text-gray-300 italic text-base leading-relaxed mb-8 relative z-10">"{t.text}"</p>
                    </div>
                    
                    {/* User Info & Platform */}
                    <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                          {t.initial}
                        </div>
                        <div className="ml-4 text-left">
                          <h4 className="font-bold text-white tracking-wide text-sm">{t.name}</h4>
                          <p className="text-gray-500 text-xs mt-0.5">{t.date}</p>
                        </div>
                      </div>
                      
                      {/* Google Logo */}
                      <div className="flex items-center justify-center bg-white/5 p-2 rounded-full group-hover:bg-white/10 transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="pt-20 pb-24 bg-[#fdfbfb] relative overflow-hidden border-t border-gray-100">
        {/* Background ambient glow */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-pink-500 font-black tracking-[0.3em] text-xs uppercase mb-3">Resolvé tus dudas</p>
            <h2 className="text-4xl md:text-5xl font-body font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-[1px] bg-gray-200 w-12"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
              <div className="h-[1px] bg-gray-200 w-12"></div>
            </div>
          </motion.div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group border-b border-gray-100 transition-all duration-500 ${activeFaq === index ? 'pb-4' : 'pb-1'}`}
              >
                <button
                  className="w-full py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl font-black text-gray-200 group-hover:text-pink-100 transition-colors duration-500 select-none">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <span className={`text-base md:text-lg font-bold transition-all duration-300 ${activeFaq === index ? 'text-pink-600 translate-x-2' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${activeFaq === index ? 'bg-pink-500 text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-pink-50 group-hover:text-pink-400'}`}>
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeFaq === index ? 'auto' : 0, opacity: activeFaq === index ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="pl-14 pr-10 pb-4 text-gray-500 leading-relaxed text-sm md:text-base">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-2">¿Tenés otra consulta?</h3>
            <p className="text-gray-500 text-sm mb-6">Estamos para ayudarte a que tu experiencia sea perfecta.</p>
            <Link to="/contacto" className="inline-flex items-center justify-center px-8 py-3.5 bg-white border border-gray-200 text-gray-900 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 shadow-sm">
              Contactanos ahora
            </Link>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import { businessService } from '../services';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

export default function About() {
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    businessService.get().then(res => setBusinessInfo(res.data)).catch(console.error);
  }, []);

  // Convierte cualquier URL de Google Maps a formato embed gratuito
  const getEmbedMapUrl = (url) => {
    // Si ya es una URL de embed válida (tipo pb=), usarla directo
    if (url && url.includes('/maps/embed?pb=')) return url;
    // Usar la dirección para generar un mapa gratuito sin API key
    const address = businessInfo?.address;
    if (address) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    }
    return null;
  };

  return (
    <PageWrapper>
      <section className="py-24 bg-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-pink-100/40 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-purple-100/40 to-transparent rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-pink-500 font-black tracking-[0.3em] text-xs uppercase mb-3">Nuestra Esencia</p>
            <h2 className="text-4xl md:text-5xl font-body font-black text-gray-900 mb-6">Conocé RominaNails</h2>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-[1px] bg-gradient-to-r from-transparent to-pink-500 w-16"></div>
              <div className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(255,105,180,0.8)]"></div>
              <div className="h-[1px] bg-gradient-to-l from-transparent to-pink-500 w-16"></div>
            </div>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto">Un espacio creado con pasión y amor por la belleza</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 to-purple-200 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60" />
                <img 
                  src="/uploads/1778117818788-929737932.jpeg" 
                  alt="Nuestra Historia" 
                  className="relative rounded-[2.5rem] shadow-2xl w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-[1.02]" 
                />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-body font-black text-gray-900 mb-8 leading-tight">Sobre Nosotros</h2>
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    En <span className="text-pink-500 font-bold">RominaNails</span>, nuestra historia se entrelaza con la belleza y la excelencia en el cuidado de uñas. 
                    Desde nuestros inicios, nos hemos dedicado a proporcionar servicios de manicura y pedicura excepcionales, 
                    enfocándonos en la calidad y la satisfacción de cada clienta.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed font-medium">
                    Nuestra filosofía se basa en que la formación constante y el uso de productos de primera línea 
                    son la clave del éxito para resaltar tu belleza natural y brindarte un momento de relax único.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sucursal Carousel Section */}
          <div className="mt-32 mb-32 w-[75vw] max-w-[1920px] relative left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-purple-500 font-black tracking-[0.3em] text-xs uppercase mb-3">Nuestras Instalaciones</p>
              <h2 className="text-4xl md:text-5xl font-body font-black text-gray-900 mb-6">¡Descubrí Nuestra Sucursal!</h2>
              <div className="flex items-center justify-center space-x-4">
                <div className="h-[1px] bg-gradient-to-r from-transparent to-purple-500 w-16"></div>
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                <div className="h-[1px] bg-gradient-to-l from-transparent to-purple-500 w-16"></div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="w-full shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] rounded-[3rem] overflow-hidden border border-white/50"
            >
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                speed={1500}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="h-[450px] md:h-[650px] w-full group"
              >
                {[
                  '/uploads/1778117818788-929737932.jpeg',
                  '/uploads/1778117790499-47895684.jpeg',
                  '/uploads/1778117818764-409924948.jpeg',
                  '/uploads/1778117818776-531519046.jpeg'
                ].map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={`Sucursal ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>

          {/* Contact & Location Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-15px_rgba(236,72,153,0.15)] transition-all duration-500">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-body font-black text-gray-900 mb-4 tracking-tight uppercase">Resistencia</h2>
              <div className="flex gap-2 mb-10">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)] fill-current stroke-transparent" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.858 1.4-8.168-5.934-5.787 8.2-1.192z"/>
                  </svg>
                ))}
              </div>
              
              <div className="space-y-6 text-gray-800 text-lg">
                <p className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div> <span className="font-bold text-gray-900">Teléfono:</span> <span className="font-medium text-gray-600">{businessInfo?.phone || '+54 362 494-0856'}</span></p>
                <p className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div> <span className="font-bold text-gray-900">Horarios:</span> <span className="font-medium text-gray-600">11:00 AM - 8:00 PM Lun a Sab</span></p>
                <p className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div> <span className="font-bold text-gray-900">Dirección:</span> <span className="font-medium text-gray-600">{businessInfo?.address || 'Necochea 307 OF 3, Resistencia'}</span></p>
                <p className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0"><svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div> <span className="font-bold text-gray-900">Email:</span> <span className="font-bold text-pink-500 hover:text-pink-600 transition-colors cursor-pointer">{businessInfo?.email || 'Nails.Art@gmail.com'}</span></p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] h-[420px] border border-gray-100 group">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }}
                  src={getEmbedMapUrl(businessInfo?.mapUrl) || `https://maps.google.com/maps?q=${encodeURIComponent(businessInfo?.address || 'Necochea 307 OF 3, Resistencia, Chaco')}&output=embed`} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Sucursal Resistencia"
                  className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

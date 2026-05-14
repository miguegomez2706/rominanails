import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageWrapper, { SectionHeader } from '../components/layout/PageWrapper';

import { promotionService } from '../services';

export default function Promotions() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    promotionService.getAll().then(res => setPromos(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <PageWrapper>
      <section className="pt-20 pb-24 bg-[#fdfbfb] relative overflow-hidden min-h-screen">
        {/* Background ambient glows */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-pink-100/40 to-transparent rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-purple-100/40 to-transparent rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader subtitle="Ofertas especiales" title="Promociones" description="Aprovechá nuestras ofertas y combos exclusivos diseñados para vos." />
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-64 rounded-2xl" />)}
            </div>
          ) : promos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {promos.map((promo, idx) => (
                <motion.div key={promo._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="group relative h-full flex flex-col"
                >
                  <div className="flex-1 min-h-[580px] bg-white rounded-[2.5rem] flex flex-col relative overflow-hidden z-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] group-hover:shadow-[0_40px_80px_-15px_rgba(236,72,153,0.3)] group-hover:-translate-y-4 transition-all duration-300 border border-gray-100">
                    
                    {/* Image Section */}
                    {promo.image && (
                      <div className="h-52 relative overflow-hidden shrink-0">
                        <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        
                        {/* Discount Badge over Image */}
                        {promo.discount > 0 && (
                          <div className="absolute top-5 left-5">
                            <span className="inline-block bg-pink-500 text-white text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest shadow-[0_4px_15px_rgba(236,72,153,0.4)]">
                              {promo.discount}% OFF
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Massive Watermark Number */}
                    <div className="absolute -right-6 top-48 text-[180px] font-black text-transparent opacity-[0.06] select-none pointer-events-none group-hover:scale-110 transition-transform duration-700 ease-out leading-none" style={{ WebkitTextStroke: '2px #000' }}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </div>

                    <div className="p-8 lg:p-10 flex flex-col flex-1 relative z-20">
                      {/* Title */}
                      <h3 className="text-gray-900 font-bold text-2xl uppercase tracking-tight leading-tight mb-4 group-hover:text-pink-500 transition-colors duration-300 mt-2">
                        {promo.title}
                      </h3>

                      {/* Price Area */}
                      <div className="flex flex-col mb-6">
                        {promo.originalPrice > 0 && (
                           <span className="text-gray-400 line-through text-xs font-bold mb-1">${(promo.originalPrice || 0).toLocaleString()}</span>
                        )}
                        <div className="flex items-center gap-1">
                          <span className="text-pink-500 text-sm font-bold tracking-wider uppercase">TOTAL ${(promo.promoPrice || 0).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="w-full h-px bg-gray-100 mb-6"></div>

                      {/* Features / Description List */}
                      <ul className="space-y-3 mb-8 flex-1">
                        {promo.description.split('\n').filter(line => line.trim() !== '').map((line, i) => (
                           <li key={i} className="flex items-start gap-3 text-gray-600 font-medium text-[13px]">
                             <div className="w-5 h-5 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-pink-500 group-hover:border-pink-500 transition-colors duration-300">
                               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-pink-500 group-hover:text-white transition-colors duration-300">
                                 <polyline points="20 6 9 17 4 12"></polyline>
                               </svg>
                             </div>
                             <span className="leading-relaxed">{line}</span>
                           </li>
                        ))}
                      </ul>

                      {promo.validUntil && (
                        <p className="text-[10px] text-gray-400 mb-4 font-bold text-center uppercase tracking-widest">
                          Válido hasta {new Date(promo.validUntil).toLocaleDateString('es-AR')}
                        </p>
                      )}

                      {/* Button */}
                      <Link to="/reservar" className="w-full mt-auto">
                        <button className="w-full py-4 rounded-2xl bg-[#0f1219] text-white font-bold hover:bg-pink-500 transition-all duration-300 uppercase tracking-[0.2em] text-[10px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(236,72,153,0.4)] flex items-center justify-center gap-2 group/btn">
                          Seleccionar Combo
                          <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400"><p className="text-lg">Próximamente nuevas promociones ✨</p></div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

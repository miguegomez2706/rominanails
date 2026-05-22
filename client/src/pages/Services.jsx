import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper, { SectionHeader } from '../components/layout/PageWrapper';
import Badge from '../components/ui/Badge';
import { servicesService } from '../services';

const categories = ['Todas', 'Manicura', 'Pedicura', 'Nail Art', 'Tratamientos', 'Combos'];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todas');

  useEffect(() => {
    servicesService.getAll({ active: true })
      .then(res => setServices(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'Todas' ? services : services.filter(s => s.category === activeCategory);

  return (
    <PageWrapper>
      <section className="pt-20 pb-24 bg-[#fdfbfb] relative overflow-hidden min-h-screen">
        {/* Background ambient glows */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-100/40 to-transparent rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-purple-100/40 to-transparent rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader subtitle="Nuestros servicios" title="Catálogo de Servicios" description="Encontrá el servicio perfecto para vos. Calidad premium en cada detalle." />

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-pink-400 text-white shadow-lg shadow-pink-400/30'
                    : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-500 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-[250px] w-full rounded-[2.5rem]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
              {filtered.map((service, i) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  layout
                  whileHover={{ y: -6 }}
                  className="bg-white rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] border border-gray-100 overflow-hidden group transition-all duration-300 flex flex-col md:flex-row items-stretch"
                >
                  {service.image && (
                    <div className="w-full md:w-2/5 min-h-[250px] relative overflow-hidden shrink-0">
                      <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"></div>
                    </div>
                  )}
                  <div className="p-8 md:p-10 flex flex-col flex-1 justify-center relative">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="pink" className="font-bold tracking-widest uppercase text-[10px]">{service.category}</Badge>
                      <span className="text-xs font-bold text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full flex items-center gap-1 border border-gray-100">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {service.duration} MIN
                      </span>
                    </div>
                    
                    <h3 className="font-body font-bold text-2xl text-gray-900 mb-4 tracking-tight group-hover:text-pink-500 transition-colors duration-300">{service.title}</h3>
                    <p className="text-base text-gray-500 mb-8 line-clamp-3 leading-relaxed font-medium">{service.description}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                      <div className="flex items-center gap-1">
                        <span className="text-pink-500 text-sm font-bold tracking-wider uppercase">DESDE ${(service.price || 0).toLocaleString()}</span>
                      </div>
                      <Link to="/reservar">
                        <button className="bg-[#0a090b] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-black/10 hover:shadow-pink-500/30 hover:bg-pink-500 transition-all duration-300 flex items-center gap-2 group/btn">
                          Reservar
                          <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No hay servicios en esta categoría</p>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import { instagramService } from '../services';

export default function Gallery() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px" });

  useEffect(() => {
    if (isInView && !hasFetched.current) {
      hasFetched.current = true;
      instagramService.getFeed()
        .then(res => setFeed(res.data))
        .catch((error) => console.error("Error cargando feed:", error))
        .finally(() => setLoading(false));
    }
  }, [isInView]);

  return (
    <PageWrapper>
      <section ref={ref} className="pt-20 pb-24 bg-[#fdfbfb] relative overflow-hidden min-h-screen">
        {/* Background ambient glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-100/30 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Instagram Style */}
          <div className="flex flex-col items-center mb-16 text-center">
            <a href="https://www.instagram.com/romina_gomez_nails_art/" target="_blank" rel="noreferrer" className="group flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-6 p-[2px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-transparent group-hover:bg-transparent transition-colors duration-500">
                  <svg className="w-8 h-8 text-[#bc1888] group-hover:text-white transition-colors duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
              </div>
              <p className="text-pink-500 font-bold text-xs tracking-[0.2em] uppercase mb-2">Últimos trabajos en Instagram</p>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight group-hover:text-[#bc1888] transition-colors">@romina_gomez_nails_art</h1>
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse rounded-[2.5rem]" />
              ))}
            </div>
          ) : feed.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {feed.map((post, i) => (
                <motion.a
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  key={post.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="aspect-[4/5] group rounded-[2.5rem] overflow-hidden shadow-2xl bg-white relative block"
                >
                  <img
                    src={post.thumbnailUrl}
                    alt={`Instagram post ${i}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  
                  {/* Overlay Gradiente Rosa estilo Home */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#bc1888]/80 via-[#bc1888]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-3 z-10">
                     <svg className="w-12 h-12 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                     <span className="text-white font-bold text-sm tracking-widest uppercase transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-75 drop-shadow-md">Ver en IG</span>
                  </div>
                  
                  {/* Ícono superior derecho: Video o Foto */}
                  <div className="absolute top-4 right-4 z-20">
                    {post.mediaType === 'VIDEO' ? (
                      <div className="bg-black/30 backdrop-blur-md p-2 rounded-full text-white shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="bg-black/30 backdrop-blur-md p-2 rounded-full text-white shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    )}
                  </div>

                </motion.a>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg">No pudimos cargar el feed de Instagram en este momento ✨</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <a href="https://www.instagram.com/romina_gomez_nails_art/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-gray-900 text-white font-bold hover:bg-[#bc1888] transition-colors uppercase tracking-[0.2em] text-xs shadow-xl hover:shadow-[0_20px_40px_rgba(188,24,136,0.3)]">
              Ver más Reels y Trabajos
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

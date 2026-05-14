import { useState } from 'react';
import { motion } from 'framer-motion';
import PageWrapper, { SectionHeader } from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <PageWrapper>
      <section className="pt-20 pb-24 bg-[#fdfbfb] relative overflow-hidden min-h-screen">
        {/* Ambient glows */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-100/40 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/3 -translate-x-1/3"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-pink-100/40 to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/3 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader subtitle="Contacto" title="Hablemos" description="Escribinos o contactanos por nuestras redes. Estamos para ayudarte." />
          <div className="grid md:grid-cols-2 gap-8 mt-2">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {sent ? (
                <div className="bg-green-50 rounded-[2rem] p-8 text-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                  <p className="text-green-600 font-black text-xl mb-2">¡Mensaje enviado! ✨</p>
                  <p className="text-green-500 font-medium text-sm">Te responderemos a la brevedad.</p>
                </div>
              ) : (
                <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-gray-100 relative group overflow-hidden">
                  <div className="absolute -inset-4 bg-gradient-to-r from-pink-50 to-purple-50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
                  <div className="space-y-3 relative z-10">
                    <Input label="Nombre" name="name" required value={form.name} onChange={handle} />
                    <Input label="Email" name="email" type="email" required value={form.email} onChange={handle} />
                    <Input label="Teléfono" name="phone" type="tel" value={form.phone} onChange={handle} />
                    <Input label="Mensaje" name="message" type="textarea" required value={form.message} onChange={handle} />
                    <Button onClick={() => setSent(true)} className="w-full mt-2">Enviar mensaje</Button>
                  </div>
                </div>
              )}
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-3">
              <a href="https://wa.me/5491100000000" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-[2rem] transition-colors group">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div><p className="font-semibold text-gray-900 leading-tight">WhatsApp</p><p className="text-xs text-gray-500">Escribinos directo</p></div>
              </a>
              <a href="https://instagram.com/rominanails" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-4 bg-pink-50 hover:bg-pink-100 rounded-[2rem] transition-colors group">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </div>
                <div><p className="font-semibold text-gray-900 leading-tight">Instagram</p><p className="text-xs text-gray-500">@rominanails</p></div>
              </a>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-[2rem]">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div><p className="font-semibold text-gray-900 leading-tight">Ubicación</p><p className="text-xs text-gray-500">Dirección del salón</p></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

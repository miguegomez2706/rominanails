import { motion } from 'framer-motion';

export default function PageWrapper({ children, className = '', noPadding = false }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`min-h-screen ${noPadding ? '' : 'pt-20'} ${className}`}
    >
      {children}
    </motion.main>
  );
}

export function SectionHeader({ subtitle, title, description, centered = true, light = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <p className={`text-xs font-black uppercase tracking-[0.3em] mb-3 ${light ? 'text-pink-400' : 'text-pink-500'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`text-3xl md:text-5xl font-body font-bold mb-6 tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      <div className={`flex items-center ${centered ? 'justify-center' : ''} space-x-4 mb-6`}>
        <div className={`h-[1px] w-16 bg-gradient-to-r from-transparent to-pink-500`}></div>
        <div className={`w-2 h-2 rounded-full bg-pink-500 ${light ? 'shadow-[0_0_10px_rgba(255,105,180,0.8)]' : ''}`}></div>
        <div className={`h-[1px] w-16 bg-gradient-to-l from-transparent to-pink-500`}></div>
      </div>
      {description && (
        <p className={`max-w-2xl ${centered ? 'mx-auto' : ''} text-lg font-medium ${light ? 'text-gray-300' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}

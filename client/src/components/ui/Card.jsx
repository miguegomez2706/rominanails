import { motion } from 'framer-motion';

export default function Card({ children, className = '', hover = true, onClick, ...props }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl
        shadow-sm border border-gray-100
        overflow-hidden
        transition-all duration-300
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardImage({ src, alt, className = '' }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        loading="lazy"
      />
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`font-heading text-xl font-bold text-gray-900 mb-2 ${className}`}>{children}</h3>;
}

export function CardDescription({ children, className = '' }) {
  return <p className={`text-gray-500 text-sm leading-relaxed ${className}`}>{children}</p>;
}

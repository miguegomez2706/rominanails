import { useState } from 'react';

export default function Input({ label, name, type = 'text', value, onChange, error, required = false, placeholder, className = '', ...props }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`
            block text-sm font-medium mb-2 transition-colors duration-200
            ${focused ? 'text-pink-500' : 'text-gray-600'}
            ${error ? 'text-red-500' : ''}
          `}
        >
          {label} {required && <span className="text-pink-400">*</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={`
            w-full px-4 py-3 rounded-xl border-2 bg-white
            text-gray-800 placeholder:text-gray-300
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-0
            ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-pink-400'}
            resize-none
          `}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`
            w-full px-4 py-3 rounded-xl border-2 bg-white
            text-gray-800 placeholder:text-gray-300
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-0
            ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-pink-400'}
          `}
          {...props}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

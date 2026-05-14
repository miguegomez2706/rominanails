import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../../store/authStore';
import { useState } from 'react';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: '📊' },
  { name: 'Servicios', path: '/admin/servicios', icon: '💅' },
  { name: 'Reservas', path: '/admin/reservas', icon: '📅' },
  { name: 'Galería', path: '/admin/galeria', icon: '🖼️' },
  { name: 'Promociones', path: '/admin/promociones', icon: '🏷️' },
  { name: 'Negocio', path: '/admin/negocio', icon: '⚙️' },
];

export default function AdminLayout() {
  const { logout, user } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="px-6 py-6 border-b border-gray-800">
            <Link to="/" className="text-xl font-heading font-bold text-white"><span className="text-pink-400">Romina</span>Nails</Link>
            <p className="text-gray-500 text-xs mt-1">Panel Admin</p>
          </div>
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map(item => (
              <Link key={item.path} to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  location.pathname === item.path ? 'bg-pink-500/20 text-pink-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>{item.name}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-gray-800">
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 w-full transition-colors">
              <span>🚪</span>Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="text-sm text-gray-500">{user?.email}</div>
          <Link to="/" className="text-sm text-pink-500 hover:text-pink-600 font-medium">Ver sitio →</Link>
        </header>
        <main className="flex-1 p-6">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}

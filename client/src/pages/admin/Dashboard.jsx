import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { appointmentService } from '../../services';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appointmentService.getStats().then(res => setStats(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const cards = stats ? [
    { label: 'Turnos hoy', value: stats.today, icon: '📅', color: 'bg-pink-50 text-pink-600' },
    { label: 'Esta semana', value: stats.week, icon: '📊', color: 'bg-blue-50 text-blue-600' },
    { label: 'Este mes', value: stats.month, icon: '📈', color: 'bg-green-50 text-green-600' },
    { label: 'Ingresos del mes', value: `$${stats.revenue.toLocaleString()}`, icon: '💰', color: 'bg-amber-50 text-amber-600' },
  ] : [];

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-gray-900 mb-8">Dashboard</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-xl ${c.color} flex items-center justify-center text-xl mb-4`}>{c.icon}</div>
                <p className="text-2xl font-bold text-gray-900">{c.value}</p>
                <p className="text-sm text-gray-500">{c.label}</p>
              </motion.div>
            ))}
          </div>
          {stats?.popular?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Servicios más populares</h3>
              <div className="space-y-3">
                {stats.popular.map((p, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-700 font-medium">{p.service.title}</span>
                    <span className="text-sm text-gray-400">{p.count} reservas</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

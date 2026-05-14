import { useState, useEffect } from 'react';
import { appointmentService } from '../../services';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const statusColors = { pendiente: 'warning', confirmado: 'info', completado: 'success', cancelado: 'danger' };

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    const params = {};
    if (filterStatus) params.status = filterStatus;
    appointmentService.getAll(params).then(res => setAppointments(res.data)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, [filterStatus]);

  const updateStatus = async (id, status) => { await appointmentService.update(id, { status }); load(); };
  const handleDelete = async (id) => {
    try {
      await appointmentService.delete(id);
      load();
      setDeleting(null);
    } catch (e) {
      alert('Error: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Reservas</h1>
        <div className="flex gap-2">
          {['', 'pendiente', 'confirmado', 'completado', 'cancelado'].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === s ? 'bg-pink-400 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-pink-50'}`}
            >{s || 'Todas'}</button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 tracking-wider">
              <tr><th className="px-6 py-4">Cliente</th><th className="px-6 py-4">Servicio</th><th className="px-6 py-4">Fecha</th><th className="px-6 py-4">Hora</th><th className="px-6 py-4">Estado</th><th className="px-6 py-4">Precio</th><th className="px-6 py-4">Acciones</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map(a => (
                <tr key={a._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4"><div><p className="font-medium text-gray-900">{a.clientName}</p><p className="text-xs text-gray-400">{a.phone}</p></div></td>
                  <td className="px-6 py-4 text-gray-700">{a.services?.map(s => s.title).join(', ')}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(a.date).toLocaleDateString('es-AR')}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{a.time}</td>
                  <td className="px-6 py-4"><Badge variant={statusColors[a.status]}>{a.status}</Badge></td>
                  <td className="px-6 py-4 font-semibold">${a.totalPrice?.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {a.status === 'pendiente' && <Button size="sm" variant="ghost" onClick={() => updateStatus(a._id, 'confirmado')}>✅</Button>}
                      {a.status === 'confirmado' && <Button size="sm" variant="ghost" onClick={() => updateStatus(a._id, 'completado')}>✔️</Button>}
                      {a.status !== 'cancelado' && <Button size="sm" variant="ghost" onClick={() => updateStatus(a._id, 'cancelado')}>❌</Button>}
                      <Button size="sm" variant="ghost" onClick={() => setDeleting(a._id)}>🗑️</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && appointments.length === 0 && <div className="text-center py-12 text-gray-400">No hay reservas</div>}
      </div>

      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Confirmar eliminación">
        <div className="space-y-4">
          <p className="text-gray-600">¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.</p>
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setDeleting(null)}>Cancelar</Button>
            <Button variant="danger" onClick={() => handleDelete(deleting)}>Sí, eliminar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

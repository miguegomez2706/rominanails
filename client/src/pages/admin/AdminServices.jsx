import { useState, useEffect } from 'react';
import { servicesService } from '../../services';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import Badge from '../../components/ui/Badge';

const emptyForm = { title: '', description: '', category: 'Manicura', duration: '', price: '', image: null };
const categories = ['Manicura', 'Pedicura', 'Nail Art', 'Tratamientos', 'Combos'];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = () => { servicesService.getAll({ active: undefined }).then(res => setServices(res.data)).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleSubmit = async () => {
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v !== null) fd.append(k, v); });
    try {
      if (editing) { await servicesService.update(editing, fd); }
      else { await servicesService.create(fd); }
      setModalOpen(false); setEditing(null); setForm(emptyForm); load();
    } catch (e) { alert(e.response?.data?.message || 'Error'); }
    finally { setSaving(false); }
  };

  const handleEdit = (s) => { setEditing(s._id); setForm({ title: s.title, description: s.description, category: s.category, duration: s.duration, price: s.price, image: null }); setModalOpen(true); };
  const handleDelete = async (id) => {
    try {
      await servicesService.delete(id);
      load();
      setDeleting(null);
    } catch (e) {
      alert('Error: ' + (e.response?.data?.message || e.message));
    }
  };

  if (loading) return <div className="skeleton h-96 rounded-2xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Servicios</h1>
        <Button onClick={() => { setEditing(null); setForm(emptyForm); setModalOpen(true); }}>+ Nuevo servicio</Button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 tracking-wider">
              <tr><th className="px-6 py-4">Servicio</th><th className="px-6 py-4">Categoría</th><th className="px-6 py-4">Duración</th><th className="px-6 py-4">Precio</th><th className="px-6 py-4">Acciones</th></tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map(s => (
                <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4"><div className="flex items-center gap-3">{s.image && <img src={s.image} className="w-10 h-10 rounded-lg object-cover" />}<span className="font-medium text-gray-900">{s.title}</span></div></td>
                  <td className="px-6 py-4"><Badge variant="pink">{s.category}</Badge></td>
                  <td className="px-6 py-4 text-gray-500">{s.duration} min</td>
                  <td className="px-6 py-4 font-semibold">${s.price.toLocaleString()}</td>
                  <td className="px-6 py-4"><div className="flex gap-2"><Button size="sm" variant="ghost" onClick={() => handleEdit(s)}>✏️</Button><Button size="sm" variant="ghost" onClick={() => setDeleting(s._id)}>🗑️</Button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar servicio' : 'Nuevo servicio'} size="lg">
        <div className="space-y-4">
          <Input label="Nombre" name="title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Descripción" name="description" type="textarea" required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Categoría</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none">
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Duración (min)" name="duration" type="number" required value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
            <Input label="Precio ($)" name="price" type="number" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Imagen</label>
            <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100" />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmit} loading={saving}>{editing ? 'Guardar cambios' : 'Crear servicio'}</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Confirmar eliminación">
        <div className="space-y-4">
          <p className="text-gray-600">¿Estás seguro de que deseas eliminar este servicio? Esta acción no se puede deshacer.</p>
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setDeleting(null)}>Cancelar</Button>
            <Button variant="danger" onClick={() => handleDelete(deleting)}>Sí, eliminar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

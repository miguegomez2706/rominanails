import { useState, useEffect } from 'react';
import { promotionService } from '../../services';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

const emptyForm = { title: '', description: '', discount: '', originalPrice: '', promoPrice: '', image: null };

export default function AdminPromotions() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const load = () => { promotionService.getAll().then(res => setPromos(res.data)).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleSubmit = async () => {
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => { if (v !== null && v !== '') fd.append(k, v); });
    try {
      if (editing) await promotionService.update(editing, fd);
      else await promotionService.create(fd);
      setModalOpen(false); setEditing(null); setForm(emptyForm); load();
    } catch (e) { alert(e.response?.data?.message || 'Error'); }
    finally { setSaving(false); }
  };

  const handleEdit = (p) => { setEditing(p._id); setForm({ title: p.title, description: p.description || '', discount: p.discount || '', originalPrice: p.originalPrice || '', promoPrice: p.promoPrice || '', image: null }); setModalOpen(true); };
  const handleDelete = async (id) => {
    try {
      await promotionService.delete(id);
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
        <h1 className="text-2xl font-heading font-bold text-gray-900">Promociones</h1>
        <Button onClick={() => { setEditing(null); setForm(emptyForm); setModalOpen(true); }}>+ Nueva promoción</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map(p => (
          <div key={p._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {p.image && <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />}
            <div className="p-5">
              <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{p.description}</p>
              {p.discount > 0 && <span className="text-pink-500 font-bold">-{p.discount}%</span>}
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(p)}>✏️ Editar</Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleting(p._id)}>🗑️</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Editar promoción' : 'Nueva promoción'}>
        <div className="space-y-4">
          <Input label="Título" name="title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Descripción" name="description" type="textarea" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-3 gap-4">
            <Input 
              label="Descuento %" 
              name="discount" 
              type="number" 
              value={form.discount} 
              onChange={e => {
                const disc = e.target.value;
                const orig = form.originalPrice;
                const promo = orig && disc ? Math.round(orig * (1 - disc / 100)) : form.promoPrice;
                setForm({ ...form, discount: disc, promoPrice: promo });
              }} 
            />
            <Input 
              label="Precio original" 
              name="originalPrice" 
              type="number" 
              value={form.originalPrice} 
              onChange={e => {
                const orig = e.target.value;
                const disc = form.discount;
                const promo = orig && disc ? Math.round(orig * (1 - disc / 100)) : form.promoPrice;
                setForm({ ...form, originalPrice: orig, promoPrice: promo });
              }} 
            />
            <Input 
              label="Precio promo" 
              name="promoPrice" 
              type="number" 
              value={form.promoPrice} 
              onChange={e => setForm({ ...form, promoPrice: e.target.value })} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Imagen</label>
            <input type="file" accept="image/*" onChange={e => setForm({ ...form, image: e.target.files[0] })} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100" />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button onClick={handleSubmit} loading={saving}>{editing ? 'Guardar' : 'Crear'}</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Confirmar eliminación">
        <div className="space-y-4">
          <p className="text-gray-600">¿Estás seguro de que deseas eliminar esta promoción? Esta acción no se puede deshacer.</p>
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setDeleting(null)}>Cancelar</Button>
            <Button variant="danger" onClick={() => handleDelete(deleting)}>Sí, eliminar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

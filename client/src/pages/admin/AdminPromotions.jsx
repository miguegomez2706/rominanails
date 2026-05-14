import { useState, useEffect } from 'react';
import { promotionService } from '../../services';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { UploadButton } from '../../utils/uploadthing';

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
    try {
      if (editing) await promotionService.update(editing, form);
      else await promotionService.create(form);
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
            {form.image ? (
              <div className="relative inline-block">
                <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded-xl border border-gray-200" />
                <button type="button" onClick={() => setForm({ ...form, image: null })} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">✕</button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex justify-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                      setForm({ ...form, image: res[0].url });
                    }
                  }}
                  onUploadError={(error) => {
                    alert(`Error al subir imagen: ${error.message}`);
                  }}
                />
              </div>
            )}
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

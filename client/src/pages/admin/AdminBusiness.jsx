import { useState, useEffect } from 'react';
import { businessService } from '../../services';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function AdminBusiness() {
  const [form, setForm] = useState({ name: '', address: '', phone: '', whatsapp: '', instagram: '', email: '', about: '', mapUrl: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    businessService.get().then(res => {
      const d = res.data;
      setForm({ name: d.name || '', address: d.address || '', phone: d.phone || '', whatsapp: d.whatsapp || '', instagram: d.instagram || '', email: d.email || '', about: d.about || '', mapUrl: d.mapUrl || '' });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try { await businessService.update(form); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    catch { alert('Error al guardar'); }
    finally { setSaving(false); }
  };

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  if (loading) return <div className="skeleton h-96 rounded-2xl" />;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Información del negocio</h1>
        {saved && <span className="text-green-500 text-sm font-medium">✅ Guardado</span>}
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
        <Input label="Nombre del salón" name="name" value={form.name} onChange={handle} />
        <Input label="Dirección" name="address" value={form.address} onChange={handle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Teléfono" name="phone" value={form.phone} onChange={handle} />
          <Input label="WhatsApp" name="whatsapp" value={form.whatsapp} onChange={handle} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Instagram" name="instagram" value={form.instagram} onChange={handle} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handle} />
        </div>
        <Input label="Sobre nosotros" name="about" type="textarea" value={form.about} onChange={handle} />
        <Input label="URL Google Maps" name="mapUrl" value={form.mapUrl} onChange={handle} />
        <Button onClick={handleSave} loading={saving} className="w-full">Guardar cambios</Button>
      </div>
    </div>
  );
}

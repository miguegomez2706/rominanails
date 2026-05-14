import { useState, useEffect } from 'react';
import { galleryService } from '../../services';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const load = () => { galleryService.getAll().then(res => setImages(res.data)).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(load, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('title', file.name.replace(/\.[^/.]+$/, ''));
      try { await galleryService.upload(fd); } catch (err) { console.error(err); }
    }
    setUploading(false);
    load();
  };

  const handleDelete = async (id) => {
    try {
      await galleryService.delete(id);
      load();
      setDeleting(null);
    } catch (e) {
      alert('Error: ' + (e.response?.data?.message || e.message));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-bold text-gray-900">Galería</h1>
        <label className="cursor-pointer">
          <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          <span className="inline-flex items-center gap-2 px-6 py-3 bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-pink-400/30 transition-all">
            {uploading ? 'Subiendo...' : '+ Subir imágenes'}
          </span>
        </label>
      </div>
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton aspect-square rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map(img => (
            <div key={img._id} className="relative group rounded-2xl overflow-hidden aspect-square">
              <img src={img.image} alt={img.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <Button size="sm" variant="danger" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => setDeleting(img._id)}>🗑️ Eliminar</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={!!deleting} onClose={() => setDeleting(null)} title="Confirmar eliminación">
        <div className="space-y-4">
          <p className="text-gray-600">¿Estás seguro de que deseas eliminar esta imagen de la galería? Esta acción no se puede deshacer.</p>
          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={() => setDeleting(null)}>Cancelar</Button>
            <Button variant="danger" onClick={() => handleDelete(deleting)}>Sí, eliminar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

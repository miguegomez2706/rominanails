import Service from '../models/Service.js';
import { utapi } from '../utils/uploadthing.js';

// Helper function to extract key and delete from UploadThing
const deleteFromUploadThing = async (imageUrl) => {
  if (imageUrl && imageUrl.includes('utfs.io/f/')) {
    const fileKey = imageUrl.split('utfs.io/f/')[1];
    if (fileKey) {
      try {
        await utapi.deleteFiles(fileKey);
      } catch (error) {
        console.error('Error deleting file from UploadThing:', error);
      }
    }
  }
};

// GET /api/services
export const getServices = async (req, res, next) => {
  try {
    const { category, active } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (active !== undefined) filter.isActive = active === 'true';
    else filter.isActive = true;

    const services = await Service.find(filter).sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    next(error);
  }
};

// GET /api/services/:id
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(service);
  } catch (error) {
    next(error);
  }
};

// POST /api/services
export const createService = async (req, res, next) => {
  try {
    // La URL de la imagen ya vendrá en req.body.image subida desde el frontend a UploadThing
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
};

// PUT /api/services/:id
export const updateService = async (req, res, next) => {
  try {
    const existingService = await Service.findById(req.params.id);
    if (!existingService) return res.status(404).json({ message: 'Servicio no encontrado' });

    // Si la imagen ha cambiado, borrar la anterior de UploadThing
    if (req.body.image && existingService.image && req.body.image !== existingService.image) {
      await deleteFromUploadThing(existingService.image);
    }

    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    res.json(service);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/services/:id
export const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Servicio no encontrado' });

    // Borrar imagen de UploadThing si existe
    if (service.image) {
      await deleteFromUploadThing(service.image);
    }

    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};

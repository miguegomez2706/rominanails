import Gallery from '../models/Gallery.js';
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

// GET /api/gallery
export const getGallery = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const images = await Gallery.find(filter).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    next(error);
  }
};

// POST /api/gallery
export const addImage = async (req, res, next) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ message: 'La imagen es obligatoria' });
    }
    const image = await Gallery.create({
      image: req.body.image,
      title: req.body.title || '',
      category: req.body.category || '',
    });
    res.status(201).json(image);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/gallery/:id
export const deleteImage = async (req, res, next) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: 'Imagen no encontrada' });

    // Delete file from UploadThing
    if (image.image) {
      await deleteFromUploadThing(image.image);
    }

    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

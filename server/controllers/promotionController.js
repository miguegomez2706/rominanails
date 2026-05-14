import Promotion from '../models/Promotion.js';
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

// GET /api/promotions
export const getPromotions = async (req, res, next) => {
  try {
    const filter = { isActive: true };
    const promotions = await Promotion.find(filter).sort({ createdAt: -1 });
    res.json(promotions);
  } catch (error) {
    next(error);
  }
};

// POST /api/promotions
export const createPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.create(req.body);
    res.status(201).json(promotion);
  } catch (error) {
    next(error);
  }
};

// PUT /api/promotions/:id
export const updatePromotion = async (req, res, next) => {
  try {
    const existingPromotion = await Promotion.findById(req.params.id);
    if (!existingPromotion) return res.status(404).json({ message: 'Promoción no encontrada' });

    // Si la imagen ha cambiado, borrar la anterior de UploadThing
    if (req.body.image && existingPromotion.image && req.body.image !== existingPromotion.image) {
      await deleteFromUploadThing(existingPromotion.image);
    }

    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(promotion);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/promotions/:id
export const deletePromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) return res.status(404).json({ message: 'Promoción no encontrada' });

    // Borrar imagen de UploadThing si existe
    if (promotion.image) {
      await deleteFromUploadThing(promotion.image);
    }

    res.json({ message: 'Promoción eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

import Gallery from '../models/Gallery.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    if (!req.file) {
      return res.status(400).json({ message: 'La imagen es obligatoria' });
    }
    const image = await Gallery.create({
      image: `/uploads/${req.file.filename}`,
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

    // Delete physical file
    const filePath = path.join(__dirname, '..', image.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({ message: 'Imagen eliminada correctamente' });
  } catch (error) {
    next(error);
  }
};

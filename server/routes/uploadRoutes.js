import express from 'express';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter, utapi } from '../utils/uploadthing.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Ruta de UploadThing nativa para Express
router.use(
  '/',
  createRouteHandler({
    router: uploadRouter,
  })
);

// Ruta personalizada para eliminar imágenes
router.post('/delete', auth, async (req, res) => {
  try {
    const { fileKey } = req.body;
    if (!fileKey) {
      return res.status(400).json({ message: 'Se requiere el fileKey para eliminar' });
    }

    await utapi.deleteFiles(fileKey);
    res.json({ message: 'Archivo eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar archivo en UploadThing:', error);
    res.status(500).json({ message: 'Error interno al eliminar archivo' });
  }
});

export default router;

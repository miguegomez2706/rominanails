import { Router } from 'express';
import { getInstagramFeed } from '../controllers/instagramController.js';

const router = Router();

// Ruta pública para obtener el feed cacheado
router.get('/', getInstagramFeed);

export default router;

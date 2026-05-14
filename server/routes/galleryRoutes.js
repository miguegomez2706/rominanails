import { Router } from 'express';
import { getGallery, addImage, deleteImage } from '../controllers/galleryController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', getGallery);
router.post('/', auth, addImage);
router.delete('/:id', auth, deleteImage);

export default router;

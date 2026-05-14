import { Router } from 'express';
import { getGallery, addImage, deleteImage } from '../controllers/galleryController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', getGallery);
router.post('/', auth, upload.single('image'), addImage);
router.delete('/:id', auth, deleteImage);

export default router;

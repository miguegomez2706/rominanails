import { Router } from 'express';
import { getPromotions, createPromotion, updatePromotion, deletePromotion } from '../controllers/promotionController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', getPromotions);
router.post('/', auth, upload.single('image'), createPromotion);
router.put('/:id', auth, upload.single('image'), updatePromotion);
router.delete('/:id', auth, deletePromotion);

export default router;

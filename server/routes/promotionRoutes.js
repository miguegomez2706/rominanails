import { Router } from 'express';
import { getPromotions, createPromotion, updatePromotion, deletePromotion } from '../controllers/promotionController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', getPromotions);
router.post('/', auth, createPromotion);
router.put('/:id', auth, updatePromotion);
router.delete('/:id', auth, deletePromotion);

export default router;

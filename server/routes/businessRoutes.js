import { Router } from 'express';
import { getBusinessInfo, updateBusinessInfo } from '../controllers/businessController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', getBusinessInfo);
router.put('/', auth, updateBusinessInfo);

export default router;

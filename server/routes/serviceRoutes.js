import { Router } from 'express';
import { getServices, getServiceById, createService, updateService, deleteService } from '../controllers/serviceController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', auth, createService);
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

export default router;

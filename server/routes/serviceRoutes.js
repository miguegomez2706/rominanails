import { Router } from 'express';
import { getServices, getServiceById, createService, updateService, deleteService } from '../controllers/serviceController.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', auth, upload.single('image'), createService);
router.put('/:id', auth, upload.single('image'), updateService);
router.delete('/:id', auth, deleteService);

export default router;

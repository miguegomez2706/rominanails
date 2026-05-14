import { Router } from 'express';
import { getAppointments, getAvailableSlots, createAppointment, updateAppointment, deleteAppointment, getStats } from '../controllers/appointmentController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.get('/available', getAvailableSlots);
router.get('/stats', auth, getStats);
router.get('/', auth, getAppointments);
router.post('/', createAppointment);
router.put('/:id', auth, updateAppointment);
router.delete('/:id', auth, deleteAppointment);

export default router;

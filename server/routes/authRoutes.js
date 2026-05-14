import { Router } from 'express';
import { login, verifyToken } from '../controllers/authController.js';
import auth from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.get('/verify', auth, verifyToken);

export default router;

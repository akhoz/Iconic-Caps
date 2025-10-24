import { Router } from 'express';
import { login } from '../controllers/authController.js';

const router = Router();

// Login básico (plaintext compare en DB "raw")
router.post('/login', login);

export default router;


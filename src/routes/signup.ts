import { Router } from 'express';
import { signup } from '../controllers/authController.js';

const router = Router();

router.post("/", signup);

export default router;

import { Router } from 'express';
import { signup } from '../controllers/auth-controller.js';

const router = Router();

router.post("/", signup);

export default router;

import { Router } from 'express';
import { getUserInfo, logout } from '../controllers/accountController.js';
import { validateSession } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(validateSession);

router.get("/", getUserInfo);

router.get("/logout", logout);

export default router;

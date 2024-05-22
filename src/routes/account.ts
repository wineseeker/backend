import { Router } from 'express';
import { getUserInfo, logout } from '../controllers/account-controller.js';
import { validateSession } from '../middlewares/auth-middleware.js';

const router = Router();

router.use(validateSession);

router.get("/", getUserInfo);

router.get("/logout", logout);

export default router;

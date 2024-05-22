import { Router } from 'express';
import { validateSession, requireAdmin } from '../middlewares/auth-middleware.js';

const router = Router();

router.use(validateSession);
router.use(requireAdmin);

router.get('/dashboard', (req, res) => {
    res.json({ msg: 'Welcome to the admin dashboard!' });
});

export default router;

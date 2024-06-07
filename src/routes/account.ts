import { Router } from 'express';
import {
    changePassword, deleteAccount,
    emailVerification,
    getUserInfo,
    logout,
    verificationEmailResend
} from '../controllers/account-controller.js';
import { validateSession } from '../middlewares/auth-middleware.js';

const router = Router();

router.use(validateSession);

router.get("/", getUserInfo);
router.delete("/", deleteAccount)

router.post("/email-verification", emailVerification)

router.get("/verification-mail-resend", verificationEmailResend)

router.patch("/password", changePassword)

router.get("/logout", logout);

export default router;

import { Router } from 'express';
import {autoComplete, search} from "../controllers/search-controller.js";

const router: Router = Router();

router.get('/', search);

router.get('/auto-complete', autoComplete);

export default router;
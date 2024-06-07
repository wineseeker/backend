import { Router } from 'express';
import {search} from "../controllers/search-controller.js";

const router: Router = Router();

router.get('/', search);

export default router;
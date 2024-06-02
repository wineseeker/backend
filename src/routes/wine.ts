import { Router } from 'express';
import {getWine} from "../controllers/wine-controller.js";

const router: Router = Router();

router.get('/:id', getWine)

export default router;
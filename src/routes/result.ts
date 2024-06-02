import { Router } from 'express';
import {getResult} from "../controllers/result-controller.js";

const router: Router = Router();

router.get('/:id', getResult)

export default router;
import { Router } from 'express';
import {raking} from "../controllers/ranking-controller.js";

const router = Router();

router.get("/", raking);

export default router;

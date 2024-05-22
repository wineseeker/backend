import { Router } from 'express';
import { createSurvey } from '../controllers/survey-controller.js';

const router = Router();

router.post('/survey', createSurvey);

export default router;

import { Router } from 'express';
import { createSurvey } from '../controllers/surveyController.js';

const router = Router();

router.post('/survey', createSurvey);

export default router;

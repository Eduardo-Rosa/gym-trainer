import { Router } from 'express';
import { getExercise, generateInstructions } from '../controllers/exerciseController';

const router = Router();

router.get('/:id', getExercise);
router.post('/:id/generate', generateInstructions);

export default router;
import controller from './controller';
import express from 'express';
const router = express.Router();

router.post('/addRecipe',new controller().addRecipe);
router.get('/recipe',new controller().getRecipe);
export default router;
import { Router } from 'express';
import { getAllCategories } from '@/controllers';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);

export { categoryRouter };

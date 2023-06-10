import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createArticle, getRecentArticles } from '@/controllers/article-controller';

const articleRouter = Router();

articleRouter.get('/', getRecentArticles).post('/', authenticateToken, createArticle);

export { articleRouter };

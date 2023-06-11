import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createArticle, getArticleById, getRecentArticles } from '@/controllers/article-controller';

const articleRouter = Router();

articleRouter
  .get('/', getRecentArticles)
  .get('/:articleId', getArticleById)
  .post('/', authenticateToken, createArticle);

export { articleRouter };

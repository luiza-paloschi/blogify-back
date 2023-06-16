import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createArticle, getArticleById, getRecentArticles, getUserArticles } from '@/controllers/article-controller';

const articleRouter = Router();

articleRouter
  .get('/recent', getRecentArticles)
  .get('/:articleId', getArticleById)
  .get('/user/:userId', getUserArticles)
  .post('/', authenticateToken, createArticle);

export { articleRouter };

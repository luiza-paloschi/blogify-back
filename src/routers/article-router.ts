import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  getByCategory,
  getRecentArticles,
  getUserArticles,
} from '@/controllers/article-controller';

const articleRouter = Router();

articleRouter
  .get('/recent', getRecentArticles)
  .get('/all', getAllArticles)
  .get('/:articleId', getArticleById)
  .get('/user/:userId', getUserArticles)
  .get('/category/:categoryId', getByCategory)
  .post('/', authenticateToken, createArticle)
  .delete('/delete/:articleId', authenticateToken, deleteArticle);

export { articleRouter };

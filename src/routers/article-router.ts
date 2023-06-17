import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  getRecentArticles,
  getUserArticles,
} from '@/controllers/article-controller';

const articleRouter = Router();

articleRouter
  .get('/recent', getRecentArticles)
  .get('/all', getAllArticles)
  .get('/:articleId', getArticleById)
  .get('/user/:userId', getUserArticles)
  .post('/', authenticateToken, createArticle)
  .delete('/delete/:articleId', authenticateToken, deleteArticle);

export { articleRouter };

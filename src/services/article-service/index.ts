import { Article } from '@prisma/client';
import articleRepository from '@/repositories/article-repository';
import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import userRepository from '@/repositories/user-repository';
import { forbiddenError } from '@/errors/forbidden-error';

export async function createArticle(params: CreateArticleParams): Promise<Article> {
  return await articleRepository.create(params);
}

export async function getRecentArticles() {
  return await articleRepository.getRecentArticles();
}

export async function getArticleById(articleId: number) {
  if (!articleId || isNaN(articleId)) throw badRequestError();

  const article = await articleRepository.getById(articleId);
  if (!article) throw notFoundError();

  return article;
}

export async function getUserArticles(userId: number) {
  if (!userId || isNaN(userId)) throw badRequestError();

  const user = await userRepository.findById(userId);
  if (!user) throw forbiddenError();

  const articles = await articleRepository.getUserArticles(userId);
  return articles;
}

export type CreateArticleParams = Pick<Article, 'userId' | 'title' | 'content'>;
export type CreateArticleBody = Omit<CreateArticleParams, 'userId'>;

const articleService = {
  createArticle,
  getRecentArticles,
  getArticleById,
  getUserArticles,
};

export * from './errors';
export default articleService;

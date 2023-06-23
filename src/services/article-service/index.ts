import { Article } from '@prisma/client';
import { duplicatedTitleError } from './errors';
import articleRepository from '@/repositories/article-repository';
import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import userRepository from '@/repositories/user-repository';
import { forbiddenError } from '@/errors/forbidden-error';

export function checkValue(value: number) {
  if (!value || isNaN(value)) throw badRequestError();
}

export async function createArticle(params: CreateArticleParams): Promise<Article> {
  const articleTitle = await articleRepository.findByTitle(params.title);
  if (articleTitle) throw duplicatedTitleError();

  return await articleRepository.create(params);
}

export async function getRecentArticles() {
  return await articleRepository.getRecentArticles();
}

export async function getArticleById(articleId: number) {
  checkValue(articleId);

  const article = await articleRepository.getById(articleId);
  if (!article) throw notFoundError();

  return article;
}

export async function getUserArticles(userId: number) {
  checkValue(userId);

  const user = await userRepository.findById(userId);
  if (!user) throw forbiddenError();

  const articles = await articleRepository.getUserArticles(userId);
  return articles;
}

export async function deleteArticle(userId: number, articleId: number) {
  checkValue(articleId);

  const article = await articleRepository.getById(articleId);
  if (!article) throw notFoundError();

  if (article.userId !== userId) throw forbiddenError();

  await articleRepository.deleteArticle(articleId);
}

export async function getAll({ page, limit }: GetArticlesQuery) {
  checkValue(page);
  checkValue(limit);

  const offset = (page - 1) * limit;
  const { articles, totalArticles } = await articleRepository.getAll(limit, offset);

  return {
    articles,
    currentPage: Number(page),
    totalPages: Math.ceil(totalArticles / limit),
  };
}

export async function getByCategory({ page, limit, categoryId }: GetByCategoryParams) {
  checkValue(page);
  checkValue(limit);
  checkValue(categoryId);

  const offset = (page - 1) * limit;
  const { articles, totalArticles } = await articleRepository.getByCategory(categoryId, limit, offset);

  return {
    articles,
    currentPage: Number(page),
    totalPages: Math.ceil(totalArticles / limit),
  };
}

export type CreateArticleParams = Pick<Article, 'userId' | 'title' | 'content' | 'categoryId'>;
export type CreateArticleBody = Omit<CreateArticleParams, 'userId'>;
export type GetArticlesQuery = { page: number; limit: number };
export type GetByCategoryParams = { page: number; limit: number; categoryId: number };

const articleService = {
  createArticle,
  getRecentArticles,
  getArticleById,
  getUserArticles,
  deleteArticle,
  getAll,
  getByCategory,
};

export * from './errors';
export default articleService;

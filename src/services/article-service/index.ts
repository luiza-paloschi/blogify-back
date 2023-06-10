import { Article } from '@prisma/client';
import articleRepository from '@/repositories/article-repository';

export async function createArticle(params: CreateArticleParams): Promise<Article> {
  return await articleRepository.create(params);
}

export async function getRecentArticles() {
  return await articleRepository.getRecentArticles();
}

export type CreateArticleParams = Pick<Article, 'userId' | 'title' | 'content'>;
export type CreateArticleBody = Omit<CreateArticleParams, 'userId'>;

const articleService = {
  createArticle,
  getRecentArticles,
};

export * from './errors';
export default articleService;

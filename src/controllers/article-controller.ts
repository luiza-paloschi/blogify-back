import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
import { badRequestError } from '@/errors/bad-request-error';
import { AuthenticatedRequest } from '@/middlewares';
import articleService, { CreateArticleBody } from '@/services/article-service';

export async function createArticle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const body = req.body as CreateArticleBody;
  const userId = req.userId;

  try {
    if (!body.title || !body.content || !body.categoryId) throw badRequestError();
    const params = { ...body, userId };

    const article = await articleService.createArticle(params);

    return res.status(httpStatus.CREATED).send({ articleId: article.id });
  } catch (error) {
    next(error);
  }
}

export async function deleteArticle(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { articleId } = req.params;
  const userId = req.userId;

  try {
    await articleService.deleteArticle(userId, Number(articleId));

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    next(error);
  }
}

export async function getUserArticles(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;

  try {
    const articles = await articleService.getUserArticles(Number(userId));
    return res.status(httpStatus.OK).send(articles);
  } catch (error) {
    next(error);
  }
}

export async function getRecentArticles(_req: Request, res: Response, next: NextFunction) {
  try {
    const articles = await articleService.getRecentArticles();

    return res.status(httpStatus.OK).send(articles);
  } catch (error) {
    next(error);
  }
}

export async function getArticleById(req: Request, res: Response, next: NextFunction) {
  const { articleId } = req.params;

  try {
    const article = await articleService.getArticleById(Number(articleId));

    return res.status(httpStatus.OK).send(article);
  } catch (error) {
    next(error);
  }
}

export async function getAllArticles(req: Request, res: Response, next: NextFunction) {
  const { page = 1, limit = 10 } = req.query as Record<string, string>;

  const numberPage = Number(page);
  const numberLimit = Number(limit);

  try {
    const article = await articleService.getAll({ page: numberPage, limit: numberLimit });

    return res.status(httpStatus.OK).send(article);
  } catch (error) {
    next(error);
  }
}

export async function getByCategory(req: Request, res: Response, next: NextFunction) {
  const { page = 1, limit = 10 } = req.query as Record<string, string>;
  const { categoryId } = req.params;

  const numberPage = Number(page);
  const numberLimit = Number(limit);
  const numberCategoryId = Number(categoryId);

  try {
    const article = await articleService.getByCategory({
      page: numberPage,
      limit: numberLimit,
      categoryId: numberCategoryId,
    });

    return res.status(httpStatus.OK).send(article);
  } catch (error) {
    next(error);
  }
}

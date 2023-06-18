import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import categoryService from '@/services/category-service';

export async function getAllCategories(_req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await categoryService.getAll();
    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    next(error);
  }
}

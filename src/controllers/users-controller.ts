import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '@/services/users-service';

export async function createUser(req: Request, res: Response, next: NextFunction) {
  const { username, email, password } = req.body;

  try {
    const user = await userService.createUser({ username, email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
}

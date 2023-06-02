import { Router } from 'express';

import { createUserSchema } from '@/schemas';
import { validateBody } from '@/middlewares';
import { createUser } from '@/controllers';

const usersRouter = Router();

usersRouter.post('/', validateBody(createUserSchema), createUser);

export { usersRouter };

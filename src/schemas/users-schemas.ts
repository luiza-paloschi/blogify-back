import Joi from 'joi';

type CreateUserBody = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const createUserSchema = Joi.object<CreateUserBody>({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref('password'),
});

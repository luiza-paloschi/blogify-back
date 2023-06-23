import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import faker from '@faker-js/faker';
import { cleanDb, generateValidToken } from '../helpers';
import { createUser, generateArticles, generateSingleArticle } from '../factories';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('POST /articles', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/articles');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/articles').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/articles').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 400 when body is not present', async () => {
      const token = await generateValidToken();

      const response = await server.post('/articles').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 when body is not valid', async () => {
      const token = await generateValidToken();
      const body = { title: '', content: '', categoryId: 1 };

      const response = await server.post('/articles').set('Authorization', `Bearer ${token}`).send(body);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe('when body is valid', () => {
      const generateValidBody = () => ({
        title: faker.lorem.words(10),
        categoryId: faker.datatype.number({ min: 1, max: 25 }),
        content: faker.lorem.paragraph(),
      });

      it('should respond with status 201 and created article id', async () => {
        const body = generateValidBody();
        const token = await generateValidToken();

        const response = await server.post('/articles').set('Authorization', `Bearer ${token}`).send(body);
        expect(response.status).toBe(httpStatus.CREATED);
        expect(response.body).toEqual({ articleId: expect.any(Number) });
      });
    });
  });
});

describe('GET /articles/recent', () => {
  it('should return the 10 most recent articles', async () => {
    await generateArticles(11);

    const response = await server.get('/articles/recent');
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toHaveLength(10);

    const expectedBody = {
      title: expect.any(String),
      updatedAt: expect.any(String),
      id: expect.any(Number),
      User: { id: expect.any(Number), username: expect.any(String) },
      Category: { id: expect.any(Number), name: expect.any(String) },
      createdAt: expect.any(String),
    };

    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining(expectedBody)]));
  });
});

describe('GET /articles/all', () => {
  it('should return status 400 when invalid params are sent', async () => {
    const response = await server.get('/articles/all').query({ page: 'invalid param' });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return all articles', async () => {
    const user = await createUser();
    const article = await generateSingleArticle(user);

    const response = await server.get('/articles/all');
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual({
      articles: [
        {
          id: article.id,
          title: article.title,
          createdAt: article.createdAt.toISOString(),
          updatedAt: article.updatedAt.toISOString(),
          User: { id: user.id, username: user.username },
          Category: article.Category,
        },
      ],
      currentPage: 1,
      totalPages: 1,
    });
  });
});

describe('GET /articles/user/:userId', () => {
  it('should return 400 status code when userId is invalid', async () => {
    const response = await server.get('/articles/user/invalid');
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should return 403 status code when user does not exist', async () => {
    const response = await server.get('/articles/user/999');
    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });

  describe('when the user is valid', () => {
    it('should return status 200 and user articles', async () => {
      const user = await createUser();
      const article = await generateSingleArticle(user);

      const response = await server.get(`/articles/user/${user.id}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: article.id,
          title: article.title,
          createdAt: article.createdAt.toISOString(),
          updatedAt: article.updatedAt.toISOString(),
        },
      ]);
    });
  });
});

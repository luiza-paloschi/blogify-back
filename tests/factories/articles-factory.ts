import { User } from '@prisma/client';
import faker from '@faker-js/faker';
import { createUser } from './users-factory';
import { prisma } from '@/config';

export async function generateArticles(totalArticles: number, user?: User) {
  const incomingUser = user || (await createUser());

  for (let i = 0; i < totalArticles; i++) {
    await prisma.article.create({
      data: {
        title: faker.lorem.words(7),
        categoryId: faker.datatype.number({ min: 1, max: 25 }),
        content: faker.lorem.paragraph(),
        userId: incomingUser.id,
      },
    });
  }
}

export async function generateSingleArticle(user?: User) {
  const incomingUser = user || (await createUser());

  return await prisma.article.create({
    data: {
      title: faker.lorem.words(7),
      categoryId: faker.datatype.number({ min: 1, max: 25 }),
      content: faker.lorem.paragraph(),
      userId: incomingUser.id,
    },
    include: { Category: true },
  });
}

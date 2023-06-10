import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.ArticleUncheckedCreateInput) {
  return prisma.article.create({
    data,
  });
}

async function findByTitle(title: string) {
  return prisma.article.findUnique({
    where: { title },
  });
}

function getRecentArticles() {
  return prisma.article.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      User: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

const articleRepository = {
  create,
  findByTitle,
  getRecentArticles,
};

export default articleRepository;

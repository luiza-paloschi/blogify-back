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

function getUserArticles(userId: number) {
  return prisma.article.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { updatedAt: 'desc' },
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

function getById(id: number) {
  return prisma.article.findUnique({
    where: { id },
    include: {
      User: {
        select: {
          username: true,
        },
      },
    },
  });
}

function deleteArticle(id: number) {
  return prisma.article.delete({
    where: { id },
  });
}

const articleRepository = {
  create,
  findByTitle,
  getRecentArticles,
  getById,
  getUserArticles,
  deleteArticle,
};

export default articleRepository;

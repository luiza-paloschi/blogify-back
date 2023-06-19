import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.ArticleUncheckedCreateInput) {
  return await prisma.article.create({
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
      Category: true,
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
      Category: true,
    },
  });
}

function deleteArticle(id: number) {
  return prisma.article.delete({
    where: { id },
  });
}

async function getAll(limit: number, offset: number) {
  const articles = await prisma.article.findMany({
    take: limit,
    skip: offset,
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      createdAt: true,
      updatedAt: true,
      Category: true,
      User: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });

  const totalArticles = await prisma.article.count();

  return { articles, totalArticles };
}

async function getByCategory(categoryId: number, limit: number, offset: number) {
  const articles = await prisma.article.findMany({
    take: limit,
    skip: offset,
    where: { categoryId },
    orderBy: { updatedAt: 'desc' },
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
  const totalArticles = await prisma.article.count({ where: { categoryId } });

  return { articles, totalArticles };
}

const articleRepository = {
  create,
  findByTitle,
  getRecentArticles,
  getById,
  getUserArticles,
  deleteArticle,
  getAll,
  getByCategory,
};

export default articleRepository;

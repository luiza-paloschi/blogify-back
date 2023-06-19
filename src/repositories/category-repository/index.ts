import { prisma } from '@/config';

function getAll() {
  return prisma.category.findMany({});
}

const categoryRepository = {
  getAll,
};

export default categoryRepository;

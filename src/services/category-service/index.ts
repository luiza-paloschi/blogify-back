import categoryRepository from '@/repositories/category-repository';

async function getAll() {
  const categories = await categoryRepository.getAll();
  return categories;
}

const categoryService = {
  getAll,
};

export default categoryService;

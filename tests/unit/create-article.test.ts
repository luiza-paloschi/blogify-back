import articleRepository from '@/repositories/article-repository';
import { createArticle, duplicatedTitleError } from '@/services/article-service';

describe('createArticle service', () => {
  it('should create an article when the parameters are valid', async () => {
    // Mocking the required dependencies and objects
    const mockParams = {
      title: 'Test Article',
      content: 'Lorem ipsum dolor sit amet',
      categoryId: 1,
      userId: 1,
    };

    // Mocking the articleRepository.findByTitle function
    articleRepository.findByTitle = jest.fn().mockResolvedValue(null);

    // Mocking the articleRepository.create function
    articleRepository.create = jest.fn().mockResolvedValue({ id: 1 });

    // Call the service
    const article = await createArticle(mockParams);

    // Expect the article to be created
    expect(article.id).toBe(1);
    expect(articleRepository.findByTitle).toHaveBeenCalledWith('Test Article');
    expect(articleRepository.create).toHaveBeenCalledWith(mockParams);
  });

  it('should throw an error when the article title is duplicated', async () => {
    // Mocking the required dependencies and objects
    const mockParams = {
      title: 'Test Article',
      content: 'Lorem ipsum dolor sit amet',
      categoryId: 1,
      userId: 1,
    };

    // Mocking the articleRepository.findByTitle function to return a duplicated article
    articleRepository.findByTitle = jest.fn().mockResolvedValue({ id: 1 });

    let error = null;
    try {
      await createArticle(mockParams);
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(duplicatedTitleError());
  });
});

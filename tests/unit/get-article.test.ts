import { notFoundError } from '@/errors';
import articleRepository from '@/repositories/article-repository';
import articleService from '@/services/article-service';

describe('GET /articles/:articleId', () => {
  it('should throw an error when the article does not exist', async () => {
    const mockArticleId = 1;

    articleRepository.getById = jest.fn().mockResolvedValue(null);

    let error = null;

    try {
      await articleService.getArticleById(mockArticleId);
    } catch (err) {
      error = err;
    }

    expect(error).toEqual(notFoundError());
  });
});

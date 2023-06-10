import { ApplicationError } from '@/protocols';

export function duplicatedTitleError(): ApplicationError {
  return {
    name: 'DuplicatedTitleError',
    message: 'There is already an article with this title',
  };
}

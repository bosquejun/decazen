import slugify from 'slugify';

export const getSlug = (name: string) =>
  slugify(name, {
    strict: true,
    lower: true,
  });

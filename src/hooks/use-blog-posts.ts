import { Blog } from '@/components/home/blog-card';

const blogPostsCache = new Map<string, any>();

export function useBlogPosts(): Blog[] {
  const cacheKey = 'blogPosts';

  if (blogPostsCache.has(cacheKey)) {
    const result = blogPostsCache.get(cacheKey);

    if (result instanceof Error) {
      throw result;
    }

    if (result instanceof Promise) {
      throw result;
    }

    return result;
  }

  const promise = Promise.all([
    fetch('/data/blogs.json').then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch blogs: ${response.status}`);
      }
      return response.json();
    }),
    fetch('/data/external-blogs.json').then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch external blogs: ${response.status}`);
      }
      return response.json();
    }),
  ])
    .then(([blogsData, externalBlogsData]: [Blog[], Blog[]]) => {
      const mergedBlogs = [...blogsData, ...externalBlogsData];

      // Sort by date (newest first)
      const sortedBlogs = mergedBlogs.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });

      blogPostsCache.set(cacheKey, sortedBlogs);
      return sortedBlogs;
    })
    .catch((error) => {
      const errorObj =
        error instanceof Error ? error : new Error('Unknown error occurred');
      blogPostsCache.set(cacheKey, errorObj);
      throw errorObj;
    });

  blogPostsCache.set(cacheKey, promise);
  throw promise;
}

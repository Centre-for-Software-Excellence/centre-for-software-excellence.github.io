import blogs from '../../../public/data/external-blogs.json';

// from external-blogs.json we should also include these in searching index
export const blogRecords = () => {
  const records = blogs.map((blog, idx) => {
    return {
      id: blog.title + idx,
      title: blog.title,
      section: 'Blog / ' + blog.title,
      description: blog.abstract,
      slug: blog.link,
      tags: [blog.category, 'blog'],
    };
  });
  return records;
};

import blogs from '../../../public/data/external-blogs.json';
import publications from '../../../public/data/publications.json';

// from publications.json we should also include these in searching index
export const researchRecords = () => {
  const records = publications.map((pub, idx) => {
    return {
      id: pub.title + idx,
      title: pub.title,
      section: 'Research / ' + pub.title,
      description: pub.abstract,
      slug: `/docs/research/publication-index/title=${encodeURIComponent(pub.title)}`,
      tags: pub.type ? [pub.type] : [],
    };
  });
  return records;
};

// from external-blogs.json we should also include these in searching index
export const blogRecords = () => {
  const records = blogs.map((blog, idx) => {
    return {
      id: blog.title + idx,
      title: blog.title,
      section: 'Blog / ' + blog.title,
      description: blog.abstract,
      slug: blog.link,
    };
  });
  return records;
};

import { BlogsList } from '@/components/docs/article-list';
import { SearchComponent } from '@/components/docs/search';
import { FrontmatterForTSX } from '@/components/md/frontmatter';
import { useBlogPosts } from '@/hooks/use-blog-posts';

export default function BlogsPage() {
  const blogs = useBlogPosts();
  return (
    <div className="mx-auto py-8 md:px-4">
      <FrontmatterForTSX
        frontmatter={{
          title: 'Blogs',
        }}
      />
      <SearchComponent className="mt-8" />
      <div className="mt-4">
        <BlogsList itemsPerPage={5} content={blogs} />
      </div>
    </div>
  );
}

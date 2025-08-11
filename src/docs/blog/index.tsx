import { Suspense } from 'react';

import { ArticleIndexSkeleton } from '@/components/common/skeleton';
import { Divider } from '@/components/common/ui/divider';
import { BlogsList } from '@/components/docs/article-list';
// import { SearchComponent } from '@/components/docs/search';
import { FrontmatterForTSX } from '@/components/md/frontmatter';
import { useBlogPosts } from '@/hooks/use-blog-posts';

function BlogsContent() {
  const blogs = useBlogPosts();
  return <BlogsList itemsPerPage={5} content={blogs} />;
}

export default function BlogsPage() {
  return (
    <div className="mx-auto py-8 md:px-4">
      <FrontmatterForTSX
        frontmatter={{
          title: 'Blogs',
          description: 'Latest blog posts',
        }}
      />
      {/* <SearchComponent className="mt-8" /> */}
      <Divider />
      <div className="mt-4">
        <Suspense fallback={<ArticleIndexSkeleton />}>
          <BlogsContent />
        </Suspense>
      </div>
    </div>
  );
}

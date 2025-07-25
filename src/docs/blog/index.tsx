import { Suspense } from 'react';

import { ArticleIndexSkeleton } from '@/components/common/skeleton';
import { BlogsList } from '@/components/docs/article-list';
import { SearchComponent } from '@/components/docs/search';
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
        }}
      />
      <SearchComponent className="mt-8" />
      <div className="mt-4">
        <Suspense fallback={<ArticleIndexSkeleton />}>
          <BlogsContent />
        </Suspense>
      </div>
    </div>
  );
}

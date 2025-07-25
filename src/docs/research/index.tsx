import { Suspense } from 'react';

import { ArticleIndexSkeleton } from '@/components/common/skeleton';
import { ResearchList } from '@/components/docs/article-list';
import { SearchComponent } from '@/components/docs/search';
import { FrontmatterForTSX } from '@/components/md/frontmatter';
import { usePublications } from '@/hooks/use-publications';

function ResearchContent() {
  const publications = usePublications();
  return <ResearchList itemsPerPage={5} content={publications} />;
}

export default function ResearchPage() {
  return (
    <div className="mx-auto py-8 md:px-4">
      <FrontmatterForTSX
        frontmatter={{
          title: 'Research',
        }}
      />
      <SearchComponent className="mt-8" />
      <div className="mt-4">
        <Suspense fallback={<ArticleIndexSkeleton />}>
          <ResearchContent />
        </Suspense>
      </div>
    </div>
  );
}

import { Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { Loading } from '@/components/common/ui/loading';
import { MDXViewer } from '@/components/md/mdx-viewer';
import { getSlugFromPath, resolveDocFromSlug } from '@/lib/docs/resolver';
import { cn } from '@/lib/utils';
import { useTocStore } from '@/stores/toc';
import { useUIStore } from '@/stores/ui';
import Layout from './layout';

export default function DocsPage() {
  const location = useLocation();
  const headings = useTocStore((state) => state.headings);
  const showSidebar = useUIStore((state) => state.showSidebar);
  const showToc = useUIStore((state) => state.showToc);
  const error = useUIStore((state) => state.error);
  const doc = useUIStore((state) => state.doc);
  const loading = useUIStore((state) => state.loading);
  const [props, setProps] = useState<object>({});
  useEffect(() => {
    const {
      setDoc,
      setShowSidebar,
      setShowToc,
      setLoading,
      setError,
      setShowFooter,
    } = useUIStore.getState();
    async function loadDoc() {
      setLoading(true);
      setError(null);

      try {
        const slug = getSlugFromPath(location.pathname);
        const isPublicationIndex = slug.includes('publication-index'); // special case for publication index
        const resolvedDoc = await resolveDocFromSlug(
          isPublicationIndex ? slug.slice(0, -1) : slug,
        );
        setProps(
          isPublicationIndex
            ? { title: slug[slug.length - 1].split('=')[1] }
            : {},
        );

        if (!resolvedDoc) {
          setError('Document not found');
          return;
        }
        setDoc(resolvedDoc);
        // NOTE: if we want to show sidebar in future, show it when the location.pathname is docs/blog/some-blog or docs/research/some-research
        setShowSidebar(false);
        setShowToc(resolvedDoc.type === 'mdx' && headings.length > 0);
      } catch (err) {
        setError('Failed to load document');
        console.error('Error loading doc:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDoc();
    setShowFooter(true);
  }, [location.pathname, headings.length]);
  return (
    <Layout>
      {/* fake sidebar space for better article layout purpose, if we need add sidebar, just show the sidebar and remove this placeholder element*/}
      {!showSidebar && showToc && (
        <aside
          className={cn(
            'sticky top-12 hidden h-[calc(100vh-theme(spacing.12))] overflow-x-hidden overflow-y-auto border-border px-2 py-4 xl:flex xl:w-70 xl:shrink-0 xl:flex-col',
          )}
          aria-hidden
        />
      )}
      {/* Main Content */}
      <main className={cn('relative w-full overflow-x-hidden px-1 md:px-6')}>
        {loading && <Loading />}
        {error && (
          <div className="flex items-center justify-center py-8">
            <div className="text-destructive">{error}</div>
          </div>
        )}
        {!loading && !error && doc && doc.type === 'mdx' && doc.path && (
          <MDXViewer path={doc.path} />
        )}
        {!loading && !error && doc && doc.type === 'tsx' && doc.module && (
          <div className="mx-auto max-w-[calc(65chl] bg-background p-4 md:max-w-[calc(65ch+14rem)] md:shrink-1 lg:max-w-[calc(85ch)] prose-headings:mt-4">
            <Suspense fallback={<Loading />}>
              {(() => {
                const Component = doc.module.default || doc.module;
                return <Component {...props} />;
              })()}
            </Suspense>
          </div>
        )}
      </main>
    </Layout>
  );
}

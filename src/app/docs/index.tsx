import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { MDXViewer } from '@/components/md/mdx-viewer';
import {
  getSlugFromPath,
  resolveDocFromSlug,
  type ResolvedDoc,
} from '@/lib/docs/resolver';
import { cn } from '@/lib/utils';
import Layout from './layout';

export default function DocsPage() {
  const location = useLocation();
  const [doc, setDoc] = useState<ResolvedDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isArticle = doc?.type === 'mdx';

  useEffect(() => {
    async function loadDoc() {
      setLoading(true);
      setError(null);

      try {
        const slug = getSlugFromPath(location.pathname);
        const resolvedDoc = await resolveDocFromSlug(slug);

        if (!resolvedDoc) {
          setError('Document not found');
          return;
        }

        setDoc(resolvedDoc);
      } catch (err) {
        setError('Failed to load document');
        console.error('Error loading doc:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDoc();
  }, [location.pathname]);
  const showSidebar = false; // disabled

  return (
    <Layout isArticle={isArticle} loading={loading} showSidebar={showSidebar}>
      {/* Main Content */}
      <main
        className={cn(
          'relative w-full overflow-x-hidden px-1 md:px-6',
          loading &&
            'before:animate-loading relative before:fixed before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-foreground/10 before:to-transparent md:before:-translate-x-full',
        )}
      >
        {error && (
          <div className="flex items-center justify-center py-8">
            <div className="text-destructive">{error}</div>
          </div>
        )}
        {!error && doc && doc.type === 'mdx' && doc.path && (
          <MDXViewer path={doc.path} />
        )}
        {!error && doc && doc.type === 'tsx' && doc.module && (
          <div className="mx-auto max-w-[calc(65chl] bg-background p-4 md:max-w-[calc(65ch+14rem)] md:shrink-1 lg:max-w-[calc(85ch)] prose-headings:mt-4">
            {(() => {
              const Component = doc.module.default || doc.module;
              return <Component />;
            })()}
          </div>
        )}
      </main>
    </Layout>
  );
}

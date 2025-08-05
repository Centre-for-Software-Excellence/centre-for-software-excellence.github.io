import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import { Badge } from '@/components/common/badge';
import { Button } from '@/components/common/ui/button';
import { usePublications } from '@/hooks/use-publications';
import { useUIStore } from '@/stores/ui';

export default function PublicationIndex({ title }: { title: string }) {
  const publications = usePublications();
  const setError = useUIStore((state) => state.setError);
  const publication = useMemo(() => {
    try {
      const decodedTitle = decodeURIComponent(title);
      return publications.find((pub) => pub.title === decodedTitle) || null;
    } catch (error) {
      setError(`Failed to find the publication, error ${error}`);
      return null;
    }
  }, [title, publications, setError]);

  if (!publication) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">Publication not found</div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full md:p-6">
      <div className="md:p-8">
        <div className="mb-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge key={'pub-0'} variant={'default'}>
              {publication.categories[0]}
            </Badge>
            {publication.categories.length > 1 &&
              publication.categories.slice(1).map((cat, index) => (
                <Badge key={`pub-${index + 1}`} variant={'outline'}>
                  {cat}
                </Badge>
              ))}
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground">
            {publication.title}
          </h1>
          <p className="mb-4 text-sm text-accent-foreground">
            By {publication.authors.join(', ')}
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {publication.date}
          </span>
          {publication.paperLink && (
            <Button className="rounded-full bg-foreground py-4 text-lg text-background transition-all duration-300 hover:scale-110 hover:border hover:border-foreground hover:bg-background hover:text-foreground md:px-8">
              <Link
                to={publication.paperLink}
                className="flex items-center hover:no-underline"
              >
                Read the paper <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
        <div className="my-6">
          <h2 className="my-3 text-xl font-semibold">Abstract</h2>
          <p className="leading-relaxed text-accent-foreground/85">
            {publication.abstract}
          </p>
        </div>
      </div>
    </div>
  );
}

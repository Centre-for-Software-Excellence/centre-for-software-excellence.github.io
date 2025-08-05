import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

import { Publication } from '@/config/home';
import { cn, formatDate } from '@/lib/utils';
import { Badge } from '../common/badge';
import { Card, CardContent } from '../common/ui/card';

export function ResearchCard({
  pub,
  className,
  isArticle = false,
}: {
  pub: Publication;
  className?: string;
  isArticle?: boolean;
}) {
  return (
    <Link
      to={`/docs/research/publication-index/title=${encodeURIComponent(pub.title)}`}
      className={cn('group w-full', className)}
    >
      <Card
        className={cn(
          'h-full w-full rounded border-none bg-transparent py-2 shadow-none transition-all duration-300 hover:border-foreground dark:hover:border-active',
        )}
      >
        <CardContent className="px-0 py-6 transition-all duration-300 ease-in-out group-hover:translate-y-[2px] group-hover:scale-[95%] sm:px-2 md:px-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <Badge
                  className={cn(
                    'border-border group-hover:border-foreground dark:group-hover:border-active/50 dark:group-hover:bg-active/10 dark:group-hover:text-active',
                    'bg-primary text-primary-foreground',
                  )}
                >
                  {pub.categories[0]}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {formatDate(pub.date)}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground transition-colors dark:group-hover:text-active">
                {pub.title}
              </h3>
              <p className="mb-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {pub.abstract}
              </p>
              <p className="mb-2 text-xs text-accent-foreground">
                {pub.authors.join(', ')}
              </p>
            </div>
            <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 dark:text-active" />
          </div>
        </CardContent>
        <div className="relative mb-8 flex w-full items-center justify-center overflow-x-visible">
          <span
            className={cn(
              'absolute left-1/2 h-px w-full -translate-x-1/2 animate-expand-x bg-[linear-gradient(to_right,transparent_0%,var(--border)_10%,var(--border)_90%,transparent_100%)]',
              isArticle ? 'md:w-4xl' : 'md:w-[calc(90vw-17.5rem)]',
            )}
          />
          <span
            className={cn(
              'absolute left-1/2 h-px w-full -translate-x-1/2 scale-x-0 animate-expand-x bg-[linear-gradient(to_right,transparent_0%,var(--foreground)_10%,var(--foreground)_90%,transparent_100%)] opacity-0 transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:opacity-100 dark:bg-[linear-gradient(to_right,transparent_0%,var(--color-active)_10%,var(--color-active)_90%,transparent_100%)]',

              isArticle ? 'md:w-4xl' : 'md:w-[calc(90vw-17.5rem)]',
            )}
          />
        </div>
      </Card>
    </Link>
  );
}

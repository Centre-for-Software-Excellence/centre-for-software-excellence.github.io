import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';

import { useMousePosition } from '@/hooks/use-mouse-position';
import { cn, formatDate } from '@/lib/utils';
import { Badge } from '../common/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../common/ui/card';

export interface Blog {
  title: string;
  abstract: string;
  date: string;
  category: string;
  link: string;
}

interface BlogCardProps {
  clamp?: boolean;
  className?: string;
  blog: Blog;
  onHoverAnimation?: boolean;
}

export function BlogCard({
  clamp = false,
  className,
  blog,
  onHoverAnimation = true,
}: BlogCardProps) {
  const isExternalLink = blog.link.startsWith('http');
  const { mouseX, mouseY } = useMousePosition();
  const cardRef = useRef<HTMLDivElement>(null);
  const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!onHoverAnimation) return;
    const updateRelativePosition = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        setRelativePosition({
          x: mouseX - rect.left,
          y: mouseY - rect.top,
        });
      }
    };
    updateRelativePosition();
  }, [mouseX, mouseY, onHoverAnimation]);
  const card = (
    <Card
      ref={cardRef}
      className="group relative flex h-full flex-col justify-between rounded shadow-none transition-all duration-300 hover:border-foreground hover:shadow-md dark:bg-transparent dark:shadow-none dark:hover:border-active"
    >
      <div
        className="absolute inset-0 z-10 bg-radial from-foreground/10 to-transparent opacity-0 transition-all duration-1000 group-hover:opacity-50 dark:from-active/50"
        style={{
          maskImage: `radial-gradient(240px at ${relativePosition.x}px ${relativePosition.y}px, white, transparent)`,
        }}
        aria-hidden
      />
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <Badge
            variant="outline"
            className="group-hover:border-foreground group-hover:text-foreground dark:group-hover:border-active/50 dark:group-hover:text-active"
          >
            {blog.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {formatDate(blog.date)}
          </span>
        </div>
        <CardTitle className="line-clamp-2 text-lg transition-colors group-hover:text-foreground dark:group-hover:text-active">
          {blog.title}
        </CardTitle>
        <CardDescription
          className={cn(
            'text-sm leading-relaxed text-muted-foreground',
            clamp && 'line-clamp-3',
          )}
        >
          {blog.abstract}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-end">
        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground dark:group-hover:text-active" />
      </CardContent>
    </Card>
  );
  return isExternalLink ? (
    <a
      href={blog.link}
      className={cn('block w-full flex-shrink-0 cursor-pointer', className)}
    >
      {card}
    </a>
  ) : (
    <Link
      to={blog.link}
      className={cn('block w-full flex-shrink-0 cursor-pointer', className)}
    >
      {card}
    </Link>
  );
}

import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'default' | 'screen';
}
export function Loading({ size = 'default' }: LoadingProps) {
  return (
    <div
      className={cn(
        'flex animate-text-loading flex-col items-center justify-center text-muted-foreground',
        size === 'default' ? 'fixed inset-0' : 'h-screen w-screen',
      )}
    >
      Loading...
      <div className="h-px w-[400px] animate-loading-2 bg-gradient-to-r from-transparent via-foreground to-transparent" />
    </div>
  );
}

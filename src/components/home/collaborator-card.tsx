import { Collaborator } from '@/config/home';
import { cn } from '@/lib/utils';

export function CollaboratorCard({
  collaborator,
}: {
  collaborator: Collaborator;
}) {
  return (
    <div className="group flex h-full min-h-[160px] w-80 cursor-default flex-col items-center justify-between p-4 transition-all duration-300 hover:translate-y-[-2px] hover:scale-110">
      <div className="duraiton-300 mb-4 flex h-20 w-full items-center justify-center rounded bg-background p-3 transition-all dark:bg-foreground">
        <img
          className="max-h-full max-w-full object-contain grayscale filter transition-all duration-300 group-hover:grayscale-0"
          src={collaborator.logo}
          alt={`${collaborator.org} logo`}
        />
      </div>

      <div className="w-full text-center">
        <span>
          <span
            className={cn(
              `bg-gradient-to-r from-transparent via-foreground to-transparent bg-no-repeat pb-0.5 transition-[background-size,color] duration-500 group-hover:text-foreground`,
              'bg-[length:0%_1px] group-hover:bg-[length:100%_1px]',
              'bg-bottom hover:bg-bottom',
              'from-transparent via-foreground to-transparent',
            )}
          >
            <span className="text-sm font-medium text-muted-foreground">
              {collaborator.org}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}

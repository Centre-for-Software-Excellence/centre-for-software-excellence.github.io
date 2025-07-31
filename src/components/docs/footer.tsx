import { UnderlineLink } from '@/components/common/underline-link';
import { Muted } from '@/components/md';
import { getFooterUIConfig } from '@/config/ui';
import { ModeToggle } from '../common/mode-toggle';

export function Footer() {
  const ui = getFooterUIConfig();
  return (
    <footer className="relative h-32 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <span
        className="absolute top-0 h-px w-full animate-expand-x bg-[linear-gradient(to_right,transparent_0%,var(--border)_10%,var(--border)_90%,transparent_100%)]"
        aria-hidden
      />
      <div className="flex h-full w-full flex-col gap-4 p-6 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="relative flex items-center gap-2">
            {/* <Small className="text-foreground/85">{ui.title}</Small> */}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between sm:flex-row">
          <Muted className="text-muted-foreground md:w-62">{ui.title}</Muted>
          <div className="flex space-x-4">
            <div className="flex flex-wrap items-center space-x-4">
              {ui.links
                .filter((l) => !l.disabled)
                .map(
                  (link, index) =>
                    !link.disabled && (
                      <UnderlineLink
                        aria-label={link.title}
                        href={link.href}
                        key={index}
                        position="middle"
                        gradient={true}
                      >
                        {link.title}
                      </UnderlineLink>
                    ),
                )}
            </div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Button } from '@/components/common/ui/button';
import { H1, H2, Lead, Muted } from '@/components/md';
import { Note } from '@/components/md/alerts';

export default function ExampleComponent() {
  return (
    <div className="space-y-4">
      <Note>
        You can follow normal tsx syntax and use React components to build the
        tsx article pages.
      </Note>
      <H1 className="text-4xl font-bold">TSX Component Example</H1>
      <Lead className="text-lg text-muted-foreground">
        This is an example of a TSX documentation page with interactive
        features.
      </Lead>
      <Muted>
        There is no table of contents section for tsx articles, so there is more
        width for content
      </Muted>

      <div className="rounded-lg bg-muted p-4">
        <H2 className="mb-2 text-2xl font-semibold">Interactive Features</H2>
        <Muted>
          TSX files can include interactive React components with state,
          effects, and event handlers.
        </Muted>

        <Button
          variant="default"
          size="default"
          onClick={() => alert('Button clicked')}
          className="my-4"
        >
          Button
        </Button>
      </div>
    </div>
  );
}

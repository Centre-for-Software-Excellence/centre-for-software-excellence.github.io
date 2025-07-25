import { valueToEstree } from 'estree-util-value-to-estree';
import Slugger from 'github-slugger';
import type { FootnoteReference, Root as MdastRoot, Paragraph } from 'mdast';
import { toString } from 'mdast-util-to-string';
import type { Node, Parent } from 'unist';
import { define } from 'unist-util-mdx-define';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';
import YAML from 'yaml';

const slugs = new Slugger();

export function remarkExtractTOC() {
  const maxDepth = 6;
  return (tree: MdastRoot, file: VFile) => {
    slugs.reset();
    const headings: { value: string; id: string; level: number }[] = [];

    visit(tree, 'heading', (node) => {
      const value = toString(node, { includeImageAlt: false });
      const slug = slugs.slug(value);

      if (node.depth <= maxDepth) {
        headings.push({
          value,
          id: slug,
          level: node.depth,
        });
      }
    });

    define(tree, file, {
      headings: valueToEstree(headings, { preserveReferences: true }),
    });
  };
}

export function remarkExtractFrontmatter() {
  return (tree: MdastRoot, file: VFile) => {
    let fmData: Record<string, any> = {};

    // Check if frontmatter already exists in file.data (processed by remark-frontmatter)
    if (file.data.frontmatter) {
      fmData = file.data.frontmatter as Record<string, any>;
    } else {
      // Fallback: look for yaml nodes
      visit(tree, 'yaml', (node: any) => {
        try {
          fmData = YAML.parse(node.value);
        } catch (e) {
          console.error('Failed to parse YAML:', e);
        }
      });
    }

    define(tree, file, {
      frontmatter: valueToEstree(fmData, { preserveReferences: true }),
    });
  };
}

export function remarkForceAllFootnotesAtStart() {
  return (tree: MdastRoot, _file: VFile) => {
    const footnoteDefinitions = new Map();
    const reallyUsedFootnotes = new Set<string>();

    tree.children.forEach((node) => {
      if (node.type === 'footnoteDefinition') {
        footnoteDefinitions.set(node.identifier, node);
      }
      findRealFootnoteReferences(node, reallyUsedFootnotes);
    });

    footnoteDefinitions.forEach((def, id) => {
      if (!reallyUsedFootnotes.has(id)) {
        def.data = def.data || {};
        def.data.hProperties = def.data.hProperties || {};
        def.data.hProperties.className = (
          def.data.hProperties.className || []
        ).concat(['footnote-no-backlink']);
      }
    });

    if (footnoteDefinitions.size > 0) {
      const hiddenParagraph: Paragraph = {
        type: 'paragraph',
        children: Array.from(footnoteDefinitions.keys()).map((id) => ({
          type: 'footnoteReference',
          identifier: id,
          label: id,
        })),
        data: {
          hProperties: {
            style:
              'display: none; height: 0; overflow: hidden; position: absolute; left: -9999px;',
            'aria-hidden': 'true',
          },
        },
      };

      tree.children.unshift(hiddenParagraph);
    }
  };
}

function findRealFootnoteReferences(node: Node, usedFootnotes: Set<string>) {
  if (node.type === 'footnoteReference') {
    usedFootnotes.add((node as FootnoteReference).identifier);
  }
  if ('children' in node) {
    const parent = node as Parent;
    for (const child of parent.children) {
      findRealFootnoteReferences(child, usedFootnotes);
    }
  }
}

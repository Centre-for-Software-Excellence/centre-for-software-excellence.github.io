import { writeFileSync } from 'fs';
import path from 'path';
import { glob } from 'glob';
import matter from 'gray-matter';
import MiniSearch from 'minisearch';

import { blogRecords } from '@/config/search/override-records';
// import records for tsx files mannually defined in config
import recordsTsx from '@/config/search/records.json';

export interface DocRecord {
  id: string;
  section: string; // section folder
  title: string; // frontmatter title
  description: string; //  frontmatter description
  headings?: string[]; // body headings
  tags?: string[]; // frontmatter tags
  slug: string; // for routing
}

const stripTags = (str: string) =>
  // remove anything like <...> or {...} in MDX
  str
    .replace(/<[^>]+>/g, '') // strip HTML/MDX tags
    .replace(/\{[^}]+\}/g, '') // strip MDX expressions
    .trim();

export function buildIndex() {
  const files = glob.sync('src/docs/**/**/*.mdx');
  const tsxFiles = glob.sync('src/docs/**/*.tsx');

  const records: DocRecord[] = files
    .filter((file) => !path.basename(file).startsWith('-'))
    .map((file) => {
      const { data, content } = matter.read(file);
      const relPath = path.relative('src/docs', file);
      console.log(`Processing: ${relPath}`);
      const isRoot = relPath === 'index.mdx';
      let [section] = isRoot ? ['Leaderboard'] : relPath.split(path.sep);
      const filename = relPath.replace(/\.mdx$/, '');
      const slug = '/docs/' + filename;
      section = section + ' / ' + slug.split('/').slice(-1)[0];

      const headings = Array.from(
        content.matchAll(/^(#{1,6})\s+(.*)$/gm),
        (m) => m[2].trim(),
      )
        .map(stripTags)
        .filter((h) => h.length > 0);

      return {
        id: slug,
        section: section
          .replace(/[-_]/g, ' ')
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        title: data.title || '',
        description: data.description || '',
        headings,
        tags: ['blog'].concat(data.category ?? []).concat(data.tags ?? []),
        slug,
      };
    });

  records.push(...recordsTsx);

  console.log('\n--- NOTE: ---');
  console.log(
    `Found ${tsxFiles.length} TSX files, these should be mannually added to miniSearch records. Append them in src/config/search/records.json`,
  );
  console.log(
    'TSX Files: ',
    tsxFiles.map((file) => path.relative('src/docs', file)),
  );

  const mini = new MiniSearch<DocRecord>({
    fields: ['title', 'description', 'headings', 'tags'],
    storeFields: [
      'slug',
      'title',
      'section',
      'tags',
      'headings',
      'description',
    ],
    searchOptions: { prefix: true, fuzzy: 0.2 },
  });
  mini.addAll(records);
  mini.addAll(blogRecords());

  writeFileSync('public/search/index.json', JSON.stringify(mini), 'utf-8');
  writeFileSync('public/search/records.json', JSON.stringify(records), 'utf-8');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('Building index for searching documents...');
  buildIndex();
  console.log('Build index process completed ✔️\n');
}

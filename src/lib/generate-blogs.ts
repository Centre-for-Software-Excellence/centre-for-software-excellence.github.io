import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

import { Blog } from '@/components/home/blog-card';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface BlogFrontmatter {
  title?: string;
  description?: string;
  excerpt?: string;
  date?: string | Date;
  category?: string;
  tags?: string[];
}

function generateTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.(mdx|md)$/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function generateBlogPath(filename: string): string {
  const slug = filename.replace('.mdx', '');
  return `/docs/blog/${slug}`;
}

function generateBlogs(): void {
  console.log('Generating blogs.json from docs/blog directory...');

  const blogsDir = join(__dirname, '../docs/blog');
  const outputDir = join(__dirname, '../../public/data');
  const outputFile = join(outputDir, 'blogs.json');

  try {
    const files = readdirSync(blogsDir).filter((file) => file.endsWith('.mdx'));
    console.log(`Found ${files.length} .mdx files`);

    const blogs: Blog[] = [];

    for (const filename of files) {
      if (
        filename === 'index.mdx' ||
        filename.startsWith('_') ||
        filename.startsWith('-')
      ) {
        console.log(`Skipping ${filename} (exclusion criteria)`);
        continue;
      }

      try {
        const filepath = join(blogsDir, filename);
        const content = readFileSync(filepath, 'utf-8');
        const { data: frontmatter } = matter(content) as {
          data: BlogFrontmatter;
        };

        const blog: Blog = {
          title: frontmatter.title || generateTitleFromFilename(filename),
          abstract: frontmatter.description || frontmatter.excerpt || '',
          date: frontmatter.date
            ? frontmatter.date instanceof Date
              ? frontmatter.date.toISOString().split('T')[0]
              : frontmatter.date.toString()
            : new Date().toISOString().split('T')[0],
          category: frontmatter.category || frontmatter.tags?.[0] || 'General',
          link: generateBlogPath(filename),
        };

        blogs.push(blog);
        console.log(`Processed: ${blog.title} (${blog.date})`);
      } catch (fileError) {
        const errorMessage =
          fileError instanceof Error ? fileError.message : 'Unknown error';
        console.warn(`Error processing ${filename}:`, errorMessage);
      }
    }

    blogs.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );

    try {
      mkdirSync(outputDir, { recursive: true });
    } catch (dirError) {
      console.warn('Warning: Could not create output directory:', dirError);
    }

    writeFileSync(outputFile, JSON.stringify(blogs, null, 2), 'utf-8');

    console.log(`\n Generated blogs.json with ${blogs.length} blogs`);
    console.log(` Output: ${outputFile}`);

    console.log('\n Summary by category:');
    const categories: Record<string, number> = {};
    blogs.forEach((blog) => {
      categories[blog.category] = (categories[blog.category] || 0) + 1;
    });

    Object.entries(categories).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} blog(s)`);
    });

    console.log('\n Recent blogs:');
    blogs.slice(0, 3).forEach((blog) => {
      console.log(`   ${blog.date}: ${blog.title}`);
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(' Error generating blogs.json:', errorMessage);
    process.exit(1);
  }
}

generateBlogs();

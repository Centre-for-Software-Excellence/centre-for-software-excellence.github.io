import path from 'path';
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import type { Element } from 'hast';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import frontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { defineConfig } from 'vite';

import {
  remarkExtractFrontmatter,
  remarkExtractTOC,
  remarkForceAllFootnotesAtStart,
} from './src/lib/docs/mdx-plugins';

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          lucide: ['lucide-react'],
          gsap: ['gsap'],
        },
      },
    },
  },
  plugins: [
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkForceAllFootnotesAtStart,
        remarkMath,
        frontmatter,
        remarkExtractFrontmatter,
        remarkExtractTOC,
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        [
          rehypePrettyCode,
          {
            theme: 'github-dark',
            bypassInlineCode: true,
            keepBackground: false,
            defaultLang: 'plaintext',
            onVisitLine(node: Element) {
              if (!node.children?.length) {
                node.children = [{ type: 'text', value: ' ' }];
              }
            },
            onVisitHighlightedLine(node: Element) {
              const raw = node.properties?.className;
              const arr = Array.isArray(raw) ? [...raw] : [];
              arr.push('line--highlighted');
              node.properties = { ...node.properties, className: arr };
            },
            onVisitHighlightedWord(node: Element) {
              node.properties = {
                ...node.properties,
                className: ['word--highlighted'],
              };
            },
          },
        ],
      ],
      providerImportSource: '@mdx-js/react',
    }),

    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

const tsxModules = import.meta.glob('/src/docs/**/*.tsx');
const mdxModules = import.meta.glob('/src/docs/**/*.mdx');

export interface ResolvedDoc {
  type: 'tsx' | 'mdx';
  path: string;
  module?: any;
}

export async function resolveDocFromSlug(
  slug: string[],
): Promise<ResolvedDoc | null> {
  const slugPath = slug.length === 0 ? 'index' : slug.join('/');

  // disabled docs
  if (slugPath.split('/').slice(-1)[0].startsWith('-')) {
    return null;
  }

  // mdx files
  const mdxPath = `/src/${slugPath}.mdx`;
  if (mdxModules[mdxPath]) {
    return {
      type: 'mdx',
      path: mdxPath,
    };
  }

  // tsx files
  const tsxPath = `/src/${slugPath}.tsx`;
  if (tsxModules[tsxPath]) {
    const module = await tsxModules[tsxPath]();
    return {
      type: 'tsx',
      path: tsxPath,
      module,
    };
  }

  // index.tsx and index.mdx
  const indexTsxPath = `/src/${slugPath}/index.tsx`;
  if (tsxModules[indexTsxPath]) {
    const module = await tsxModules[indexTsxPath]();
    return {
      type: 'tsx',
      path: indexTsxPath,
      module,
    };
  }
  const indexMdxPath = `/src/${slugPath}/index.mdx`;
  if (mdxModules[indexMdxPath]) {
    return {
      type: 'mdx',
      path: indexMdxPath,
    };
  }

  return null;
}

export function getSlugFromPath(pathname: string): string[] {
  return pathname.split('/').filter(Boolean);
}

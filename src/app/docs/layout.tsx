import { useState } from 'react';

import { Footer } from '@/components/docs/footer';
import { DocsSidebar } from '@/components/docs/sidebar';
import { TopBar } from '@/components/docs/top-bar';
import { TableOfContent } from '@/components/md/table-of-content';

interface LayoutProps {
  children: React.ReactNode;
  isArticle?: boolean;
  loading?: boolean;
  showSidebar?: boolean;
  showFooter?: boolean;
}

export default function Layout({
  children,
  isArticle = true,
  loading = false,
  showSidebar = true,
  showFooter = true,
}: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="relative w-full">
      {/* Top Bar */}
      <TopBar
        menuOpen={menuOpen}
        menuOnClickAction={setMenuOpen}
        showSidebar={showSidebar}
      />
      {/* Main docs content */}
      <div className="relative mx-auto min-h-[calc(100vh-theme(spacing.12)-theme(spacing.32))] max-w-screen md:flex md:flex-row">
        {/* Left Sidebar - Sections Navigation */}
        <DocsSidebar
          showSidebar={showSidebar}
          loading={loading}
          menuOpen={menuOpen}
          onClickAction={setMenuOpen}
        />
        {/* article */}
        {children}
        {/* Right Sidebar - Table of Contents of current markdown doc*/}
        {isArticle && <TableOfContent className="w-full" />}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

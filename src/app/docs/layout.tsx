import { Footer } from '@/components/docs/footer';
import { DocsSidebar } from '@/components/docs/sidebar';
import { TopBar } from '@/components/docs/top-bar';
import { TableOfContent } from '@/components/md/table-of-content';
import { useUIStore } from '@/stores/ui';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const showToc = useUIStore((state) => state.showToc);
  const showFooter = useUIStore((state) => state.showFooter);
  return (
    <div className="relative w-full pt-12">
      {/* Top Bar */}
      <TopBar />
      {/* Main docs content */}
      <div className="relative mx-auto min-h-[calc(100vh-theme(spacing.12)-theme(spacing.32))] max-w-screen md:flex md:flex-row">
        {/* Left Sidebar - Sections Navigation */}
        <DocsSidebar />
        {/* article */}
        {children}
        {/* Right Sidebar - Table of Contents of current markdown doc*/}
        {showToc && <TableOfContent className="w-full" />}
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

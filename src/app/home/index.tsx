import { Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router';

import { BlogsSkeleton, ResearchSkeleton } from '@/components/common/skeleton';
import { Button } from '@/components/common/ui/button';
import { Divider } from '@/components/common/ui/divider';
import { UnderlineLink } from '@/components/common/underline-link';
import { Footer } from '@/components/docs/footer';
import { BlogCard } from '@/components/home/blog-card';
import { CollaboratorCard } from '@/components/home/collaborator-card';
import { ResearchCard } from '@/components/home/research-card';
import { getHomeConfig } from '@/config/home';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { usePublications } from '@/hooks/use-publications';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/ui';
import { CenterFlowGrid } from '../../components/visuals/center-flow-grid';
import Layout from '../docs/layout';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export interface ResearchSection {
  base: string;
  title: string;
  description: string;
  viewAll: string;
}

function LatestResearchSection({
  researchSection,
}: {
  researchSection: ResearchSection;
}) {
  const publications = usePublications();
  const { base, title, description, viewAll } = researchSection;

  return (
    <section className="w-full overflow-visible">
      <div className="relative mx-auto mt-16 flex max-w-4xl flex-col justify-center px-8 text-start">
        <div className="item-start flex justify-between">
          <h2 className="mb-4 h-8 text-xl font-bold md:text-2xl">{title}</h2>
          <UnderlineLink
            href={base}
            className="flex h-8 items-center"
            aria-label="View all research"
          >
            <span className="flex items-center gap-2">
              {viewAll} <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </UnderlineLink>
        </div>
        <p className="mb-8 text-base text-muted-foreground">{description}</p>
      </div>
      <div className="relative mx-auto max-w-4xl">
        <div className="flex w-full flex-col items-center gap-4 p-8 md:px-8">
          {publications.slice(0, 3).map((pub, idx) => (
            <ResearchCard key={'research-' + idx} pub={pub} isArticle={true} />
          ))}
          <div className="flex w-full justify-end pr-12">
            <Link to={base} aria-label="View all research">
              <MoreHorizontal className="h-6 w-6 text-muted-foreground transition-all duration-300 ease-in-out hover:scale-120 hover:text-foreground dark:hover:text-active" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export interface BlogsSection {
  base: string;
  title: string;
  description: string;
  viewAll: string;
}

function LatestBlogsSection({ blogsSection }: { blogsSection: BlogsSection }) {
  const blogs = useBlogPosts();
  const { base, title, description, viewAll } = blogsSection;
  const blogRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!blogRef.current || !containerRef.current) return;
    const trigger = ScrollTrigger.create({
      scrub: 1,
      pin: true,
      trigger: blogRef.current,
      start: 'top top+=48',
      end: () => {
        if (containerRef.current && blogRef.current) {
          const containerHeight = containerRef.current.offsetHeight;
          const scrollDistance = containerHeight - blogRef.current.clientHeight;
          return `+=${scrollDistance}`;
        }
        return '+=400';
      },
    });
    const tl = gsap.timeline({
      trigger,
    });
    return () => {
      tl.kill();
      trigger.kill();
    };
  }, []);

  return (
    <section className="z-99 w-full overflow-hidden">
      <Divider className="animate-expand-x" />
      <div className="relative mx-auto mt-16 flex max-w-4xl flex-col justify-center px-8 text-start">
        <div className="item-start flex justify-between">
          <h2 className="mb-4 h-8 text-xl font-bold md:text-2xl">{title}</h2>
          <UnderlineLink
            href={base}
            className="flex h-8 items-center"
            aria-label="View all blogs"
          >
            <span className="flex items-center gap-2">
              {viewAll} <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </UnderlineLink>
        </div>
        <p className="mb-8 text-base text-muted-foreground">{description}</p>
      </div>
      <div className="mx-auto max-w-4xl">
        <div
          className={cn(
            'grid max-w-4xl grid-cols-1 justify-items-center gap-4 p-4',
            blogs.length < 3
              ? 'px-8 md:grid-cols-1 md:grid-rows-1'
              : 'md:grid-cols-2 md:grid-rows-1',
          )}
        >
          {blogs.length > 0 && (
            <div className="relative w-full md:w-96" ref={containerRef}>
              <div className="w-full" ref={blogRef}>
                <BlogCard
                  key="blog-0"
                  clamp={true}
                  blog={blogs[0]}
                  className={cn(blogs.length < 3 ? 'w-full' : 'md:w-96')}
                />
              </div>
            </div>
          )}

          <div className="flex w-full flex-col justify-between gap-4 md:w-96">
            {blogs.slice(1, 3).map((blog, idx) => (
              <BlogCard blog={blog} key={'blog-' + (idx + 1)} clamp={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CollaboratorsSection({
  collaborators,
  collaboratorsTitle,
}: {
  collaborators: any[];
  collaboratorsTitle: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const items = [...collaborators, ...collaborators];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!lastTime) lastTime = currentTime;
      const deltaTime = currentTime - lastTime;

      if (!isPaused) {
        setScrollPosition((prev) => {
          const speed = 0.1;
          const newPosition = prev + speed * deltaTime;
          const maxScroll = scrollContainer.scrollWidth / 2;

          if (newPosition >= maxScroll) {
            return newPosition - maxScroll + deltaTime;
          }
          return newPosition;
        });
      }

      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.scrollLeft = scrollPosition;
  }, [scrollPosition]);

  return (
    <section className="w-full py-20">
      <div className="relative">
        <div className="mx-auto mb-12 max-w-6xl px-8">
          <h1 className="relateive w-full rounded-lg pt-4 text-xl font-bold md:p-4 md:text-2xl">
            <span className="text-zinc-400 dark:text-active">Our </span>
            {collaboratorsTitle}
          </h1>
        </div>
        <div
          ref={scrollRef}
          className="scrollbar-hide overflow-x-hidden overflow-y-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div className="flex w-max gap-6 px-8 py-8">
            {items.map((collaborator, index) => (
              <CollaboratorCard
                key={`collaborator-${index}`}
                collaborator={collaborator}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  const { collaborators, researchSection, blogsSection, collaboratorsTitle } =
    getHomeConfig();
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const collaboratorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Create ScrollSmoother with more subtle smoothing
    const smoother = ScrollSmoother.create({
      wrapper: containerRef.current,
      content: containerRef.current?.firstElementChild as HTMLElement,
      smooth: 1.5, // Increased scroll delay
      effects: true,
      normalizeScroll: true, // Better cross-browser compatibility
    });

    // Fixed background parallax effect - continuous downward movement
    if (backgroundRef.current && document) {
      // document.body.clientHeight - 128,
      gsap.to(backgroundRef.current, {
        // body height - footer height (leave it on top of footer)
        y:
          document.body.scrollHeight -
          128 -
          backgroundRef.current.clientHeight / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'max',
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: -1,
        },
      });
    }

    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: 86,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: '48px top',
          end: '+=348',
          scrub: 1,
        },
      });
    }

    if (collaboratorsRef.current) {
      ScrollTrigger.refresh();
      gsap.fromTo(
        collaboratorsRef.current,
        { y: 150 },
        {
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: collaboratorsRef.current,
            start: 'top bottom',
            end: `+=${collaboratorsRef.current.clientHeight - 128}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }

    return () => {
      smoother.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const setShowSidebar = useUIStore((state) => state.setShowSidebar);
  const setShowFooter = useUIStore((state) => state.setShowFooter);
  const setShowToc = useUIStore((state) => state.setShowToc);

  useEffect(() => {
    setShowSidebar(false);
    // NOTE: the reason why we set showFooter to be false is that we need to add a footer here so the gsap absolute positioning works correctly, otherwise the footer from layout will be positioned weirdly on the page
    setShowFooter(false);
    setShowToc(false);
  }, [setShowSidebar, setShowFooter, setShowToc]);

  return (
    <Layout>
      <div ref={containerRef} className="min-h-screen w-full overflow-x-hidden">
        <div>
          {/* About Section */}
          <section className="relative flex items-center pt-[156px] pb-[100px] md:pt-[306px]">
            <CenterFlowGrid
              ref={backgroundRef}
              className="fixed top-0 left-0"
            />
            <div
              ref={titleRef}
              className="relative z-10 container mx-auto flex flex-1 flex-col items-center justify-center px-4"
            >
              <div className="mx-auto max-w-4xl text-center">
                <h1 className="my-6 text-3xl font-bold text-foreground md:text-5xl">
                  for Software Excellence
                </h1>
                <p className="relative mx-auto mb-12 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-xl">
                  <span
                    className="absolute inset-0 -z-1 bg-radial from-background via-background/10 to-transparent"
                    aria-hidden
                  />
                  We are a team of researchers and innovators passionate about
                  exploring the frontiers of artificial intelligence and
                  software engineering.
                </p>
                <div className="relative mx-auto flex max-w-lg flex-col justify-center gap-6 sm:flex-row">
                  <Button className="left-0 rounded-full bg-foreground px-8 py-4 text-lg text-background transition-all duration-300 hover:scale-110 hover:border hover:border-foreground hover:bg-background hover:text-foreground sm:absolute">
                    <Link
                      aria-label="View Research"
                      to="/docs/research"
                      className="flex items-center hover:no-underline"
                    >
                      View Research <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="right-0 rounded-full bg-transparent px-8 py-4 text-lg sm:absolute"
                    aria-label="Open Positions"
                  >
                    <Link
                      aria-label="Open Positions"
                      to="https://huaweicanada.recruitee.com/?jobs-7d390cc9%5Bcity%5D%5B%5D=Kingston"
                      className="flex items-center hover:no-underline"
                    >
                      Open Positions
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <div className="relative h-auto w-full">
            {/* blogs section */}
            <Suspense fallback={<BlogsSkeleton />}>
              <LatestBlogsSection blogsSection={blogsSection} />
            </Suspense>
            {/* research section */}
            <Suspense fallback={<ResearchSkeleton />}>
              <LatestResearchSection researchSection={researchSection} />
            </Suspense>
          </div>
          {/* Collaborators Section */}
          <div className="h-[34rem] w-full" ref={collaboratorsRef}>
            <CollaboratorsSection
              collaborators={collaborators}
              collaboratorsTitle={collaboratorsTitle}
            />
          </div>
          <Footer />
        </div>
      </div>
    </Layout>
  );
}

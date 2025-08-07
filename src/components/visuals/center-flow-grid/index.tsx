import React, { forwardRef, useEffect, useMemo } from 'react';

import { useTheme } from '@/components/common/theme-provider';
import { cn } from '@/lib/utils';
import { CenterCircle, Grid, GridPath, SVGDefs } from './components';
import {
  calculateGridConfig,
  generateRandomPath,
  GRADIENT_CONFIGS,
} from './utils';

// Global configuration
const CENTER_POINT = { x: 5, y: 4 };
const GRID_DIMENSIONS = { width: 19, height: 11 };
const GRID_SIZE = 50;
const SVG_WIDTH = 1200;
const SVG_HEIGHT = 800;

const gridConfig = calculateGridConfig(
  CENTER_POINT,
  GRID_DIMENSIONS,
  GRID_SIZE,
  SVG_WIDTH,
  SVG_HEIGHT,
);

export const CenterFlowGrid = forwardRef<
  HTMLDivElement,
  { className?: string }
>(({ className }, ref) => {
  const [scrollY, setScrollY] = React.useState(0);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const scrollProgress =
    scrollY / (document.documentElement.scrollHeight - window.innerHeight);

  const { foregroundStops, initStops, xDirection } = GRADIENT_CONFIGS(
    theme.theme === 'dark',
  );

  const inPaths = useMemo(
    () => [
      generateRandomPath({ x: 0, y: 0 }, CENTER_POINT, GRID_DIMENSIONS),
      generateRandomPath({ x: 0, y: 10 }, CENTER_POINT, GRID_DIMENSIONS),
      generateRandomPath({ x: 0, y: 5 }, CENTER_POINT, GRID_DIMENSIONS),
      generateRandomPath({ x: 0, y: 9 }, CENTER_POINT, GRID_DIMENSIONS),
      generateRandomPath({ x: 3, y: 0 }, CENTER_POINT, GRID_DIMENSIONS),
      generateRandomPath({ x: 3, y: 10 }, CENTER_POINT, GRID_DIMENSIONS),
    ],
    [],
  );

  const outPaths = useMemo(
    () => [
      generateRandomPath(CENTER_POINT, { x: 7, y: 0 }, GRID_DIMENSIONS),
      generateRandomPath(CENTER_POINT, { x: 17, y: 0 }, GRID_DIMENSIONS),
      generateRandomPath(CENTER_POINT, { x: 18, y: 9 }, GRID_DIMENSIONS),
      generateRandomPath(CENTER_POINT, { x: 15, y: 10 }, GRID_DIMENSIONS),
      generateRandomPath(CENTER_POINT, { x: 15, y: 10 }, GRID_DIMENSIONS),
      generateRandomPath(CENTER_POINT, { x: 18, y: 5 }, GRID_DIMENSIONS),
      generateRandomPath(CENTER_POINT, { x: 18, y: 0 }, GRID_DIMENSIONS),
      generateRandomPath(CENTER_POINT, { x: 18, y: 0 }, GRID_DIMENSIONS),
      generateRandomPath(CENTER_POINT, { x: 17, y: 7 }, GRID_DIMENSIONS),
    ],
    [],
  );

  return (
    <div className={cn('h-screen w-screen', className)} ref={ref}>
      <svg
        className={cn(
          `absolute h-[600px] -translate-x-1/2 sm:h-[800px] md:top-12`,
          'left-1/2',
        )}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      >
        <SVGDefs />

        <GridPath
          strokeWidth={1}
          gridOrigin={gridConfig.origin}
          pathId="initial-right"
          coordinates={[
            { x: CENTER_POINT.x + 1, y: CENTER_POINT.y },
            { x: GRID_DIMENSIONS.width - 1, y: CENTER_POINT.y },
          ]}
          gradientConfig={{
            stops: initStops,
            direction: xDirection,
            animation: {
              values: `${CENTER_POINT.x * 50 + 100} ${CENTER_POINT.y * 50}; ${(GRID_DIMENSIONS.width - 1) * 50 + 100} ${CENTER_POINT.y * 50}`,
              duration: '1s',
              repeatCount: '1',
            },
          }}
        />

        <Grid
          origin={gridConfig.origin}
          dimensions={gridConfig.dimensions}
          centerPoint={gridConfig.centerPoint}
          opacity={scrollY < 300 ? 0.3 : 0}
        />

        {/*Animated in paths:*/}
        {inPaths.map((path, index) => (
          <GridPath
            strokeWidth={2}
            key={`in-path-${index}`}
            gridOrigin={gridConfig.origin}
            pathId={`in-path-${index}`}
            coordinates={path}
            gradientConfig={{
              stops: foregroundStops,
              animation: {
                values: `${path[0].x * 50} ${path[0].y * 50}; ${CENTER_POINT.x * 50 + 100} ${CENTER_POINT.y * 50 + 100}`,
                duration: '4.5s',
                begin: `${index * 0.5}s`,
                repeatCount: 'indefinite',
              },
            }}
          />
        ))}

        {/*Animated out paths:*/}
        {outPaths.map((path, index) => (
          <GridPath
            strokeWidth={2}
            key={`out-path-${index}`}
            gridOrigin={gridConfig.origin}
            pathId={`out-path-${index}`}
            coordinates={path}
            gradientConfig={{
              stops: foregroundStops,
              direction: {
                x1: '0%',
                y1: '0%',
                x2: 200,
                y2: '0%',
              },
              animation: {
                values: `${CENTER_POINT.x * 50} ${CENTER_POINT.y * 50}; ${path[path.length - 1].x * 50 + 100} ${path[path.length - 1].y * 50 + 100}`,
                duration: '5.5s',
                begin: `${index * 0.5}s`,
                repeatCount: 'indefinite',
              },
            }}
          />
        ))}

        {scrollY < 300 && (
          <CenterCircle
            centerPoint={CENTER_POINT}
            gridOrigin={gridConfig.origin}
            gridSize={GRID_SIZE}
          />
        )}
      </svg>
      {/* a mask that add gradient to the grid so taht the border would be hidden*/}
      <span
        className="bg-radial-center-out pointer-events-none absolute"
        style={{
          left: '50%',
          top: '0',
          width: `${gridConfig.gridPixelWidth + GRID_SIZE * 2}px`,
          height: `${gridConfig.gridPixelHeight + GRID_SIZE * 2}px`,
          transform: `translate(-50%, -50%) translate(${gridConfig.origin.x + gridConfig.gridPixelWidth / 2 - SVG_WIDTH / 2}px, ${gridConfig.origin.y + gridConfig.gridPixelHeight / 2}px)`,
        }}
      />
      {/* Centre keyword */}
      <span
        className={cn(
          'absolute left-[calc(50%+200px)] -translate-y-[86px] text-5xl font-bold text-gradient-start xs:text-7xl md:left-1/2',
          '-top-4 xs:-top-12 sm:-top-18 md:top-24',
        )}
        style={{
          transform: `translate(-50%, 50%) translate(${gridConfig.origin.x + CENTER_POINT.x * GRID_SIZE - SVG_WIDTH / 2}px, ${gridConfig.origin.y + CENTER_POINT.y * GRID_SIZE}px)`,
        }}
      >
        <span
          style={{
            opacity: Math.max(0, scrollY < 300 ? 1 - (scrollProgress || 0) : 0),
          }}
          className="transition-opacity duration-500"
        >
          Centre
        </span>
      </span>
      <span
        className={cn(
          scrollY > 10
            ? 'fixed top-0 left-0 h-screen w-screen bg-background/10 backdrop-blur-xs transition-all duration-500 supports-[backdrop-filter]:bg-background/5'
            : 'absolute -inset-1 bg-background/30',
        )}
      />
    </div>
  );
});

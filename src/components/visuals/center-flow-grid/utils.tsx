import { Dimensions, Point } from './types';

export function generateRandomPath(
  start: Point,
  end: Point,
  gridDimensions: Dimensions = { width: 19, height: 11 },
): Point[] {
  const path = [{ ...start }];

  const horizontalSteps = Math.abs(end.x - start.x);
  const verticalSteps = Math.abs(end.y - start.y);

  const horizontalDirection = end.x > start.x ? 1 : -1;
  const verticalDirection = end.y > start.y ? 1 : -1;

  let currentPoint = { ...start };
  let remainingHorizontal = horizontalSteps;
  let remainingVertical = verticalSteps;

  while (remainingHorizontal > 0 || remainingVertical > 0) {
    let moveHorizontal = false;

    if (remainingHorizontal === 0) {
      moveHorizontal = false;
    } else if (remainingVertical === 0) {
      moveHorizontal = true;
    } else {
      moveHorizontal =
        Math.random() <
        gridDimensions.width / (gridDimensions.width + gridDimensions.height);
    }

    if (moveHorizontal) {
      currentPoint = {
        x: currentPoint.x + horizontalDirection,
        y: currentPoint.y,
      };
      remainingHorizontal--;
    } else {
      currentPoint = {
        x: currentPoint.x,
        y: currentPoint.y + verticalDirection,
      };
      remainingVertical--;
    }

    path.push({ ...currentPoint });
  }

  return path;
}

export function calculateGridConfig(
  centerPoint: Point,
  gridDimensions: Dimensions,
  gridSize: number = 50,
  svgWidth: number = 1200,
  svgHeight: number = 800,
) {
  const gridPixelWidth = (gridDimensions.width - 1) * gridSize;
  const gridPixelHeight = (gridDimensions.height - 1) * gridSize;

  const gridOrigin = {
    x: (svgWidth - gridPixelWidth) / 2, // Keep horizontal centering
    y: 48, // Position 48px from top (topbar height)
  };

  return {
    origin: gridOrigin,
    dimensions: gridDimensions,
    gridSize,
    svgWidth,
    svgHeight,
    centerPoint,
    gridPixelWidth,
    gridPixelHeight,
  };
}

export const GRADIENT_CONFIGS = {
  foregroundStops: [
    { offset: '0%', color: 'transparent' },
    { offset: '20%', color: 'var(--gradient-start)', opacity: 0.3 },
    { offset: '50%', color: 'var(--gradient-start)', opacity: 0.5 },
    { offset: '80%', color: 'var(--gradient-start)', opacity: 0.5 },
    { offset: '100%', color: 'transparent' },
  ],
  initStops: [
    { offset: '0%', color: 'transparent' },
    { offset: '20%', color: 'var(--gradient-start)', opacity: 0.5 },
    { offset: '50%', color: 'var(--gradient-start)', opacity: 1 },
    { offset: '80%', color: 'var(--gradient-start)', opacity: 0.5 },
    { offset: '100%', color: 'transparent' },
  ],
  yDirection: {
    x1: '0%' as const,
    y1: '0%' as const,
    x2: '0%' as const,
    y2: 400,
  },
  xDirection: {
    x1: '0%' as const,
    y1: '0%' as const,
    x2: 400,
    y2: '0%' as const,
  },
};


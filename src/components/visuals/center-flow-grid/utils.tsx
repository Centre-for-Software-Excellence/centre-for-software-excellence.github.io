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

  // Track turns and current direction
  let turnCount = 0;
  const maxTurns = Math.random() < 0.5 ? 2 : 3; // Randomly choose 2 or 3 turns
  let lastDirection: 'horizontal' | 'vertical' | null = null;

  while (remainingHorizontal > 0 || remainingVertical > 0) {
    let moveHorizontal = false;

    if (remainingHorizontal === 0) {
      moveHorizontal = false;
    } else if (remainingVertical === 0) {
      moveHorizontal = true;
    } else {
      // If we've reached max turns, continue in the same direction
      if (turnCount >= maxTurns) {
        moveHorizontal = lastDirection === 'horizontal';
      } else {
        // Original random logic, but track if this would be a turn
        const wouldMoveHorizontal =
          Math.random() <
          gridDimensions.width / (gridDimensions.width + gridDimensions.height);

        // Check if this would create a turn
        const wouldBeTurn =
          lastDirection !== null &&
          ((lastDirection === 'horizontal' && !wouldMoveHorizontal) ||
            (lastDirection === 'vertical' && wouldMoveHorizontal));

        if (wouldBeTurn && turnCount >= maxTurns) {
          // Don't turn, continue in same direction
          moveHorizontal = lastDirection === 'horizontal';
        } else {
          moveHorizontal = wouldMoveHorizontal;
          if (wouldBeTurn) {
            turnCount++;
          }
        }
      }
    }

    if (moveHorizontal) {
      currentPoint = {
        x: currentPoint.x + horizontalDirection,
        y: currentPoint.y,
      };
      remainingHorizontal--;
      lastDirection = 'horizontal';
    } else {
      currentPoint = {
        x: currentPoint.x,
        y: currentPoint.y + verticalDirection,
      };
      remainingVertical--;
      lastDirection = 'vertical';
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
    y: 0,
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

export const GRADIENT_CONFIGS = (dark: boolean) => {
  return {
    foregroundStops: [
      { offset: '0%', color: 'transparent' },
      {
        offset: '20%',
        color: 'var(--gradient-start)',
        opacity: dark ? 0.3 : 0.1,
      },
      {
        offset: '50%',
        color: 'var(--gradient-start)',
        opacity: dark ? 0.5 : 0.2,
      },
      {
        offset: '80%',
        color: 'var(--gradient-start)',
        opacity: dark ? 0.3 : 0.1,
      },
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
};

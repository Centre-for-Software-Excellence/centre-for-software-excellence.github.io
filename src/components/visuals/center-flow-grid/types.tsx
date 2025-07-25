export interface Point {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface GradientConfig {
  stops: Array<{
    offset: string;
    color: string;
    opacity?: number;
  }>;
  direction?: {
    x1: string | number;
    y1: string | number;
    x2: string | number;
    y2: string | number;
  };
  animation?: {
    values: string;
    duration: string;
    begin?: string;
    repeatCount?: string | number;
  };
}

export interface GridConfig {
  origin: Point;
  dimensions: Dimensions;
  gridSize: number;
  svgWidth: number;
  svgHeight: number;
  centerPoint: Point;
  gridPixelWidth: number;
  gridPixelHeight: number;
}

export interface GridProps {
  origin?: Point;
  dimensions?: Dimensions;
  gridSize?: number;
  centerPoint?: Point | null;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
}

export interface GridPathProps {
  coordinates: Point[];
  strokeColor?: string;
  strokeWidth?: number;
  gradientConfig?: GradientConfig;
  gridSize?: number;
  gridOrigin?: Point;
  pathId: string;
}


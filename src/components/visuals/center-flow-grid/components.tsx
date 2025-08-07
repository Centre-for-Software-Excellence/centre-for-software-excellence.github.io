import React from 'react';

import { GridPathProps, GridProps } from './types';

export function GridPath({
  coordinates,
  strokeColor = '#06b6d4',
  strokeWidth = 3,
  gradientConfig,
  gridSize = 50,
  gridOrigin = { x: 0, y: 0 },
  pathId,
}: GridPathProps) {
  const gradientId = `gradient-${pathId}`;

  // Convert grid coordinates to SVG coordinates
  const gridToSVG = (gridX: number, gridY: number) => ({
    x: gridOrigin.x + gridX * gridSize,
    y: gridOrigin.y + gridY * gridSize,
  });

  // Generate path string from coordinates
  const generatePath = () => {
    if (!coordinates || coordinates.length === 0) return '';

    let pathString = '';

    coordinates.forEach((coord, index) => {
      const svgCoord = gridToSVG(coord.x, coord.y);

      if (index === 0) {
        pathString += `M${svgCoord.x} ${svgCoord.y}`;
      } else {
        pathString += ` L${svgCoord.x} ${svgCoord.y}`;
      }
    });

    return pathString;
  };

  const pathData = generatePath();
  const stroke = gradientConfig ? `url(#${gradientId})` : strokeColor;

  const defaultDirection = {
    x1: '0%',
    y1: '0%',
    x2: 100,
    y2: '0%',
  };

  return (
    <>
      {gradientConfig && (
        <defs>
          <linearGradient
            id={gradientId}
            {...(gradientConfig.direction || defaultDirection)}
            gradientUnits="userSpaceOnUse"
          >
            {gradientConfig.stops.map((stop, index) => (
              <stop
                key={index}
                offset={stop.offset}
                stopColor={stop.color}
                stopOpacity={stop.opacity || 1}
              />
            ))}
            {gradientConfig.animation && (
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values={gradientConfig.animation.values}
                dur={gradientConfig.animation.duration}
                begin={gradientConfig.animation.begin || '0s'}
                repeatCount={
                  gradientConfig.animation.repeatCount || 'indefinite'
                }
              />
            )}
          </linearGradient>
        </defs>
      )}
      <path
        d={pathData}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        opacity="0.8"
      />
    </>
  );
}

export function Grid({
  origin = { x: 50, y: 50 },
  dimensions = { width: 15, height: 6 },
  gridSize = 50,
  strokeColor = '#333',
  strokeWidth = 0.5,
  opacity = 0.3,
}: GridProps) {
  const { width, height } = dimensions;
  const { x: originX, y: originY } = origin;

  // Calculate grid boundaries
  const maxX = originX + (width - 1) * gridSize;
  const maxY = originY + (height - 1) * gridSize;

  // Generate vertical lines
  const verticalLines: React.ReactElement[] = [];
  for (let i = 0; i < width; i++) {
    const x = originX + i * gridSize;
    const y1 = originY - gridSize;
    const y2 = maxY;

    verticalLines.push(<line key={`v-${i}`} x1={x} y1={y1} x2={x} y2={y2} />);
  }

  // Generate horizontal lines
  const horizontalLines: React.ReactElement[] = [];
  for (let i = 0; i < height; i++) {
    const y = originY + i * gridSize;
    const x1 = originX - gridSize;
    const x2 = maxX + gridSize;

    horizontalLines.push(<line key={`h-${i}`} x1={x1} y1={y} x2={x2} y2={y} />);
  }

  return (
    <g stroke={strokeColor} strokeWidth={strokeWidth} opacity={opacity}>
      {verticalLines}
      {horizontalLines}
    </g>
  );
}

export function CenterCircle({
  centerPoint,
  gridOrigin,
  gridSize = 50,
}: {
  centerPoint: { x: number; y: number };
  gridOrigin: { x: number; y: number };
  gridSize?: number;
}) {
  return (
    <circle
      cx={gridOrigin.x + centerPoint.x * gridSize}
      cy={gridOrigin.y + centerPoint.y * gridSize}
      r="5"
      fill="var(--gradient-start)"
      opacity="1"
      filter="url(#glow)"
    >
      <animate
        attributeName="r"
        values="5;8;5"
        dur="2s"
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.7;1;0.7"
        dur="2s"
        repeatCount="indefinite"
      />
    </circle>
  );
}

export function SVGDefs() {
  return (
    <defs>
      <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

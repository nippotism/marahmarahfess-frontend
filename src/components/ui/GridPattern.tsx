import { useId } from "react";

interface GridPatternProps {
    width: number;
    height: number;
    x: string;
    y: string;
    squares?: number[][];
    gapSize?: number; // ✅ New prop to control spacing
  }
  
  export function GridPattern({
    width,
    height,
    x,
    y,
    squares = [],
    gapSize = 5, // ✅ Default gap of 5px
    ...props
  }: GridPatternProps) {
    const patternId = `grid-pattern-${useId()}`;
  
    return (
      <svg aria-hidden="true" {...props}>
        <defs>
          <pattern
            id={patternId}
            width={width + gapSize} // ✅ Adds gap to the pattern width
            height={height + gapSize} // ✅ Adds gap to the pattern height
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path d={`M.5 ${height}V.5H${width}`} fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        {squares.map(([sx, sy], index) => (
          <rect
            key={`${sx}-${sy}-${index}`}
            width={width}
            height={height}
            x={sx * (width + gapSize)} // ✅ Adds gap to X position
            y={sy * (height + gapSize)} // ✅ Adds gap to Y position
          />
        ))}
      </svg>
    );
  }
  
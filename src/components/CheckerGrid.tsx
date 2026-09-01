import React from "react";

const CheckerGrid: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = "",
  style,
}) => {
  const cellW = 3.8;
  const cellH = 3.8;
  const shift = 2.25;
  const cols = 3;
  const rows = 4;

  const rects: React.ReactElement[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = r % 2 === 1 ? c * cellW + shift : c * cellW;
      const y = r * cellH;
      rects.push(
        <rect
          key={`${r}-${c}`}
          x={x}
          y={y}
          width={cellW}
          height={cellH}
          fill="black"
        />
      );
    }
  }

  return (
    <svg
      viewBox="0 0 36 18"
      className={className}
      style={{ verticalAlign: "middle", display: "inline-block", ...style }}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
};

export default CheckerGrid;

import React from "react";

type CornerDir = "tl" | "tr" | "bl" | "br";

const paths: Record<CornerDir, string> = {
  tl: "M0 11.5V0.5H11.5",
  tr: "M0.5 0.5H11.5V11.5",
  bl: "M0 0.5V11.5H11.5",
  br: "M0.5 11.5H11.5V0.5",
};

interface LCornerProps {
  dir?: CornerDir;
  className?: string;
  style?: React.CSSProperties;
}

const LCorner: React.FC<LCornerProps> = ({ dir = "tl", className = "", style }) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className={className}
    style={style}
    aria-hidden="true"
  >
    <path d={paths[dir]} />
  </svg>
);

export default LCorner;

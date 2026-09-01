import React from "react";

const WireframeGlobe: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = "",
  style,
}) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.2}
    className={className}
    style={style}
    aria-hidden="true"
  >
    <circle cx="32" cy="32" r="28" />
    <ellipse cx="32" cy="32" rx="28" ry="10" />
    <ellipse cx="32" cy="32" rx="28" ry="20" />
    <line x1="32" y1="4" x2="32" y2="60" />
    <ellipse cx="32" cy="32" rx="10" ry="28" />
    <ellipse cx="32" cy="32" rx="20" ry="28" />
  </svg>
);

export default WireframeGlobe;

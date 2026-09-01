import { useEffect, useRef, useCallback } from "react";

const BG_IMAGE_1 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_074534_f0d9d476-3f86-4c67-9b12-dfc63d99da41.png&w=1920&q=85";

const BG_IMAGE_2 =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260802_075145_1b557479-775b-43af-8270-f45d79d97d5a.png&w=1920&q=85";

export default function ImageRevealBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const patternRef = useRef<SVGPatternElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothRef = useRef({ x: -9999, y: -9999 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const gridRef = useRef({ size: 48 });
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const smooth = smoothRef.current;
    const mouse = mouseRef.current;
    const offset = offsetRef.current;
    const canvas = canvasRef.current;
    const reveal = revealRef.current;
    const pattern = patternRef.current;

    smooth.x += (mouse.x - smooth.x) * 0.1;
    smooth.y += (mouse.y - smooth.y) * 0.1;

    if (canvas && reveal) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        const radius = Math.round(Math.min(420, Math.max(160, w * 0.16)));
        const grad = ctx.createRadialGradient(
          smooth.x,
          smooth.y,
          0,
          smooth.x,
          smooth.y,
          radius
        );
        grad.addColorStop(0, "rgba(255,255,255,1)");
        grad.addColorStop(0.4, "rgba(255,255,255,1)");
        grad.addColorStop(0.6, "rgba(255,255,255,0.75)");
        grad.addColorStop(0.75, "rgba(255,255,255,0.4)");
        grad.addColorStop(0.88, "rgba(255,255,255,0.12)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        const dataUrl = canvas.toDataURL();
        const maskStyle = `url(${dataUrl})`;
        reveal.style.maskImage = maskStyle;
        reveal.style.webkitMaskImage = maskStyle;
        reveal.style.maskSize = "100% 100%";
        reveal.style.webkitMaskSize = "100% 100%";
      }
    }

    if (pattern) {
      const cx = (smooth.x / window.innerWidth - 0.5);
      const cy = (smooth.y / window.innerHeight - 0.5);
      offset.x += (cx * 16 - offset.x) * 0.06;
      offset.y += (cy * 16 - offset.y) * 0.06;
      pattern.setAttribute("x", String(offset.x));
      pattern.setAttribute("y", String(offset.y));
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      gridRef.current.size = Math.round(
        Math.min(64, Math.max(36, window.innerWidth * 0.028))
      );
      if (patternRef.current) {
        const s = gridRef.current.size;
        patternRef.current.setAttribute(
          "width",
          String(s)
        );
        patternRef.current.setAttribute(
          "height",
          String(s)
        );
        const pathEl = patternRef.current.querySelector("path");
        if (pathEl) {
          pathEl.setAttribute("d", `M ${s} 0 L 0 0 0 ${s}`);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    handleResize();
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BG_IMAGE_1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Reveal layer (masked) */}
      <div
        ref={revealRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BG_IMAGE_2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Offscreen canvas for mask generation */}
      <canvas ref={canvasRef} className="hidden" />

      {/* SVG grid overlay */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.10 }}>
        <defs>
          <pattern
            ref={patternRef}
            id="grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#64748b"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}

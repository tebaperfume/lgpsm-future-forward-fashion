import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative z-10 w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Layer 1 — sky */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="https://soft-zoom-63098134.figma.site/_assets/v11/7af55796a90a26e2d57c9fa2a48815874023cff0.png"
          alt=""
          style={{ width: "100%", height: "120%", objectFit: "cover" }}
        />
      </motion.div>

      {/* Layer 2 — title */}
      <div
        className="absolute inset-0 z-10 flex items-start justify-center"
        style={{ paddingTop: "22vh" }}
      >
        <h1
          className="md:!pt-32 lg:!pt-36"
          style={{
            whiteSpace: "nowrap",
            textAlign: "center",
            fontSize: "clamp(3rem, 14vw, 14rem)",
            fontWeight: 600,
            lineHeight: 1,
            backgroundImage: "linear-gradient(to bottom, #A8B4FF, #FFFFFF)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            mixBlendMode: "lighten",
          }}
        >
          Galaxy{"\u00A0\u00A0"}Home
        </h1>
      </div>

      {/* Layer 3 — subtext */}
      <div
        className="hidden md:block absolute z-20 left-12 lg:left-24"
        style={{
          top: 320,
          mixBlendMode: "overlay",
          fontSize: 22,
          lineHeight: "24px",
          fontWeight: 500,
          color: "rgba(255,255,255,0.7)",
        }}
      >
        Elegance Above the Skyline
      </div>
      <div
        className="hidden md:block absolute z-20 right-12 lg:right-24"
        style={{
          top: 320,
          mixBlendMode: "overlay",
          fontSize: 22,
          lineHeight: "24px",
          fontWeight: 500,
          color: "#fff",
        }}
      >
        Your Dream Residence Starts Here
      </div>

      {/* Layer 4 — building */}
      <motion.div className="absolute inset-0 z-30 pointer-events-none" style={{ y: bgY }}>
        <img
          src="https://soft-zoom-63098134.figma.site/_assets/v11/644aba5492aa8bd5756bc5c6d65255d577b1aaf3.png"
          alt=""
          style={{ width: "100%", height: "120%", objectFit: "cover" }}
        />
      </motion.div>
    </section>
  );
}

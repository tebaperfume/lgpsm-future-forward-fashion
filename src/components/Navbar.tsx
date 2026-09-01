import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";

const links = ["Home", "About", "Estates", "Projects", "Inquire"];
const EASE = [0.25, 0.1, 0.25, 1] as const;

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="white" className={className} aria-hidden>
      <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" />
    </svg>
  );
}

function CtaButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-6 py-2 text-[15px] font-medium transition-transform hover:scale-105 ${className}`}
      style={{
        border: "1px solid rgba(255,255,255,0.8)",
        color: "rgba(39, 28, 64, 0.8)",
        textShadow: "0 1px 0 rgba(255,255,255,0.4)",
        backgroundImage:
          "linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.10) 76%), radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.7) 0%, transparent 100%)",
        backgroundColor: "#BEC7FF",
      }}
    >
      Get in touch
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const ids = links.map((l) => l.toLowerCase());
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] flex justify-center p-4 md:px-6">
        <nav
          className="flex items-center gap-4 md:gap-8 lg:gap-20 rounded-full py-3 px-4"
          style={{
            background: "rgba(49, 45, 124, 0.4)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
          }}
        >
          <button onClick={() => go("home")} className="flex items-center gap-2">
            <BrandMark className="w-6 h-6 md:w-7 md:h-7" />
            <span className="text-white font-medium text-base md:text-[20px]">Aether Lane</span>
          </button>

          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => {
              const id = l.toLowerCase();
              return (
                <li key={l}>
                  <button
                    onClick={() => go(id)}
                    className={`transition-colors ${
                      active === id ? "text-white" : "text-[#B6B8C3] hover:text-white"
                    }`}
                  >
                    {l}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <CtaButton onClick={() => go("inquire")} />
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden relative w-9 h-9"
          >
            <motion.span
              className="absolute left-2 h-[2px] w-5 rounded-full bg-white"
              animate={open ? { top: 17, rotate: 45 } : { top: 10, rotate: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <motion.span
              className="absolute left-2 top-[17px] h-[2px] w-5 rounded-full bg-white"
              animate={open ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
            <motion.span
              className="absolute left-2 h-[2px] w-5 rounded-full bg-white"
              animate={open ? { top: 17, rotate: -45 } : { top: 24, rotate: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-6 md:hidden"
            style={{
              background: "rgba(2, 3, 25, 0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {links.map((l, i) => (
              <motion.button
                key={l}
                onClick={() => go(l.toLowerCase())}
                initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  y: 20,
                  filter: "blur(4px)",
                  transition: { duration: 0.35, delay: (links.length - i) * 0.06, ease: EASE },
                }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.06, ease: EASE }}
                className="text-[30px] font-medium"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {l}
              </motion.button>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              transition={{ duration: 0.35, delay: 0.1 + links.length * 0.06, ease: EASE }}
            >
              <CtaButton onClick={() => go("inquire")} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

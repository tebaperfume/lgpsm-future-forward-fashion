import { Instagram, Linkedin, Twitter, ArrowUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { scrollToId } from "@/lib/scroll";

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="white" className={className} aria-hidden>
      <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" />
    </svg>
  );
}

const cols = [
  {
    title: "Explore",
    links: [
      { label: "Home", target: "home" },
      { label: "Estates", target: "estates" },
      { label: "Projects", target: "projects" },
      { label: "About", target: "about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Careers", target: "inquire" },
      { label: "Press", target: "stats" },
      { label: "Journal", target: "amenities" },
      { label: "Contact", target: "inquire" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", target: "inquire" },
      { label: "Terms", target: "inquire" },
      { label: "Cookies", target: "inquire" },
      { label: "Licenses", target: "inquire" },
    ],
  },
];

const socials = [
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const join = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setEmail("");
    toast.success("You're on the private list", { description: "Expect our next release first." });
  };

  return (
    <footer className="relative bg-black px-6 md:px-12 lg:px-24 pt-24 pb-10" style={{
      borderTop: "1px solid rgba(255,255,255,0.06)"
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <button onClick={() => scrollToId("home")} className="flex items-center gap-2">
              <BrandMark className="w-8 h-8" />
              <span className="text-white font-medium text-xl">Aether Lane</span>
            </button>
            <p className="mt-6 text-white/50 max-w-sm leading-relaxed">
              A house of architecture and hospitality, composing residences above the skyline since 2001.
            </p>
            <div className="mt-8">
              <label htmlFor="footer-email" className="text-white/60 text-sm mb-3 block">Join our private list</label>
              <form className="flex gap-2 max-w-sm" onSubmit={join}>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@address.com"
                  className="flex-1 rounded-full px-5 py-3 text-white placeholder-white/30 outline-none text-sm"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
                <button
                  type="submit"
                  className="rounded-full px-5 text-sm font-medium"
                  style={{
                    border: "1px solid rgba(255,255,255,0.8)",
                    color: "rgba(39, 28, 64, 0.9)",
                    backgroundColor: "#BEC7FF",
                  }}
                >Join</button>
              </form>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-white font-medium mb-5">{c.title}</div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => scrollToId(l.target)}
                      className="text-white/50 hover:text-white transition-colors text-sm"
                    >{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="text-white/40 text-sm">© 2026 Aether Lane. All rights reserved.</div>
          <div className="flex items-center gap-4">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <Icon className="w-4 h-4 text-white/70" />
              </a>
            ))}
            <button
              onClick={() => scrollToId("home")}
              aria-label="Back to top"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <ArrowUp className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

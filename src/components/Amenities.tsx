import { motion } from "framer-motion";
import { Sparkles, Waves, Trees, Dumbbell, Wine, ConciergeBell } from "lucide-react";

const items = [
  { icon: ConciergeBell, title: "24/7 Concierge", desc: "A dedicated team anticipating every need." },
  { icon: Waves, title: "Infinity Pools", desc: "Rooftop waters that meet the horizon." },
  { icon: Trees, title: "Sky Gardens", desc: "Private botanical retreats in the clouds." },
  { icon: Dumbbell, title: "Wellness Suites", desc: "Spa, sauna, and private training studios." },
  { icon: Wine, title: "Private Cellars", desc: "Temperature-controlled vaults for connoisseurs." },
  { icon: Sparkles, title: "Bespoke Interiors", desc: "Curated by world-renowned atéliers." },
];

export default function Amenities() {
  return (
    <section id="amenities" className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(143,158,255,0.12), transparent 60%), #020319"
      }} />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#8F9EFF] uppercase tracking-[0.3em] text-xs font-medium">Amenities</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-white leading-tight">
            An orchestrated way of living
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-8 rounded-2xl"
                style={{
                  background: "rgba(49, 45, 124, 0.15)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{
                  background: "rgba(143,158,255,0.15)",
                }}>
                  <Icon className="w-6 h-6 text-[#8F9EFF]" />
                </div>
                <div className="text-white text-xl font-semibold">{it.title}</div>
                <div className="text-white/50 mt-2 text-sm leading-relaxed">{it.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { selectEstate } from "@/lib/scroll";

const projects = [
  { name: "Orion Heights", status: "Now Selling", year: "2025", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80" },
  { name: "Lyra Sky Villas", status: "Coming Soon", year: "2026", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" },
  { name: "Vega Estates", status: "Completed", year: "2024", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80" },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#8F9EFF] uppercase tracking-[0.3em] text-xs font-medium">Portfolio</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-white leading-tight">
            Projects redefining skylines
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              role="button"
              tabIndex={0}
              onClick={() => selectEstate(p.name)}
              onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selectEstate(p.name); } }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-4" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-white text-xl font-semibold">{p.name}</div>
                  <div className="text-white/50 text-sm mt-1">{p.status}</div>
                </div>
                <div className="text-[#8F9EFF] text-sm">{p.year}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

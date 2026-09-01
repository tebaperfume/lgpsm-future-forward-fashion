import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { selectEstate } from "@/lib/scroll";

const estates = [
  {
    name: "Celestia Tower",
    location: "Manhattan Skyline",
    price: "From $8.4M",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80",
  },
  {
    name: "Aurora Residences",
    location: "Beverly Hills",
    price: "From $12.2M",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80",
  },
  {
    name: "Nova Penthouse",
    location: "Dubai Marina",
    price: "From $15.6M",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
  },
  {
    name: "Zenith Villa",
    location: "Côte d'Azur",
    price: "From $22M",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80",
  },
];

export default function Estates() {
  return (
    <section id="estates" className="relative py-32 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[#8F9EFF] uppercase tracking-[0.3em] text-xs font-medium">Featured estates</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-white leading-tight">
              Signature residences
            </h2>
          </div>
          <p className="max-w-md text-white/60">
            A curated portfolio of the world's most exceptional homes — each one a private universe.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {estates.map((e, i) => (
            <motion.div
              key={e.name}
              role="button"
              tabIndex={0}
              onClick={() => selectEstate(e.name)}
              onKeyDown={(ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selectEstate(e.name); } }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <img
                src={e.img}
                alt={e.name}
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(to top, rgba(2,3,25,0.9), transparent 55%)"
              }} />
              <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between">
                <div>
                  <div className="text-white/60 text-sm">{e.location}</div>
                  <div className="text-white text-2xl md:text-3xl font-semibold mt-1">{e.name}</div>
                  <div className="text-[#8F9EFF] text-sm mt-2">{e.price}</div>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:rotate-45"
                  style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

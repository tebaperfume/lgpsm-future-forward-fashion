import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const items = [
  {
    quote: "Aether Lane didn't sell us a home — they composed a life. Every sunrise feels like a private commission.",
    name: "Isabella Moreau",
    role: "Owner, Celestia Tower",
  },
  {
    quote: "The attention to detail is unmatched. From the marble grain to the concierge's memory for our preferences.",
    name: "Rafael Okonkwo",
    role: "Owner, Aurora Residences",
  },
  {
    quote: "We've owned properties across three continents. None have felt as considered as our Nova penthouse.",
    name: "Ayaka Tanaka",
    role: "Owner, Nova Penthouse",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-[#8F9EFF] uppercase tracking-[0.3em] text-xs font-medium">Voices</span>
          <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-white leading-tight">
            What residents say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 rounded-2xl flex flex-col"
              style={{
                background: "rgba(49, 45, 124, 0.15)",
                backdropFilter: "blur(15px)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <Quote className="w-8 h-8 text-[#8F9EFF] mb-6" />
              <p className="text-white/80 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-white font-medium">{t.name}</div>
                <div className="text-white/50 text-sm mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";

const stats = [
  { value: "$4.2B", label: "In transacted value" },
  { value: "1,200+", label: "Homes delivered" },
  { value: "42", label: "Global cities" },
  { value: "98%", label: "Client satisfaction" },
];

export default function Stats() {
  return (
    <section id="stats" className="relative py-24 px-6 md:px-12 lg:px-24" style={{
      background: "linear-gradient(180deg, #020319 0%, #0a0a2e 50%, #020319 100%)"
    }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-6xl font-semibold" style={{
              backgroundImage: "linear-gradient(to bottom, #A8B4FF, #FFFFFF)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}>{s.value}</div>
            <div className="mt-3 text-white/50 text-sm uppercase tracking-widest">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

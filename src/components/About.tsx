import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(143,158,255,0.15), transparent 60%), #020319"
      }} />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#8F9EFF] uppercase tracking-[0.3em] text-xs font-medium">Who we are</span>
          <h2 className="mt-6 text-4xl md:text-6xl font-semibold text-white leading-tight">
            Crafting horizons<br />worth calling home.
          </h2>
          <p className="mt-8 text-lg text-white/60 leading-relaxed">
            For over two decades, Aether Lane has redefined what it means to live above the ordinary.
            We build residences where architecture breathes with the sky, and every detail whispers permanence.
          </p>
          <div className="mt-10 flex gap-8">
            <div>
              <div className="text-4xl font-semibold text-white">25+</div>
              <div className="text-white/50 text-sm mt-1">Years of legacy</div>
            </div>
            <div>
              <div className="text-4xl font-semibold text-white">80</div>
              <div className="text-white/50 text-sm mt-1">Signature estates</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
            alt="Aether Lane residence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to top, rgba(2,3,25,0.7), transparent 50%)"
          }} />
        </motion.div>
      </div>
    </section>
  );
}

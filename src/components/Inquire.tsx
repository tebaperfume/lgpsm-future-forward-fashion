import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FormState = {
  name: string;
  email: string;
  phone: string;
  estate: string;
  message: string;
};

const empty: FormState = { name: "", email: "", phone: "", estate: "", message: "" };

export default function Inquire() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const name = (e as CustomEvent<string>).detail;
      setForm((f) => ({ ...f, estate: name }));
      setSent(false);
    };
    window.addEventListener("aether:select-estate", onSelect);
    return () => window.removeEventListener("aether:select-estate", onSelect);
  }, []);

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error("Please enter your full name.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return toast.error("Please enter a valid email address.");

    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm(empty);
      toast.success("Request received", {
        description: "A private advisor will reach out within 24 hours.",
      });
    }, 700);
  };

  return (
    <section id="inquire" className="relative py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(143,158,255,0.18), transparent 60%), #020319"
      }} />
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-[#8F9EFF] uppercase tracking-[0.3em] text-xs font-medium">Inquire</span>
        <h2 className="mt-4 text-4xl md:text-6xl font-semibold text-white leading-tight">
          Begin the conversation
        </h2>
        <p className="mt-6 text-white/60 text-lg">
          Share a few details and a private advisor will reach out within 24 hours.
        </p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          onSubmit={submit}
          className="mt-12 p-8 md:p-10 rounded-3xl text-left"
          style={{
            background: "rgba(49, 45, 124, 0.2)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Full name" placeholder="Jane Doe" value={form.name} onChange={set("name")} />
            <Field label="Email" type="email" placeholder="jane@example.com" value={form.email} onChange={set("email")} />
            <Field label="Phone" placeholder="+1 555 000 0000" value={form.phone} onChange={set("phone")} />
            <Field label="Estate of interest" placeholder="Celestia Tower" value={form.estate} onChange={set("estate")} />
          </div>
          <div className="mt-4">
            <label className="text-white/60 text-sm" htmlFor="inquire-message">Message</label>
            <textarea
              id="inquire-message"
              rows={4}
              value={form.message}
              onChange={(e) => set("message")(e.target.value)}
              placeholder="Tell us about your vision..."
              className="mt-2 w-full rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#8F9EFF] transition-colors resize-none"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full py-4 text-[15px] font-medium transition-transform hover:scale-[1.02] disabled:opacity-70"
            style={{
              border: "1px solid rgba(255,255,255,0.8)",
              color: "rgba(39, 28, 64, 0.9)",
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.10) 76%), radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.7) 0%, transparent 100%)",
              backgroundColor: "#BEC7FF",
            }}
          >
            {loading ? "Sending..." : sent ? "Thank you — we'll be in touch" : "Request a private consultation"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const id = `inquire-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label className="text-white/60 text-sm" htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#8F9EFF] transition-colors"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
      />
    </div>
  );
}

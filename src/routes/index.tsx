import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Estates from "@/components/Estates";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import Inquire from "@/components/Inquire";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aether Lane — Luxury Residences Above the Skyline" },
      {
        name: "description",
        content:
          "Aether Lane crafts ultra-luxury residences in the world's most coveted skylines. Explore our exclusive estates.",
      },
      { property: "og:title", content: "Aether Lane — Luxury Residences Above the Skyline" },
      {
        property: "og:description",
        content:
          "Aether Lane crafts ultra-luxury residences in the world's most coveted skylines.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Estates />
      <Stats />
      <Projects />
      <Amenities />
      <Testimonials />
      <Inquire />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
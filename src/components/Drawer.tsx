import { X, ChevronRight, Check } from "lucide-react";
import React from "react";

export type DrawerType = "shop" | "collections" | "journal" | "cart" | null;

export interface CartItem {
  title: string;
  price: string;
}

interface DrawerProps {
  type: DrawerType;
  onClose: () => void;
  cart: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (index: number) => void;
  onCheckout: () => void;
}

const shopItems = [
  { title: "CYBER-TEX OVERCOAT", price: "$850", tag: "LIMITED EDITION" },
  { title: "GEO-MESH TECH HOODIE", price: "$320", tag: "NEW DROP" },
  { title: "ORBITAL TAPERED TROUSERS", price: "$290", tag: "IN STOCK" },
  { title: "MODULAR ALL-WEATHER VEST", price: "$410", tag: "PRE-ORDER" },
];

const collections = [
  {
    num: "01",
    title: "SYNTHETIC HORIZONS",
    desc: "Ultra-durable weather-sealed fabrics with minimalist silhouette architecture.",
  },
  {
    num: "02",
    title: "KINETIC FORM",
    desc: "Ergonomic streetwear designed for maximum mobility and temperature equilibrium.",
  },
  {
    num: "03",
    title: "MONOCHROME ZERO",
    desc: "Pure black and white structural tailoring crafted from 100% recycled polymers.",
  },
];

const journal = [
  { date: "AUG 2026", title: "THE ARCHITECTURE OF NEXT-GEN TEXTILES", read: "4 MIN READ" },
  { date: "JUL 2026", title: "CIRCULAR DESIGN IN HIGH-END APPAREL", read: "6 MIN READ" },
  { date: "JUN 2026", title: "MINIMALISM AS A FUNCTIONAL STATEMENT", read: "3 MIN READ" },
];

const titles: Record<string, string> = {
  shop: "Catalog",
  collections: "Archive 2026",
  journal: "Editorial",
  cart: "Shopping Bag",
};

const subtitles: Record<string, string> = {
  shop: "Featured Garments",
  collections: "Season Lineup",
  journal: "Latest Dispatches",
  cart: "",
};

const Drawer: React.FC<DrawerProps> = ({ type, onClose, cart, onAdd, onRemove, onCheckout }) => {
  if (!type) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-xs"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className="fixed top-0 right-0 z-50 h-full bg-white border-l border-gray-200 overflow-y-auto font-jakarta"
        style={{
          maxWidth: "var(--drawer-max)",
          width: "100%",
          padding: "var(--drawer-pad)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-orbitron text-lg font-bold uppercase tracking-wider">
              {titles[type]}
            </h2>
            {subtitles[type] && (
              <p className="text-[var(--micro)] text-gray-500 uppercase tracking-[0.18em] mt-1">
                {subtitles[type]}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-black hover:opacity-50 transition-opacity"
            aria-label="Close"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {type === "shop" &&
            shopItems.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between py-3 border-b border-gray-100"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-[var(--micro)] text-gray-400 uppercase tracking-wider block">
                    {item.tag}
                  </span>
                  <span className="text-[var(--body)] font-medium uppercase tracking-wider block mt-1">
                    {item.title}
                  </span>
                  <span className="text-[var(--body)] text-gray-600 mt-0.5 block">
                    {item.price}
                  </span>
                </div>
                <button
                  onClick={() =>
                    onAdd({ title: item.title, price: item.price })
                  }
                  className="ml-4 text-[var(--micro)] uppercase tracking-[0.18em] font-medium border border-gray-300 px-3 py-1.5 rounded hover:bg-black hover:text-white transition-colors whitespace-nowrap"
                >
                  ADD
                </button>
              </div>
            ))}

          {type === "collections" &&
            collections.map((col) => (
              <div key={col.num} className="py-3 border-b border-gray-100">
                <span className="text-[var(--micro)] text-gray-400 uppercase tracking-wider block">
                  SERIES {col.num}
                </span>
                <span className="font-orbitron text-[var(--body)] font-semibold uppercase tracking-wider block mt-1">
                  — {col.title}
                </span>
                <p className="text-[var(--body)] text-gray-500 mt-1.5 leading-relaxed">
                  {col.desc}
                </p>
              </div>
            ))}

          {type === "journal" &&
            journal.map((entry) => (
              <div key={entry.date} className="py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-[var(--micro)] text-gray-400 uppercase tracking-wider">
                    {entry.date}
                  </span>
                  <span className="text-[var(--micro)] text-gray-300">|</span>
                  <span className="text-[var(--micro)] text-gray-500 uppercase tracking-wider">
                    {entry.read}
                  </span>
                </div>
                <p className="font-orbitron text-[var(--body)] font-semibold uppercase tracking-wider mt-1">
                  {entry.title}
                </p>
              </div>
            ))}

          {type === "cart" && cart.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p className="text-[var(--body)] uppercase tracking-wider">
                Your shopping bag is empty.
              </p>
            </div>
          )}

          {type === "cart" &&
            cart.length > 0 && (
              <>
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 border-b border-gray-100"
                  >
                    <div className="flex-1 min-w-0">
                      <span className="text-[var(--body)] font-medium uppercase tracking-wider block">
                        {item.title}
                      </span>
                      <span className="text-[var(--body)] text-gray-600 mt-0.5 block">
                        {item.price}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemove(idx)}
                      className="ml-4 text-[var(--micro)] uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                <button
                  onClick={onCheckout}
                  className="w-full mt-4 bg-black text-white text-[var(--body)] uppercase tracking-[0.18em] font-medium py-3 rounded-md flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                >
                  CHECKOUT NOW
                  <ChevronRight size={16} strokeWidth={1.5} />
                </button>
              </>
            )}
        </div>

        {/* Footer */}
        {type !== "cart" && (
          <div className="mt-auto pt-12 text-center">
            <p className="text-[var(--micro)] text-gray-400 uppercase tracking-[0.15em]">
              LGPSM © 2026 — FUTURE FORWARD FASHION
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Drawer;

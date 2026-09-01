import { useState, useCallback, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, ArrowUpRight, Check } from "lucide-react";
import Drawer, { type DrawerType, type CartItem } from "@/components/Drawer";
import LCorner from "@/components/LCorner";
import CheckerGrid from "@/components/CheckerGrid";
import WireframeGlobe from "@/components/WireframeGlobe";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LGPSM — Future Forward Fashion" },
      {
        name: "description",
        content: "pure white minimal futuristic fashion website interface",
      },
      { property: "og:title", content: "LGPSM — Future Forward Fashion" },
      {
        property: "og:description",
        content: "pure white minimal futuristic fashion website interface",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-[100] bg-black text-white px-4 py-3 rounded-md flex items-center gap-2 shadow-lg font-jakarta text-sm">
      <Check size={16} strokeWidth={2} className="text-emerald-400" />
      {message}
    </div>
  );
}

function Index() {
  const [drawer, setDrawer] = useState<DrawerType>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [btnHover, setBtnHover] = useState(false);
  const [cartBadge, setCartBadge] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCartBadge(cart.length > 0);
  }, [cart]);

  const showToast = useCallback((msg: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(msg);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const openDrawer = useCallback(
    (type: DrawerType) => {
      setDrawer(type);
    },
    []
  );

  const closeDrawer = useCallback(() => {
    setDrawer(null);
  }, []);

  const addToCart = useCallback(
    (item: CartItem) => {
      setCart((prev) => [...prev, item]);
      showToast(`Added "${item.title}" to your shopping bag.`);
    },
    [showToast]
  );

  const removeFromCart = useCallback((index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const checkout = useCallback(() => {
    setCart([]);
    showToast("Order submitted successfully!");
    setTimeout(() => closeDrawer(), 300);
  }, [showToast, closeDrawer]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between relative overflow-hidden font-jakarta">
      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-screen lg:min-h-screen">
        {/* Header */}
        <header
          className="flex items-center justify-between"
          style={{
            paddingInline: "var(--pad-x)",
            paddingTop: "var(--header-pt)",
            paddingBottom: "var(--section-gap)",
          }}
        >
          {/* Logo */}
          <button
            onClick={closeDrawer}
            className="font-orbitron font-black uppercase hover:opacity-80 transition-opacity"
            style={{
              fontSize: "var(--logo)",
              letterSpacing: "0.15em",
            }}
          >
            LGPSM
            <span
              style={{
                fontSize: "var(--logo-deg)",
                marginTop: "-0.125rem",
                marginLeft: "0.125rem",
                verticalAlign: "super",
              }}
            >
              ˚
            </span>
          </button>

          {/* Cart icon */}
          <button
            onClick={() => openDrawer("cart")}
            className="relative hover:opacity-50 transition-opacity"
            aria-label="Shopping bag"
          >
            <ShoppingBag
              size="var(--icon)"
              strokeWidth={1.5}
              className="text-black"
            />
            {cartBadge && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </header>

        {/* Main hero */}
        <main
          className="flex-1 flex flex-col lg:flex-row lg:items-end lg:justify-between"
          style={{
            paddingInline: "var(--pad-x)",
            paddingBlock: "var(--main-py)",
          }}
        >
          {/* Left block */}
          <div className="flex flex-col justify-center flex-1">
            {/* L-corner top-left */}
            <LCorner dir="tl" className="text-black mb-4" style={{ width: "var(--corner)", height: "var(--corner)" }} />

            {/* Headline */}
            <h1 className="font-orbitron font-black uppercase" style={{ fontSize: "var(--headline)", letterSpacing: "0.08em", lineHeight: 1.05 }}>
              <span className="block">FUTURE</span>
              <span className="block">FORWARD</span>
              <span className="flex items-center gap-3">
                FASHION
                <CheckerGrid className="translate-y-[2px]" style={{ width: "var(--checker-w)", height: "var(--checker-h)" }} />
              </span>
            </h1>

            {/* L-corner bottom-left */}
            <LCorner dir="bl" className="text-black mt-4" style={{ width: "var(--corner)", height: "var(--corner)" }} />

            {/* CTA button */}
            <button
              onClick={() => openDrawer("shop")}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
              className="mt-6 font-jakarta inline-flex items-center uppercase font-medium rounded-md transition-all self-start"
              style={{
                border: btnHover ? "1px solid black" : "1px solid #9ca3af",
                paddingInline: "var(--btn-px)",
                paddingBlock: "var(--btn-py)",
                gap: "var(--btn-gap)",
                fontSize: "var(--body)",
                letterSpacing: "0.18em",
                backgroundColor: btnHover ? "black" : "transparent",
                color: btnHover ? "white" : "black",
              }}
            >
              SHOP NOW
              <ArrowUpRight
                size="var(--icon)"
                strokeWidth={1.5}
                className="transition-transform"
                style={{
                  transform: btnHover
                    ? "translate(2px, -2px)"
                    : "translate(0, 0)",
                }}
              />
            </button>
          </div>

          {/* Right lower feature block */}
          <div
            className="mt-8 lg:mt-0 self-end lg:self-end relative"
            style={{
              minWidth: "var(--feature-min)",
              padding: "var(--feature-pad)",
            }}
          >
            {/* Four corner brackets */}
            <LCorner dir="tl" className="text-black absolute top-0 left-0" style={{ width: "var(--corner)", height: "var(--corner)" }} />
            <LCorner dir="tr" className="text-black absolute top-0 right-0" style={{ width: "var(--corner)", height: "var(--corner)" }} />
            <LCorner dir="bl" className="text-black absolute bottom-0 left-0" style={{ width: "var(--corner)", height: "var(--corner)" }} />
            <LCorner dir="br" className="text-black absolute bottom-0 right-0" style={{ width: "var(--corner)", height: "var(--corner)" }} />

            {/* Content */}
            <div className="flex flex-col items-center text-center" style={{ padding: "var(--feature-pad)" }}>
              <WireframeGlobe className="text-black" style={{ width: "var(--globe)", height: "var(--globe)" }} />
              <p className="font-jakarta font-semibold uppercase mt-4" style={{ fontSize: "var(--body)", letterSpacing: "0.18em", lineHeight: 1.4 }}>
                BEYOND TRENDS.<br />
                BUILT FOR TOMORROW.
              </p>
            </div>
          </div>
        </main>

        {/* Footer text */}
        <footer
          className="text-center pb-4"
          style={{ paddingInline: "var(--pad-x)" }}
        >
          <p className="font-jakarta text-gray-400 uppercase" style={{ fontSize: "var(--micro)", letterSpacing: "0.15em" }}>
            LGPSM © 2026 — FUTURE FORWARD FASHION
          </p>
        </footer>
      </div>

      {/* Drawer */}
      <Drawer
        type={drawer}
        onClose={closeDrawer}
        cart={cart}
        onAdd={addToCart}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
    </div>
  );
}

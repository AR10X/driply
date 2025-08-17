import React, { useRef, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  GlobeAltIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

/**
 * Responsive bottom nav with SVG notch + animated bubble.
 *
 * Assumptions:
 * - Use inside a page with width similar to your other container (we center the pill).
 * - The nav pill width is controlled by max-w-md & px, so it lines up with your onboarding container.
 */

const navItems = [
  { to: "/", icon: HomeIcon, label: "Home" },
  { to: "/feed", icon: GlobeAltIcon, label: "Feed" },
  { to: "/saved", icon: HeartIcon, label: "Saved" },
  { to: "/orders", icon: ShoppingBagIcon, label: "Orders" },
];

export default function BottomNav() {
  const location = useLocation();

  // refs to measure each item and the pill wrapper
  const wrapperRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = []; // reset each render

  const addItemRef = (el) => {
    if (el && !itemRefs.current.includes(el)) itemRefs.current.push(el);
  };

  // measured centers of icons relative to wrapper
  const [centers, setCenters] = useState([]);
  const [wrapperWidth, setWrapperWidth] = useState(0);

  // compute active index from current path
  const activeIndex = Math.max(
    0,
    navItems.findIndex((it) => it.to === location.pathname)
  );

  // measure on mount + resize + when DOM changes (icons)
  useLayoutEffect(() => {
    function measure() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const wrapRect = wrapper.getBoundingClientRect();
      setWrapperWidth(wrapRect.width);

      const c = itemRefs.current.map((el) => {
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        // center x relative to wrapper left
        return r.left + r.width / 2 - wrapRect.left;
      });
      setCenters(c);
    }

    measure();
    window.addEventListener("resize", measure);
    // small timeout for initial paint / font load
    const t = setTimeout(measure, 50);

    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [location.pathname]); // re-measure when route changes (icons might reflow)

  // fallback center positions if measurement not ready
  const fallbackCenters = (idx) => {
    const count = navItems.length;
    const padding = 24; // left/right padding inside pill
    const usable = Math.max(0, wrapperWidth - padding * 2);
    const slot = usable / (count - 1 || 1);
    return padding + slot * idx;
  };

  const notchCx = centers && centers.length === navItems.length
    ? centers[activeIndex] ?? fallbackCenters(activeIndex)
    : fallbackCenters(activeIndex);

  // sizes (tweak these to match your design)
  const pillHeight = 64; // px
  const pillRadius = 32; // px (half pill height)
  const notchRadius = 26; // radius of cutout circle
  const bubbleSize = 48; // px (floating knob)
  const bubbleY = - (bubbleSize / 2) - 6; // how much bubble sits above the pill

  return (
    // Full-width wrapper that centers the pill — change max-w to match your layout
    <div className=" fixed left-0 right-0 bottom-4 flex justify-center z-50 pointer-events-none">
      <div
        ref={wrapperRef}
        className="relative pointer-events-auto"
        style={{ width: "min(420px, calc(100% - 32px))" }} // align with your max-w-md layout
      >
        {/* SVG pill with dynamic notch mask */}
        <svg
          width="100%"
          height={pillHeight}
          viewBox={`0 0 ${wrapperWidth || 420} ${pillHeight}`}
          preserveAspectRatio="none"
          className="absolute left-0 top-0"
        >
          <defs>
            <mask id="notch-mask">
              {/* full rect = show (white) */}
              <rect
                x="0"
                y="0"
                width={wrapperWidth || 420}
                height={pillHeight}
                fill="white"
                rx={pillRadius}
              />
              {/* animated circle = hide area (black) -> the notch */}
              <motion.circle
                cx={notchCx}
                cy={pillHeight * 0.15}
                r={notchRadius}
                fill="black"
                initial={false}
                animate={{ cx: notchCx }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </mask>
          </defs>

          {/* pill background (beige) with mask applied -> creates a notch */}
          <rect
            x="0"
            y="0"
            width={wrapperWidth || 420}
            height={pillHeight}
            rx={pillRadius}
            fill="#ffe6df"
            mask="url(#notch-mask)"
          />

          {/* optional subtle top border */}
          <rect
            x="0"
            y="0"
            width={wrapperWidth || 420}
            height={pillHeight}
            rx={pillRadius}
            fill="none"
            stroke="#E6D7D0"
            strokeWidth="1"
          />
        </svg>

        {/* Floating bubble (knob) - animated to notch center */}
        <motion.div
          className="absolute left-0 top-0 z-20"
          initial={false}
          animate={{ x: notchCx - bubbleSize / 2, y: bubbleY }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            width: bubbleSize,
            height: bubbleSize,
            borderRadius: bubbleSize / 2,
            background: "#1f1f1f", // bubble color
            boxShadow: "0 8px 20px rgba(31,31,31,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transformOrigin: "center",
          }}
        >
          {/* icon will be rendered above (z-30) so this is just background bubble */}
        </motion.div>

        {/* Nav items laid on top */}
        <div
          className="relative z-30 flex items-center justify-around"
          style={{
            height: pillHeight,
            padding: "0 24px",
          }}
        >
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                ref={addItemRef}
                aria-label={item.label}
                className="relative flex items-center justify-center w-16"
                onClick={() => {
                  // clicking will update location (react-router) and measurement will re-run
                }}
              >
                {/* If active, place the icon above the bubble so it appears white on black */}
                <motion.div
                  animate={{
                    y: isActive ? bubbleY - 4 : 0,
                    scale: isActive ? 1.14 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 28 }}
                  style={{ zIndex: isActive ? 60 : 40 }}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isActive ? "text-white" : "text-gray-600"
                    }`}
                  />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
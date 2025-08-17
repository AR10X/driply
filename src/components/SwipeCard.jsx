import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { XMarkIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function SwipeCard({ card, isTop, onSwipe, index, totalCards }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const [swipeDirection, setSwipeDirection] = useState(null);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      setSwipeDirection("right");
      onSwipe("right", card.id);
    } else if (info.offset.x < -100) {
      setSwipeDirection("left");
      onSwipe("left", card.id);
    }
  };

  const offset = totalCards - index - 1;
  const scale = isTop ? 1 : 1 - offset * 0.06;
  const yOffset = isTop ? 0 : offset * 40;
  const opacity = isTop ? 1 : 1 - offset * 0.15;

  return (
    <motion.div
      className="absolute font-recoleta w-full h-full rounded-3xl shadow-lg bg-white overflow-hidden flex flex-col"
      style={{ x, rotate }}
      drag={isTop ? "x" : false}
      dragElastic={0.2}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: 0.9, opacity: 0, y: yOffset }}
      animate={{ scale, opacity, y: yOffset,}}
      exit={{
        x: swipeDirection === "right" ? 500 : -500,
        rotate: swipeDirection === "right" ? 25 : -25,
        opacity: 0,
        scale: 1.1,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Image */}
      <div className="h-[65%] flex-shrink-0">
        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{card.title}</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {card.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-[#ffe6df] text-gray-800 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <p className="mt-3 text-xl font-semibold text-gray-900">₹ {card.price}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-8 mt-4">
          <button
            className="p-4 bg-red-100 rounded-full"
            onClick={() => {
              setSwipeDirection("left");
              onSwipe("left", card.id);
            }}
          >
            <XMarkIcon className="w-8 h-8 text-red-500" />
          </button>
          <button
            className="p-4 bg-green-100 rounded-full"
            onClick={() => {
              setSwipeDirection("right");
              onSwipe("right", card.id);
            }}
          >
            <HeartIcon className="w-8 h-8 text-green-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

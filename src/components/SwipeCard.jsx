// SwipeCard.jsx
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaHeart, FaTimes } from "react-icons/fa";

export default function SwipeCard({ card, isTop, onSwipe }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacityLike = useTransform(x, [50, 200], [0, 1]);
  const opacityNope = useTransform(x, [-50, -200], [0, 1]);

  return (
    <motion.div
      className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden bg-white"
      style={{ x, rotate }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(e, info) => {
        if (info.offset.x > 150) {
          onSwipe("right", card.id);
        } else if (info.offset.x < -150) {
          onSwipe("left", card.id);
        } else {
          x.set(0); // snap back
        }
      }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      {/* Make sure image allows swipe gestures */}
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover pointer-events-none"
      />

      {/* Like Icon */}
      <motion.div
        className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-lg text-xl font-bold"
        style={{ opacity: opacityLike }}
      >
        <FaHeart />
      </motion.div>

      {/* Dislike Icon */}
      <motion.div
        className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg text-xl font-bold"
        style={{ opacity: opacityNope }}
      >
        <FaTimes />
      </motion.div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 bg-black text-white p-4 text-lg font-semibold">
        {card.title}
      </div>
    </motion.div>
  );
}

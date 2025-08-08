import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaTimes } from "react-icons/fa";

const sampleCards = [
  { id: 1, image: "https://via.placeholder.com/350x500?text=Drip+1", title: "Cozy Winter Fit" },
  { id: 2, image: "https://via.placeholder.com/350x500?text=Drip+2", title: "Streetwear Vibes" },
  { id: 3, image: "https://via.placeholder.com/350x500?text=Drip+3", title: "Date Night Look" },
  { id: 4, image: "https://via.placeholder.com/350x500?text=Drip+1", title: "Cozy Winter Fit" },
  { id: 5, image: "https://via.placeholder.com/350x500?text=Drip+2", title: "Streetwear Vibes" },
  { id: 6, image: "https://via.placeholder.com/350x500?text=Drip+3", title: "Date Night Look" },
  { id: 7, image: "https://via.placeholder.com/350x500?text=Drip+1", title: "Cozy Winter Fit" },
  { id: 8, image: "https://via.placeholder.com/350x500?text=Drip+2", title: "Streetwear Vibes" },
  { id: 9, image: "https://via.placeholder.com/350x500?text=Drip+3", title: "Date Night Look" },
  { id: 10, image: "https://via.placeholder.com/350x500?text=Drip+1", title: "Cozy Winter Fit" },
  { id: 11, image: "https://via.placeholder.com/350x500?text=Drip+2", title: "Streetwear Vibes" },
  { id: 12, image: "https://via.placeholder.com/350x500?text=Drip+3", title: "Date Night Look" },
  { id: 13, image: "https://via.placeholder.com/350x500?text=Drip+1", title: "Cozy Winter Fit" },
  { id: 14, image: "https://via.placeholder.com/350x500?text=Drip+2", title: "Streetwear Vibes" },
  { id: 15, image: "https://via.placeholder.com/350x500?text=Drip+3", title: "Date Night Look" },
];

export default function Feed() {
  const [cards, setCards] = useState(sampleCards);
  const [saved, setSaved] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [rotation, setRotation] = useState(0);
  const tapTimeout = useRef(null);

  const handleSwipe = (direction, id) => {
    if (direction === "right") {
      console.log(`Liked card ${id}`);
    } else if (direction === "left") {
      console.log(`Disliked card ${id}`);
    }
    setSwipeDirection(null);
    setRotation(0);
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const handleDoubleTap = (id) => {
    setSaved(prev => [...prev, id]);
    console.log(`Saved card ${id}`);
  };

  const handleCardTap = (id) => {
    if (tapTimeout.current) {
      clearTimeout(tapTimeout.current);
      tapTimeout.current = null;
      handleDoubleTap(id);
    } else {
      tapTimeout.current = setTimeout(() => {
        tapTimeout.current = null;
      }, 300);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-pink-400 text-white font-sans overflow-hidden">
      <div className="relative w-[90%] max-w-[430px] h-[85%]">
        <AnimatePresence>
          {cards.map((card, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={card.id}
                className="absolute w-full h-full rounded-xl shadow-lg overflow-hidden"
                style={{
                  zIndex: cards.length - index,
                  scale: isTop ? 1 : 0.95,
                  y: isTop ? 0 : 20,
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDrag={(e, info) => {
                  setRotation(info.offset.x / 20);
                  if (info.offset.x > 20) setSwipeDirection("right");
                  else if (info.offset.x < -20) setSwipeDirection("left");
                  else setSwipeDirection(null);
                }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 120) {
                    handleSwipe("right", card.id);
                  } else if (info.offset.x < -120) {
                    handleSwipe("left", card.id);
                  } else {
                    setSwipeDirection(null);
                    setRotation(0);
                  }
                }}
                animate={{ rotate: isTop ? rotation : 0 }}
                exit={{ opacity: 1, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => handleCardTap(card.id)}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Like/Dislike Icons */}
                {isTop && swipeDirection === "right" && (
                  <div className="absolute top-5 left-5 text-green-500 text-4xl ">
                    <FaHeart />
                  </div>
                )}
                {isTop && swipeDirection === "left" && (
                  <div className="absolute top-5 right-5 text-red-500 text-4xl ">
                    <FaTimes />
                  </div>
                )}

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#FFB7A2] text-black p-4 text-lg font-semibold">
                  {card.title}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

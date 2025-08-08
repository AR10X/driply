// Feed.jsx
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "../components/SwipeCard";

const initialCards = [
  { id: 1, title: "Streetwear Hoodie", image: "/images/drip1.jpg" },
  { id: 2, title: "Summer Linen Fit", image: "/images/drip2.jpg" },
  { id: 3, title: "Winter Layered Look", image: "/images/drip3.jpg" },
  { id: 4, title: "Winter Layered Look", image: "/images/drip4.jpg" },
  { id: 5, title: "Winter Layered Look", image: "/images/drip5.jpg" },
  { id: 6, title: "Winter Layered Look", image: "/images/drip6.jpg" },
  { id: 7, title: "Winter Layered Look", image: "/images/drip7.jpg" },
  { id: 8, title: "Winter Layered Look", image: "/images/drip8.jpg" },
  { id: 9, title: "Winter Layered Look", image: "/images/drip9.jpg" },
];

export default function Feed() {
  const [cards, setCards] = useState(initialCards);

  const handleSwipe = (direction, cardId) => {
    console.log(direction === "right" ? "Liked" : "Disliked", cardId);
    setCards(prev => prev.filter(c => c.id !== cardId));
  };

  return (
    <div className="h-screen bg-gradient-to-b from-pink-200 to-pink-400 text-white font-sans flex items-center justify-center overflow-hidden">
      <div className="relative w-[350px] h-[550px]">
        <AnimatePresence>
          {cards.map((card, index) => (
            <SwipeCard
              key={card.id}
              card={card}
              isTop={index === cards.length - 1}
              onSwipe={handleSwipe}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

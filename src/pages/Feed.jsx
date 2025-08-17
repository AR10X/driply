import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SwipeCard from "../components/SwipeCard";

const initialCards = [
  { id: 1, title: "Streetwear Hoodie", image: "/images/1.jpg", tags: ["Date Night", "Casual"], price: 2499 },
  { id: 2, title: "Summer Linen Fit", image: "/images/2.jpg", tags: ["Beach", "Light"], price: 1799 },
  { id: 3, title: "Winter Layered Look", image: "/images/3.jpg", tags: ["Cozy", "Chic"], price: 3299 },
  { id: 4, title: "Oversized Street Tee", image: "/images/4.jpg", tags: ["Street", "Comfy"], price: 999 },
  { id: 5, title: "Athleisure Set", image: "/images/5.jpg", tags: ["Sporty", "Trendy"], price: 1899 },
  { id: 6, title: "Athleisure Set", image: "/images/6.jpg", tags: ["Sporty", "Trendy"], price: 1899 },
  { id: 7, title: "Athleisure Set", image: "/images/7.jpg", tags: ["Sporty", "Trendy"], price: 1899 },
  { id: 8, title: "Athleisure Set", image: "/images/8.jpg", tags: ["Sporty", "Trendy"], price: 1899 },
];

export default function Feed() {
  const [cards, setCards] = useState(initialCards);

  const handleSwipe = (direction, cardId) => {
    console.log(direction === "right" ? "Liked" : "Disliked", cardId);
    setCards(prev => prev.filter(c => c.id !== cardId));
  };

  return (
    <div className="flex-1 flex items-center justify-center overflow-y-auto ">
      <div className="relative w-[350px] h-[600px]">
        <AnimatePresence>
          {cards.map((card, index) => (
            <SwipeCard
              key={card.id}
              card={card}
              isTop={index === cards.length - 1}
              onSwipe={handleSwipe}
              index={index}
              totalCards={cards.length}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

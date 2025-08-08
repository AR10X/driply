import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
    const navigate = useNavigate();

    const handleFirstTap = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(err => console.log("Fullscreen failed:", err));
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
    window.removeEventListener("click", handleFirstTap);
    window.removeEventListener("touchstart", handleFirstTap);
  };

  useEffect(() => {
    window.addEventListener("click", handleFirstTap);
    window.addEventListener("touchstart", handleFirstTap);
    return () => {
      window.removeEventListener("click", handleFirstTap);
      window.removeEventListener("touchstart", handleFirstTap);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-b from-pink-200 to-pink-400 text-white font-sans">
      <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Driply</h1>
      <p className="text-lg mb-8 text-center max-w-xs opacity-90">
        Wear your mood today — swipe to discover your perfect drip.
      </p>
      <button
        onClick={() => navigate("/feed")}
        className="bg-black text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg active:scale-95 transition"
      >
        Style me up
      </button>
    </div>
  );
}
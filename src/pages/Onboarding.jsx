import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className=" flex flex-col items-center px-6 mx-auto max-w-md flex-1 overflow-y-auto ">
      {/* Header - Top Section */}
      <div className="flex flex-col items-center pt-6">
        <h1 className="text-3xl font-recoleta font-medium mb-1">
          Driply
        </h1>
        <p className="text-lg font-recoleta text-gray-700 italic">
          Swipe Your Style.
        </p>
      </div>

      {/* Main Content - Middle Section (flex-grow takes available space) */}
      <div className="flex flex-1 flex-col items-center w-full px-6 mx-auto max-w-md mt-8">
        <p className="text-center font-recoleta font-medium text-3xl mb-6 leading-relaxed">
          ✨ Discover outfits tailored to your vibe.
        </p>

        <p className="text-center font-recoleta text-gray-700 text-2xl mb-8 leading-snug">
          Swipe ➡️ to like,
          <br />
          ⬅️ to skip,
          <br />
          double<span className="font-sans">-</span>tap ❤️ to save
        </p>

        {/* Gender Selection */}
        <p className="font-recoleta mb-4 text-[1.3rem] text-gray-700">
          Who are we styling for?
        </p>

        <div className="flex font-recoleta gap-4 mb-8">
          <button className="px-6 py-3 rounded-lg bg-[#ffe6df] border border-gray-300 text-lg font-medium text-gray-800 shadow-sm hover:shadow-md hover:bg-[#ffd7cd] transition-all">
            He <span className="font-sans">/</span> Him
          </button>
          <button className="px-6 py-3 rounded-lg bg-[#ffe6df] border border-gray-300 text-lg font-medium text-gray-800 shadow-sm hover:shadow-md hover:bg-[#ffd7cd] transition-all">
            She <span className="font-sans">/</span> Her
          </button>
        </div>
        <button
          className="px-14 py-4 rounded-full bg-black text-white text-lg font-recoleta shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all duration-200 w-full max-w-xs"
          onClick={() => navigate("/feed")}
        >
          Start Swiping
        </button>
        <p className="pt-4 font-recoleta text-sm text-gray-600 text-center leading-relaxed">
          Powered by AI and drip<span className="font-sans"> - </span>where style meets swipe.
        </p>
      </div>
    </div>
  );
}
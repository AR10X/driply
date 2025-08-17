import { Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Feed from "./pages/Feed";
import Saved from "./pages/Saved"
import Orders from "./pages/Orders"
import BottomNav from "./components/BottomNav";
import FullscreenOnce from "./components/FullScreenOnce";


export default function App() {
  return (
    <>
      <div className="flex flex-col h-screen w-screen">
        <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/orders" element={<Orders />} />
        </Routes>
        <BottomNav />
      </div>
    </>
  );
}
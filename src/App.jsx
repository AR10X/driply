import { Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Feed from "./pages/Feed";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/feed" element={<Feed />} />
    </Routes>
  );
}

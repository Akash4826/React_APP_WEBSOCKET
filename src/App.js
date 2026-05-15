import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
export default App;

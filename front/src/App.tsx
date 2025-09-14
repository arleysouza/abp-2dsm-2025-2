import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimaPage from "./pages/SimaPage";
import BarraBrasil from "./components/BarraBrasil";

function App() {
  return (
    <Router>
      <BarraBrasil />
      <Routes>
        <Route path="/sima" element={<SimaPage />} />
      </Routes>
    </Router>
  );
}

export default App;

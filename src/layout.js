import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home.js';
import Grid from "./pages/grid.js";
import Pokedex from "./pages/pokedex.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokegrid" element={<Grid />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import injectContext from "./store/appContext";

import Home from "./pages/home.js";
import Grid from "./pages/grid.js";
import Pokedex from "./pages/pokedex.js";

function Layout() {
  return (

    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokegrid" element={<Grid />} />
          <Route path="/pokedex/:poke" element={<Pokedex />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default injectContext(Layout);

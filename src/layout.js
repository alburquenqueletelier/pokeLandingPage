import { Routes, Route, useLocation, Link } from "react-router-dom";
import injectContext from "./store/appContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from "./pages/home.js";
import Grid from "./pages/grid.js";
import Pokedex from "./pages/pokedex.js";
import NoMatch from "./pages/noMatch.js"

function Layout() {
  const location = useLocation();
  return (

    <div className="container">
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/pokegrid/:page" element={<Grid />} />
              <Route path="/pokedex/:poke" element={<Pokedex />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default injectContext(Layout);

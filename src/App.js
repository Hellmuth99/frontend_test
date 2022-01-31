import React from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Tabla2 from "./components/Tabla2";

import Calle from "./components/Calle";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Tabla2 />} />
        <Route exact path="/editar/:id" element={<Calle />} />
        <Route exact path="/agregar" element={<Calle />} />
        <Route exact path="/agregar" element={<Calle />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useState } from "react";
import LandingPage from "./Pages/Public/Landing/page/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Public/Home/page/Home";
import Auth from "./Pages/Private/Auth/page/Auth";
import Admin from "./Pages/Private/Admin/page/Admin";
import Empresas from "./Pages/Private/Empresas/page/Empresas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/:ciudadId" element={<Home />} />
        <Route path="/:ciudadId/empresas" element={<Empresas />} />
        {/* --- RUTAS PRIVADAS (ADMIN) --- */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        {/* Panel para que cada empresa cargue sus ofertas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

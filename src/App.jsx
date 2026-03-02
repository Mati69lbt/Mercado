import { useState } from "react";
import LandingPage from "./Pages/Public/Landing/page/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Public/Home/page/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:ciudadId" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

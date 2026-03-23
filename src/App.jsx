import { useState } from "react";
import LandingPage from "./Pages/Public/Landing/page/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Public/Home/page/Home";
import Auth from "./Pages/Private/Auth/page/Auth";
import ProtectedRoute from "./hooks/ProtectedRoute";
import CompanyManage from "./Pages/Private/Admin/CompanyManage/page/CompanyManage";
import CreateCompany from "./Pages/Private/Admin/CompanyCreate/page/CreateCompany";
import Index from "./Pages/Public/Empresas/page/Index";
import MainLayout from "./Components/page/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<LandingPage />} />

        <Route element={<MainLayout />}>
          <Route path="/:ciudadId" element={<Home />} />
          <Route path="/:ciudadId/empresas" element={<Index />} />
        </Route>

        {/* --- RUTAS PRIVADAS (ADMIN) --- */}
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <CompanyManage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/createCompany"
          element={
            <ProtectedRoute>
              <CreateCompany />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/editCompany"
          element={
            <ProtectedRoute>
              <CreateCompany />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

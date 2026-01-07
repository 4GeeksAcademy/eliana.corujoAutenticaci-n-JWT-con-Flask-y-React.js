import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Importar tus páginas
import { Home } from "./pages/Home";
import { Demo } from "./pages/Demo";
import { Single } from "./pages/Single";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { Private } from "./pages/Private";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

const FileRoutes = () => {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/single/:theid" element={<Single />} />
                
                {/* Rutas de Autenticación */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/private" element={<Private />} />

                <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default FileRoutes;
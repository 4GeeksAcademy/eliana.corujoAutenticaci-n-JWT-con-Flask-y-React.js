import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../hooks/useGlobalReducer";

export const Private = () => {
    const { store } = useGlobalReducer();
    const navigate = useNavigate();

    useEffect(() => {
        // Si no hay token en el store ni en el navegador, te expulsa al login
        if (!store.token && !sessionStorage.getItem("token")) {
            navigate("/login");
        }
    }, [store.token, navigate]);

    return (
        <div className="container mt-5 text-center">
            <div className="alert alert-success">
                <h1>🎉 ¡Bienvenido a la Zona Privada! 🎉</h1>
                <p>Solo puedes ver esto porque tienes un Token válido.</p>
                <p>Tu token es: {store.token ? store.token.substring(0, 20) + "..." : "Cargando..."}</p>
            </div>
            <img src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" alt="Success" />
        </div>
    );
};
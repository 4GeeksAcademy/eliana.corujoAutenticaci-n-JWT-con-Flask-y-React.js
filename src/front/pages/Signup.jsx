import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        alert("Intentando conectar a: " + backendUrl);
        try {
            const response = await fetch(backendUrl + "/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert("¡Usuario registrado con éxito! Ahora inicia sesión.");
                navigate("/login");
            } else {
                const data = await response.json();
                alert("Error: " + data.msg);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            alert("Error de conexión. Revisa la consola.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Regístrate</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
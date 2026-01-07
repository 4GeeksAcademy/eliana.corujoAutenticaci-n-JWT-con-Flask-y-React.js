import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'  // Estilos globales

// Importamos el Provider para tener acceso al store en toda la app
import { StoreProvider } from "./hooks/useGlobalReducer";

// Importamos nuestras rutas (que ahora es un Componente, no un objeto router)
import FileRoutes from "./routes"; 

import { BackendURL } from "./components/BackendURL";

const Main = () => {
    // Validación para asegurar que el backend está configurado
    if(!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL == "") return <BackendURL />

    return (
        <React.StrictMode>
            <StoreProvider>
                {/* Renderizamos el componente de Rutas directamente */}
                <FileRoutes />
            </StoreProvider>
        </React.StrictMode>
    );
}

// Renderizado en el HTML
ReactDOM.createRoot(document.getElementById('root')).render(<Main />)
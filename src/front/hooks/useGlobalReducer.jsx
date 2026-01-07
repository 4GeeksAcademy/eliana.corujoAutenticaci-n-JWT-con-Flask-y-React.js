// Import necessary hooks and functions from React.
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store";

// Create a context to hold the global state of the application
const StoreContext = createContext();

// Define a provider component
export function StoreProvider({ children }) {
    const [store, dispatch] = useReducer(storeReducer, initialStore());
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

// Custom hook to access the global state
// CORRECCIÓN: Quitamos la palabra "default" para poder usar { useGlobalReducer } en los imports
export function useGlobalReducer() {
    const context = useContext(StoreContext);
    // Validación por si acaso se usa fuera del provider
    if (!context) {
        throw new Error("useGlobalReducer must be used within a StoreProvider");
    }
    return context;
}

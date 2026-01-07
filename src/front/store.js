export const initialStore = () => {
  return {
    message: null,
    // Verificamos si ya hay un token guardado en el navegador al cargar la app
    token: sessionStorage.getItem("token") || null, 
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':
      const { id,  color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };

    // --- NUEVOS CASOS PARA AUTENTICACIÓN ---

    case 'login':
      // Guardamos el token en el navegador
      sessionStorage.setItem("token", action.payload);
      return {
        ...store,
        token: action.payload
      };

    case 'logout':
      // Borramos el token del navegador
      sessionStorage.removeItem("token");
      return {
        ...store,
        token: null
      };
      
    default:
      throw Error('Unknown action.');
  }    
}
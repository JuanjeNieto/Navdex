const URL_USER = 'http://localhost:3001';

// Objeto API que contiene métodos para interactuar con la API del servidor
const api = {
    // Método para registrar un nuevo usuario
    registro: async (datos) => {
        try {
            const response = await fetch(`${URL_USER}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
            });
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }
            // Devolver los datos de la respuesta en formato JSON
            return await response.json();
        } catch (error) {
            // Capturar y manejar cualquier error que ocurra durante el registro
            console.error('Error en el registro de usuario:', error);
            throw error;
        }
    },

    // Método para realizar el inicio de sesión
    login: async (credentials) => {
        try {
            const response = await fetch(`${URL_USER}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                throw new Error('Error');
            }
            // Devolver los datos de la respuesta en formato JSON
            return await response.json();
        } catch (error) {
            // Capturar y manejar cualquier error que ocurra durante el inicio de sesión
            console.error('Error ', error);
            throw error;
        }
    },
};

export default api;

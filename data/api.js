const URL_USER = 'http://localhost:3001';

const api = {
  
    registro: async (datos) => {
        try {
            const response = await fetch(`${URL_USER}/usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
            });
            if (!response.ok) {
                throw new Error('Error al registrar el usuario');
            }
            return await response.json();
        } catch (error) {
            console.error('Error en el registro de usuario:', error);
            throw error;
        }
    },

    login: async (credentials) => {
        try {
        const response = await fetch(`${URL_USER}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });


        if (!response.ok) {
            throw new Error('Error');
        }
        return await response.json();
        } catch (error) {
        console.error('Error ', error);
        throw error;
        }
    },
};

export default api;
export const registroFuncion = 
    async (datos) => {

    try {
    const response = await fetch(`${URL}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos)
    });

    if (!response.ok) {
        throw new Error('Error');
    }

    return await response.json();
    } catch (error) {
    console.error('Error ', error);
    throw error;
    }
};

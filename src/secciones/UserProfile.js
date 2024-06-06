import React, { useState, useEffect } from 'react';
import '../estilos/UserProfile.css'; // Importar el archivo de estilos CSS
import { API_BASE_URL } from '../config';

function UserProfile({ userId, setIsLoggedIn }) {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        profilePicture: ''
    });
    const [previewImage, setPreviewImage] = useState(null); // Estado para la previsualización de la imagen
    const [savedMessageVisible, setSavedMessageVisible] = useState(false); // Estado para controlar la visibilidad del mensaje

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${API_BASE_URL}/api/users/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserData(data);
        })
        .catch(err => console.error('Error al obtener el perfil:', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...userData, profilePicture: file });
        setPreviewImage(URL.createObjectURL(file)); // Crear URL para la previsualización de la imagen
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        if (userData.profilePicture instanceof File) {
            formData.append('profilePicture', userData.profilePicture);
        }

        fetch(`${API_BASE_URL}/api/users/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            setUserData(data);
            setPreviewImage(null); // Limpiar la previsualización después de guardar los cambios
            setSavedMessageVisible(true); // Mostrar el mensaje de cambios guardados correctamente
            setTimeout(() => {
                setSavedMessageVisible(false); // Ocultar el mensaje después de unos segundos
            }, 15000);
        })
        .catch(err => console.error('Error al actualizar el perfil:', err));
    };

    return (
        <div className='user-profile-wrapper'>
            <div className="user-profile-container">
                <h2>Perfil de {userData.name}</h2> {/* Mostrar el nombre actualizado */}
                <div className="profile-picture-container">
                    {previewImage ? (
                        <img
                            src={previewImage} // Mostrar la previsualización de la nueva imagen si está disponible
                            alt="Profile"
                            className="profile-picture"
                        />
                    ) : (
                        userData.profilePicture && (
                            <img
                                src={`${API_BASE_URL}/uploads/${userData.profilePicture}`}
                                alt="Profile"
                                className="profile-picture"
                            />
                        )
                    )}
                </div>
            
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Imagen de perfil:</label>
                        <input
                            type="file"
                            name="profilePicture"
                            onChange={handleFileChange}
                        />
                    </div>
                    {savedMessageVisible && <p className="saved-message">Cambios guardados correctamente</p>} {/* Mostrar el mensaje de cambios guardados correctamente si es visible */}
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;

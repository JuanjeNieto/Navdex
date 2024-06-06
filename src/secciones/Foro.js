import React, { useEffect, useState } from 'react';
import '../estilos/Foro.css'; // Archivo CSS para estilos

const Foro = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="foro-container">
            <h2>Foro</h2>
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        {post.image && <img src={post.image} alt="Post Image" />}
                        <div className="user-info">
                            <img src={post.User.profilePicture} alt="Profile" />
                            <p>{post.User.name} - {post.User.email}</p>
                            <small>Publicado {new Date(post.date).toLocaleString()}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Foro;

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Profile() {
    const { isAuth, user } = useContext(AuthContext);
    const [privateContent, setPrivateContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isAuth) {
            fetchPrivateContent();
        }
    }, [isAuth]);

    const fetchPrivateContent = async () => {
        try {
            const response = await axios.get('http://localhost:3000/660/private-content', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setPrivateContent(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error ophalen profiel content');
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                {isAuth ? (
                    <>
                        <p><strong>Gebruikersnaam:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                    </>
                ) : (
                    <p>Log in om je profielgegevens te bekijken</p>
                )}
            </section>
            <section>
                <h2>Strikt geheime profiel-content</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <p>{privateContent}</p>
                )}
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
        </>
    );
}

export default Profile;
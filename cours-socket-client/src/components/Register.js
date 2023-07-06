import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Vérifier le type de données avant l'envoi à l'API
        if (typeof email === 'string' && typeof password === 'string') {
            fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Traiter la réponse de l'API ici
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else console.log("mauvais type des input");

        navigate('/');
    };


    return (
        <div className="register">
            <h2>Sign up</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email : </label>
                    <input
                        type="text"
                        name="email"
                        className="user-input"
                        placeholder="Your Email..."
                        value={email}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            event.key === "Enter" && handleChange()
                        }}
                    />
                </div>
                <br />
                <div>
                    <label>Password : </label>
                    <input
                        type="password"
                        name="password"
                        className="user-input"
                        placeholder="Your Password..."
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button type="submit" className="home-btn">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;

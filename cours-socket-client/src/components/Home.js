import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';

function Home({ socket }) {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [jwt, setJwt] = useState('');


	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};

	const handleSubmit = () => {
		
		// On crée un nouvel user

		fetch('http://localhost:3001/auth/login', {
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
				setJwt(data.jwt); // Mettre à jour le jeton JWT dans l'état
			})
			.catch((error) => {
				console.error('Error:', error);
			});



		console.log(jwt);

		localStorage.setItem('jwt', jwt);

		socket.emit('new_user', { email, socketID: socket.id });
		navigate('/chat');
	}

	const goToRegister = () => {
		navigate('/register');
	}

	return (
		<div className="home-container">
			<h2>Sign in</h2>
			<label>Email : </label>
			<input
				type="text"
				name="email"
				className="user-input"
				placeholder="Your mail..."
				value={email}
				onChange={handleChange}
				onKeyDown={(event) => {
					event.key === "Enter" && handleSubmit()
				}}
			/>
			<label>Password : </label>
			<input
				type="password"
				name="password"
				className="user-input"
				placeholder="Your Password..."
				value={password}
				onChange={handleChange}
				onKeyDown={(event) => {
					event.key === "Enter" && handleSubmit()
				}}
			/>
			<button className="home-btn" onClick={handleSubmit}>Go !</button>
			<button onClick={goToRegister}>Par encore inscrit ?</button>
		</div>
	)
}

export default Home
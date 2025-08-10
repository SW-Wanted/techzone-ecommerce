import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [message, setMessage] = useState('A carregar...');
	useEffect(() => {
		// This function fetch from backend
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:5001/api/test');
				setMessage(response.data.message);
			} catch (error) {
				console.error('Erro ao buscar dados do backend:', error);
				setMessage('Falha ao conectar ao backend.');
		}
	};
	fetchData();
}, []); // O array vazio [] garante que este efeito roda apenas uma vez, quando o componente é montado

return (
	<div className="App">
		<header className="App-header">
			<h1>Projeto E-commerce TechZone</h1>
			<p>
				<strong>Mensagem do Servidor:</strong> {message}
			</p>
		</header>
	</div>
);
}

export default App;

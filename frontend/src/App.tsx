import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Vamos usar este ficheiro para estilizar um pouco

function App() {
  // 1. Criar o estado para guardar a lista de produtos e o estado de loading
  const [products, setProducts] = useState([]); // Começa como um array vazio
  const [loading, setLoading] = useState(true); // Começa como true para mostrar uma mensagem de "a carregar"
  const [error, setError] = useState(null); // Para guardar qualquer erro da API

  // 2. Usar o useEffect para buscar os dados da API quando o componente é montado
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Chamada à nossa API no backend
        const response = await axios.get('http://localhost:5001/api/products');
        setProducts(response.data); // Guarda os dados recebidos no nosso estado 'products'
      } catch (err) {
        setError('Não foi possível carregar os produtos.'); // Guarda a mensagem de erro
        console.error(err);
      } finally {
        setLoading(false); // Para de mostrar a mensagem de "a carregar", independentemente do resultado
      }
    };

    fetchProducts();
  }, []); // O array vazio [] garante que este efeito corre apenas uma vez

  // Lógica de renderização condicional
  if (loading) {
    return <div className="App"><h1>A carregar produtos...</h1></div>;
  }

  if (error) {
    return <div className="App"><h1>{error}</h1></div>;
  }

  // 3. Renderizar a lista de produtos
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bem-vindo à TechZone</h1>
      </header>
      <main>
        <h2>Nossos Produtos</h2>
        <div className="products-grid">
          {/* Usamos o .map() para criar um elemento JSX para cada produto no array */}
          {products.map((product) => (
            <div key={product._id} className="product-card">
              {/* A 'key' é muito importante para o React saber qual item é qual */}
              <img src={product.image || 'https://aiwa.vtexassets.com/arquivos/ids/156402-800-800?v=638839454688430000&width=800&height=800&aspect=true'} alt={product.name}/>
              <h3>{product.name}</h3>
              <p className="price">Kz {product.price.toLocaleString()}</p>
              <p>{product.brand}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
// frontend/src/main.tsx
import React from "react"; // React deve ser importado
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// Importar as páginas e o CSS
import HomePage from "./pages/HomePage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import "./index.css";
// Vamos precisar de um ficheiro de estilos global. Pode ser o App.css ou index.css
// import './App.css';

// Componente de Layout (pode estar no seu próprio ficheiro, ex: layouts/AppLayout.tsx)
const AppLayout = () => {
  return (
    <div className="App">
      {" "}
      {/* A classe App vem do seu CSS */}
      <header className="App-header">
        <h1>Bem-vindo à TechZone</h1>
      </header>
      <main>
        <Outlet /> {/* As páginas da rota serão renderizadas aqui */}
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

// O ficheiro App.tsx original não é mais necessário aqui, pois o router controla o que é renderizado.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

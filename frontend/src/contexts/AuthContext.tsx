import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 1. Interface para os dados do Utilizador
export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

// 2. Interface para o valor do Contexto
export interface AuthContextType {
  userInfo: UserInfo | null;
  loading: boolean;
  login: (userData: UserInfo) => void;
  logout: () => void;
}

// 3. Criação do Contexto
export const AuthContext = createContext<AuthContextType | null>(null);

// 4. Componente Provider (O gestor do estado)
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Efeito para carregar os dados do localStorage quando a aplicação inicia
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      try {
        setUserInfo(JSON.parse(storedUserInfo));
      } catch (error) {
        console.error("Falha ao analisar userInfo do localStorage:", error);
        localStorage.removeItem('userInfo'); // Limpa dados corrompidos
      } finally {
        setLoading(false);
      }
    }
  }, []);

  // Funções para manipular o estado
  const login = (userData: UserInfo) => {
    setUserInfo(userData);
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
  };

  const value = { userInfo, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// 5. Custom Hook (The Short Form)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
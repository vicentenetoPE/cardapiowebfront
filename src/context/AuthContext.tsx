import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { httpClient } from '../config/httpClient';

// Definição do tipo de usuário retornado pela API
interface User {
  name: string;
    token: string;
}

// Tipo do contexto de autenticação
interface AuthContextType {
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
}

// Cria o contexto com valor inicial indefinido
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider que envolve a aplicação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Carrega usuário do localStorage ao montar
  useEffect(() => {
    const token = localStorage.getItem('authUser');
    if (token) {
      setUser({
        name: 'Usuário',
        token,
      });
    }
  }, []);

  // Função de login
  const signIn = async (usuario: string, senha: string) => {
    const response = await httpClient.post('/login', {
        usuario, senha
    }) 

    const token = response.data.token;
    if (!token) {
      throw new Error('Falha ao autenticar');
    }
    const loggedInUser: User = {
      name: usuario,
     token,
    };
    setUser(loggedInUser);
    localStorage.setItem('authUser', loggedInUser.token);
  };

  // Função de logout
  const signOut = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para consumir o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

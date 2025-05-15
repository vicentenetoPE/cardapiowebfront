import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SocketProvider } from './context/SocketContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <ModalProvider>
        <AuthProvider>


        <App />
        </AuthProvider>
      </ModalProvider>
    </SocketProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SocketProvider } from './context/SocketContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </SocketProvider>
  </StrictMode>,
)

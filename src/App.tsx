import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { useSocket } from "./context/SocketContext";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContext";
import SignIn from "./components/Login";
import { CompanyProvider } from "./context/CompanyContext";

function App() {
  const socket = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    socket.on("connect", () => console.log("⚡️ conectado com id", socket.id));
    socket.on("connect_error", (err) => console.error("⚡️ erro de conexão", err));
  }, [socket]);

  if (!user && import.meta.env.VITE_AUTH_ENABLED === "true") {
    return <SignIn />;
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 p-6">
      <CompanyProvider>
        <Dashboard />
        <ToastContainer />
      </CompanyProvider>
    </div>
  );
}

export default App;

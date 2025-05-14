import { useEffect } from "react";
import Dashboard from "./components/Dashboard";
import { useSocket } from "./context/SocketContext";
import { ToastContainer } from "react-toastify";

function App() {
  const socket = useSocket();
  useEffect(() => {
    socket.on("connect", () =>   console.log("⚡️ conectado com id", socket.id));
    socket.on("connect_error", err => console.error("⚡️ erro de conexão", err));
  }, [socket]);

  
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 p-6">
      <Dashboard />
      <ToastContainer />
    </div>
  );
}

export default App;

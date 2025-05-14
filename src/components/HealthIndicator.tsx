import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";



const HealthIndicator: React.FC = () => {
  const socket = useSocket();
  const [isHealthy, setIsHealthy] = React.useState(false);

  useEffect(() => {
    socket.on("health", (message: { health: boolean }) => {
      setIsHealthy(message.health);
      console.log("⚡️ status de saúde recebido", message.health);
    });
    return () => {
      socket.off("health");
    };
  }, [socket]);



  return (
    <div className="flex items-center space-x-2">
      <span
        className={`w-3 h-3 rounded-full ${
          isHealthy ? "bg-green-500" : "bg-red-500"
        }`}
      ></span>
      <span className="">{isHealthy ? "Credenciais" : "Credenciais"}</span>
    </div>
  );
};

export default HealthIndicator;

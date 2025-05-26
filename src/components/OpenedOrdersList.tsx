import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpClient } from "../config/httpClient";
import { useSocket } from "../context/SocketContext";
import { DetailedOrder } from "../types/detailedOrder";
import { Placeholder } from "./Placeholder";

export interface Job {
  id: string;
  payload: { orderId: string };
  runAt: string;
}

export interface OrderQueuedInterface extends DetailedOrder {
  timeoutStatus: boolean;
  timeOutFinishesAt: string;
  callDriverStatus: "pending" | "success" | "canceled" | "error";

}

export const OpenedOrdersList: React.FC = () => {
  const socket = useSocket();
  const [orders, setOrders] = useState<OrderQueuedInterface[]>([]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    socket.on("new_order", (message: OrderQueuedInterface[]) => {
      console.log("new_order", message);
      setOrders(message.reverse());
    });

    return () => {
      socket.off("new_order");
    };
  }, [socket]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCancel = async (id: string) => {
    const res = await httpClient.get(`/orders/cancelRequestDriver/${id}`);
    if (res.status === 200) {
      toast.success("Pedido cancelado com sucesso");
    } else {
      toast.error("Erro ao cancelar o pedido");
    }
  };

  const formatRemaining = (runAt: string) => {
    const runAtDate = new Date(runAt).getTime();
    const diff = runAtDate - now;
    if (diff <= 0) {
      return "0s";
    }
    const secondsTotal = Math.floor(diff / 1000);
    const hours = Math.floor(secondsTotal / 3600);
    const minutes = Math.floor((secondsTotal % 3600) / 60);
    const seconds = secondsTotal % 60;
    const parts = [];
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    parts.push(`${seconds}s`);
    return parts.join(" ");
  };

  const handleCallDelivery = async (id: string) => {
    const res = await httpClient.get(`/requestDriver/${id}`);
    if (res.status === 200) {
      toast.success("Pedido chamado com sucesso");
    } else {
      toast.error("Erro ao chamar o pedido");
    }
  }

  return (
    <div className="flex flex-col flex-1 bg-white p-6 shadow">
      <header className="mb-6 text-center flex gap-2 items-center justify-center">
        <h2 className="text-lg font-semibold">Pedidos em fila de entrega</h2>
        <span className="font-bold text-gray-400">{orders.length}</span>
      </header>
      {orders.length ? (
        <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border-l-4 border-green-600 p-4 rounded shadow">
              <div className="w-full md:w-auto">
                <span className="block font-semibold text-red-700">{order.customer?.name} <span className="text-blue-700">- R$ {order.total}</span></span>
                <div className="flex md:flex-col justify-between md:justifiy-start">
                <span className="block text-sm text-gray-600">
                  {order.delivery_address?.street} - {order.delivery_address?.number}
                </span>
                <span className="text-sm font-bold text-gray-600">{formatRemaining(order.timeOutFinishesAt)}</span>
                </div>
              </div>
              <div className="flex gap-3 ">
                <button onClick={() => handleCallDelivery(order.id)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded mr-2">
                  Chamar delivery
                </button>

                <button onClick={() => handleCancel(order.id)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">
                  Cancelar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Placeholder message="Não há items Em aberto"></Placeholder>
      )}
    </div>
  );
};

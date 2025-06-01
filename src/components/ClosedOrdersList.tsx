import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { DetailedOrder } from "../types/detailedOrder";
import { extractTime } from "../utils/extractTime";
import { OrderQueuedInterface } from "./OpenedOrdersList";
import { Placeholder } from "./Placeholder";
import { OrderStatus } from "./OrderStatus";

const ClosedOrdersList: React.FC = () => {
  const [orders, setOrders] = React.useState<OrderQueuedInterface[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on("unsucessfulOrder", (message: OrderQueuedInterface[]) => {
      setOrders(message.reverse());
    });

    return () => {
      socket.off("unsucessfulOrder");
    };
  }, [socket]);


  return (
    <div className="flex flex-col bg-white flex-1 rounded shadow p-6">
      <header className="mb-6 text-center flex gap-2 items-center justify-center">
        <h2 className="text-lg font-semibold"> Pedidos fechados</h2>
        <span className="font-bold text-gray-400">{orders.length}</span>
      </header>
      {orders.length === 0 ? (
        <Placeholder message="Não há items concluídos"></Placeholder>
      ) : (
        <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
          {orders.map((order) => (
            <li key={order.id} className="flex w-full items-center justify-between bg-white border-l-4 border-red-600 p-4 rounded shadow">
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <span className="block font-semibold text-red-700">
                    {order.client?.name} <span className="text-blue-700">- R$ {order.total}</span>
                  </span>
                <span className="block text-sm text-gray-600">
                  {order.delivery_address?.street} - {order.delivery_address?.house_number}
                </span>
                </div>
                <div className="flex flex-col items-center">
                  <span>{extractTime(order.created_at)}</span>
                  <OrderStatus status={order.callDriverStatus} />
                </div>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClosedOrdersList;

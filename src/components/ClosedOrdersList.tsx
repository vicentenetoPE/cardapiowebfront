import React, { useEffect } from "react";
import { useSocket } from "../context/SocketContext";
import { DetailedOrder } from "../types/detailedOrder";
import { extractTime } from "../utils/extractTime";
import { OrderQueuedInterface } from "./OpenedOrdersList";
import { Placeholder } from "./Placeholder";
import { OrderStatus } from "./OrderStatus";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { httpClient } from "../config/httpClient";

const ClosedOrdersList: React.FC = () => {
  const [orders, setOrders] = React.useState<OrderQueuedInterface[]>([]);
  const [statusFilter, setStatusFilter] = React.useState<string>("");
  const [filteredOrders, setFilteredOrders] = React.useState<OrderQueuedInterface[]>([]);
  const socket = useSocket();

  useEffect(() => {
    socket.on("unsucessfulOrder", async () => {
      const res = await httpClient.get(`/orders/closed`);
      const message: OrderQueuedInterface[] = res.data;
      setFilteredOrders(message.reverse());
      setOrders(message.reverse());
    });

    return () => {
      socket.off("unsucessfulOrder");
    };
  }, [socket]);

  const onChangeStatus = (e: SelectChangeEvent) => {
    const status = e.target.value as string;
    setStatusFilter(status);
    if (status === "") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => order.callDriverStatus === status);
      setFilteredOrders(filtered);
    }
  };

  return (
    <div className="flex flex-col bg-white flex-1 rounded shadow p-6 gap-4">
      <header className="text-center flex gap-2 items-center justify-center">
        <h2 className="text-lg font-semibold"> Pedidos fechados</h2>
        <span className="font-bold text-gray-400">{orders.length}</span>
      </header>
      <div className="flex gap-4 justify-between items-center flex-col md:flex-row">
        <TextField className="w-full md:flex-1" id="outlined-basic" label="Cliente" variant="outlined" />
        <FormControl className="w-full md:w-[200px]">
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select onChange={onChangeStatus} defaultValue={""} label="Status">
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="success">Entregues</MenuItem>
            <MenuItem value="canceled">Cancelados</MenuItem>
            <MenuItem value="error">Erro</MenuItem>
          </Select>
        </FormControl>
      </div>
      {orders.length === 0 ? (
        <Placeholder message="Não há items concluídos"></Placeholder>
      ) : (
        <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)]">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex w-full items-center justify-between bg-white border-l-4 border-red-600 p-4 rounded shadow"
            >
              <div className="w-full flex justify-between">
                <div className="flex flex-col">
                  <span className="block font-semibold text-red-700">
                    {order.customer?.name} <span className="text-blue-700">- R$ {order.total}</span>
                  </span>
                  <span className="block text-sm text-gray-600">
                    {order.delivery_address?.street} - {order.delivery_address?.number}
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

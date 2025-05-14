import React from "react";
import { Chip } from "@mui/material";
import { OrderQueuedInterface } from "./OpenedOrdersList";




export const OrderStatus: React.FC<{ status: OrderQueuedInterface['callDriverStatus'] }> = ({ status }) => {
  if (status === "success") {
    return (
      <Chip
        label="Sucesso"
        color="success"
        variant="outlined"
      />
    );
  }

  return (
    <Chip
      label="Cancelado"
      color="error"
      variant="outlined"
    />
  );
};

// delivery: pedido para entrega. Disponível apenas se order_type for delivery.
// takeout: pedido para retirada. Disponível apenas se order_type for takeout.
// onsite: pedido para consumo no local. Disponível apenas se order_type for onsite.
// closed_table: pedido para consumo na mesa. Disponível apenas se order_type for closed_table.
export type OrderType = "delivery" | "takeout" | "onsite" | "closed_table";
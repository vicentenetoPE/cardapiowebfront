// waiting_confirmation: pedido pendente.
// pending_payment: pedido de balcão com pagamento pendente. Disponível apenas se sales_channel for store_front_catalog.
// pending_online_payment: pedido aguardando confirmação de um pagamento online. Usado no caso de pedidos com pagamento por pix automático.
// scheduled_confirmed: pedido agendado confirmado. Disponível apenas se order_timing for scheduled.
// confirmed: pedido confirmado e em preparação.
// ready: pedido pronto, mas ainda não está disponível para retirada e nem saiu para entrega.
// released: pedido saiu para entrega. Disponível apenas se order_type for delivery.
// waiting_to_catch: pedido pronto e esperando retirada. Disponível apenas se order_type for takeout ou onsite.
// delivered: pedido entregue. Disponível apenas se order_type for delivery.
// canceling: pedido em processo de cancelamento. Uma vez nesse status o pedido irá para o status canceled ou então voltará para o status anterior. Usado no caso de pedidos com pagamento por cartão de crédito online.
// canceled: pedido cancelado.
// closed: pedido finalizado.
export type OrderStatus =
  | "waiting_confirmation"
  | "pending_payment"
  | "pending_online_payment"
  | "scheduled_confirmed"
  | "confirmed"
  | "ready"
  | "released"
  | "waiting_to_catch"
  | "delivered"
  | "canceling"
  | "canceled"
  | "closed";

// Indica o tipo de pedido.
// scheduled: pedido agendado. Disponível apenas se order_timing for scheduled.
// immediate: pedido imediato. Disponível apenas se order_timing for immediate.

export type OrderTiming = "scheduled" | "immediate";

import { OrderStatus } from "./orderStatus.type";

export interface Order {
    event_id: string;
    event_type: "ORDER_STATUS_UPDATED"|"ORDER_CREATED";
    merchant_id: string;
    order_id: string;
    order_status: OrderStatus;
    created_at: string;
}

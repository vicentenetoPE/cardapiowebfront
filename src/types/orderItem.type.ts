export interface OrderItem {
    item_id: number;
    order_item_id: number;
    external_code: string | null;
    name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    kind: string;
    status: string;
    observation: string | null;
    options: Array<any>;
    items: Array<any>;
}
import { Customer } from "./customer.type";
import { DeliveryAddress } from "./deliveryAddress.type";
import { DeliveredBy } from "./deliveryBy.type";
import { OrderItem } from "./orderItem.type";
import { OrderStatus } from "./orderStatus.type";
import { OrderTiming } from "./orderTiming.type";
import { OrderType } from "./orderType.type";
import { Payment } from "./payment.type";
import { SalesChannel } from "./salesChannel.type";

export interface DetailedOrder {
  id: string;
  display_id: string;
  merchant_id: string;
  status: OrderStatus;
  order_type: OrderType;
  order_timing: OrderTiming;
  sales_channel: SalesChannel;
  customer_origin: string | null;
  delivered_by: DeliveredBy;
  table_number: string | null;
  estimated_time: number | null;
  cancellation_reason: string | null;
  fiscal_document: string | null;
  delivery_fee: number;
  service_fee: number;
  additional_fee: number;
  total: number;
  created_at: string;
  updated_at: string;
  schedule: string | null;
  client: Customer | null;
  delivery_address: DeliveryAddress | null;
  items: OrderItem[];
  discounts: any[];
  payments: Payment[];
}

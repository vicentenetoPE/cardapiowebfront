import { PaymentMethod } from "./paymentMethod.type";
import { PaymentStatus } from "./paymentStatus.type";
import { PaymentType } from "./paymentType.type";

export interface Payment {
    total: number;
    payment_method: PaymentMethod;
    payment_type: PaymentType;
    payment_fee: number;
    change_for: number | null;
    status: PaymentStatus;
    card_brand: string | null;
    card_number: string | null;
    observation: string | null;
  }
export interface DeliveryAddress {
    street: string;
    house_number: string | null;
    address_block: string | null;
    address_lot: string | null;
    neighborhood: string;
    complement: string | null;
    reference: string | null;
    postal_code: string | null;
    city: string;
    state: string;
    latitude: string | null;
    longitude: string | null;
}
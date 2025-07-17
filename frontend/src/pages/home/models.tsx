export interface OrderInfo {
  date: string;
  initiator: string;
  by_order: string;
  by_bank: string;
  source: string;
  country: string;
  address: string;
  id: string;
}

export interface Item {
  id: string;
  name: string;
  count: number;
  price_by_one: number;
  check: boolean;
  return_count: number | null;
  return_check: boolean;
  return_date: string | null;
}

export interface OrderResponse {
  order: OrderInfo;
  items: Item[];
}

export interface OrderPost {
  date: string | null;
  initiator: string | null;
  by_order: string | null;
  by_bank: string | null;
  source: string | null;
  country: string | null;
  address: string | null;
}

export interface ItemPost {
  order_id: string;
  name: string | null;
  count: number | null;
  price_by_one: number | null;
  check: boolean | null;
  return_count: number | null;
  return_check: boolean | null;
  return_date: string | null;
}
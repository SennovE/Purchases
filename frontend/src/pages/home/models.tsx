export interface OrderInfo {
  id: string;
  date: string | null;
  initiator: string | null;
  by_order: string | null;
  by_bank: string | null;
  source: string | null;
  country: string | null;
  address: string | null;
  paid: number | null;
  total_amount: number | null;
}

export interface ItemInfo {
  id: string;
  name: string | null;
  count: number | null;
  price_by_one: number | null;
  return_count: number | null;
  return_check: boolean | null;
  return_date: string | null;
}

export interface OrderChoices {
  initiator: string[];
  by_order: string[];
  by_bank: string[];
  source: string[];
  country: string[];
  address: string[];
}
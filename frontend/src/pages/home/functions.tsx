import axios from 'axios';
import type { ItemPost, OrderPost } from './models';


export async function getOrders(setLoading: Function, setOrders: Function) {
  setLoading(true);
  await fetchOrders(setOrders);
  setLoading(false);
}

export async function fetchOrders(setOrders: Function) {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return;
  try {
    const result = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/order`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setOrders(result.data);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteOrder(id: string, setOrders: Function) {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return;
  try {
    await axios.delete(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/order/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await fetchOrders(setOrders);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteItem(id: string, setOrders: Function) {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return;
  try {
    await axios.delete(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/item/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await fetchOrders(setOrders);
  } catch (err) {
    console.error(err);
  }
}

export async function addOrder(order: OrderPost, setOrders: Function): Promise<Boolean> {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return false;
  try {
    await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/order`,
      { order: order, items: [] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await fetchOrders(setOrders);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export async function addItem(item: ItemPost, setOrders: Function): Promise<Boolean> {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return false;
  try {
    await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/item`,
      { ...item },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await fetchOrders(setOrders);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export async function patchItem(id: string, item: ItemPost, setOrders: Function): Promise<Boolean> {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return false;
  try {
    await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/item/${id}`,
      { ...item },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await fetchOrders(setOrders);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}

export async function patchOrder(id: string, order: OrderPost, setOrders: Function): Promise<Boolean> {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return false;
  try {
    await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/order/${id}`,
      { ...order },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await fetchOrders(setOrders);
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
}
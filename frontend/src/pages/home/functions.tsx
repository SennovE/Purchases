import axios, { type AxiosResponse } from 'axios';
import type { OrderChoices } from './models';


export async function getOrderChoices(): Promise<OrderChoices | null> {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return null;
  try {
    const result: AxiosResponse<OrderChoices> = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/order/choices`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result.data;
  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function deleteObject(id: string, url: string) {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return;
  try {
    await axios.delete(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/${url}/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (err) {
    console.error(err);
  }
}

export async function patchObject<T>(id: string, field: string, value: T, url: string): Promise<Boolean> {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return false;
  try {
    await axios.patch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/${url}/${id}`,
      { [field]: value },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
}

export async function addObject(url: string): Promise<Boolean> {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return false;
  try {
    await axios.post(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/${url}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
}

export async function getObject<T>(url: string): Promise<T | null> {
  const token = localStorage.getItem('purchasesToken');
  if (!token) return null;
  try {
    const result: AxiosResponse<T> = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/${url}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result.data;
  } catch (err) {
    console.error(err);
  }
  return null;
}
import axios, { type AxiosResponse } from 'axios';
import type { OrderChoices } from './models';

const baseURL = `${import.meta.env.VITE_APP_BACKEND_URL}/api`;

const api = axios.create({ baseURL });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('purchasesToken');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getOrderChoices(): Promise<OrderChoices | null> {
  try {
    const result: AxiosResponse<OrderChoices> = await api.get(`/order/choices`);
    return result.data;
  } catch (err) {
    console.error(err);
  }
  return null;
}

export async function deleteObject(id: string, url: string) {
  try {
    await api.delete(`/${url}/${id}`);
  } catch (err) {
    console.error(err);
  }
}

export async function patchObject<T>(
  id: string, field: string, value: T, url: string
): Promise<Boolean> {
  try {
    await api.patch(`/${url}/${id}`, { [field]: value });
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
}

export async function addObject(url: string): Promise<Boolean> {
  try {
    await api.post(`/${url}`, {});
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
}

export async function getObject<T>(url: string): Promise<T | null> {
  try {
    const result: AxiosResponse<T> = await api.get(`/${url}`);
    return result.data;
  } catch (err) {
    console.error(err);
  }
  return null;
}
import { Navigate } from 'react-router-dom';
import './index.css'
import { useEffect, useState } from 'react';
import type { OrderResponse } from './models';
import { OrdersTable } from './orders/orders_table';
import { getOrders } from './functions'


export default function Login() {
  const token = localStorage.getItem('purchasesToken');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderResponse[]>([]);

  useEffect(() => {
    getOrders(setLoading, setOrders);
  }, []);

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='main-page'>
      {loading && <h1>Загрузка...</h1>}
      {!loading && <OrdersTable
        orders={orders}
        setOrders={setOrders}
      />}
    </div>
  );
}

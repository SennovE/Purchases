import './index.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { OrdersTable } from './table/orders';
import { ItemsTable } from './table/items';

export default function MainPage() {
  const token = localStorage.getItem('purchasesToken');
  const [orderIdForItems, setOrderIdForItems] = useState<string | null>(null);

  if (!token) return <Navigate to='/login' replace />;

  const showItems = orderIdForItems !== null;

  return (
    <div className='main-page'>
      <div className="tables-slider-wrapper">
        <div className={`tables-slider-track ${showItems ? 'items' : 'orders'}`}>
          <section className="tables-panel">
            <OrdersTable setOrderIdForItems={setOrderIdForItems} />
          </section>
          <section className="tables-panel">
            <ItemsTable
              orderIdForItems={orderIdForItems}
              setOrderIdForItems={setOrderIdForItems}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

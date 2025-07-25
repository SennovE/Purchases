import './index.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { OrdersTable } from './table/orders';
import { ItemsTable } from './table/items';
import { Popup } from './table/common/popup';
import { deleteObject } from './functions';

export default function MainPage() {
  const token = localStorage.getItem('purchasesToken');
  const [orderIdForItems, setOrderIdForItems] = useState<string | null>(null);
  const [popupOpenType, setPopupOpenType] = useState<string | null>(null);
  const [objectIdToDelete, setObjectIdToDelete] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState<string>('');

  if (!token) return <Navigate to='/login' replace />;

  const showItems = orderIdForItems !== null;

  const DeleteObject = async () => {
    if (popupOpenType && objectIdToDelete) {
      await deleteObject(objectIdToDelete, popupOpenType);
    }
  }

  const setOrderIdToDelete = (id: string) => {
    setObjectIdToDelete(id);
    setPopupOpenType('order');
  }

  const setItemIdToDelete = (id: string) => {
    setObjectIdToDelete(id);
    setPopupOpenType('item');
  }

  return (
    <div className='main-page'>
      <div className='tables-slider-wrapper'>
        <Popup
          name={popupOpenType === 'item' ? 'товар' : 'заказ'}
          func={DeleteObject}
          isOpen={popupOpenType}
          onClose={setPopupOpenType}
          setRefreshKey={setRefreshKey}
        />
        <div className={`tables-slider-track ${showItems ? 'items' : 'orders'}`}>
          <section className='tables-panel'>
            <OrdersTable 
              orderIdForItems={orderIdForItems}
              setOrderIdForItems={setOrderIdForItems}
              setObjectIdToDelete={setOrderIdToDelete}
              refreshKey={refreshKey}
            />
          </section>
          <section className='tables-panel'>
            <ItemsTable
              orderIdForItems={orderIdForItems}
              setOrderIdForItems={setOrderIdForItems}
              setObjectIdToDelete={setItemIdToDelete}
              refreshKey={refreshKey}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

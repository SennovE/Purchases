import { useState, type Dispatch, type SetStateAction } from 'react';
import type { OrderResponse, OrderPost } from '../models';
import '../index.css';
import { addOrder } from '../functions';
import { NewFieldsInputRow } from '../input_row';
import { OrderRow } from './orders_row';

interface Props {
  orders: OrderResponse[];
  setOrders: Dispatch<SetStateAction<OrderResponse[]>>;
}

export function OrdersTable({ orders, setOrders }: Props ) {
  const [editing, setEditing] = useState(0);
  const emptyNewOrder: OrderPost = {
    date: null,
    initiator: null,
    by_order: null,
    by_bank: null,
    source: null,
    country: null,
    address: null,
  };
  const [newOrder, setNewOrder] = useState<OrderPost>(emptyNewOrder);

  return (
    <div className='table-wrapper'>
      <table className='orders-table'>
        <thead>
          <tr>
            <th>
              <button type='button' onClick={() => {setEditing((editing + 1) % 2)}}>
                &#9998;
              </button>
            </th>
            {editing === 1 && <><th></th><th></th></>}
            <th colSpan={2}></th>
            <th colSpan={2}>Продавец</th>
            <th>Оплата</th>
            <th colSpan={2}>Получение</th>
          </tr>
          <tr>
            {editing === 1 && <><th></th><th></th></>}
            <th></th>
            <th>Дата<br/>авторизации</th>
            <th>Инициатор<br/>покупки</th>
            <th>По заказу</th>
            <th>По выписке<br/>банка</th>
            <th>Источник</th>
            <th>Страна</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (<OrderRow
            order={order.order}
            items={order.items}
            editing={editing}
            setOrders={setOrders}
          />))}
          {editing === 1 && <tr>
            <td></td>
            <NewFieldsInputRow<OrderPost>
              newFields={newOrder}
              fieldKeys={[
                ['date', 'date'],
                ['initiator', 'text'],
                ['by_order', 'text'],
                ['by_bank', 'text'],
                ['source', 'text'],
                ['country', 'text'],
                ['address', 'text'],
              ]}
              setNewFields={setNewOrder}
              resetFieldsFunc={() => {setNewOrder(emptyNewOrder)}}
              postFieldsFunc={async () => {
                return await addOrder(newOrder, setOrders)
              }}
            />
          </tr>}
        </tbody>
      </table>
    </div>
  );
}

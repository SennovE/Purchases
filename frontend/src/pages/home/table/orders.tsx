import { useEffect, useState } from 'react';
import { addObject, deleteObject, getObject, getOrderChoices } from '../functions';
import type { OrderChoices, OrderResponse } from '../models';
import { DropoutListInput } from './common/dropout-list';

export function OrdersTable() {
  const [choices, setChoices] = useState<OrderChoices | null>(null);
  const [orders, setOrders] = useState<OrderResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const order_fields: (keyof OrderChoices)[] = ['initiator', 'by_order', 'by_bank', 'source', 'country', 'address']

  
  const fetchChoices = async () => {
    const choices_data = await getOrderChoices();
    const orders_data = await getObject<OrderResponse[]>('order');
    setChoices(choices_data);
    setOrders(orders_data);
    setLoading(false);
  }

  useEffect(() => {
    fetchChoices();
  }, []);

  if (loading) return <h1>Загрузка...</h1>;
  if (!choices || !orders) return <h1>Произошла ошибка во время загрузки</h1>;

  return (
    <>
      <table className='orders-table'>
        <thead>
          <tr>
            <div></div>
            <th colSpan={2}></th>
            <th colSpan={2}>Продавец</th>
            <th>Оплата</th>
            <th colSpan={2}>Получение</th>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}>
              <button onClick={async () => {
                await addObject('order');
                setOrders(await getObject<OrderResponse[]>('order'));
              }}><b>+</b></button>
            </td>
            <th>Дата<br/>авторизации</th>
            <th>Инициатор<br/>покупки</th>
            <th>По заказу</th>
            <th>По выписке<br/>банка</th>
            <th>Источник</th>
            <th>Страна</th>
            <th>Адрес</th>
            <th>Товары</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order_info => (
            <tr key={order_info.order.id}>
              <td style={{ textAlign: 'center' }}>
                <button type='button' onClick={
                  async () => {
                    await deleteObject(order_info.order.id, 'order');
                    setOrders(await getObject<OrderResponse[]>('order'));
                  }
                }>
                  &#128465;
                </button>
              </td>
              <td><input type='date'></input></td>
              {order_fields.map(field_name => (
                <td key={field_name}>
                  <DropoutListInput
                    id={order_info.order.id}
                    field={field_name}
                    field_value={order_info.order[field_name]}
                    patch_url='order'
                    list={choices[field_name]}
                  />
                </td>
              ))}
              <td style={{ textAlign: 'center' }}>
                <button type='button' onClick={() => {}}>
                  { '>>' }
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
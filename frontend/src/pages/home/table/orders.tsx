import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { addObject, getObject, getOrderChoices } from '../functions';
import type { OrderChoices, OrderInfo } from '../models';
import { DropoutListInput } from './common/dropout-list';
import { AutoPatchInput } from './common/auto-patch-input';

interface Props {
  orderIdForItems: string | null;
  setOrderIdForItems: Dispatch<SetStateAction<string | null>>;
  setObjectIdToDelete: (id: string) => void;  
  refreshKey: string;
}

export function OrdersTable({
  orderIdForItems, setOrderIdForItems, setObjectIdToDelete, refreshKey
}: Props) {
  const [choices, setChoices] = useState<OrderChoices | null>(null);
  const [orders, setOrders] = useState<OrderInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const orderFields: (keyof OrderChoices)[] = [
    'initiator', 'by_order', 'by_bank', 'country', 'address', 'source'
  ]
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [choicesData, ordersData] = await Promise.all([
        getOrderChoices(),
        getObject<OrderInfo[]>('order'),
      ]);
      setChoices(choicesData);
      setOrders(ordersData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (orderIdForItems === null) {
      fetchData();
    }
  }, [orderIdForItems, fetchData]);

  useEffect(() => {
    if (refreshKey === 'order') fetchData();
  }, [refreshKey]);

  if (loading) return <h1>Загрузка...</h1>;
  if (!choices || !orders) return <h1>Произошла ошибка во время загрузки</h1>;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Заказы</h1>
      <table>
        <thead>
          <tr>
            <th style={{ border: 0, background: 'transparent' }}></th>
            <th colSpan={2}></th>
            <th colSpan={2}>Продавец</th>
            <th colSpan={2}>Получение</th>
            <th colSpan={3}>Оплата</th>
          </tr>
          <tr className='bottom-header'>
            <th style={{ textAlign: 'center' }}>
              <button onClick={async () => {
                await addObject('order');
                setOrders(await getObject<OrderInfo[]>('order'));
              }}><b style={{ fontSize: 20 }}>+</b></button>
            </th>
            <th>Дата<br/>авторизации</th>
            <th>Инициатор<br/>покупки</th>
            <th>По заказу</th>
            <th>По выписке<br/>банка</th>
            <th>Страна</th>
            <th>Адрес</th>
            <th>Источник</th>
            <th>Сумма, &euro;</th>
            <th>Check</th>
            <th>Товары</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(orderInfo => (
            <tr key={orderInfo.id}>
              <td style={{ textAlign: 'center' }}>
                <button type='button' onClick={() => {
                  setObjectIdToDelete(orderInfo.id)
                }}>
                  &#128465;
                </button>
              </td>
              <td>
                <AutoPatchInput
                  object={orderInfo}
                  setObjects={setOrders}
                  field={'date'} 
                  fieldType={'date'}
                  url={'order'}
                />
              </td>
              {orderFields.map(fieldName => (
                <td key={fieldName}>
                  <DropoutListInput
                    id={orderInfo.id}
                    field={fieldName}
                    fieldValue={orderInfo[fieldName]}
                    patchUrl='order'
                    list={choices}
                    listSetter={setChoices}
                  />
                </td>
              ))}
              <td>
                <AutoPatchInput
                  object={orderInfo}
                  setObjects={setOrders}
                  field={'paid'} 
                  fieldType={'number'}
                  url={'order'}
                />
              </td>
              <td className='computed-field'>
                { orderInfo.total_amount === orderInfo.paid ? 'OK' : 'ERROR' }
              </td>
              <td style={{ textAlign: 'center' }}>
                <button type='button' onClick={() => setOrderIdForItems(orderInfo.id)}>
                  { '>>' }
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { addObject, deleteObject, getObject } from '../functions';
import type { ItemInfo } from '../models';
import { AutoPatchInput } from './common/auto-patch-input';

interface Props {
  orderIdForItems: string | null;
  setOrderIdForItems: Dispatch<SetStateAction<string | null>>;
}

export function ItemsTable({ orderIdForItems, setOrderIdForItems }: Props) {
  const [items, setItems] = useState<ItemInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const rowElems1: [keyof ItemInfo, string][] = [
    ['name', 'text'],
    ['count', 'number'],
    ['price_by_one', 'number'],
  ]

  
  const fetchData = async () => {
    if (orderIdForItems) {
      const itemsData = await getObject<ItemInfo[]>(`item/${orderIdForItems}`);
      setItems(itemsData);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [orderIdForItems]);

  if (loading) return <h1>Загрузка...</h1>;
  if (!items) return <h1>Произошла ошибка во время загрузки</h1>;

  return (
    <>
      <div className='title-bar'>
        <button onClick={() => setOrderIdForItems(null)}>{'<<'}</button>
        <h1>Товары</h1>
        <span className='spacer' />
      </div>
      <table>
        <thead>
          <tr>
            <th style={{ border: 0, background: 'transparent' }}></th>
            <th colSpan={4}>Состав покупки</th>
            <th colSpan={4}>Возврат</th>
          </tr>
          <tr className='bottom-header'>
            <th style={{ textAlign: 'center' }}>
              <button onClick={async () => {
                await addObject(`item/${orderIdForItems}`);
                setItems(await getObject<ItemInfo[]>(`item/${orderIdForItems}`));
              }}><b style={{ fontSize: 20 }}>+</b></button>
            </th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Цена, &euro;</th>
            <th>Сумма, &euro;</th>
            <th>Количество</th>
            <th>Сумма, &euro;</th>
            <th>Подтверждение</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {items.map(itemInfo => (
            <tr key={itemInfo.id}>
              <td style={{ textAlign: 'center' }}>
                <button type='button' onClick={
                  async () => {
                    await deleteObject(itemInfo.id, 'item');
                    setItems(await getObject<ItemInfo[]>(`item/${orderIdForItems}`));
                  }
                }>
                  &#128465;
                </button>
              </td>
              {rowElems1.map(elem => (
                <td>
                  <AutoPatchInput
                    object={itemInfo}
                    setObjects={setItems}
                    field={elem[0]} 
                    fieldType={elem[1]}
                    url={'item'}
                  />
                </td>
              ))}
              <td className='computed-field'>
                { (itemInfo.count ?? 0) * (itemInfo.price_by_one ?? 0) }
              </td>
              <td>
                <AutoPatchInput
                  object={itemInfo}
                  setObjects={setItems}
                  field={'return_count'} 
                  fieldType={'number'}
                  url={'item'}
                />
              </td>
              <td className='computed-field'>
                { (itemInfo.return_count ?? 0) * (itemInfo.price_by_one ?? 0) }
              </td>
              <td className='computed-field'>
                { itemInfo.return_date ? 'OK' : '' }
              </td>
              <td>
                <AutoPatchInput
                  object={itemInfo}
                  setObjects={setItems}
                  field={'return_date'} 
                  fieldType={'date'}
                  url={'item'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
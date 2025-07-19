import { useState, type Dispatch, type SetStateAction } from 'react';
import { addItem } from '../functions';
import { NewFieldsInputRow } from '../input_row';
import type { Item, ItemPost, OrderResponse } from '../models'
import { ItemRow } from './items_row';

interface Props {
  items: Item[];
  orderId: string,
  editing: Number;
  setOrders: Dispatch<SetStateAction<OrderResponse[]>>;
}

export function ItemsTable({ items, orderId, editing, setOrders }: Props) {
  const emptyNewItem: ItemPost = {
    order_id: orderId,
    name: null,
    count: null,
    price_by_one: null,
    check: false,
    return_count: null,
    return_check: false,
    return_date: null,
  };
  const [newItem, setNewItem] = useState<ItemPost>(emptyNewItem);

  return (
    <table className='items-table'>
      <thead>
        <tr>
          {editing === 1 && <><th></th><th></th></>}
          <th colSpan={4}>Состав покупки</th>
          <th></th>
          <th></th>
          <th colSpan={4}>Возврат</th>
        </tr>
        <tr>
          {editing === 1 && <><th></th><th></th></>}
          <th>Наименование</th>
          <th>Количество</th>
          <th>Цена за штуку, &euro;</th>
          <th>Сумма, &euro;</th>
          <th>CHECK</th>
          <th></th>
          <th>Количество</th>
          <th>Сумма, &euro;</th>
          <th>Подтверждение</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <ItemRow item={item} orderId={orderId} editing={editing} setOrders={setOrders}/>
        ))}
        {editing === 1 && <tr>
          <NewFieldsInputRow<ItemPost>
            newFields={newItem}
            fieldKeys={[
              ['name', 'text'],
              ['count', 'number'],
              ['price_by_one', 'number'],
              null,
              ['check', 'checkbox'],
              null,
              ['return_count', 'number'],
              null,
              ['return_check', 'checkbox'],
              ['return_date', 'date'],
            ]}
            setNewFields={setNewItem}
            resetFieldsFunc={() => {setNewItem(emptyNewItem)}}
            postFieldsFunc={async () => {
              return await addItem(newItem, setOrders)
            }}
          />
        </tr>}
      </tbody>
    </table>
  );
}
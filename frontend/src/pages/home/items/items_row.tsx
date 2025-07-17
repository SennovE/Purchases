import { useState, type Dispatch, type SetStateAction } from "react";
import { deleteItem, patchItem } from "../functions";
import type { Item, ItemPost, OrderResponse } from "../models";
import { NewFieldsInputRow } from "../input_row";


interface Props {
  item: Item;
  orderId: string;
  editing: Number;
  setOrders: Dispatch<SetStateAction<OrderResponse[]>>;
}

export function ItemRow({ item, orderId, editing, setOrders }: Props) {
  const editedDefaultItem: ItemPost = {
    order_id: orderId,
    name: item.name,
    count: item.count,
    price_by_one: item.price_by_one,
    check: item.check,
    return_count: item.return_count,
    return_check: item.return_check,
    return_date: item.return_date,
  };
  const [editedItem, setEditedItem] = useState<ItemPost>(editedDefaultItem);
  const [editingRow, setEditingRow] = useState(false);

  return (
    <tr key={item.id}>
      {editing === 1 && !editingRow && <>
        <td>
          <button type='button' onClick={
            () => deleteItem(item.id, setOrders)
          }>
            &#128465;
          </button>
        </td>
        <td>
          <button type='button' onClick={
            () => {setEditingRow(!editingRow); setEditedItem(editedDefaultItem)}
          }>
            &#9998;
          </button>
        </td>
      </>}
      {editingRow && <NewFieldsInputRow<ItemPost>
        newFields={editedItem}
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
        setNewFields={setEditedItem}
        resetFieldsFunc={() => {setEditedItem(editedDefaultItem); setEditingRow(false);}}
        postFieldsFunc={async () => {
          return await patchItem(item.id, editedItem, setOrders)
        }}
      />}
      {!editingRow && <>
        <td>{item.name}</td>
        <td>{item.count}</td>
        <td>{item.price_by_one}</td>
        <td>{item.price_by_one * item.count}</td>
        <td>{item.check ? 'OK' : ''}</td>
        <td></td>
        <td>{(item.return_count ?? 0)}</td>
        <td>{item.price_by_one * (item.return_count ?? 0)}</td>
        <td>{item.return_check ? 'OK' : ''}</td>
        <td>{
          item.return_date
          ? (new Date(item.return_date).toLocaleDateString('ru-RU', {
              weekday: 'short',
              day: 'numeric',
              month: 'long',
              year: 'numeric'
          }))
          : ''
        }</td>
      </>}
    </tr>
  );
}
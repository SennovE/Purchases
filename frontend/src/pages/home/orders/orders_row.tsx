import { Fragment, useState, type Dispatch, type SetStateAction } from "react";
import type { Item, OrderInfo, OrderPost, OrderResponse } from "../models";
import { deleteOrder, patchOrder } from "../functions";
import { ItemsTable } from "../items/items_table";
import '../index.css';
import { NewFieldsInputRow } from "../input_row";

interface Props {
  order: OrderInfo;
  items: Item[];
  editing: Number;
  setOrders: Dispatch<SetStateAction<OrderResponse[]>>;
}

export function OrderRow({ order, items, editing, setOrders }: Props) {
  const editedDefaultItem: OrderPost = {
    date: order.date,
    initiator: order.initiator,
    by_order: order.by_order,
    by_bank: order.by_bank,
    source: order.source,
    country: order.country,
    address: order.address,
  };
  const [editedItem, setEditedItem] = useState<OrderPost>(editedDefaultItem);
  const [itemsShowen, setItemsShowen] = useState(false);
  const [editingRow, setEditingRow] = useState(false);

  return (
    <Fragment key={order.id}>
      <tr className='order-row'>
        <td>
          <button type='button' onClick={() => setItemsShowen(!itemsShowen)}>
            {itemsShowen ? '\u2227' : '\u2228'}
          </button>
        </td>
        {editing === 1 && !editingRow && <>
          <td>
            <button type='button' onClick={
              () => deleteOrder(order.id, setOrders)
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
        {editingRow && <NewFieldsInputRow<OrderPost>
          newFields={editedItem}
          fieldKeys={[
            ['date', 'date'],
            ['initiator', 'text'],
            ['by_order', 'text'],
            ['by_bank', 'text'],
            ['source', 'text'],
            ['country', 'text'],
            ['address', 'text'],
          ]}
          setNewFields={setEditedItem}
          resetFieldsFunc={() => {setEditedItem(editedDefaultItem); setEditingRow(false);}}
          postFieldsFunc={async () => {
            return await patchOrder(order.id, editedItem, setOrders)
          }}
        />}
        {!editingRow && <>
          <td>
            {new Date(order.date).toLocaleDateString('ru-RU', {
                weekday: 'short',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })}
          </td>
          <td>{order.initiator}</td>
          <td>{order.by_order}</td>
          <td>{order.by_bank}</td>
          <td>{order.source}</td>
          <td>{order.country}</td>
          <td>{order.address}</td>
        </>}
      </tr>
      {itemsShowen &&
        <tr key={order.id + 'item'}>
          <td colSpan={editing === 0 ? 1 : 3}></td>
          <td colSpan={7}>
            <ItemsTable
              items={items}
              orderId={order.id}
              editing={editing}
              setOrders={setOrders}
            />
          </td>
        </tr>
      }
    </Fragment>
  );
}
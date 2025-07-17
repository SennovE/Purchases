import { useState, type Dispatch, type SetStateAction } from "react";


interface NewFieldsInputRowProps<T> {
  newFields: T;
  fieldKeys: ([keyof T, string] | null)[];
  setNewFields: Dispatch<SetStateAction<T>>;
  resetFieldsFunc: () => void;
  postFieldsFunc: () => Promise<Boolean>;
}

export function NewFieldsInputRow<T>(
  {
    newFields, fieldKeys, setNewFields, resetFieldsFunc, postFieldsFunc,
  }: NewFieldsInputRowProps<T>
) {
  const [isAddingNewFields, setIsAddingNewFields] = useState(false);

  const clear = () => {
    setIsAddingNewFields(false);
    resetFieldsFunc();
  }

  const post = async () => {
    setIsAddingNewFields(true);
    if (await postFieldsFunc()) {
      clear();
    }
  }

  const newInputRow = fieldKeys.map(field =>
    <td>{
      field
      ? <input
        type={field[1]}
        value={String(newFields[field[0]] ?? "")}
        checked={Boolean(newFields[field[0]])}
        style={{ borderColor: isAddingNewFields && !newFields[field[0]] ? 'red' : '' }}
        onChange={e =>
          setNewFields(o => ({
            ...o,
            [field[0]]: (
            field[1] === 'checkbox'
            ? e.target.checked
            : (e.target.value === '' ? null : e.target.value)
          )}))
        }
      ></input>
      : ''
    }</td>
  );
  return (
    <>
      <td>
        <button onClick={clear} style={{ color: 'red' }}>
          { '\u2716' }
        </button>
      </td>
      <td>
        <button onClick={post} style={{ color: 'green' }}>
          { '\u2714' }
        </button>
      </td>
      {newInputRow}
    </>
  );
}
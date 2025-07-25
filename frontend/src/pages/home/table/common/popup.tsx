import type { Dispatch, SetStateAction } from 'react';

interface Props {
  name: string;
  func: Function;
  isOpen: string | null;
  onClose: Dispatch<SetStateAction<string | null>>;
  setRefreshKey: Dispatch<SetStateAction<string>>;
}

export function Popup({ name, func, isOpen, onClose, setRefreshKey }: Props) {
  if (!isOpen) return null;

  const onDelete = async () => {
    await func();
    setRefreshKey(isOpen ?? '');
    onClose(null);
  }

  return (
    <div 
      className='popup' 
      onClick={() => {onClose(null)}}
    >
      <div 
        className='container'
        onClick={(e) => e.stopPropagation()} 
      >
        <div>Удалить {name}?</div>
        <br/>
        <div style={{ display: 'flex' }}>
          <button onClick={onDelete}>Да</button>
          <p style={{ width: '2vw' }} />
          <button onClick={() => {onClose(null)}}>Нет</button>
        </div>
      </div>
    </div>
  );
}

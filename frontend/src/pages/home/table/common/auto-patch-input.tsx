import type { Dispatch, SetStateAction } from 'react';
import { patchObject } from '../../functions';

interface Props<T extends { id: string }, K extends Extract<keyof T, string>> {
  object: T & Record<K, number | string | boolean | null>;
  setObjects: Dispatch<SetStateAction<T[] | null>>;
  field: K;
  fieldType: string;
  url: string;
}

export function AutoPatchInput<
  T extends { id: string },
  K extends Extract<keyof T, string>
>({ object, setObjects, field, fieldType, url }: Props<T, K>) {
  return (
    <input
      type={fieldType}
      value={object[field] ? String(object[field]) : ''}
      onChange={(e) => {
        const raw = e.target.value;
        const obj = raw === '' ? null : raw;
        patchObject<number | string | null>(object.id, field, obj, url);
        setObjects(prev =>
          prev
          ? prev.map(o => o.id === object.id
            ? { ...o, [field]: obj }
            : o
          )
          : prev
        );
      }}
    />
  );
}

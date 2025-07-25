import { useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import CreatableSelect from 'react-select/creatable';
import { patchObject } from '../../functions';
import type { OrderChoices } from '../../models';

interface Props {
  id: string;
  field: keyof OrderChoices;
  fieldValue: string | null;
  patchUrl: string;
  list: OrderChoices;
  listSetter: Dispatch<SetStateAction<OrderChoices | null>>;
}

type OptionType = { value: string; label: string };

const customStyles = {
  control: (base: any) => ({
    ...base,
    border: 'none',
    backgroundColor: undefined,
  }),
  input: (base: any) => ({
    ...base,
    color: '#000',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#000',
    fontSize: '1em', 
    fontWeight: 500,
    fontFamily: 'inherit',
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: 0,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#1a1a1a' : '#242424',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#444',
    fontStyle: 'italic',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: '#242424',
  })
};

export function DropoutListInput({ id, field, fieldValue, patchUrl, list, listSetter }: Props) {
  const options = useMemo<OptionType[]>(() =>
    list[field].map(
      v => ({ value: v, label: v })
    ), [list, field]
  );
  const [value, setValue] = useState<OptionType | null>(
    fieldValue ? { value: fieldValue, label: fieldValue } : null
  );
  const [inputValue, setInputValue] = useState('');

  const applyValue = async (opt: OptionType) => {
    const ok = await patchObject<string>(id, field, opt.value, patchUrl);
    if (ok) {
      setValue(opt);
      setInputValue('');
    }
  };

  const addToChoices = (label: string): OptionType => {
    listSetter(prev => {
      if (!prev || prev[field].includes(label)) return prev;
      return {
        ...prev,
        [field]: [...prev[field], label]
      };
    });
    return { value: label, label };
  };

  return (
    <CreatableSelect<OptionType, false>
      styles={customStyles}
      options={options}
      value={value}
      inputValue={inputValue}
      onInputChange={(newInput) => setInputValue(newInput)}
      onFocus={() => {
        if (value) setInputValue(value.label);
      }}
      // onBlur={() => {}}
      onChange={(opt) => {
        if (opt) void applyValue(opt);
      }}
      onCreateOption={(label) => {
        const opt = addToChoices(label);
        void applyValue(opt);
      }}
      placeholder='Выберите или добавьте…'
      isClearable={false}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }}
      menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
      menuPosition='fixed'
    />
  );
}

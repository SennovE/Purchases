import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { patchObject } from '../../functions';

interface Props {
  id: string;
  field: string;
  field_value: string | null;
  patch_url: string;
  list: string[];
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
    color: '#ffffff',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: '#ffffff',
  }),
  valueContainer: (base: any) => ({
    ...base,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused ? '#1a1a1a' : '#242424',
  }),
  placeholder: (base: any) => ({
    ...base,
    color: '#999',
    fontStyle: 'italic',
  }),
   menu: (base: any) => ({
    ...base,
    backgroundColor: '#242424',
  }),
};

export function DropoutListInput({ id, field, field_value, patch_url, list }: Props) {
  const initialOptions = list.map(item => ({ value: item, label: item }));
  const [options, setOptions] = useState<OptionType[]>(initialOptions);
  const [value, setValue] = useState<OptionType | null>(
    field_value ? { value: field_value, label: field_value } : null
  );
  const [inputValue, setInputValue] = useState('');

  const updateField = async (opt: OptionType) => {
    const ok = await patchObject(id, field, opt.value, patch_url);
    if (ok) {
      setValue(opt);
      setInputValue(''); 
    }
  };

  return (
    <CreatableSelect<OptionType, false>
      styles={customStyles}
      options={options}
      value={value}

      inputValue={inputValue}
      onInputChange={(newInput) => setInputValue(newInput)}
      onFocus={() => {
        if (value) {
          setInputValue(value.label);
        }
      }}

      // onBlur={() => {}}

      onChange={(opt) => {
        if (opt) {
          void updateField(opt);
        }
      }}
      onCreateOption={(label) => {
        const newOpt = { value: label, label };
        setOptions(prev => [...prev, newOpt]);
        void updateField(newOpt);
      }}

      placeholder="Выберите или добавьте…"
      isClearable={false}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
      }}
    />
  );
}

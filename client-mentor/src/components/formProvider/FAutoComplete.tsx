import { useFormContext, Controller } from 'react-hook-form';
import { AutoComplete } from 'antd';
import { PropsForm } from '@utils/interface';
import { useState } from 'react';

interface IAutoComplete extends PropsForm {
  optionsAuto: { value: string }[];
  style?: React.CSSProperties;
  placeholder: string;
}

function FAutoComplete({ name, optionsAuto, ...other }: IAutoComplete) {
  const [dataInput, setDataInput] = useState<string>('');
  const { control } = useFormContext();

  const onChange = (value: string) => {
    setDataInput(value);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <AutoComplete
            value={dataInput}
            options={optionsAuto}
            onSelect={(_newValue, { value }) => {
              setDataInput('');
              field.onChange([...field.value, value]);
            }}
            onInputKeyDown={(
              e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => {
              if (e.key === 'Enter') {
                setDataInput('');
                field.onChange([...field.value, dataInput]);
              }
            }}
            onChange={(value) => onChange(value)}
            filterOption={(inputValue, option) =>
              !!option?.value &&
              typeof option.value === 'string' &&
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            {...other}
          />
        </div>
      )}
    />
  );
}

export default FAutoComplete;

import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useFormContext, Controller } from 'react-hook-form';
import { PropsForm } from '@/utils/interface';

interface ICheckBox extends PropsForm {
  value: string;
}

export default function FCheckBox({ name, value, ...other }: ICheckBox) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onChange={(e: CheckboxChangeEvent) => field.onChange(e.target.checked)}
          {...other}
        >
          {value}
        </Checkbox>
      )}
    />
  );
}

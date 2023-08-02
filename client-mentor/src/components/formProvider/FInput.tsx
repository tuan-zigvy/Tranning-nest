import { Input } from 'antd';

import { useFormContext, Controller } from 'react-hook-form';
import { TextAreaProps } from 'antd/es/input';
import { PropsForm } from '@/utils/interface';
import { Text } from '@/utils/utils';

const { TextArea } = Input;

function FInput({ name, ...other }: PropsForm & TextAreaProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div style={{ width: 400 }}>
          <TextArea
            {...field}
            value={field.value}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => field.onChange(event.target.value)}
            status={error ? 'error' : undefined}
            {...other}
          />
          {error && <Text type='danger'>{error.message}</Text>}
        </div>
      )}
    />
  );
}
export default FInput;

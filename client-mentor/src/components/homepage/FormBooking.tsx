/* eslint-disable @typescript-eslint/no-use-before-define */
import { useRef, memo, useEffect } from 'react';
import FormOutlined from '@ant-design/icons/lib/icons/FormOutlined';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'antd';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { PageMentorQuery, useCreateBookingFormMutation } from '@/gql/type';
import TitlePart from './TitlePart';
import { FCheckBox, FInput, FRadio, FormProvider } from '../formProvider';
import { IFormRes } from '@/utils/interface';
import { Text, createToast, getDeleteFilter } from '@/utils/utils';

const validate = z.intersection(
  z.object({
    email: z.string().email(),
    first_name: z.string().min(0),
    last_name: z.string().min(0),
  }),
  z.record(
    z.string(),
    z.union([
      z.string(),
      z.number(),
      z.array(z.union([z.string(), z.number()])),
      z.boolean(),
      z.undefined(),
    ]),
  ),
);
type IForm = Omit<IFormRes, 'require'>;
type TFilterFieldBooking = Omit<IForm, 'last_name' | 'email' | 'first_name'>;

function FormBooking({
  data,
  dateSession,
}: {
  data: PageMentorQuery['getPageMentor'];
  dateSession: Date | null;
}) {
  const { booking_form } = data.setting;

  const { require } = booking_form;

  const [functionMutation, { data: dataResponse, error, loading }] =
    useCreateBookingFormMutation();

  const filterFieldBooking: TFilterFieldBooking = getDeleteFilter(
    ['require', 'first_name', 'email', 'last_name', 'age'],
    booking_form,
  );

  const defaultValuesRef = useRef<IForm>({
    first_name: '',
    last_name: '',
    email: '',
    age: 0,
    ...filterFieldBooking,
  });

  const methods = useForm<IForm>({
    defaultValues: defaultValuesRef.current,
    resolver: zodResolver(validate),
  });

  const onSubmit: SubmitHandler<IForm> = (dataCreateBooking) => {
    if (dateSession) {
      functionMutation({
        variables: {
          dateBooking: { url: data.setting.name_url as string, date: dayjs(dateSession) },
          form: { input: { ...dataCreateBooking } },
        },
      });
    }
  };
  useEffect(() => {
    if (dataResponse) {
      createToast(dataResponse.CreateBookingForm.message, 'success');
    }
  }, [dataResponse]);

  return (
    <div>
      <TitlePart
        Icon={<FormOutlined style={{ fontSize: 40 }} />}
        content={['Session Form', 'Session info before booking session']}
      />
      {error && <Text> {error.message}</Text>}
      {dateSession && <Text> {dayjs(dateSession).format('DD/MM/YYYY HH:mm')}</Text>}
      <FormProvider onSubmit={onSubmit} {...methods}>
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 15 }}>
          <FInput name='email' placeholder='Email' style={{ width: 150 }} />
          <FInput name='first_name' placeholder='First Name' style={{ width: 150 }} />
          <FInput name='last_name' placeholder='Last Name' style={{ width: 150 }} />
          <FInput name='age' placeholder='Age' style={{ width: 150 }} />
          <FilterFieldBookingComponents field={filterFieldBooking} />
          <Button htmlType='submit' loading={loading}>
            Submit
          </Button>
        </div>
      </FormProvider>
    </div>
  );
}

const FilterFieldBookingComponents = memo(({ field }: { field: TFilterFieldBooking }) => {
  const listField = Object.keys(field);
  return (
    <>
      {listField.map((key, i) => {
        if (typeof field[key] === 'boolean') {
          return <FCheckBox name={key} value={key} key={i} />;
        }
        if (Array.isArray(field[key])) {
          return (
            <div key={i}>
              <Text>{key.toUpperCase()} : </Text>
              <FRadio
                name={key}
                options={[...field[key]]}
                key={i}
                style={{ width: 150 }}
              />
            </div>
          );
        }
        return (
          <FInput
            name={key}
            key={i}
            placeholder={key.toUpperCase()}
            style={{ width: '90%' }}
          />
        );
      })}
    </>
  );
});

export default FormBooking;

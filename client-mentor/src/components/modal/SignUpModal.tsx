import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Space, Tag } from 'antd';
import { Text } from '@utils/utils';
import BasicModal from './BasicModal';
import {
  FAutoComplete,
  FInput,
  FInputPassword,
  FRadio,
  FormProvider,
} from '../formProvider';

import { CreateUserDto, useSignUpMutation } from '@/gql/type';
import { LIST_COLOR } from '@/utils/enum';

interface ICreateUser extends CreateUserDto {
  confirmPassword: string;
}

const defaultValues: ICreateUser = {
  email: 'tuan@gmail.com',
  first_name: 'tuan',
  last_name: 'tuan',
  major: ['dev'],
  roles: ['mentor'],
  password: 'Tuan123',
  confirmPassword: 'Tuan123',
};

const validate = z
  .object({
    first_name: z.string().min(4),
    last_name: z.string().min(4),
    email: z.string().email(),
    major: z.array(z.string()),
    roles: z.array(z.enum(['mentee', 'mentor'])),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const optionsMajor = [
  { value: 'Cardiologist' },
  { value: 'Anesthesiologist' },
  { value: 'Oral and Maxillofacial Surgeon' },
  { value: 'Emergency Medicine Physician' },
  { value: 'Orthopedic Surgeon, Except Pediatric' },
  { value: 'Surgeon, All Other' },
  { value: 'Obstetrician-Gynecologist' },
  { value: 'Pediatric Surgeon' },
  { value: 'Ophthalmologist, Except Pediatric' },
  { value: 'Developer' },
  { value: 'Frontend Developer' },
  { value: 'BackEnd Developer' },
  { value: 'Mobile Developer' },
  { value: 'data analyst' },
  { value: 'data engineer' },
  { value: ' developer' },
  { value: ' developer' },
  { value: ' developer' },
];

function SignUpModal({
  isOpenModal,
  setIsOpenModal,
}: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const methods = useForm<ICreateUser>({
    defaultValues,
    resolver: zodResolver(validate),
  });

  const [mutateFunction, { data, loading, error }] = useSignUpMutation();
  const onSubmit: SubmitHandler<ICreateUser> = (dataCreate) => {
    const { confirmPassword, ...result } = dataCreate;
    mutateFunction({ variables: { create: { ...result } } });
  };

  const { watch, reset } = methods;
  const majors = watch().major;

  React.useEffect(() => {
    if (data?.createUser.message) setIsOpenModal(false);

    reset({ ...defaultValues });
  }, [data, isOpenModal]);

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      style={{ textAlign: 'center', minWidth: 800 }}
      title=' Sign Up'
    >
      <FormProvider onSubmit={onSubmit} {...methods}>
        <Space direction='vertical' align='center' style={{ rowGap: 15 }}>
          {error && <Text type='danger'>{error.message} </Text>}

          <FInput
            name='first_name'
            placeholder='Input your first name'
            style={{ minWidth: 400 }}
          />
          <FInput
            name='last_name'
            placeholder='Input your last name'
            style={{ minWidth: 400 }}
          />
          <FInput name='email' placeholder='Input your email' style={{ minWidth: 400 }} />

          <FRadio name='roles' options={['mentee', 'mentor']} />

          {majors.length > 0 &&
            majors.map((major, i) => (
              <Tag style={{ cursor: 'pointer' }} key={i} color={LIST_COLOR[i % 10]}>
                {major}
              </Tag>
            ))}
          <FAutoComplete
            name='major'
            optionsAuto={optionsMajor}
            style={{ width: 400 }}
            placeholder='Input your major'
          />

          <FInputPassword
            name='password'
            placeholder='Input your password'
            style={{ minWidth: 400 }}
          />
          <FInputPassword
            name='confirmPassword'
            placeholder='Confirm password'
            style={{ minWidth: 400 }}
          />
          <Button htmlType='submit' loading={loading}>
            Sign Up
          </Button>
        </Space>
      </FormProvider>
    </BasicModal>
  );
}

export default SignUpModal;

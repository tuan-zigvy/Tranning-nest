import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Space } from 'antd';
import { Text } from '@utils/utils';
import useAuth from '@hook/useAuth';
import { SignInDto, useSignInMutation } from '@gql/type';
import BasicModal from './BasicModal';
import { FInput, FInputPassword, FormProvider } from '../formProvider';
import { BASE_URL } from '@/app/config';

const defaultValues: SignInDto = {
  email: 'tuandeptrai123@gmail.com',
  password: 'Tuan123',
};

const validate = z.object({
  email: z.string().email(),
  password: z.string(),
});

function SignInModal({
  isOpenModal,
  setIsOpenModal,
  setIsOpenModalSignUp,
}: {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenModalSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const methods = useForm<SignInDto>({
    defaultValues,
    resolver: zodResolver(validate),
  });
  const { handleSignIn } = useAuth();
  const [mutateFunction, { data, loading, error }] = useSignInMutation();

  const {
    reset,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<SignInDto> = (valueInput) => {
    mutateFunction({
      variables: { signIn: { ...valueInput } },
    });
  };

  useEffect(() => {
    if (data) {
      setIsOpenModal(false);
      handleSignIn(data);
    }
    reset({ ...defaultValues });
  }, [data, isOpenModal]);

  const handelOpenSignUp = () => {
    setIsOpenModalSignUp(true);
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (error) reset({ email: '', password: '' });
  }, [error]);

  return (
    <BasicModal
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      title=' Sign Ip'
      style={{ textAlign: 'center' }}
    >
      <FormProvider onSubmit={onSubmit} {...methods}>
        <Space direction='vertical' style={{ rowGap: 10, width: 300 }} align='center'>
          <Button onClick={() => handelOpenSignUp()} type='link'>
            Sign Up Now
          </Button>
          {error && <Text type='danger'>{error.message} </Text>}
          <FInput name='email' placeholder='Input your email' style={{ minWidth: 200 }} />
          <FInputPassword
            name='password'
            placeholder='Input your password'
            style={{ minWidth: 200 }}
          />
          <Button htmlType='submit' loading={loading}>
            Sign In
          </Button>

          <Button htmlType='submit' loading={loading}>
            <a href={`${BASE_URL}/auth/google`}> Sign In width google</a>
          </Button>
        </Space>
      </FormProvider>
    </BasicModal>
  );
}

export default SignInModal;

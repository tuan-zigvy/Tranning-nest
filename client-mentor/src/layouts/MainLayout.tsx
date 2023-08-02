import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import AlertMsg from '@components/AlertMsg';
import SignInModal from '@components/modal/SignInModal';
import SignUpModal from '@components/modal/SignUpModal';
import NavigationListener from '@components/NavigationListener';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import AuthProvider from '@/contexts/UserContext';

function MainLayout() {
  const [isOpenModalSignIn, setIsOpenModalSignIn] = useState<boolean>(false);
  const [isOpenModalSignUp, setIsOpenModalSignUp] = useState<boolean>(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: 10,
      }}
    >
      <AuthProvider>
        <NavigationListener />
        <MainHeader setIsOpenModalSignIn={setIsOpenModalSignIn} />
        <Outlet context={{ setIsOpenModalSignIn, setIsOpenModalSignUp }} />
        <AlertMsg />
        <SignInModal
          isOpenModal={isOpenModalSignIn}
          setIsOpenModal={setIsOpenModalSignIn}
          setIsOpenModalSignUp={setIsOpenModalSignUp}
        />
        <SignUpModal
          isOpenModal={isOpenModalSignUp}
          setIsOpenModal={setIsOpenModalSignUp}
        />
        <MainFooter />
      </AuthProvider>
    </div>
  );
}

export default MainLayout;

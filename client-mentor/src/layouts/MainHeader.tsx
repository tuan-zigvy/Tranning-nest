import React from 'react';
import { Layout, Typography, Avatar, Button } from 'antd';
import useAuth from '@hook/useAuth';
import Paragraph from 'antd/es/typography/Paragraph';

const { Header } = Layout;
const { Title } = Typography;
const headerStyle: React.CSSProperties = {
  display: 'flex',
  textAlign: 'center',
  color: '#fff',
  height: 90,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

function MainHeader({
  setIsOpenModalSignIn,
}: {
  setIsOpenModalSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentUser, handleSignOut } = useAuth();

  const handelButton = () => {
    if (!currentUser) {
      setIsOpenModalSignIn(true);
    } else {
      handleSignOut();
    }
  };
  return (
    <>
      <Header style={headerStyle}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Title level={4}>Interview</Title>
            <div style={{ width: 50, height: 50 }}>
              <img aria-hidden alt='Logo' src='logo.jpeg' width='100%' height='100%' />
            </div>
          </div>
          <div style={{ gap: '0px !important', flexGrow: 0, width: 120 }}>
            <Avatar
              size={45}
              src={currentUser?.avatar && <img src={currentUser.avatar} alt='avatar' />}
            />
            {currentUser && (
              <Paragraph style={{ marginBottom: 0 }}>{currentUser.last_name}</Paragraph>
            )}
          </div>

          <Button onClick={handelButton}> {currentUser ? ' Sign Out' : 'Sign In'}</Button>
        </div>
      </Header>
    </>
  );
}

export default MainHeader;

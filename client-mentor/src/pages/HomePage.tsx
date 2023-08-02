import { useSearchParams } from 'react-router-dom';
import { Col, Divider, Row } from 'antd';
import { useState } from 'react';
import { usePageMentorQuery } from '@/gql/type';
import SpinLoading from '@/components/SpinLoading';
import AvailableTime from '@/components/homepage/AvailableTime';
import Profile from '@/components/homepage/Profile';
import FormBooking from '@/components/homepage/FormBooking';

function HomePage() {
  const [searchParams] = useSearchParams();
  const page_name = searchParams.get('name') || 'Tuan-Handsome';
  const [dataChoose, setDataChoose] = useState<Date | null>(null);

  const { data, error, loading } = usePageMentorQuery({ variables: { url: page_name } });
  if (loading)
    return (
      <>
        <SpinLoading />
      </>
    );

  if (error)
    return (
      <>
        <p>{error.message}</p>
      </>
    );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: 40,
      }}
    >
      {data?.getPageMentor && (
        <div
          style={{
            width: '90%',
            backgroundColor: '#d3cfcf',
            // border: '20px solid GrayText',
            borderRadius: '10px',
          }}
        >
          <div
            style={{
              margin: 15,
              backgroundColor: 'white',
            }}
          >
            <Row>
              <Col span={7.8} style={{ flexGrow: 1, width: '30%' }}>
                <Profile data={data.getPageMentor} />
              </Col>
              <Divider
                type='vertical'
                style={{
                  height: '30em',
                  margin: '0 auto',
                  maxWidth: 2,
                  borderInlineStart: '4px solid rgba(5, 5, 5, 0.06)',
                }}
              />
              <Col span={7.8} style={{ flexGrow: 1, width: '30%' }}>
                <AvailableTime
                  data={data.getPageMentor}
                  setChooseSession={setDataChoose}
                />
              </Col>
              <Divider
                type='vertical'
                style={{
                  height: '30em',
                  margin: '0 auto',
                  maxWidth: 2,
                  borderInlineStart: '4px solid rgba(5, 5, 5, 0.06)',
                }}
              />
              <Col span={7.8} style={{ flexGrow: 1, width: '30%' }}>
                <FormBooking data={data.getPageMentor} dateSession={dataChoose} />
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

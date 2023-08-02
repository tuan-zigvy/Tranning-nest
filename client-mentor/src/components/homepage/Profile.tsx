import { ProfileOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import TitlePart from './TitlePart';
import { PageMentorQuery } from '@/gql/type';
import { Paragraph, Text, Title } from '@/utils/utils';

interface IInfo {
  background: string;

  head_title: string;

  education: string;

  achievement: string;

  images_achievement: string[];

  position: string;

  current_company_work: string;

  already_company_work: string[];

  experience: number;

  about_me: string;
}

function Profile({ data }: { data: PageMentorQuery['getPageMentor'] }) {
  const info = data.profile.meta_data.info as IInfo;
  return (
    <div>
      <TitlePart
        Icon={<ProfileOutlined style={{ fontSize: 40 }} />}
        content={['Curriculum vitae Mentor', 'Information about the mentor`s experience']}
      />
      <div>
        <Avatar
          size={70}
          src={
            <img
              src={
                data.avatar ||
                'https://static.foxbusiness.com/foxbusiness.com/content/uploads/2022/01/Sundar-Pichai-Google.jpg'
              }
              alt='avatar'
            />
          }
        />
        <div>
          <Paragraph>
            {data.first_name} {data.last_name}
          </Paragraph>

          <Paragraph>{info.position}</Paragraph>
          <Text>{data.profile.score}</Text>
          <Paragraph>{info.head_title}</Paragraph>
        </div>
        <div>
          <Title level={5}>Profile</Title>
          <Paragraph>education :{info.education}</Paragraph>
          <Paragraph>Achievement :{info.achievement}</Paragraph>
          <Paragraph>Position :{info.position}</Paragraph>
          <Paragraph>Working :{info.current_company_work}</Paragraph>
          <Paragraph>Already work :{info.already_company_work.toString()}</Paragraph>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React from 'react';

import { Title, Text } from '@/utils/utils';

function TitlePart({
  content,
  Icon,
}: {
  content: [string, string];
  Icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          borderRadius: '50%',
          backgroundColor: '#aba5a5',
          width: 80,
          height: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {Icon}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Title level={5}>{content[0]}</Title>
        <Text italic> {content[1]}</Text>
      </div>
    </div>
  );
}

export default TitlePart;

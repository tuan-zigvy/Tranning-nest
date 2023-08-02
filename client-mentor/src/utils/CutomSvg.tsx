/* eslint-disable react/function-component-definition */

import React from 'react';
import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CurriculumVitaeSVG: React.FC = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    data-name='Layer 1'
    viewBox='64 64 896 896'
    width='1.5em'
    height='1.5em'
    id='CurriculumVitae'
    fill='currentColor'
  >
    <path d='M365.5,30.274a7,7,0,0,0-5.022-2.124h-176a37.041,37.041,0,0,0-37,37V98.387h-53a37.042,37.042,0,0,0-37,37V446.85a37.042,37.042,0,0,0,37,37H327.518a37.042,37.042,0,0,0,37-37V413.582h53a37.041,37.041,0,0,0,37-37V124.808a7,7,0,0,0-1.978-4.876Zm1.977,22.136,63.485,65.4H376.781a9.311,9.311,0,0,1-9.3-9.3V52.41ZM350.518,446.85a23.026,23.026,0,0,1-23,23H94.482a23.026,23.026,0,0,1-23-23V135.386a23.026,23.026,0,0,1,23-23h53v264.2a37.041,37.041,0,0,0,37,37H350.518Zm67-47.268H184.482a23.025,23.025,0,0,1-23-23V65.147a23.025,23.025,0,0,1,23-23h169v66.358a23.327,23.327,0,0,0,23.3,23.3h63.736V376.583A23.026,23.026,0,0,1,417.518,399.582Z' />
    <path d='M392.3 339.3H204.68a7 7 0 0 0 0 14H392.3a7 7 0 0 0 0-14zM204.68 309.362H317a7 7 0 0 0 0-14H204.68a7 7 0 0 0 0 14zM230.494 257.556a6 6 0 0 0 6 5.922h.063l129.675-1.333a6 6 0 0 0 5.938-6.078L371.7 220.15A36.558 36.558 0 0 0 334.9 180.6l-7.426.075a6 6 0 0 0-5.728 4.42l-7.54 27.638-3.938-6.867 4.946-16.371a6 6 0 0 0-5.744-7.735h-.061l-18.779.191a6 6 0 0 0-5.646 7.851l5.311 16.366-2.91 5.758-7.137-26.205a6 6 0 0 0-5.789-4.423h-8.427a36.559 36.559 0 0 0-36 40.3zm70.868-63.708l-1.184 3.917-1.263-3.892zm-53.357 7.736a24.577 24.577 0 0 1 18.084-8.28h3.782L279.9 230.148a6 6 0 0 0 10.592 2.02 5.923 5.923 0 0 0 .555-.894l9.344-18.488 10.586 18.461a6 6 0 0 0 10.994-1.406l10.15-37.208 2.892-.029a24.558 24.558 0 0 1 24.705 26.783 5.888 5.888 0 0 0-.024.623l.391 30.2-117.675 1.209-.392-30.247a5.764 5.764 0 0 0-.037-.588A24.269 24.269 0 0 1 248.005 201.584zM299.056 180.084c.122 0 .244 0 .366 0a35.412 35.412 0 0 0 35.052-35.769l-.279-27.479a27.82 27.82 0 0 0-28.037-27.471l-31.432.319a11.636 11.636 0 0 0-11.518 11.754l.443 43.6A35.45 35.45 0 0 0 299.056 180.084zM279.5 113.208a31.246 31.246 0 0 0-4.15 2.629l-.067-6.647C276.6 110.54 278.008 111.888 279.5 113.208zm36.282 47.85a23.414 23.414 0 0 1-40.136-16.147l-.107-10.526c3.411-7.166 8.872-11.521 15.9-12.673a46.325 46.325 0 0 0 22.41 6.217 39.274 39.274 0 0 0 8.442-.923l.177 17.43A23.255 23.255 0 0 1 315.785 161.058zm-9.506-59.7a15.774 15.774 0 0 1 15.709 13.321c-9.608 2.954-19.559.76-29.635-6.575a64.646 64.646 0 0 1-7.581-6.527z' />
  </svg>
);

const CurriculumVitaeIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon
    component={CurriculumVitaeSVG}
    {...props}
    style={{ padding: 'auto 0', width: '100%' }}
  />
);

export default CurriculumVitaeIcon;

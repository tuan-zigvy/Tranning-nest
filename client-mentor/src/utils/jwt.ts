import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import { CookieAttributes } from 'node_modules/@types/js-cookie';
import { setContext } from '@apollo/client/link/context';
import { JwtPayloadUser } from './interface';
import { EKeyHeader } from './enum';

// import apiService from '../app/server';

const decoded = (token: string | null) => {
  if (!token) {
    return false;
  }
  const decode = jwtDecode<JwtPayloadUser>(token);

  const currentTime = Date.now() / 1000;
  if (decode.exp && currentTime > decode.exp) return false;
  return decode;
};

// const setKeyHeader = (value: string | false, keyHeader: KeyHeaderValue) => {
//   if (value) {
//     apiService.defaults.headers.common[keyHeader] = value;
//   } else {
//     delete apiService.defaults.headers.common[keyHeader];
//   }
// };

// const setHeaders = (isDelete = false) => {
//   if (!isDelete) {
//     apiService.defaults.headers[EKeyHeader.ACCESS_TOKEN] = Cookie.get(
//       'accessToken',
//     ) as string;
//     apiService.defaults.headers[EKeyHeader.REFRESH_TOKEN] = Cookie.get(
//       'refreshToken',
//     ) as string;
//     apiService.defaults.headers[EKeyHeader.USER_ID] = Cookie.get('userId') as string;
//   } else {
//     delete apiService.defaults.headers.common[EKeyHeader.ACCESS_TOKEN];
//     delete apiService.defaults.headers.common[EKeyHeader.REFRESH_TOKEN];
//     delete apiService.defaults.headers.common[EKeyHeader.USER_ID];
//   }
// };

interface INameCookie {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

const setAllCookie = (
  isDelete: boolean,
  props: INameCookie = {
    userId: '',
    accessToken: '',
    refreshToken: '',
  },
) => {
  const option: CookieAttributes = {
    httpOnly: false,
    secure: false,
    path: '/',
    sameSite: 'strict',
    expires: new Date(new Date().getTime() + 86400000 * 7),
  };
  if (!isDelete) {
    Cookie.set('userId', props.userId, option);
    Cookie.set('accessToken', props.accessToken, option);
    Cookie.set('refreshToken', props.refreshToken, option);
  } else {
    Cookie.remove('userId');
    Cookie.remove('accessToken');
    Cookie.remove('refreshToken');
  }
};

// ...

const authLink = setContext((_, { headers }) => {
  const token = decoded(localStorage.getItem('accessToken'));

  if (token)
    return {
      headers: {
        ...headers,
        [EKeyHeader.ACCESS_TOKEN]: localStorage.getItem('accessToken'),
      },
    };
  localStorage.removeItem('accessToken');
  return {
    headers: {
      ...headers,
    },
  };
});

export { decoded, setAllCookie, authLink };

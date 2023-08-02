/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useReducer, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CurrentUserQuery,
  SignInMutation,
  useCurrentUserQuery,
  useSignInThirdPartyMutation,
  SignInThirdPartyMutation,
} from '@gql/type';
import { createToast } from '@utils/utils';
import { EKeyHeader } from '@utils/enum';

interface IContextAuth {
  isSignIn: boolean;
  currentUser:
    | null
    | CurrentUserQuery['me']
    | SignInMutation['signIn']['user']
    | SignInThirdPartyMutation['signInThirdParty']['user'];
  errorMessage: string;
  initialized: boolean;
}

interface IAction {
  type: ETypePayLoad;
  payload: IContextAuth;
}

const initialState: IContextAuth = {
  isSignIn: false,
  currentUser: null,
  errorMessage: '',
  initialized: false,
};

enum ETypePayLoad {
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_OUT = 'SIGN OUT',
  ERROR = 'ERROR',
  INITIALIZE = 'INITIALIZE',
}

const reducer = (state: IContextAuth, action: IAction) => {
  switch (action.type) {
    case ETypePayLoad.SIGN_IN_SUCCESS:
      return {
        ...action.payload,
      };
    case ETypePayLoad.SIGN_OUT:
      return {
        ...action.payload,
      };
    case ETypePayLoad.ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case ETypePayLoad.INITIALIZE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext({
  ...initialState,
  handleUpdate: (_currentUser: CurrentUserQuery['me']) => {},
  handleSignIn: (_signInMutation: SignInMutation) => {},
  handleSignOut: () => {},
});

function setToken(token: string[] | null) {
  if (token) {
    localStorage.setItem('accessToken', token[0]);
    localStorage.setItem('refreshToken', token[1]);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

function AuthProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [mutateFunction, { data: thirdPartyData, error }] = useSignInThirdPartyMutation();
  const { data: currentData } = useCurrentUserQuery();
  // if (token) {
  //
  // }

  useEffect(() => {
    if (token) {
      mutateFunction({
        context: {
          headers: {
            [EKeyHeader.AUTH_TOKEN]: token,
          },
        },
      });
      searchParams.delete('token');
      setSearchParams('token');
    }
  }, [token]);

  useEffect(() => {
    if (currentData) {
      dispatch({
        type: ETypePayLoad.INITIALIZE,
        payload: {
          ...state,
          initialized: true,
          currentUser: currentData.me,
        },
      });
    } else {
      dispatch({
        type: ETypePayLoad.INITIALIZE,
        payload: {
          ...state,
          initialized: true,
        },
      });
    }
  }, [currentData]);

  useEffect(() => {
    if (thirdPartyData) {
      setToken([
        thirdPartyData.signInThirdParty.access_token,
        thirdPartyData.signInThirdParty.refresh_token,
      ]);
      dispatch({
        type: ETypePayLoad.SIGN_IN_SUCCESS,
        payload: {
          ...state,
          currentUser: thirdPartyData.signInThirdParty.user,
          errorMessage: '',
          isSignIn: true,
        },
      });
    }
  }, [thirdPartyData]);

  if (error?.message && token) {
    searchParams.delete('token');
    setSearchParams('token');
    createToast('Cannot sign in try again', 'error');
  }

  const handleSignIn = (signInMutation: SignInMutation) => {
    setToken([signInMutation.signIn.access_token, signInMutation.signIn.refresh_token]);

    dispatch({
      type: ETypePayLoad.SIGN_IN_SUCCESS,
      payload: {
        ...state,
        currentUser: signInMutation.signIn.user,
        errorMessage: '',
        isSignIn: true,
      },
    });
  };

  const handleSignOut = () => {
    setToken(null);

    dispatch({
      type: ETypePayLoad.SIGN_IN_SUCCESS,
      payload: { ...initialState, initialized: true },
    });
  };

  const handleUpdate = (currentUser: CurrentUserQuery['me']) => {
    dispatch({
      type: ETypePayLoad.SIGN_IN_SUCCESS,
      payload: { ...initialState, errorMessage: '', currentUser },
    });
  };
  const stateMemo = useMemo(
    () => ({
      ...state,
      handleSignIn,
      handleSignOut,
      handleUpdate,
    }),
    [state],
  );
  return <AuthContext.Provider value={stateMemo}>{children}</AuthContext.Provider>;
}

export default AuthProvider;

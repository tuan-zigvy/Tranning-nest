import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AtResponse = {
  __typename?: 'ATResponse';
  access_token: Scalars['String']['output'];
};

export type CreateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  major: Array<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  roles: Array<Scalars['String']['input']>;
};

export type IForm = {
  input: Scalars['JSON']['input'];
};

export type InfoBookingTodoDto = {
  date: Scalars['Date']['input'];
  url: Scalars['String']['input'];
};

export type MentorPageResponse = {
  __typename?: 'MentorPageResponse';
  avatar: Scalars['String']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  major: Array<Scalars['String']['output']>;
  profile: Profile;
  setting: Setting;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateBookingForm: UpdateResponse;
  createUser: UpdateResponse;
  getNewAccessToken: AtResponse;
  signIn: SignInSuccess;
  signInThirdParty: SignInSuccess;
  updateAllUser: User;
  updateAvailability: UpdateResponse;
  updateFormBooking: UpdateResponse;
  updatePassword: UpdateResponse;
  updateUrl: UpdateResponse;
  updateUser: User;
};


export type MutationCreateBookingFormArgs = {
  dateBooking: InfoBookingTodoDto;
  form: IForm;
};


export type MutationCreateUserArgs = {
  create: CreateUserDto;
};


export type MutationSignInArgs = {
  signIn: SignInDto;
};


export type MutationUpdateAllUserArgs = {
  input: UpdateAllUserDto;
};


export type MutationUpdateAvailabilityArgs = {
  updateAvailability: UpdateAvailabilityDto;
};


export type MutationUpdateFormBookingArgs = {
  updateAvailability: UpdateFormBookingDto;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePsDto;
};


export type MutationUpdateUrlArgs = {
  url: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserDto;
};

export type Profile = {
  __typename?: 'Profile';
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  meta_data: Scalars['JSON']['output'];
  owner: User;
  ownerId: Scalars['Float']['output'];
  score: Scalars['Float']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type Query = {
  __typename?: 'Query';
  getPageMentor: MentorPageResponse;
  me: User;
};


export type QueryGetPageMentorArgs = {
  url: Scalars['String']['input'];
};

export type Setting = {
  __typename?: 'Setting';
  availability: Scalars['JSON']['output'];
  booking_form: Scalars['JSON']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  meta_data: Scalars['JSON']['output'];
  name_url?: Maybe<Scalars['String']['output']>;
  owner: User;
  ownerId: Scalars['Float']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type SignInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInSuccess = {
  __typename?: 'SignInSuccess';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: User;
};

export type UpdateAllUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
  major: Array<Scalars['String']['input']>;
  roles: Array<Scalars['String']['input']>;
};

export type UpdateAvailabilityDto = {
  absent_date: Array<Scalars['Date']['input']>;
  available_time: Array<Scalars['Boolean']['input']>;
  duration_session: Scalars['Int']['input'];
  duration_work_per_day: Array<Scalars['Float']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  timezone: Scalars['String']['input'];
};

export type UpdateFormBookingDto = {
  age?: InputMaybe<Scalars['Int']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  last_name: Scalars['String']['input'];
};

export type UpdatePsDto = {
  confirmPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export type UpdateResponse = {
  __typename?: 'UpdateResponse';
  message: Scalars['String']['output'];
};

export type UpdateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Array<Scalars['String']['input']>>;
  roles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  major: Array<Scalars['String']['output']>;
  profile: Profile;
  registrationType: Array<Scalars['String']['output']>;
  roles: Array<Scalars['String']['output']>;
  setting: Setting;
  updatedAt: Scalars['Date']['output'];
};

export type SignInMutationVariables = Exact<{
  signIn: SignInDto;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'SignInSuccess', refresh_token: string, access_token: string, user: { __typename?: 'User', avatar?: string | null, email: string, first_name: string, id: number, last_name: string, major: Array<string>, registrationType: Array<string>, roles: Array<string> } } };

export type PageMentorQueryVariables = Exact<{
  url: Scalars['String']['input'];
}>;


export type PageMentorQuery = { __typename?: 'Query', getPageMentor: { __typename?: 'MentorPageResponse', id: number, last_name: string, major: Array<string>, first_name: string, email: string, avatar: string, setting: { __typename?: 'Setting', meta_data: any, name_url?: string | null, id: number, booking_form: any, availability: any }, profile: { __typename?: 'Profile', score: number, meta_data: any, id: number } } };

export type SignUpMutationVariables = Exact<{
  create: CreateUserDto;
}>;


export type SignUpMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UpdateResponse', message: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', me: { __typename?: 'User', id: number, avatar?: string | null, email: string, first_name: string, last_name: string, major: Array<string>, registrationType: Array<string>, roles: Array<string>, setting: { __typename?: 'Setting', name_url?: string | null, availability: any, booking_form: any, meta_data: any, id: number }, profile: { __typename?: 'Profile', score: number, id: number, meta_data: any } } };

export type SignInThirdPartyMutationVariables = Exact<{ [key: string]: never; }>;


export type SignInThirdPartyMutation = { __typename?: 'Mutation', signInThirdParty: { __typename?: 'SignInSuccess', refresh_token: string, access_token: string, user: { __typename?: 'User', roles: Array<string>, registrationType: Array<string>, major: Array<string>, last_name: string, id: number, email: string, avatar?: string | null } } };

export type CreateUserMutationVariables = Exact<{
  create: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UpdateResponse', message: string } };

export type CreateBookingFormMutationVariables = Exact<{
  dateBooking: InfoBookingTodoDto;
  form: IForm;
}>;


export type CreateBookingFormMutation = { __typename?: 'Mutation', CreateBookingForm: { __typename?: 'UpdateResponse', message: string } };


export const SignInDocument = gql`
    mutation SignIn($signIn: SignInDto!) {
  signIn(signIn: $signIn) {
    refresh_token
    access_token
    user {
      avatar
      email
      first_name
      id
      last_name
      major
      registrationType
      roles
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      signIn: // value for 'signIn'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const PageMentorDocument = gql`
    query PageMentor($url: String!) {
  getPageMentor(url: $url) {
    setting {
      meta_data
      name_url
      id
      booking_form
      availability
    }
    profile {
      score
      meta_data
      id
    }
    id
    last_name
    major
    first_name
    email
    avatar
  }
}
    `;

/**
 * __usePageMentorQuery__
 *
 * To run a query within a React component, call `usePageMentorQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageMentorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageMentorQuery({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function usePageMentorQuery(baseOptions: Apollo.QueryHookOptions<PageMentorQuery, PageMentorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PageMentorQuery, PageMentorQueryVariables>(PageMentorDocument, options);
      }
export function usePageMentorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageMentorQuery, PageMentorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PageMentorQuery, PageMentorQueryVariables>(PageMentorDocument, options);
        }
export type PageMentorQueryHookResult = ReturnType<typeof usePageMentorQuery>;
export type PageMentorLazyQueryHookResult = ReturnType<typeof usePageMentorLazyQuery>;
export type PageMentorQueryResult = Apollo.QueryResult<PageMentorQuery, PageMentorQueryVariables>;
export const SignUpDocument = gql`
    mutation SignUp($create: CreateUserDto!) {
  createUser(create: $create) {
    message
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      create: // value for 'create'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  me {
    id
    avatar
    email
    first_name
    last_name
    major
    registrationType
    roles
    setting {
      name_url
      availability
      booking_form
      meta_data
      id
    }
    registrationType
    profile {
      score
      id
      meta_data
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const SignInThirdPartyDocument = gql`
    mutation SignInThirdParty {
  signInThirdParty {
    refresh_token
    access_token
    user {
      roles
      registrationType
      major
      last_name
      id
      email
      avatar
    }
  }
}
    `;
export type SignInThirdPartyMutationFn = Apollo.MutationFunction<SignInThirdPartyMutation, SignInThirdPartyMutationVariables>;

/**
 * __useSignInThirdPartyMutation__
 *
 * To run a mutation, you first call `useSignInThirdPartyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInThirdPartyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInThirdPartyMutation, { data, loading, error }] = useSignInThirdPartyMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignInThirdPartyMutation(baseOptions?: Apollo.MutationHookOptions<SignInThirdPartyMutation, SignInThirdPartyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInThirdPartyMutation, SignInThirdPartyMutationVariables>(SignInThirdPartyDocument, options);
      }
export type SignInThirdPartyMutationHookResult = ReturnType<typeof useSignInThirdPartyMutation>;
export type SignInThirdPartyMutationResult = Apollo.MutationResult<SignInThirdPartyMutation>;
export type SignInThirdPartyMutationOptions = Apollo.BaseMutationOptions<SignInThirdPartyMutation, SignInThirdPartyMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($create: CreateUserDto!) {
  createUser(create: $create) {
    message
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      create: // value for 'create'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreateBookingFormDocument = gql`
    mutation CreateBookingForm($dateBooking: InfoBookingTodoDto!, $form: IForm!) {
  CreateBookingForm(dateBooking: $dateBooking, form: $form) {
    message
  }
}
    `;
export type CreateBookingFormMutationFn = Apollo.MutationFunction<CreateBookingFormMutation, CreateBookingFormMutationVariables>;

/**
 * __useCreateBookingFormMutation__
 *
 * To run a mutation, you first call `useCreateBookingFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingFormMutation, { data, loading, error }] = useCreateBookingFormMutation({
 *   variables: {
 *      dateBooking: // value for 'dateBooking'
 *      form: // value for 'form'
 *   },
 * });
 */
export function useCreateBookingFormMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingFormMutation, CreateBookingFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingFormMutation, CreateBookingFormMutationVariables>(CreateBookingFormDocument, options);
      }
export type CreateBookingFormMutationHookResult = ReturnType<typeof useCreateBookingFormMutation>;
export type CreateBookingFormMutationResult = Apollo.MutationResult<CreateBookingFormMutation>;
export type CreateBookingFormMutationOptions = Apollo.BaseMutationOptions<CreateBookingFormMutation, CreateBookingFormMutationVariables>;
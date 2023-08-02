import { gql } from '@apollo/client';
// import { graphql } from '@/gql';

export const fetchSignIn = gql(/* GraphQL */ `
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
`);

export const fetchPageMentor = gql(/* GraphQL */ `
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
`);

export const fetchCreateUser = gql(/* GraphQL */ `
  mutation SignUp($create: CreateUserDto!) {
    createUser(create: $create) {
      message
    }
  }
`);

export const fetchCurrentUser = gql(/* GraphQL */ `
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
`);

export const fetchSignInThirdParty = gql(/* GraphQL */ `
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
`);

export const fetchSignUnThirdParty = gql(/* GraphQL */ `
  mutation CreateUser($create: CreateUserDto!) {
    createUser(create: $create) {
      message
    }
  }
`);

export const fetchCreateBooking = gql(/* GraphQL */ `
  mutation CreateBookingForm($dateBooking: InfoBookingTodoDto!, $form: IForm!) {
    CreateBookingForm(dateBooking: $dateBooking, form: $form) {
      message
    }
  }
`);

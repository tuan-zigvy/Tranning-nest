export enum ERole {
  MENTEE = 'mentee',
  MENTOR = 'mentor',
  ADMIN = 'admin',
}

export enum EKeyHeader {
  USER_ID = 'x-client-id',
  REFRESH_TOKEN = 'x-rtoken-id',
  ACCESS_TOKEN = 'x-atoken-id',
  AUTH_TOKEN = 'x-au-token-id',
}

export enum ERegistrationType {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  PASSWORD = 'password',
}

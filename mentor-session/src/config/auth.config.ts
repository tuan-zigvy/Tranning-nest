export default (): Record<string, string> => ({
  secret: process.env.KEY_SECRET,
  secret_rf: process.env.KEY_SECRET_RF,
  accessToken_ex: process.env.ACCESS_TOKEN_EXPIRES,
  refreshToken_ex: process.env.REFRESH_TOKEN_EXPIRES,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleSecret: process.env.GOOGLE_CLIENT_SECRET,
  facebookClientId: process.env.FACEBOOK_CLIENT_ID,
  facebookSecret: process.env.FACEBOOK_CLIENT_SECRET,
  secret_auth: process.env.KEY_SECRET_AUTH,
  url_client: process.env.URL_CLIENT,
});

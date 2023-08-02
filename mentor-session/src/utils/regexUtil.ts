/* eslint-disable operator-linebreak */
/* eslint-disable no-useless-escape */
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const IMAGE_REGEX =
  /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;

export { PASSWORD_REGEX, IMAGE_REGEX };

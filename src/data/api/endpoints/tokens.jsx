import instance from '../instance';

const baseUrl = 'token/';

const tokens = {
  get(email, password, captcha = '') {
    return instance.post(baseUrl, { email, password, captcha });
  },
  refresh(refresh) {
    const url = `${baseUrl}refresh/`;
    return instance.post(url, { refresh });
  },
};

export default tokens;

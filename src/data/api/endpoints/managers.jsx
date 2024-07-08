import instance from '../instance';

const baseUrl = 'managers/';

const managers = {
  free() {
    const url = `${baseUrl}free/`;
    return instance.get(url);
  },
};

export default managers;

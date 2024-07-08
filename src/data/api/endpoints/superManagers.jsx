import instance from '../instance';

const baseUrl = 'super-managers/';

const superManagers = {
  free() {
    const url = `${baseUrl}free/`;
    return instance.get(url);
  },
};

export default superManagers;

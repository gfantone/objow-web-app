import instance from '../instance';

const baseUrl = 'roles/';

const roles = {
  list() {
    return instance.get(baseUrl);
  },
};

export default roles;

import instance from '../instance';

const baseUrl = 'user-identifiers/';

const userIdentifiers = {
  definitions() {
    return instance.get(`${baseUrl}definitions/`);
  },
};

export default userIdentifiers;

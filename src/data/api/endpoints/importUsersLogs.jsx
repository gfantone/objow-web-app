import instance from '../instance';

const baseUrl = 'import-users-logs/';

const importUsersLogs = {
  list() {
    return instance.get(baseUrl);
  },
  export(id) {
    return instance.get(`${baseUrl}${id}/export`);
  },
};

export default importUsersLogs;

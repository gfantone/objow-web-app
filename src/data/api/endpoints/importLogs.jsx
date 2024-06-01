import instance from '../instance';

const baseUrl = 'import-logs/';

const importLogs = {
  list() {
    return instance.get(baseUrl);
  },
  export(id) {
    return instance.get(`${baseUrl}${id}/export`);
  },
};

export default importLogs;

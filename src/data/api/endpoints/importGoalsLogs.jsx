import instance from '../instance';

const baseUrl = 'import-goals-logs/';

const importGoalsLogs = {
  list() {
    return instance.get(baseUrl);
  },
  export(id) {
    return instance.get(`${baseUrl}${id}/export`);
  },
};

export default importGoalsLogs;

import instance from '../instance'

const baseUrl = 'import-logs/';

const importLogs = {
    list() {
        return instance.get(baseUrl)
    }
};

export default importLogs
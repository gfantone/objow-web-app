import instance from '../instance'

const baseUrl = 'collaborator-data/';

const collaboratorData = {
    bulkUpdate(data) {
        const url = `${baseUrl}bulk-update/`;
        return instance.put(url, data)
    }
};

export default collaboratorData
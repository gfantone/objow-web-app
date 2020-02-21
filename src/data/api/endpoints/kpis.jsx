import instance from '../instance'

const baseUrl = 'kpis/';

const kpis = {
    list() {
        return instance.get(baseUrl)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    collaboratorData(id) {
        const url = `${baseUrl}${id}/collaborator-data/`;
        return instance.get(url)
    }
};

export default kpis
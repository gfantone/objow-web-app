import instance from '../instance'

const baseUrl = 'levels/';

const levels = {
    create(points, period) {
        const url = `${baseUrl}`;
        return instance.post(url, { points, period })
    },
    update(id, points) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { points })
    },
    remove(id) {
        const url = `${baseUrl}${id}/`;
        return instance.delete(url)
    },
    successfulCollaborators(id) {
        const url = `${baseUrl}${id}/successful-collaborators/`;
        return instance.get(url)
    }
};

export default levels
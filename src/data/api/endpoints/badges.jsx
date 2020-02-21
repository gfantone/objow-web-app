import instance from '../instance'

const baseUrl = 'badges/';

const badges = {
    detail(id) {
        const url = `${baseUrl}${id}/`;
        return instance.get(url)
    },
    levelCount(id) {
        const url = `${baseUrl}${id}/level-count/`;
        return instance.get(url)
    },
    levels(id) {
        const url = `${baseUrl}${id}/levels/`;
        return instance.get(url)
    },
    points(id) {
        const url = `${baseUrl}${id}/points/`;
        return instance.get(url)
    },
    updateDescription(id, description) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { description })
    }
};

export default badges
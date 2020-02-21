import instance from '../instance'

const baseUrl = 'coaching-items/';

const coachingItems = {
    create(item) {
        return instance.post(baseUrl, item)
    },
    update(item) {
        const url = `${baseUrl}${item.id}/`;
        return instance.put(url, item)
    },
    updateState(id, state) {
        const url = `${baseUrl}${id}/`;
        return instance.patch(url, { state })
    },
    remove(id) {
        const url = `${baseUrl}${id}/`;
        return instance.delete(url)
    }
};

export default coachingItems
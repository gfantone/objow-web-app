import instance from '../instance'

const baseUrl = 'rewards/'

const rewards = {
    create(reward) {
        return instance.post(baseUrl, reward)
    },
    get(id) {
        const url = `${baseUrl}${id}/`
        return instance.get(url)
    },
    update(reward) {
        const url = `${baseUrl}${reward.id}/`
        return instance.put(url, reward)
    },
    updateActivation(id, isActive) {
        const url = `${baseUrl}${id}/`
        return instance.patch(url, {isActive})
    }
}

export default rewards

import instance from '../instance'

const baseUrl = 'rewards/'

const rewards = {
    create(reward) {
        return instance.post(baseUrl, reward)
    },
    update(reward) {
        const url = `${baseUrl}${reward.id}/`
        return instance.put(url, reward)
    }
}

export default rewards

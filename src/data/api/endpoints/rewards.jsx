import instance from '../instance'

const baseUrl = 'rewards/'

const rewards = {
    create(reward) {
        return instance.post(baseUrl, reward)
    }
}

export default rewards

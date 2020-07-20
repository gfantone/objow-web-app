import instance from '../instance'

const baseUrl = 'reward-types/'

const rewardTypes = {
    list() {
        return instance.get(baseUrl)
    }
}

export default rewardTypes

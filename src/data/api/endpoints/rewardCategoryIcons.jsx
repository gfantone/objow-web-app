import instance from '../instance'

const baseUrl = 'reward-category-icons'

const rewardCategoryIcons = {
    list() {
        return instance.get(baseUrl)
    }
}

export default rewardCategoryIcons

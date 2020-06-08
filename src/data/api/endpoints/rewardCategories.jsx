import instance from "../instance";

const baseUrl = 'reward-categories/'

const rewardCategories = {
    create(category) {
        return instance.post(baseUrl, category)
    }
}

export default rewardCategories

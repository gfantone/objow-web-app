import instance from "../instance";

const baseUrl = 'reward-categories/'

const rewardCategories = {
    actives() {
        const url = `${baseUrl}actives/`
        return instance.get(url)
    },
    create(category) {
        return instance.post(baseUrl, category)
    },
    inactives() {
        const url = `${baseUrl}inactives/`
        return instance.get(url)
    }
}

export default rewardCategories

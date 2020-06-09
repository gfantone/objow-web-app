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
    get(id) {
        const url = `${baseUrl}${id}/`
        return instance.get(url)
    },
    inactives() {
        const url = `${baseUrl}inactives/`
        return instance.get(url)
    },
    update(category) {
        const url = `${baseUrl}${category.id}/`
        return instance.put(url, category)
    },
    usableIcons(id) {
        const url = `${baseUrl}${id}/usable-icons/`
        return instance.get(url)
    }
}

export default rewardCategories

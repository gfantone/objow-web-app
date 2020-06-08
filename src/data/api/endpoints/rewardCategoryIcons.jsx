import instance from '../instance'

const baseUrl = 'reward-category-icons/'

const rewardCategoryIcons = {
    usable() {
        const url = `${baseUrl}usable/`
        return instance.get(url)
    }
}

export default rewardCategoryIcons

import instance from '../instance'

const baseUrl = 'team-reward-orders/'

const teamRewardOrders = {
    detail(id) {
        const url = `${baseUrl}${id}/`
        return instance.get(url)
    },
    items(id) {
        const url = `${baseUrl}${id}/items/`
        return instance.get(url)
    },
    waitingCount() {
        const url = `${baseUrl}waiting-count/`
        return instance.get(url)
    }
}

export default teamRewardOrders

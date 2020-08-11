import instance from '../instance'

const baseUrl = 'team-reward-orders/'

const teamRewardOrders = {
    create(order) {
        return instance.post(baseUrl, order)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`
        return instance.get(url)
    },
    items(id) {
        const url = `${baseUrl}${id}/items/`
        return instance.get(url)
    },
    update(id, oldPointBalance, isValid) {
        const url = `${baseUrl}${id}/`
        return instance.patch(url, {oldPointBalance, isValid})
    },
    waitingCount() {
        const url = `${baseUrl}waiting-count/`
        return instance.get(url)
    }
}

export default teamRewardOrders

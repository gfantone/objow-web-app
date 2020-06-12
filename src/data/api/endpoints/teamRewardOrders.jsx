import instance from '../instance'

const baseUrl = 'team-reward-orders/'

const teamRewardOrders = {
    waitingCount() {
        const url = `${baseUrl}waiting-count/`
        return instance.get(url)
    }
}

export default teamRewardOrders

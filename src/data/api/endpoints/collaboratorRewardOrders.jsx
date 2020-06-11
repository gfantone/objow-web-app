import instance from '../instance'

const baseUrl = 'collaborator-reward-orders/'

const collaboratorRewardOrders = {
    waitingCount() {
        const url = `${baseUrl}waiting-count/`
        return instance.get(url)
    }
}

export default collaboratorRewardOrders

import instance from '../instance'

const baseUrl = 'rewards/'

const rewards = {
    active(name, categoryId) {
        const hasName = name != null && name !== ''
        var url = `${baseUrl}active/`
        if (hasName || categoryId) url += '?'
        if (hasName) url = `${url}name=${name}`
        if (hasName && categoryId) url += '&'
        if (categoryId) url += `category=${categoryId}`
        return instance.get(url)
    },
    create(reward) {
        return instance.post(baseUrl, reward)
    },
    exportOrders(categoryId, teamId, collaboratorId, periodId, validationStart, validationEnd) {
        var url = `${baseUrl}`
        var hasParam = false
        if (categoryId || teamId || collaboratorId || periodId || validationStart || validationEnd) url += '?'
        if (categoryId) {
            url += `?category=${categoryId}`
            hasParam = true
        }
        if (teamId) {
            if (hasParam) url += '&'
            url += `?team=${teamId}`
            hasParam = true
        }
        if (collaboratorId) {
            if (hasParam) url += '&'
            url += `?collaborator=${collaboratorId}`
            hasParam = true
        }
        if (periodId) {
            if (hasParam) url += '&'
            url += `?period=${periodId}`
            hasParam = true
        }
        if (validationStart) {
            if (hasParam) url += '&'
            url += `?validationStart=${validationStart}`
            hasParam = true
        }
        if (validationEnd) {
            if (hasParam) url += '&'
            url += `?validationEnd=${validationEnd}`
            hasParam = true
        }
        return instance.get(url)
    },
    get(id) {
        const url = `${baseUrl}${id}/`
        return instance.get(url)
    },
    update(reward) {
        const url = `${baseUrl}${reward.id}/`
        return instance.put(url, reward)
    },
    updateActivation(id, isActive) {
        const url = `${baseUrl}${id}/`
        return instance.patch(url, {isActive})
    }
}

export default rewards

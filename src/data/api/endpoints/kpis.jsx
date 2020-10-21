import instance from '../instance'

const baseUrl = 'kpis/'

const kpis = {
    collaboratorData(id) {
        const url = `${baseUrl}${id}/collaborator-data/`
        return instance.get(url)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`
        return instance.get(url)
    },
    list() {
        return instance.get(baseUrl)
    },
    update(id, isActive, params) {
        const url = `${baseUrl}${id}/`
        const data = params ? {isActive, params} : {isActive}
        return instance.patch(url, data)
    }
}

export default kpis

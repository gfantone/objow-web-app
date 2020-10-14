import instance from '../instance'

const baseUrl = 'partners/'

const partners = {
    detail(id) {
        const url = `${baseUrl}${id}`
        return instance.get(url)
    },
    list() {
        return instance.get(baseUrl)
    }
}

export default partners

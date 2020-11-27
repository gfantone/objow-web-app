import instance from '../instance'

const baseUrl = 'partners/'

const partners = {
    aircallRedirectUri() {
        const url = `${baseUrl}aircall-redirect-uri/`
        return instance.get(url)
    },
    detail(id) {
        const url = `${baseUrl}${id}/`
        return instance.get(url)
    },
    kpis(id) {
        const url = `${baseUrl}${id}/kpis/`
        return instance.get(url)
    },
    list() {
        return instance.get(baseUrl)
    }
}

export default partners

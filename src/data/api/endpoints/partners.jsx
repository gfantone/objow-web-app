import instance from '../instance'

const baseUrl = 'partners/'

const partners = {
    connectAircall(code) {
        const url = `${baseUrl}connect-aircall/`
        return instance.post(url, {code})
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

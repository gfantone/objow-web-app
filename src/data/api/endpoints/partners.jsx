import instance from '../instance'

const baseUrl = 'partners/'

const partners = {
    list() {
        return instance.get(baseUrl)
    }
}

export default partners

import instance from '../instance'

const apiUrl = {
    get(code) {
        let url = `api-url/${code}/`
        return instance.get(url)
    }
}

export default apiUrl
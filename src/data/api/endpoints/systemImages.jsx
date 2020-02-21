import instance from '../instance'

const baseUrl = 'system-images/';

const systemImages = {
    list() {
        return instance.get(baseUrl)
    },
    update(code, image) {
        const url = `${baseUrl}${code}/`;
        return instance.put(url, image)
    }
};

export default systemImages
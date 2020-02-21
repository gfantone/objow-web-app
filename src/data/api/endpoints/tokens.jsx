import instance from '../instance'

const baseUrl = 'token/';

const tokens = {
    get(email, password) {
        return instance.post(baseUrl, {email, password})
    },
    refresh(refresh) {
        const url = `${baseUrl}refresh/`;
        return instance.post(url, {refresh})
    }
};

export default tokens
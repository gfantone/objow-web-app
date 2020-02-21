import instance from '../instance'

const baseUrl = 'account/';

const account = {
    get() {
        return instance.get(baseUrl)
    },
    update(account) {
        const url = `${baseUrl}infos/`;
        return instance.put(url, account)
    },
    team() {
        const url = `${baseUrl}team/`;
        return instance.get(url)
    }
};

export default account
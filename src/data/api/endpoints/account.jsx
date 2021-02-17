import instance from '../instance'

const baseUrl = 'account/';

const account = {
    get() {
        return instance.get(baseUrl)
    },
    acceptTerms(useTermsAccepted, privacyPolicyAccepted) {
        const url = `${baseUrl}accept-terms/`;
        return instance.put(url, { useTermsAccepted, privacyPolicyAccepted })
    },
    update(account) {
        const url = `${baseUrl}infos/`;
        return instance.patch(url, account)
    },
    team() {
        const url = `${baseUrl}team/`;
        return instance.get(url)
    }
};

export default account

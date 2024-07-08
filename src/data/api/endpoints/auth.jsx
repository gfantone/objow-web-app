import instance from '../instance';

const baseUrl = 'auth/';

const auth = {
    verifyAccountActivationKey(key, contract) {
        const url = `${baseUrl}verify-account-activation-key/`;
        return instance.post(url, {
            key: key,
            contract: contract
        });
    },
    activateAccount(key, contract) {
        const url = `${baseUrl}activate-account/`;
        return instance.post(url, {
            key: key,
            contract: contract
        });
    },
    resendAccountActivationKey(key, contract) {
        const url = `${baseUrl}resend-account-activation-key/`;
        return instance.post(url, {
            key: key,
            contract: contract
        });
    }
};

export default auth;

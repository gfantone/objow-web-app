const getAccountActivationErrorRedirectPath = (error, contract, key) => {
    const encodedKey = encodeURIComponent(key);
    // TODO: voir avec Edenred s'il faut des pages spécifiques pour les erreurs ci-après.
    const errorRedirects = {
        'ACTIVATION_KEY_EXPIRED': `/nodes/${contract}/account-activation-key-expired?key=${encodedKey}`,
        'ACTIVATION_KEY_INVALID': `/nodes/${contract}/account-activation-key-expired?key=${encodedKey}`,
        'BAD_CONTRACT_UUID_PARAM': `/nodes/${contract}/account-activation-key-expired?key=${encodedKey}`,
        'HIERARCHY_NODE_USER_ALREADY_ACTIVATED': `/nodes/${contract}/account-activation-key-expired?key=${encodedKey}`,
        'HIERARCHY_NODE_USER_DISABLED': `/nodes/${contract}/inaccessible`,
        'HIERARCHY_NODE_USER_NOT_FOUND': `/nodes/${contract}/inaccessible`,
        'CONTRACT_DISABLED': `/nodes/${contract}/inaccessible`,
        'CONTRACT_NOT_FOUND': `/nodes/${contract}/inaccessible`,
    };

    if (!(error in errorRedirects)) {
        throw new Error(`Unknown error type: ${error}`);
    }

    return errorRedirects[error];
};

export default getAccountActivationErrorRedirectPath;

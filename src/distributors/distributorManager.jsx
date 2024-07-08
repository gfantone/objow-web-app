import {edenred, objow} from './distributorConfig'
import {getActiveDomain} from './domainManager'

const getDistributorConfig = () => {
    const domain = getActiveDomain();
    const objowDomains = process.env.REACT_APP_OBJOW_DOMAINS.split(';');
    const edenredDomains = process.env.REACT_APP_EDENRED_DOMAINS.split(';');

    if (objowDomains.includes(domain)) {
        return objow;
    }

    if (edenredDomains.includes(domain)) {
        return edenred;
    }

    return objow;
}

export const getRoutes = () => {
    const config = getDistributorConfig();
    return config.routes;
}

export const useTheme = ({...props}) => {
    const config = getDistributorConfig();
    return config.useTheme(props);
}

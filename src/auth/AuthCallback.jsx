import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core';

<<<<<<< HEAD
import {useAuth} from './AuthContext';
import {getQueryParam} from '../helpers/UrlHelper';

const AuthCallback = () => {
    const {loginCallback} = useAuth();
=======
import {loginCallback} from './oidc';
import {getQueryParam} from '../helpers/UrlHelper';

const AuthCallback = () => {
>>>>>>> dev
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        async function handleCallback() {
            await loginCallback();
            const redirectPath = getQueryParam(location.search, 'redirect');

            if (redirectPath) {
                history.push(redirectPath);
            } else {
                history.push('/nodes');
            }
        }

        handleCallback();
    }, [history, location.search, loginCallback]);

    return (
        <>
            <div className={'ft-content'}>
                <CircularProgress/>
            </div>
        </>
    );
}

export default AuthCallback;

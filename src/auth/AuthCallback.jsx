import React, {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {CircularProgress} from '@material-ui/core';

import {useAuth} from './AuthContext';
import {getQueryParam} from '../helpers/UrlHelper';

const AuthCallback = () => {
    const {loginCallback} = useAuth();
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

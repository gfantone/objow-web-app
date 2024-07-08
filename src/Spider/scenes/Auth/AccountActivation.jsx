import React, {useEffect} from "react";
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useParams, useHistory} from 'react-router-dom'
import {Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";

import {AccountActivationStep, AccountActivationSteps} from './components';
import {getAccountActivationErrorRedirectPath} from './utils'
import {useAuth} from '../../../auth';

import {Button} from '../../components';
import {verifyAccountActivationKeyClear, verifyAccountActivationKeyStart} from '../../features/auth/accountActivation/slices';
import {getQueryParam} from '../../../helpers/UrlHelper';

import LogoImg from '../../assets/img/logo.svg';

const useStyles = makeStyles(() => ({
    welcomeContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
}));

const AccountActivation = () => {
    const {register} = useAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    const intl = useIntl();
    const location = useLocation();
    const {contract} = useParams();
    const classes = useStyles();

    const activationState = useSelector(state => state.verifyAccountActivationKey);

    const handleClick = () => {
        const key = getQueryParam(location.search, 'key');
        dispatch(verifyAccountActivationKeyStart({key, contract}));
    };

    useEffect(() => {
        const key = getQueryParam(location.search, 'key');

        if (!key) {
            history.push('/');
            return;
        }

        if (activationState.success) {
            const encodedKey = encodeURIComponent(key);
            const redirectUri = `${window.location.origin}/nodes/${contract}/finalize-activation?key=${encodedKey}`;
            dispatch(verifyAccountActivationKeyClear());
            register(redirectUri);
        } else if (activationState.error) {
            const redirectPath = getAccountActivationErrorRedirectPath(activationState.error, contract, key);
            dispatch(verifyAccountActivationKeyClear());
            history.push(redirectPath);
        }
    }, [activationState, contract, dispatch, history, location.search, register]);

    return (
        <>
            <div className={'ft-main-top'}>
                <AccountActivationSteps activeStep={AccountActivationStep.Activation}/>
            </div>

            <div className={'ft-content'}>
                <img src={LogoImg} alt={'Logo'} height={'56px'}/>

                <div className={classes.welcomeContainer}>
                    <Typography variant="h1" component="h1" align={'center'}>
                        {intl.formatMessage({id: 'spider.auth.account_activation.title'})}
                    </Typography>

                    <Typography align={'center'}>
                        {intl.formatMessage({id: 'spider.auth.account_activation.message'})}
                    </Typography>
                </div>

                <Button color={'primary'} variant={'contained'} size={'large'} onClick={handleClick} load={activationState.loading}>
                    {intl.formatMessage({id: 'spider.auth.account_activation.submit'})}
                </Button>
            </div>
        </>
    );
}

export default AccountActivation;

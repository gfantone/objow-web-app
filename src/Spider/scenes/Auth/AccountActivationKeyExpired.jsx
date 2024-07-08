import React, {useEffect} from 'react';
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useParams} from "react-router-dom";
import {toast} from 'react-toastify';
import {Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/styles";

import {NeedHelp} from '../Errors/components';
import {useAuth} from '../../../auth';
import {Button} from "../../components";
import {resendAccountActivationKeyClear, resendAccountActivationKeyStart} from "../../features/auth/accountActivation/slices";
import {getQueryParam} from "../../../helpers/UrlHelper";

import MailWarningImg from '../../assets/img/mail-warning.png'

const useStyles = makeStyles(() => ({
    expiration: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },
    buttons: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
}));

const AccountActivationKeyExpired = () => {
    const {login} = useAuth();
    const dispatch = useDispatch();
    const intl = useIntl();
    const location = useLocation();
    const classes = useStyles();

    const {contract} = useParams();
    const activationState = useSelector(state => state.resendAccountActivationKey);

    const goToLogin = () => login();

    const resendAccountActivationKey = () => {
        const key = getQueryParam(location.search, 'key');
        dispatch(resendAccountActivationKeyStart({key, contract}));
    }

    useEffect(() => {
        if (activationState.success) {
            toast.success(intl.formatMessage({id: 'spider.auth.account_activation_key_expired.resend_success'}));
            dispatch(resendAccountActivationKeyClear());
        } else if (activationState.error) {
            toast.error(intl.formatMessage({id: 'spider.auth.account_activation_key_expired.resend_error'}));
            dispatch(resendAccountActivationKeyClear());
        }
    }, [activationState.error, activationState.success, dispatch, intl]);

    return (
        <>
            <div className={'ft-content'}>
                <img src={MailWarningImg} alt={'mail-warning'}/>

                <div className={classes.expiration}>
                    <Typography variant="h1" component="h1" align={'center'}>
                        {intl.formatMessage({id: 'spider.auth.account_activation_key_expired.title'})}
                    </Typography>

                    <Typography align={'center'}>
                        {intl.formatMessage({id: 'spider.auth.account_activation_key_expired.message'})}
                    </Typography>

                    <div className={classes.buttons}>
                        <Button color={'primary'} variant={'contained'} size={'large'} onClick={resendAccountActivationKey}>
                            {intl.formatMessage({id: 'spider.auth.account_activation_key_expired.retry'})}
                        </Button>
                        <Button color={'primary'} variant={'outlined'} size={'large'} onClick={goToLogin}>
                            {intl.formatMessage({id: 'spider.auth.account_activation_key_expired.login'})}
                        </Button>
                    </div>

                    <Typography variant={'body2'}>
                        {intl.formatMessage({id: 'spider.auth.account_activation_key_expired.info'})}
                    </Typography>

                    <NeedHelp/>
                </div>
            </div>
        </>
    );
}

export default AccountActivationKeyExpired;

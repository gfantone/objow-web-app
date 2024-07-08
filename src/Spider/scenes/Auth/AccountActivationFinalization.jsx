import React, {useEffect} from "react";
import {useIntl} from 'react-intl';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {Card, CircularProgress, Typography} from "@material-ui/core";

import {AccountActivationStep, AccountActivationSteps} from "./components";
import {getAccountActivationErrorRedirectPath} from "./utils";
import {useAuth} from "../../../auth";
import {Button} from "../../components";
import {validateAccountClear, validateAccountStart} from "../../features/auth/accountActivation/slices";
import {getQueryParam} from '../../../helpers/UrlHelper';

import SuccessImg from "../../assets/img/success.png";


const AccountActivationFinalization = () => {
    const {registerCallback} = useAuth();
    const dispatch = useDispatch();
    const history = useHistory();
    const intl = useIntl();
    const location = useLocation();
    const {contract} = useParams();

    const activationState = useSelector(state => state.validateAccount);

    const goToContractSelection = () => {
        dispatch(validateAccountClear());
        history.push('/nodes');
    }

    const renderLoading = () => <CircularProgress/>;

    const renderAccountActivationSuccess = () => {
        return (
            <>
                <img src={SuccessImg} alt={'success'}/>

                <Typography variant="h1" component="h1" align={'center'}>
                    {intl.formatMessage({id: 'spider.auth.account_activation_finalization.success.title'})}
                </Typography>

                <Typography align={'center'}>
                    {intl.formatMessage({id: 'spider.auth.account_activation_finalization.success.message'})}
                </Typography>

                <Button color={'primary'} variant={'contained'} size={'large'} onClick={goToContractSelection}>
                    {intl.formatMessage({id: 'spider.auth.account_activation_finalization.success.submit'})}
                </Button>
            </>
        );
    }

    useEffect(() => {
        async function validateAccount() {
            const key = getQueryParam(location.search, 'key');

            if (!key) {
                history.push('/');
                return;
            }

            await registerCallback();
            dispatch(validateAccountStart({key, contract}));
        }

        validateAccount();
    }, [contract, dispatch, history, location.search, registerCallback]);

    useEffect(() => {
        if (activationState.error) {
            const key = getQueryParam(location.search, 'key');
            const redirectPath = getAccountActivationErrorRedirectPath(activationState.error, contract, key);
            dispatch(validateAccountClear());
            history.push(redirectPath);
        }
    }, [activationState, contract, dispatch, history, location.search]);

    return (
        <>
            <div className={'ft-main-top'}>
                <AccountActivationSteps activeStep={AccountActivationStep.Validation}/>
            </div>

            <div className={'ft-content'}>
                <Card elevation={0}>
                    {activationState.success ? renderAccountActivationSuccess() :
                        activationState.loading ? renderLoading() : null}
                </Card>
            </div>
        </>
    );
}

export default AccountActivationFinalization;

import React from 'react';
import {useIntl} from "react-intl";
import {User as UserIcon, Lock1 as Lock1Icon, UserTick as UserTickIcon} from 'iconsax-react';
import {Stepper, Step, StepLabel} from '@material-ui/core';

export const AccountActivationStep = {
    Activation: 0,
    Information: 1,
    Validation: 2
};

const AccountActivationSteps = ({activeStep}) => {
    const intl = useIntl();

    return (
        <div>
            <Stepper activeStep={activeStep} alternativeLabel>
                <Step key={AccountActivationStep.Activation}>
                    <StepLabel icon={<UserIcon size={16}/>}>
                        {intl.formatMessage({id: 'spider.auth.account_activation_steps.activation'})}
                    </StepLabel>
                </Step>

                <Step key={AccountActivationStep.Information}>
                    <StepLabel icon={<Lock1Icon size={16}/>}>
                        {intl.formatMessage({id: 'spider.auth.account_activation_steps.information'})}
                    </StepLabel>
                </Step>

                <Step key={AccountActivationStep.Validation}>
                    <StepLabel icon={<UserTickIcon size={16}/>}>
                        {intl.formatMessage({id: 'spider.auth.account_activation_steps.validation'})}
                    </StepLabel>
                </Step>
            </Stepper>
        </div>
    );
}

export default AccountActivationSteps;

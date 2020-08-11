import React from 'react'
import {Step, StepConnector, StepLabel, Stepper} from "@material-ui/core"
import {BoldSpan, Chip, DefaultText} from "../../../../../../components"
import * as Resources from "../../../../../../Resources"
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    connector: {
        top: 16,
        left: 'calc(-100% + 56px) !important',
        right: 'calc(100% + 8px) !important'
    },
    stepper: {
        marginLeft: -8,
        marginRight: -8,
        padding: 0
    },
    stepLabel: {
        alignItems: 'flex-start'
    },
    label: {
        textAlign: 'left !important'
    }
})

const HorizontalExplanation = ({...props}) => {
    const classes = useStyles()

    return (
        <div>
            <Stepper alternativeLabel nonLinear activeStep={3} connector={<StepConnector className={classes.connector} />} className={classes.stepper}>
                <Step>
                    <StepLabel
                        optional={<DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_1_DESCRIPTION}</DefaultText>}
                        icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_1_NUMBER} />}
                        classes={{root: classes.stepLabel, label: classes.label}}
                    >
                        <DefaultText>
                            <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_1_TITLE}</BoldSpan>
                        </DefaultText>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel
                        optional={<DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_2_DESCRIPTION}</DefaultText>}
                        icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_2_NUMBER} />}
                        classes={{root: classes.stepLabel, label: classes.label}}
                    >
                        <DefaultText>
                            <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_2_TITLE}</BoldSpan>
                        </DefaultText>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel
                        optional={<DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_3_DESCRIPTION}</DefaultText>}
                        icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_3_NUMBER} />}
                        classes={{root: classes.stepLabel, label: classes.label}}
                    >
                        <DefaultText>
                            <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_3_TITLE}</BoldSpan>
                        </DefaultText>
                    </StepLabel>
                </Step>
                <Step>
                    <StepLabel
                        optional={<DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_4_DESCRIPTION}</DefaultText>}
                        icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_4_NUMBER} color='primary' />}
                        classes={{root: classes.stepLabel, label: classes.label}}
                    >
                        <DefaultText>
                            <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_4_TITLE}</BoldSpan>
                        </DefaultText>
                    </StepLabel>
                </Step>
            </Stepper>
        </div>
    )
}

export default HorizontalExplanation

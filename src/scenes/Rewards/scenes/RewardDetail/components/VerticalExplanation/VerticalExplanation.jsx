import React from 'react'
import {Step, StepContent, StepLabel, Stepper} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {BoldSpan, DefaultText, Chip} from "../../../../../../components"
import * as Resources from "../../../../../../Resources"

const useStyles = makeStyles({
    stepper: {
        padding: 0
    }
})

const VerticalExplanation = ({...props}) => {
    const classes = useStyles()
    return (
        <div>
            <Stepper orientation='vertical' className={classes.stepper}>
                <Step expanded>
                    <StepLabel icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_1_NUMBER} />}>
                        <DefaultText>
                            <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_1_TITLE}</BoldSpan>
                        </DefaultText>
                    </StepLabel>
                    <StepContent>
                        <DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_1_DESCRIPTION}</DefaultText>
                    </StepContent>
                </Step>
                <Step expanded>
                    <StepLabel icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_2_NUMBER} />}>
                        <DefaultText>
                            <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_2_TITLE}</BoldSpan>
                        </DefaultText>
                    </StepLabel>
                    <StepContent>
                        <DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_2_DESCRIPTION}</DefaultText>
                    </StepContent>
                </Step>
                <Step expanded>
                    <StepLabel icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_3_NUMBER} />}>
                        <DefaultText>
                            <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_3_TITLE}</BoldSpan>
                        </DefaultText>
                    </StepLabel>
                    <StepContent>
                        <DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_3_DESCRIPTION}</DefaultText>
                    </StepContent>
                </Step>
                <Step expanded>
                    <StepLabel icon={<Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_4_NUMBER} color='primary' />}>
                        <DefaultText>
                            <BoldSpan>{Resources.REWARD_DETAIL_OPERATION_STEP_4_TITLE}</BoldSpan>
                        </DefaultText>
                    </StepLabel>
                    <StepContent>
                        <DefaultText>{Resources.REWARD_DETAIL_OPERATION_STEP_4_DESCRIPTION}</DefaultText>
                    </StepContent>
                </Step>
            </Stepper>
        </div>
    )
}

export default VerticalExplanation

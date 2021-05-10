import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Stepper, Step, StepLabel } from '@material-ui/core'

const styles = {
  labelWrapper: {
    position: 'relative'
  },
  label: {
    position: 'absolute',
    bottom: 0
  }
}

const CustomStepper = ({ classes, steps, ...props }) => {

  return(
    <Stepper alternativeLabel>
      { steps && steps.map(step => (
        <Step active={step.active} completed={step.completed}>
          <StepLabel>{ step.name }</StepLabel>
        </Step>
      )) }
    </Stepper>
  )
}


export default withStyles(styles)(CustomStepper)

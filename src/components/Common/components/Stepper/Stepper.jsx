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
  },
  rootStepper: {
    background: 'none'
  },
  rootStep: {
    '& .MuiStepIcon-root.MuiStepIcon-active': {
      color: '#00E58D'
    }
  },
  completedStep: {
    opacity: 0.6,
    '& .MuiStepIcon-root.MuiStepIcon-completed': {
      color: '#00E58D',
    }
  }
}

const CustomStepper = ({ classes, steps, ...props }) => {

  return(
    <Stepper alternativeLabel classes={{
        root: classes.rootStepper
      }}>
      { steps && steps.map(step => (
        <Step
          classes={{
            completed: classes.completedStep,
            root: classes.rootStep
          }}
          active={step.active}
          completed={step.completed}
        >
          <StepLabel>{ step.name }</StepLabel>
        </Step>
      )) }
    </Stepper>
  )
}


export default withStyles(styles)(CustomStepper)

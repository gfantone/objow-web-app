import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Stepper, Step, StepLabel, MobileStepper, Button } from '@material-ui/core'
import withWidth, {isWidthDown} from '@material-ui/core/withWidth'





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
  },
  mobileStepper: {
    '& .MuiMobileStepper-dots': {
      justifyContent: 'space-around',
      flexGrow: 1
    },
    '& .MuiMobileStepper-dotActive': {

        backgroundColor: '#00E58D'

    }
  }
}

const CustomStepper = ({ classes, steps, handleNextStep, handlePreviousStep, ...props }) => {
  const isMobile = isWidthDown('xs', props.width)

  const currentStep = steps.find(s => s.active === true)
  const currentStepIndex = steps.indexOf(currentStep)
  return(
    <React.Fragment>
      {!isMobile && (

        <Stepper steps={steps.length} alternativeLabel classes={{
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
      )}
      {isMobile && (
        <MobileStepper
          steps={steps.length}
          activeStep={currentStepIndex}
          className={classes.mobileStepper}
          nextButton={
            <Button type='submit' size="small" onClick={handleNextStep} style={{width: 100}}>
              {currentStepIndex >= steps.length - 1 ? 'Terminer' : 'Suivant'}

            </Button>
          }
          backButton={
            <Button size="small" onClick={handlePreviousStep} style={{width: 100}} disabled={currentStepIndex === 0}>

              Précédent
            </Button>
          }
        />
      )}
    </React.Fragment>
  )
}


export default withStyles(styles)(withWidth()(CustomStepper))

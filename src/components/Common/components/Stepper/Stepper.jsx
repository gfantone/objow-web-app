import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  MobileStepper,
  Button,
} from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Loader, ThemeWrapper } from '../../../../components';
import tinycolor from 'tinycolor2';

const styles = (theme) => {
  return {
    labelWrapper: {
      position: 'relative',
    },
    label: {
      position: 'absolute',
      bottom: 0,
    },
    labelColor: {
      color: '#FFFFFF',
    },
    rootStepper: {
      background: 'none',
    },
    rootStep: {
      '& .MuiStepIcon-root.MuiStepIcon-active': {
        color: theme.palette.primary.main,
      },
    },
    completedStep: {
      opacity: 0.6,
      '& .MuiStepIcon-root.MuiStepIcon-completed': {
        color: theme.palette.primary.main,
      },
    },
    mobileStepper: {
      '& .MuiMobileStepper-dots': {
        justifyContent: 'space-around',
        flexGrow: 1,
      },
      '& .MuiMobileStepper-dotActive': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  };
};

const CustomStepper = ({
  classes,
  steps,
  handleNextStep,
  handlePreviousStep,
  actionLoading,
  ...props
}) => {
  const isMobile = isWidthDown('xs', props.width);

  const currentStep = steps.find((s) => s.active === true);
  const currentStepIndex = steps.indexOf(currentStep);

  const context = useContext(ThemeWrapper.Context);
  const { backgroundColor } = context ? context : {};
  const isContrast = tinycolor(backgroundColor).isDark();

  return (
    <React.Fragment>
      {!isMobile && (
        <Stepper
          steps={steps.length}
          alternativeLabel
          classes={{
            root: classes.rootStepper,
          }}
        >
          {steps &&
            steps.map((step) => (
              <Step
                classes={{
                  completed: classes.completedStep,
                  root: classes.rootStep,
                }}
                active={step.active}
                completed={step.completed}
              >
                <StepLabel
                  classes={isContrast && { label: classes.labelColor }}
                >
                  {step.name}
                </StepLabel>
              </Step>
            ))}
        </Stepper>
      )}
      {isMobile && (
        <MobileStepper
          steps={steps.length}
          activeStep={currentStepIndex}
          className={classes.mobileStepper}
          nextButton={
            <Button
              type='submit'
              size='small'
              onClick={handleNextStep}
              style={{ width: 100 }}
              disabled={actionLoading}
            >
              {!actionLoading &&
                (currentStepIndex >= steps.length - 1 ? 'Terminer' : 'Suivant')}
              {actionLoading && <Loader centered />}
            </Button>
          }
          backButton={
            <Button
              size='small'
              onClick={handlePreviousStep}
              style={{ width: 100 }}
              disabled={currentStepIndex === 0}
            >
              Précédent
            </Button>
          }
        />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(withWidth()(CustomStepper));

import React from 'react';
import { Step, StepContent, StepLabel, Stepper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { BoldSpan, DefaultText, Chip } from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
  stepper: {
    padding: 0,
  },
});

const VerticalExplanation = ({ ...props }) => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <div>
      <Stepper orientation="vertical" className={classes.stepper}>
        <Step expanded>
          <StepLabel
            icon={
              <Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_1_NUMBER} />
            }
          >
            <DefaultText>
              <BoldSpan>
                {intl.formatMessage({
                  id: 'reward.detail.operation_step_1_title',
                })}
              </BoldSpan>
            </DefaultText>
          </StepLabel>
          <StepContent>
            <DefaultText lowercase>
              {intl.formatMessage({
                id: 'reward.detail.operation_step_1_description',
              })}
            </DefaultText>
          </StepContent>
        </Step>
        <Step expanded>
          <StepLabel
            icon={
              <Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_2_NUMBER} />
            }
          >
            <DefaultText>
              <BoldSpan>
                {intl.formatMessage({
                  id: 'reward.detail.operation_step_2_title',
                })}
              </BoldSpan>
            </DefaultText>
          </StepLabel>
          <StepContent>
            <DefaultText lowercase>
              {intl.formatMessage({
                id: 'reward.detail.operation_step_2_description',
              })}
            </DefaultText>
          </StepContent>
        </Step>
        <Step expanded>
          <StepLabel
            icon={
              <Chip label={Resources.REWARD_DETAIL_OPERATION_STEP_3_NUMBER} />
            }
          >
            <DefaultText>
              <BoldSpan>
                {intl.formatMessage({
                  id: 'reward.detail.operation_step_3_title',
                })}
              </BoldSpan>
            </DefaultText>
          </StepLabel>
          <StepContent>
            <DefaultText lowercase>
              {intl.formatMessage({
                id: 'reward.detail.operation_step_3_description',
              })}
            </DefaultText>
          </StepContent>
        </Step>
        <Step expanded>
          <StepLabel
            icon={
              <Chip
                label={intl.formatMessage({
                  id: 'reward.detail.operation_step_4_number',
                })}
                color="primary"
              />
            }
          >
            <DefaultText>
              <BoldSpan>
                {intl.formatMessage({
                  id: 'reward.detail.operation_step_4_title',
                })}
              </BoldSpan>
            </DefaultText>
          </StepLabel>
          <StepContent>
            <DefaultText lowercase>
              {intl.formatMessage({
                id: 'reward.detail.operation_step_4_description',
              })}
            </DefaultText>
          </StepContent>
        </Step>
      </Stepper>
    </div>
  );
};

export default VerticalExplanation;

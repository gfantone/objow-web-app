import React from 'react';
import { useIntl } from 'react-intl';
import { Grid } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  ProgressButton,
  Select,
  TransferList,
  TransferTreeList,
  Card,
  BlueText,
  Switch,
  Tooltip,
  BigText,
  ErrorText,
} from '../../../../../../components';
import { KpiStep, InfoStep, LevelStep } from './components';
import _ from 'lodash';

const BadgeFormStepper = ({
  actionLoading,
  currentStep,
  badge,
  handleNextStep,
  handlePreviousStep,
  isLastStep,
  kpis,
  categories,
  icons,
  levels,
  loading,
  teamGroup,
  setParticipants,
  remainingPoints,
  ...props
}) => {
  const intl = useIntl();
  const isMobile = isWidthDown('xs', props.width);

  let fields;
  let title;
  switch (currentStep.order) {
    case 1:
      title = intl.formatMessage({ id: 'badge.creation.kpi_title' });
      fields = (
        <KpiStep categories={categories} kpis={kpis} initial={badge.kpi} />
      );
      break;
    case 2:
      title = intl.formatMessage({ id: 'badge.creation.info_title' });
      fields = <InfoStep categories={categories} icons={icons} badge={badge} />;
      break;
    case 3:
      title = intl.formatMessage({ id: 'badge.creation.participants_title' });
      fields = (
        <Grid item xs={12}>
          <Card>
            <TransferList
              listIn={teamGroup}
              enableCollaboratorSelect={true}
              enableTeamSelect={true}
              onChange={setParticipants}
              selected={badge.participants || []}
            />
          </Card>
        </Grid>
      );
      break;
    case 4:
      fields = (
        <LevelStep
          initial={badge.levels}
          remainingPoints={remainingPoints}
          levels={levels}
        />
      );
      break;
    case 5:
      title = '';
      fields = (
        <Grid item xs={12}>
          <Card>
            <div style={{ textAlign: 'center', margin: 'auto' }}>
              <p style={{ fontSize: 19, color: '#555555' }}>
                Félicitations 🎉 !
              </p>
              <p style={{ fontSize: 19, color: '#555555' }}>
                Votre badge est prêt à être créé !
              </p>
            </div>
          </Card>
        </Grid>
      );
      break;
  }

  return (
    <div>
      <Grid container spacing={4} style={{ paddingBottom: isMobile ? 40 : 0 }}>
        <Grid item style={{ textAlign: 'center', width: '100%' }}>
          <BigText isContrast>{title}</BigText>
        </Grid>
        {fields}
        {!isMobile && (
          <Grid item xs={12}>
            <Grid container spacing={4} direction='row' justify='center'>
              {currentStep.order > 1 && (
                <Grid item>
                  <ProgressButton
                    onClick={(e) => {
                      e.preventDefault();
                      handlePreviousStep();
                    }}
                    color='secondary'
                    text={intl.formatMessage({ id: 'common.previous' })}
                    centered
                  />
                </Grid>
              )}
              {!isLastStep && (
                <Grid item>
                  <ProgressButton
                    text={intl.formatMessage({ id: 'common.next' })}
                    centered
                  />
                </Grid>
              )}
              {isLastStep && (
                <Grid item>
                  <ProgressButton
                    text={intl.formatMessage({ id: 'common.submit' })}
                    loading={loading}
                    centered
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default withWidth()(BadgeFormStepper);

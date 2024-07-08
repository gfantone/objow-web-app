import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Grid, IconButton } from '@material-ui/core';
import {
  AppBarSubTitle,
  BlueText,
  Card,
  DefaultText,
  ErrorText,
  BigText,
  InfoText,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  Select,
  Switch,
  TextField,
  HiddenInput,
  Tooltip,
  Stepper,
  RichTextField,
  TransferList,
  GreenRadio,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DefaultTitle,
  LabelText,
} from '../../../../../../../../components';
import { CategoryIconInput } from '../../../../../../components';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const LevelStep = ({ initial, levels, remainingPoints }) => {
  const [badgeLevels, setLevels] = useState(initial || []);
  const intl = useIntl();

  const addLevel = () => {
    setLevels([
      ...badgeLevels,
      {
        rank: null,
        target: 0,
        points: 0,
        level: null,
        percentage: 0,
        isNew: true,
      },
    ]);
  };
  const removeLevel = (index) => {
    setLevels(badgeLevels.filter((level, i) => i !== index));
  };

  const currentRemainingPoints =
    remainingPoints - _.sum(badgeLevels.map((level) => level.points));

  return (
    <React.Fragment>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12}>
          <Card>
            <Grid container>
              <Grid item>
                <InfoText>Points restants à attribuer</InfoText>
                <DefaultText>{currentRemainingPoints} PTS</DefaultText>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <DefaultTitle>
                {intl.formatMessage({ id: 'badge.creation.levels_title' })}
              </DefaultTitle>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {badgeLevels.map((level, index) => {
                  const number = index + 1;
                  const disabled = level.percentage > 0;
                  const removeButtonVisibility = disabled
                    ? 'collapse'
                    : 'visible';

                  return (
                    <Grid key={level.id} item container xs={6} spacing={2}>
                      <Grid item xs={12}>
                        <DefaultTitle>Palier {number}</DefaultTitle>
                      </Grid>
                      <Grid item xs={12}>
                        <Card>
                          <Grid container spacing={2}>
                            <Grid item xs>
                              <TextField
                                type="number"
                                name={`target[${index}]`}
                                label="Objectif"
                                initial={level.target}
                                disabled={disabled}
                                fullWidth
                                required
                                validations="isMoreThanOrEquals:0"
                                validationErrors={{
                                  isDefaultRequiredValue: intl.formatMessage({
                                    id: 'common.form.required_error',
                                  }),
                                  isMoreThanOrEquals:
                                    "L'objectif doit être supérieur ou égal à 0",
                                }}
                              />
                            </Grid>
                            <Grid item xs>
                              <Select
                                name={`level[${index}]`}
                                label="Condition"
                                options={levels}
                                optionValueName="id"
                                optionTextName="number"
                                optionTextPrefix="Lvl "
                                initial={level.level}
                                disabled={disabled}
                                fullWidth
                                required
                                validationErrors={{
                                  isDefaultRequiredValue: intl.formatMessage({
                                    id: 'common.form.required_error',
                                  }),
                                }}
                              />
                            </Grid>
                            <Grid item xs>
                              <TextField
                                type="number"
                                name={`points[${index}]`}
                                label="Nbre de point si atteint"
                                initial={level.points}
                                disabled={disabled}
                                fullWidth
                                required
                                onChange={(value) =>
                                  setLevels(
                                    badgeLevels.map((level, currentIndex) => {
                                      if (index === currentIndex) {
                                        return Object.assign({}, level, {
                                          points: value,
                                        });
                                      }
                                      return level;
                                    }),
                                  )
                                }
                                validations="isMoreThanOrEquals:0"
                                validationErrors={{
                                  isDefaultRequiredValue: intl.formatMessage({
                                    id: 'common.form.required_error',
                                  }),
                                  isMoreThanOrEquals:
                                    'Le nombre de points doit être supérieur ou égal à 0',
                                }}
                              />
                            </Grid>
                            {index === badgeLevels.length - 1 && (
                              <Grid
                                item
                                style={{ visibility: removeButtonVisibility }}
                              >
                                <IconButton
                                  size="small"
                                  style={{ marginTop: 16 }}
                                  onClick={() => removeLevel(index)}
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </IconButton>
                              </Grid>
                            )}
                          </Grid>
                        </Card>
                      </Grid>
                    </Grid>
                  );
                })}

                <Grid item xs={6} container spacing={2}>
                  <Grid item xs={12}></Grid>
                  <Grid item xs={12}>
                    <div onClick={addLevel} style={{ cursor: 'pointer' }}>
                      <Card>
                        <DefaultText
                          style={{
                            textAlign: 'center',
                            fontSize: 18,
                            color: '#00E58D',
                          }}
                          lowercase
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            style={{ color: '#00E58D', textAlign: 'center' }}
                          />
                        </DefaultText>
                      </Card>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <ErrorText lowercase>
            <HiddenInput
              name="maxPoints"
              validations="isMoreThanOrEquals:0"
              validationErrors={{
                isMoreThanOrEquals:
                  'Les points alloués aux rangs ne doivent pas excéder le nombre de points disponibles',
              }}
              value={currentRemainingPoints}
            />
          </ErrorText>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LevelStep;

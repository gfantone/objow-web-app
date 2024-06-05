import React from 'react';
import {
  Grid,
  IconButton,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  faInfoCircle,
  faTrashAlt,
  faEquals,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Formsy from 'formsy-react';
import {
  BlueText,
  Card,
  DefaultText,
  DefaultTitle,
  HiddenInput,
  InfoText,
  TextField,
  Tooltip,
  TableChip,
  Button,
  Select,
  IconButton as MenuIconButton,
  NavigationSwitch,
  GreenRadio,
} from '../../../../../../../../components';
import * as Resources from '../../../../../../../../Resources';
import { useIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  linkWrapper: {},
  link: {
    fontSize: 18,
    cursor: 'pointer',
    '&:hover, &.active': {
      color: 'rgb(15,111,222)',
      opacity: 1,
    },
  },
  card: {
    height: '100%',
  },
};

const Goal = ({
  categories,
  deletionDisabled,
  challengeTypeCode,
  goal,
  index,
  kpis,
  onChange,
  onRemoveClick,
  classes,
  setNewKpiOpen,
  awardType,
  units,
  ...props
}) => {
  const intl = useIntl();
  const [category, setCategory] = React.useState(goal ? goal.category : null);
  const displayKpis = category
    ? kpis.filter((x) => x.category && x.category.id == category)
    : kpis;
  const [goalName, setGoalName] = React.useState(goal ? goal.goalName : null);
  const [goalDescription, setGoalDescription] = React.useState(
    goal ? goal.goalDescription : null,
  );
  const [kpi, setKpi] = React.useState(goal ? goal.kpi : null);
  const [goalCustom, setGoalCustom] = React.useState(
    goal ? goal.custom : false,
  );
  const kpiObject = kpi ? kpis.find((x) => x.id == kpi) : null;

  const [kpiCollaboratorEditable, setKpiCollaboratorEditable] = React.useState(
    (kpiObject && kpiObject.collaboratorEditable) || goal.collaboratorEditable
      ? 'collaborator'
      : 'manager',
  );

  const number = index + 1;

  const unit = _.get(kpiObject, 'unit.name');
  const periodicity = _.get(kpiObject, 'periodicity.description');
  const format = kpiObject
    ? kpiObject.manual
      ? intl.formatMessage({ id: 'challenge.form.goals.manual' })
      : intl.formatMessage({ id: 'challenge.form.goals.automatic' })
    : '';

  function handleCategoryChange(newCategory) {
    setCategory(Number(newCategory));
    setKpi(null);
  }

  function handleKpiChange(newKpi) {
    const kpiObject = kpis.find((x) => x.id == parseInt(newKpi));
    setGoalName(kpiObject.name);
    setKpi(Number(newKpi));
  }

  const raceMode = _.get(awardType, 'code') === 'C';

  const goalTooltip = raceMode
    ? intl.formatMessage({ id: 'challenge.condition.race_condition_goal_info' })
    : intl.formatMessage({ id: 'challenge.form.goal_target_info_text' });

  return (
    <Grid key={goal.key} item xs={12} sm={6}>
      <Card className={classes.card}>
        <Grid container spacing={2}>
          <Grid item xs={12} container>
            <Grid item xs>
              <Grid
                container
                spacing={1}
                alignItems="center"
                justify="space-between"
              >
                <Grid item>
                  <DefaultTitle>
                    {intl
                      .formatMessage({ id: 'challenge.form.goal_title' })
                      .format(number)}
                  </DefaultTitle>
                  <HiddenInput name={`number[${index}]`} value={number} />
                </Grid>
              </Grid>
            </Grid>
            {!deletionDisabled && (
              <Grid item>
                <IconButton size="small" onClick={onRemoveClick}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </IconButton>
              </Grid>
            )}
          </Grid>
          {(!challengeTypeCode || (challengeTypeCode && challengeTypeCode !== 'TP')) && (
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                spacing={1}
                className={classes.linkWrapper}
              >
                <Grid
                  item
                  onClick={() => setGoalCustom(false)}
                  className={`${classes.link} ${!goalCustom ? 'active' : ''}`}
                >
                  {intl.formatMessage({ id: 'challenge.form.goals.automatic' })}
                </Grid>
                <Grid item>
                  <NavigationSwitch
                    onChange={(event) => setGoalCustom(event.target.checked)}
                    defaultChecked={goalCustom}
                    color="default"
                    checked={goalCustom}
                    inputProps={{ 'aria-label': 'checkbox with default color' }}
                  />
                  <HiddenInput name={`custom[${index}]`} value={goalCustom} />
                </Grid>
                <Grid
                  item
                  onClick={() => setGoalCustom(true)}
                  className={`${classes.link} ${goalCustom ? 'active' : ''}`}
                >
                  {intl.formatMessage({ id: 'challenge.form.goals.manual' })}
                </Grid>
              </Grid>
            </Grid>
          )}
          {goalCustom && (
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                spacing={1}
                className={classes.linkWrapper}
              >
                <Grid item>
                  <RadioGroup
                    row
                    name={`kpiCollaboratorEditable[${index}]`}
                    onChange={(e) => setKpiCollaboratorEditable(e.target.value)}
                    value={kpiCollaboratorEditable}
                  >
                    <FormControlLabel
                      value="manager"
                      control={<GreenRadio />}
                      label={intl.formatMessage({
                        id: 'challenge.form.goal_manager_editable_label',
                      })}
                    />

                    <FormControlLabel
                      value="collaborator"
                      control={<GreenRadio />}
                      label={intl.formatMessage({
                        id: 'challenge.form.goal_collaborator_editable_label',
                      })}
                    />
                  </RadioGroup>

                  <HiddenInput
                    name={`kpiCollaboratorEditable[${index}]`}
                    value={kpiCollaboratorEditable}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}

          {!goalCustom && (
            <React.Fragment>
              <Grid item xs={12}>
                <Select
                  emptyText={intl.formatMessage({
                    id: 'filter.category_all_option',
                  })}
                  fullWidth
                  initial={category}
                  label={intl.formatMessage({
                    id: 'challenge.form.goal_category_label',
                  })}
                  name="category"
                  options={categories}
                  optionTextName="name"
                  optionValueName="id"
                  onChange={handleCategoryChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  initial={kpi}
                  label={intl.formatMessage({
                    id: 'challenge.form.goal_kpi_label',
                  })}
                  name={`kpi[${index}]`}
                  options={displayKpis}
                  optionTextName="name"
                  optionValueName="id"
                  required
                  onChange={handleKpiChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name={`goalName[${index}]`}
                  label={intl.formatMessage({
                    id: 'challenge.form.goal_name_label',
                  })}
                  fullWidth
                  required
                  initial={_.get(goal, 'name', goalName)}
                  lowercase
                  validations={{
                    hasLessCharactersThan: 128,
                  }}
                  validationErrors={{
                    hasLessCharactersThan: intl
                      .formatMessage({
                        id: 'common.form.has_less_characters_than',
                      })
                      .format(128),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name={`goalDescription[${index}]`}
                  label={intl.formatMessage({
                    id: 'challenge.form.goal_description_label',
                  })}
                  fullWidth
                  initial={_.get(goal, 'description', goalDescription)}
                  lowercase
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs>
                    <DefaultText>
                      {intl.formatMessage({
                        id: 'challenge.form.goal_unit_label',
                      })}
                    </DefaultText>
                    <InfoText lowercase>{unit}</InfoText>
                  </Grid>
                  <Grid item xs>
                    <DefaultText>
                      {intl.formatMessage({
                        id: 'challenge.form.goal_periodicity_label',
                      })}
                    </DefaultText>
                    <InfoText lowercase>{periodicity}</InfoText>
                  </Grid>
                  <Grid item xs>
                    <DefaultText>
                      {intl.formatMessage({
                        id: 'challenge.form.goal_format_label',
                      })}
                    </DefaultText>
                    <InfoText lowercase>{format}</InfoText>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          )}

          {goalCustom && (
            <React.Fragment>
              <Grid item xs={12}>
                <TextField
                  name={`goalName[${index}]`}
                  label={intl.formatMessage({
                    id: 'challenge.form.goal_name_label',
                  })}
                  fullWidth
                  required
                  initial={_.get(goal, 'name', goalName)}
                  lowercase
                  validations={{
                    hasLessCharactersThan: 128,
                  }}
                  validationErrors={{
                    hasLessCharactersThan: intl
                      .formatMessage({
                        id: 'common.form.has_less_characters_than',
                      })
                      .format(128),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name={`goalDescription[${index}]`}
                  label={intl.formatMessage({
                    id: 'challenge.form.goal_description_label',
                  })}
                  fullWidth
                  initial={_.get(goal, 'description', goalDescription)}
                  lowercase
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  initial={_.get(goal, 'unit')}
                  name={`kpiUnit[${index}]`}
                  label={intl.formatMessage({
                    id: 'challenge.form.goal_unit_label',
                  })}
                  options={units}
                  optionTextName="name"
                  optionValueName="id"
                  required
                />
              </Grid>
            </React.Fragment>
          )}

          <Grid item xs>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <DefaultText style={{ fontSize: 16 }}>👉</DefaultText>
              </Grid>
              <Grid item xs>
                <TextField
                  name={`target[${index}]`}
                  label={
                    raceMode
                      ? intl.formatMessage({
                          id: 'challenge.form.goal_target_label2_race',
                        })
                      : intl.formatMessage({
                          id: 'challenge.form.goal_target_label2',
                        })
                  }
                  lowercase
                  fullWidth
                  required
                  initial={goal ? goal.target : null}
                  validations={{
                    isNumeric: true,
                  }}
                  validationErrors={{
                    isDefaultRequiredValue: intl.formatMessage({
                      id: 'common.form.required_error',
                    }),
                    isNumeric: intl.formatMessage({
                      id: 'common.form.numeric_error',
                    }),
                  }}
                />
              </Grid>

              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Tooltip title={goalTooltip}>
                      <BlueText style={{ marginTop: 20 }}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </BlueText>
                    </Tooltip>
                  </Grid>
                  {!raceMode && (
                    <Grid item>
                      <DefaultText>
                        <FontAwesomeIcon icon={faEquals} />
                      </DefaultText>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              {raceMode && (
                <Grid item xs>
                  <HiddenInput name={`points[${index}]`} value={1} />
                </Grid>
              )}
              {!raceMode && (
                <Grid item xs>
                  <TextField
                    name={`points[${index}]`}
                    label={Resources.CHALLENGE_CREATION_GOAL_POINTS_LABEL2}
                    lowercase
                    fullWidth
                    required
                    initial={goal ? goal.points : null}
                    validations={{
                      isNumeric: true,
                    }}
                    validationErrors={{
                      isDefaultRequiredValue: intl.formatMessage({
                        id: 'common.form.required_error',
                      }),
                      isNumeric: intl.formatMessage({
                        id: 'common.form.numeric_error',
                      }),
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default withStyles(styles)(Goal);

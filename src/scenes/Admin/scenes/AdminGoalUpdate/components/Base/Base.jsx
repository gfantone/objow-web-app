import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid, RadioGroup, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  BlueText,
  Button,
  Card,
  DefaultText,
  DefaultTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InfoText,
  Loader,
  ProgressButton,
  Select,
  Switch,
  TextField,
  Tooltip,
  NavigationSwitch,
  HiddenInput,
  GreenRadio,
  RichTextField,
} from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl, injectIntl } from 'react-intl';
import * as categoryListActions from '../../../../../../services/Categories/CategoryList/actions';
import * as goalTypeListActions from '../../../../../../services/GoalTypes/GoalTypeList/actions';
import * as kpiListActions from '../../../../../../services/Kpis/KpiList/actions';
import * as kpiCreationActions from '../../../../../../services/Kpis/KpiCreation/actions';
import * as periodicityListActions from '../../../../../../services/Periodicities/PeriodicityList/actions';
import * as goalDefinitionUpdateActions from '../../../../../../services/GoalDefinitions/GoalDefinitionUpdate/actions';
import * as goalDefinitionActivationUpdateActions from '../../../../../../services/GoalDefinitions/GoalDefinitionActivationUpdate/actions';
import * as goalDefinitionRepartitionListActions from '../../../../../../services/GoalDefinitionRepartitions/GoalDefinitionRepartitionList/actions';
import * as unitListActions from '../../../../../../services/Units/UnitList/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { toast } from 'react-toastify';

const styles = {
  indications: {
    '& .MuiInputBase-root': {
      display: 'none',
    },
  },
  link: {
    fontSize: 18,
    cursor: 'pointer',
    '&:hover, &.active': {
      color: 'rgb(15,111,222)',
      opacity: 1,
    },
  },
  kpiDialog: {
    width: 900,
  },
};

class Base extends Component {
  state = {
    kpi: null,
    open: false,
    showIndicationTools: false,
    newKpiOpen: false,
    submitConfirmOpen: false,
    indication: null,
    kpiCategory: null,
    kpiName: null,
    kpiUnit: null,
    kpiCustom: null,
    kpiCollaboratorEditable: null,
    model: null,
  };

  constructor(props) {
    super(props);
    this.props.goalDefinitionActivationUpdateActions.clearGoalDefinitionActivationUpdate();
  }
  componentDidMount() {
    this.props.categoryListActions.getActiveCategoryList();
    this.props.goalTypeListActions.getGoalTypeList();
    this.props.kpiListActions.getKpiList();
    this.props.periodicityListActions.getPeriodicityList();
    this.props.unitListActions.getUnitList();
    this.props.goalDefinitionRepartitionListActions.getGoalDefinitionRepartitionList();
  }

  onDisable() {
    this.props.goalDefinitionActivationUpdateActions.updateGoalDefinitionActivation(
      this.props.id,
      false
    );
  }

  setOpen(open) {
    const { loading } = this.props.goalDefinitionActivationUpdate;
    if (!loading) {
      this.setState({
        ...this.state,
        open: open,
      });
    }
  }

  setKpiCategory = (category) => {
    this.setState({
      ...this.state,
      kpiCategory: category,
    });
  };

  setKpiUnit = (unit) => {
    this.setState({
      ...this.state,
      kpiUnit: unit,
    });
  };

  setKpiCustom = (custom) => {
    this.setState({
      ...this.state,
      kpiCustom: custom,
    });
  };

  setKpiCollaboratorEditable = (editable) => {
    this.setState({
      ...this.state,
      kpiCollaboratorEditable: editable,
    });
  };

  handleIndicationChange = (newIndication) => {
    this.setState({
      ...this.state,
      indication: newIndication,
    });
  };

  handleSubmit(model) {
    const { definition } = this.props.goalDefinitionDetail;

    const isCustom =
      this.state.kpiCustom === null
        ? definition.kpi.custom
        : this.state.kpiCustom;

    if (
      (parseInt(definition.kpi.id) === parseInt(model.kpi) || isCustom) &&
      definition.kpi.custom === isCustom
    ) {
      this.setState(
        {
          ...this.state,
          model,
        },
        this.performSubmit
      );
    } else {
      this.setState({
        ...this.state,
        model,
        submitConfirmOpen: true,
      });
    }
  }

  performSubmit = () => {
    const { model } = this.state;
    const { definition } = this.props.goalDefinitionDetail;
    if (!model.editable) model.editable = false;
    model.period = this.props.period;

    const existingCustomKpi = definition.kpi.custom ? definition.kpi : {};
    const isCustom =
      this.state.kpiCustom === null
        ? definition.kpi.custom
        : this.state.kpiCustom;
    const customKpi = isCustom
      ? {
          customKpi: {
            id: existingCustomKpi.id,
            name: model.kpiName,
            unit: model.kpiUnit,
            collaboratorEditable:
              this.state.kpiCollaboratorEditable === null
                ? _.get(existingCustomKpi, 'collaborator_editable', false)
                : _.get(this.state, 'kpiCollaboratorEditable', false),
          },
        }
      : {};

    this.props.goalDefinitionUpdateActions.updateGoalDefinition(
      this.props.id,
      Object.assign(
        model,
        {
          indication: this.state.indication
            ? JSON.stringify(this.state.indication)
            : definition.indication,
        },
        customKpi
      )
    );
  };

  handleConfirmClick = () => {
    this.setState(
      {
        ...this.state,
        submitConfirmOpen: false,
      },
      this.performSubmit
    );
  };

  renderLoader() {
    return <Loader centered />;
  }

  handleSubmitKpi = (model) => {
    this.props.kpiCreationActions.createKpi(model);
    this.onNewKpiClose();
  };

  onNewKpiClose = () => {
    this.setState({
      ...this.state,
      newKpiOpen: false,
    });
  };
  onNewKpiOpen = () => {
    this.setState({
      ...this.state,
      newKpiOpen: true,
    });
  };
  setSubmitConfirmOpen = (value) => {
    this.setState({
      ...this.state,
      submitConfirmOpen: value,
    });
  };

  renderData() {
    const { intl, classes } = this.props;
    const { categories } = this.props.categoryList;
    const { types } = this.props.goalTypeList;
    const { kpis } = this.props.kpiList;
    const { units } = this.props.unitList;
    const { periodicities: fetchedPeriodicities } = this.props.periodicityList;
    const { definition } = this.props.goalDefinitionDetail;
    const { repartitions } = this.props.goalDefinitionRepartitionList;
    const {
      loading: updateLoading,
      success,
      error,
    } = this.props.goalDefinitionUpdate;
    const { loading: activationUpdateLoading } =
      this.props.goalDefinitionActivationUpdate;
    const unit =
      definition.kpi.unit.name +
      (definition.kpi.unit.symbol ? ` (${definition.kpi.unit.symbol})` : '');
    const readonly = !definition.isActive;

    const periodicities =
      definition.kpi.periodicity.code === 'C'
        ? [
            {
              id: definition.kpi.periodicity.id,
              description: intl.formatMessage({ id: `kpi.periodicity.C` }),
              order: fetchedPeriodicities.length + 1,
              code: 'C',
            },
            ...fetchedPeriodicities,
          ]
        : fetchedPeriodicities;

    if (success) {
      this.props.goalDefinitionUpdateActions.clearGoalDefinitionUpdate();
      // this.props.history.goBack()
      toast.success(intl.formatMessage({ id: 'admin.goal.edit.success' }));
    }

    if (error) {
      toast.error(intl.formatMessage({ id: 'admin.goal.edit.error' }));
    }
    const kpi = definition.kpi;
    const kpiPeriodsList = kpi
      ? _.compact([
          kpi.start && kpi.end ? { start: kpi.start, end: kpi.end } : null,
          ...kpi.periods,
        ])
      : [];

    const kpiPeriods = (
      <React.Fragment>
        {kpi && kpiPeriodsList.length > 0 && (
          <Grid item>
            <InfoText>
              {intl.formatMessage({ id: 'admin.goal.kpi_periods_label' })}
            </InfoText>
            <Grid container spacing={2}>
              {kpiPeriodsList.map((period) => (
                <Grid item key={period.id} xs={12}>
                  {intl
                    .formatMessage({ id: 'admin.goal.indication.period_text' })
                    .format(
                      period.start.toDate2().toLocaleDateString(),
                      period.end.toDate2().toLocaleDateString()
                    )}
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </React.Fragment>
    );

    const labels = {
      D: 'jour',
      W: 'semaine',
      M: 'mois',
      Q: 'trimestre',
      S: 'semestre',
      Y: 'an',
    };

    const explanationPeriods = {
      D: 'jours',
      W: 'semaines',
      M: 'mois',
      Q: 'trimestres',
      S: 'semestres',
      Y: 'années',
    };

    const goalRepartitionLabel =
      parseInt(definition.repartition.id) === _.get(repartitions, '[0].id')
        ? intl.formatMessage({ id: 'admin.goal.target_label' })
        : intl
            .formatMessage({ id: 'admin.goal.creation_target_label' })
            .format(
              labels[definition.periodicity.code],
              definition.type.code === 'C' ? 'individuel' : 'équipe'
            );
    const explanation =
      definition.repartition &&
      (definition.repartition.code === 'G'
        ? Resources[
            `ADMIN_GOAL_CREATION_REPARTITION_GLOBAL${
              definition.type.code === 'C' ? '' : '_TEAM'
            }`
          ].format(explanationPeriods[definition.periodicity.code])
        : Resources[
            `ADMIN_GOAL_CREATION_REPARTITION_INDIVIDUAL${
              definition.type.code === 'C' ? '' : '_TEAM'
            }`
          ].format(explanationPeriods[definition.periodicity.code]));

    const isCustom =
      this.state.kpiCustom !== null
        ? this.state.kpiCustom
        : _.get(definition, 'kpi.custom');
    const isCollaboratorEditable =
      this.state.kpiCollaboratorEditable !== null
        ? this.state.kpiCollaboratorEditable
        : _.get(definition, 'kpi.collaborator_editable');

    return (
      <div>
        <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
          <Grid container direction='column' spacing={4}>
            <Grid item container direction='row' spacing={1}>
              <Grid item xs={12}>
                <DefaultTitle>
                  {intl.formatMessage({ id: 'admin.goal.creation.kpi_title' })}
                </DefaultTitle>
              </Grid>
              <Grid item xs={12}>
                <Card>
                  <Grid container direction='row' spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Grid container direction='column' spacing={2}>
                        <Grid item xs={12}>
                          <Grid
                            container
                            alignItems='center'
                            spacing={1}
                            className={classes.linkWrapper}
                          >
                            <Grid
                              item
                              onChange={() => this.setKpiCustom(false)}
                              className={`${classes.link} ${
                                !isCustom ? 'active' : ''
                              }`}
                            >
                              {intl.formatMessage({
                                id: 'challenge.form.goals.automatic',
                              })}
                            </Grid>
                            <Grid item>
                              <NavigationSwitch
                                defaultChecked={_.get(definition, 'kpi.custom')}
                                color='default'
                                checked={isCustom}
                                inputProps={{
                                  'aria-label': 'checkbox with default color',
                                }}
                                onChange={(e) =>
                                  this.setKpiCustom(e.target.checked)
                                }
                              />
                              <HiddenInput
                                name={`custom`}
                                value={_.get(definition, 'kpi.custom')}
                              />
                            </Grid>
                            <Grid
                              item
                              onChange={() => this.setKpiCustom(true)}
                              className={`${classes.link} ${
                                isCustom ? 'active' : ''
                              }`}
                            >
                              {intl.formatMessage({
                                id: 'challenge.form.goals.manual',
                              })}
                            </Grid>
                          </Grid>
                        </Grid>

                        {!isCustom && (
                          <React.Fragment>
                            <Grid item>
                              <Select
                                name='kpiCategory'
                                initial={_.get(definition, 'kpi.category.id')}
                                emptyText={intl.formatMessage({
                                  id: 'filter.all_category_label',
                                })}
                                label={intl.formatMessage({
                                  id: 'admin.goal.category_label',
                                })}
                                options={categories}
                                optionValueName='id'
                                optionTextName='name'
                                fullWidth
                                onChange={this.setKpiCategory}
                              />
                            </Grid>
                            <Grid item>
                              <Select
                                name='kpi'
                                label={intl.formatMessage({
                                  id: 'admin.goal.kpi_label',
                                })}
                                initial={definition.kpi.id}
                                options={kpis.filter((kpi) => {
                                  const currentCategory =
                                    this.state.kpiCategory ||
                                    _.get(definition, 'kpi.category.id');
                                  return (
                                    kpi.id === definition.kpi.id ||
                                    !this.state.kpiCategory ||
                                    _.get(kpi, 'category.id') ===
                                      parseInt(this.state.kpiCategory)
                                  );
                                  // return kpi.id === definition.kpi.id || (kpi.periodicity.code !== 'C' && (!currentCategory || _.get(kpi, 'category.id') === parseInt(currentCategory)))
                                })}
                                optionValueName='id'
                                optionTextName='name'
                                fullWidth
                                required
                              />
                            </Grid>
                            <Grid item>
                              <Button
                                onClick={this.onNewKpiOpen}
                                text='nouveau'
                              >
                                <FontAwesomeIcon icon={faPlus} />
                                &nbsp;nouveau kpi
                              </Button>
                            </Grid>
                          </React.Fragment>
                        )}
                        {isCustom && (
                          <React.Fragment>
                            <Grid item xs={12}>
                              <Grid
                                container
                                alignItems='center'
                                spacing={1}
                                className={classes.linkWrapper}
                              >
                                <Grid item>
                                  <RadioGroup
                                    row
                                    name={`kpiCollaboratorEditable`}
                                    onChange={(e) =>
                                      this.setKpiCollaboratorEditable(
                                        e.target.value === 'collaborator'
                                      )
                                    }
                                    value={
                                      isCollaboratorEditable
                                        ? 'collaborator'
                                        : 'manager'
                                    }
                                    disabled
                                  >
                                    <FormControlLabel
                                      value='manager'
                                      control={<GreenRadio />}
                                      label={intl.formatMessage({
                                        id: 'challenge.form.goal_manager_editable_label',
                                      })}
                                    />

                                    <FormControlLabel
                                      value='collaborator'
                                      control={<GreenRadio />}
                                      label={intl.formatMessage({
                                        id: 'challenge.form.goal_collaborator_editable_label',
                                      })}
                                    />
                                  </RadioGroup>

                                  <HiddenInput
                                    name={`collaboratorEditable`}
                                    value={isCollaboratorEditable}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                name={`kpiName`}
                                initial={
                                  _.get(definition, 'kpi.custom')
                                    ? _.get(definition, 'kpi.name')
                                    : ''
                                }
                                label={intl.formatMessage({
                                  id: 'challenge.form.goal_name_label',
                                })}
                                fullWidth
                                required
                                lowercase
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Select
                                fullWidth
                                name={`kpiUnit`}
                                initial={
                                  _.get(definition, 'kpi.custom')
                                    ? _.get(definition, 'kpi.unit.id')
                                    : ''
                                }
                                label={intl.formatMessage({
                                  id: 'challenge.form.goal_unit_label',
                                })}
                                options={units}
                                onChange={this.setKpiUnit}
                                optionTextName='name'
                                optionValueName='id'
                                required
                              />
                            </Grid>
                          </React.Fragment>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Grid container direction='column' spacing={2}>
                        <Grid item>
                          <InfoText>
                            {intl.formatMessage({
                              id: 'admin.goal.unit_label',
                            })}
                          </InfoText>
                          <DefaultText lowercase style={{ minHeight: 19 }}>
                            {unit}
                          </DefaultText>
                        </Grid>
                        <Grid item>
                          <InfoText>
                            {intl.formatMessage({
                              id: 'admin.goal.periodicity_label',
                            })}
                          </InfoText>
                          <DefaultText lowercase style={{ minHeight: 19 }}>
                            {_.get(definition.kpi, 'periodicity.description')}
                          </DefaultText>
                        </Grid>
                        <Grid item>
                          <InfoText>
                            {intl.formatMessage({
                              id: 'admin.goal.kpi_format_label',
                            })}
                          </InfoText>
                          {definition.kpi && (
                            <DefaultText lowercase style={{ minHeight: 19 }}>
                              {_.get(definition.kpi, 'manual')
                                ? 'Manuel'
                                : 'Automatique'}
                            </DefaultText>
                          )}
                        </Grid>
                        {definition.kpi.periodicity.code === 'C' && kpiPeriods}
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Grid item container direction='column' spacing={1}>
              <Grid item>
                <DefaultTitle>
                  {intl.formatMessage({ id: 'admin.goal.creation.goal_title' })}
                </DefaultTitle>
              </Grid>
              <Grid item>
                <Card>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        lowercase
                        name='name'
                        initial={definition.name}
                        label={intl.formatMessage({
                          id: 'admin.goal.name_label',
                        })}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        name='type'
                        initial={definition.type.id}
                        disabled
                        label={intl.formatMessage({
                          id: 'admin.goal.type_label',
                        })}
                        options={types}
                        optionValueName='id'
                        optionTextName='description'
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        name='category'
                        initial={definition.category.id}
                        label={intl.formatMessage({
                          id: 'admin.goal.category_label',
                        })}
                        options={categories}
                        optionValueName='id'
                        optionTextName='name'
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Select
                        name='periodicity'
                        initial={definition.periodicity.id}
                        disabled
                        label={intl.formatMessage({
                          id: 'admin.goal.periodicity_label',
                        })}
                        options={periodicities.filter(
                          (p) =>
                            p.order >=
                              _.get(definition.kpi, 'periodicity.order') &&
                            p.order > 1
                        )}
                        optionValueName='id'
                        optionTextName='description'
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type='number'
                        name='target'
                        label={intl.formatMessage({
                          id: 'admin.goal.target_label',
                        })}
                        initial={definition.target}
                        fullWidth
                        disabled={readonly}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        type='number'
                        name='default'
                        label={intl.formatMessage({
                          id: 'admin.goal.default_label',
                        })}
                        initial={definition.default}
                        fullWidth
                        disabled={readonly}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RichTextField
                        name='indication'
                        initial={JSON.parse(definition.indication)}
                        readOnly={false}
                        onChange={this.handleIndicationChange}
                        label={intl.formatMessage({
                          id: 'admin.goal.indication_label',
                        })}
                        padding={'5px 0'}
                        fullWidth
                        multiline
                        rowsMax={10}
                        required
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <Grid item container direction='column' spacing={1}>
              <Grid item>
                <DefaultTitle>
                  {intl.formatMessage({
                    id: 'admin.goal.creation.options_title',
                  })}
                </DefaultTitle>
              </Grid>
              <Grid item>
                <Card>
                  <Grid container direction='row' justify='space-around'>
                    <Grid item>
                      <Grid container spacing={1} direction='column'>
                        <Grid item>
                          <Grid container alignItems='center'>
                            <Grid item>
                              <Switch
                                name='live'
                                initial={definition.live}
                                label={intl.formatMessage({
                                  id: 'admin.goal.live_label',
                                })}
                              />
                            </Grid>
                            <Grid item>
                              <Tooltip
                                title={intl.formatMessage({
                                  id: 'admin.goal.live_infos',
                                })}
                              >
                                <BlueText>
                                  <FontAwesomeIcon icon={faInfoCircle} />
                                </BlueText>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Grid>

                        {_.get(definition.type, 'code') === 'C' && (
                          <Grid item>
                            <Switch
                              name='editable'
                              initial={definition.editable}
                              label={intl.formatMessage({
                                id: 'admin.goal.editable_label',
                              })}
                            />
                          </Grid>
                        )}
                        {_.get(definition.type, 'code') === 'T' && (
                          <Grid item>
                            <Switch
                              name='admin_editable'
                              initial={definition.admin_editable}
                              label={intl.formatMessage({
                                id: 'admin.goal.admin_editable_label',
                              })}
                            />
                          </Grid>
                        )}
                        <Grid item>
                          <Switch
                            name='allow_ranking'
                            initial={definition.allow_ranking}
                            label={intl.formatMessage({
                              id: 'admin.goal.allow_ranking_label',
                            })}
                          />
                        </Grid>

                        <Grid item>
                          <Switch
                            name='allow_ranking_points'
                            initial={definition.allow_ranking_points}
                            label={intl.formatMessage({
                              id: 'admin.goal.allow_ranking_points',
                            })}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1} direction='column'>
                        <Grid item>
                          <Switch
                            name='allow_over_target'
                            initial={definition.allow_over_target}
                            label={intl.formatMessage({
                              id: 'admin.goal.allow_over_target_label',
                            })}
                          />
                        </Grid>
                        <Grid item>
                          <Switch
                            name='past_editable'
                            initial={definition.past_editable}
                            label={intl.formatMessage({
                              id: 'admin.goal.past_editable_label',
                            })}
                          />
                        </Grid>
                        <Grid item>
                          <Switch
                            name='allow_ranking_latest_value'
                            initial={definition.allow_ranking_latest_value}
                            label={intl.formatMessage({
                              id: 'admin.goal.allow_ranking_latest_value',
                            })}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={4} style={{ marginTop: 5 }}>
            {!readonly && (
              <Grid item xs={12}>
                <Grid container justify='space-between'>
                  <Grid item>
                    <ProgressButton
                      type='button'
                      color='secondary'
                      text={intl.formatMessage({ id: 'common.archive' })}
                      disabled={updateLoading}
                      centered
                      onClick={() => this.setOpen(true)}
                    />
                  </Grid>
                  <Grid item>
                    <ProgressButton
                      type='submit'
                      text={intl.formatMessage({ id: 'common.submit' })}
                      loading={updateLoading}
                      centered
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Formsy>
        <Dialog open={this.state.open} onClose={() => this.setOpen(false)}>
          <DialogTitle>
            {intl
              .formatMessage({ id: 'admin.goal.disable_message' })
              .format(definition.name)}
          </DialogTitle>
          <DialogContent>
            {intl.formatMessage({ id: 'admin.goal.disable_info' })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setOpen(false)} color='secondary'>
              {intl.formatMessage({ id: 'common.no' })}
            </Button>
            <ProgressButton
              type='button'
              text={intl.formatMessage({ id: 'common.yes' })}
              loading={activationUpdateLoading}
              onClick={this.onDisable.bind(this)}
            />
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  render() {
    const { intl } = this.props;
    const { categories, loading: categoryListLoading } =
      this.props.categoryList;
    const { types, loading: goalTypeListLoading } = this.props.goalTypeList;
    const { kpis, loading: kpiListLoading } = this.props.kpiList;
    const { units, loading: unitListLoading } = this.props.unitList;
    const { periodicities, loading: periodicityListLoading } =
      this.props.periodicityList;
    const { repartitions, loading: repartitionsLoading } =
      this.props.goalDefinitionRepartitionList;
    const loading =
      categoryListLoading ||
      goalTypeListLoading ||
      kpiListLoading ||
      periodicityListLoading ||
      repartitionsLoading ||
      unitListLoading;
    const { success } = this.props.goalDefinitionActivationUpdate;

    if (success) {
      this.props.goalDefinitionActivationUpdateActions.clearGoalDefinitionActivationUpdate();
      this.props.history.goBack();
    }

    const criticities = [
      { order: 1, name: 'Basse' },
      { order: 2, name: 'Moyenne' },
      { order: 3, name: 'Haute' },
    ];

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          categories &&
          types &&
          kpis &&
          units &&
          periodicities &&
          repartitions &&
          this.renderData()}
        <Dialog
          open={this.state.newKpiOpen}
          onClose={this.onNewKpiClose}
          classes={{ paper: this.props.classes.kpiDialog }}
        >
          <DialogTitle>Demande de création de KPI</DialogTitle>
          <Formsy onValidSubmit={this.handleSubmitKpi.bind(this)}>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Grid container direction='row' spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Select
                      name='criticity'
                      label={intl.formatMessage({
                        id: 'admin.goal.criticity_label',
                      })}
                      options={criticities}
                      optionValueName='order'
                      optionTextName='name'
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      name='category'
                      label={intl.formatMessage({
                        id: 'admin.goal.category_label',
                      })}
                      options={categories}
                      optionValueName='id'
                      optionTextName='name'
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name='name'
                  label={intl.formatMessage({
                    id: 'admin.goal.kpi_name_label',
                  })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name='description'
                  label={intl.formatMessage({
                    id: 'admin.goal.description_label',
                  })}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  variant='outlined'
                />
              </Grid>
            </Grid>
            <DialogActions>
              <ProgressButton
                type='submit'
                text={intl.formatMessage({ id: 'common.submit' })}
                loading={loading}
                centered
              />
              <Button onClick={this.onNewKpiClose} color='secondary'>
                {intl.formatMessage({ id: 'common.cancel' })}
              </Button>
            </DialogActions>
          </Formsy>
        </Dialog>
        <Dialog
          open={this.state.submitConfirmOpen}
          onClose={() => this.setSubmitConfirmOpen(false)}
        >
          <Formsy>
            <DialogContent>
              <DefaultText lowercase>
                {intl.formatMessage({
                  id: 'admin.goal.update_confirmation_message',
                })}
              </DefaultText>
            </DialogContent>
            <DialogActions>
              <Button
                color='secondary'
                onClick={() => this.setSubmitConfirmOpen(false)}
              >
                {intl.formatMessage({ id: 'common.no' })}
              </Button>
              <ProgressButton
                type='submit'
                text={intl.formatMessage({ id: 'common.yes' })}
                onClick={this.handleConfirmClick}
                loading={loading}
              />
            </DialogActions>
          </Formsy>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({
  categoryList,
  goalTypeList,
  kpiList,
  periodicityList,
  goalDefinitionUpdate,
  goalDefinitionActivationUpdate,
  goalDefinitionRepartitionList,
  goalDefinitionDetail,
  unitList,
}) => ({
  categoryList,
  goalTypeList,
  kpiList,
  periodicityList,
  goalDefinitionUpdate,
  goalDefinitionActivationUpdate,
  goalDefinitionDetail,
  goalDefinitionRepartitionList,
  unitList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
  goalTypeListActions: bindActionCreators(goalTypeListActions, dispatch),
  kpiListActions: bindActionCreators(kpiListActions, dispatch),
  kpiCreationActions: bindActionCreators(kpiCreationActions, dispatch),
  periodicityListActions: bindActionCreators(periodicityListActions, dispatch),
  goalDefinitionUpdateActions: bindActionCreators(
    goalDefinitionUpdateActions,
    dispatch
  ),
  goalDefinitionRepartitionListActions: bindActionCreators(
    goalDefinitionRepartitionListActions,
    dispatch
  ),
  unitListActions: bindActionCreators(unitListActions, dispatch),
  goalDefinitionActivationUpdateActions: bindActionCreators(
    goalDefinitionActivationUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(injectIntl(Base))));

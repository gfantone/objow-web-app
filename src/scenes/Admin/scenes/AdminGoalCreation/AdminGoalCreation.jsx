import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Formsy from 'formsy-react';
import { Grid, RadioGroup, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBarSubTitle,
  BlueText,
  Card,
  DefaultText,
  BigText,
  InfoText,
  Loader,
  MainLayoutComponent,
  ProgressButton,
  Select,
  Switch,
  TextField,
  Tooltip,
  Stepper,
  RichTextField,
  TransferList,
  GreenRadio,
  Dialog,
  DialogActions,
  DialogTitle,
  NavigationSwitch,
  HiddenInput,
  Button,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as Resources from '../../../../Resources';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import * as goalTypeListActions from '../../../../services/GoalTypes/GoalTypeList/actions';
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions';
import * as kpiCreationActions from '../../../../services/Kpis/KpiCreation/actions';
import * as periodicityListActions from '../../../../services/Periodicities/PeriodicityList/actions';
import * as goalDefinitionCreationActions from '../../../../services/GoalDefinitions/GoalDefinitionCreation/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as unitListActions from '../../../../services/Units/UnitList/actions';
import * as goalDefinitionRepartitionListActions from '../../../../services/GoalDefinitionRepartitions/GoalDefinitionRepartitionList/actions';
import * as teamGroupTreeAction from '../../../../services/TeamGroups/TeamGroupTree/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle,
  faPlus,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
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

class AdminGoalCreation extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      kpi: null,
      kpiCategory: null,
      type: null,
      newKpiOpen: false,
      steps: [
        { order: 1, name: 'KPI', active: true },
        { order: 2, name: 'Informations' },
        { order: 3, name: 'Participants' },
        { order: 4, name: 'Configuration' },
        { order: 5, name: 'Options' },
        { order: 6, name: 'Validation' },
      ],
      showIndicationTools: false,
      repartition: null,
      finalModel: {},
      custom: false,
      collaboratorEditable: 'manager',
    };
    this.props.goalDefinitionCreationActions.clearGoalDefinitionCreation();
    this.form = React.createRef();
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <AppBarSubTitle
        title={intl.formatMessage({ id: 'admin.goal.creation_title' })}
      />
    );
    this.props.handleMaxWidth('md');
    this.props.activateReturn();
    this.props.categoryListActions.getActiveCategoryList();
    this.props.goalTypeListActions.getGoalTypeList();
    this.props.kpiListActions.getKpiList();
    this.props.periodicityListActions.getPeriodicityList();
    this.props.teamListActions.getTeamList({
      simpleCollaborators: true,
      nestedCollaborators: true,
    });
    this.props.teamGroupTreeAction.getTeamGroupTree();
    this.props.unitListActions.getUnitList();
    this.props.goalDefinitionRepartitionListActions.getGoalDefinitionRepartitionList();
  }

  handleKpiChange(kpi) {
    this.setState({
      ...this.state,
      kpi: kpi,
    });
  }

  handleKpiCategoryChange = (category) => {
    this.setState({
      ...this.state,
      kpiCategory: category,
    });
  };

  handleTypeChange = (type) => {
    this.setState({
      ...this.state,
      type: type,
    });
  };

  handleIndicationChange = (newIndication) => {
    this.setState({
      ...this.state,
      finalModel: _.merge(this.state.finalModel, { indication: newIndication }),
    });
  };

  handleTeamsChange = (team) => {
    this.setState({
      ...this.state,
      currentTeam: team,
    });
  };

  handleRepartitionChange = (repartition) => {
    this.setState({
      ...this.state,
      repartition: repartition,
    });
  };

  changeStep(model) {
    const currentStep = this.state.steps.find((step) => step.active === true);
    // Reset participants if we change goal type (team or individual)
    const customKpi =
      this.state.custom && model.kpiName
        ? {
            customKpi: {
              collaboratorEditable:
                this.state.collaboratorEditable === 'collaborator',
              unit: _.get(this.state, 'kpiUnit.id'),
              name: model.kpiName,
            },
          }
        : {};

    const apply = () => {
      this.setState({
        ...this.state,
        steps: this.state.steps.map((step) => {
          if (step.order === currentStep.order) {
            return Object.assign(step, { active: false, completed: true });
          }
          if (step.order === currentStep.order + 1) {
            return Object.assign(step, { active: true });
          }
          return step;
        }),
        finalModel: Object.assign(this.state.finalModel, model, customKpi, {
          participants: this.state.participants,
        }),
      });
    };
    if (
      currentStep.order !== 3 ||
      _.get(this.state.participants, 'length', 0) > 0
    ) {
      if (model.type && this.state.finalModel.type !== model.type) {
        this.setParticipants([], apply);
      } else {
        apply();
      }
    }
  }

  setParticipants = (participants, callback) => {
    this.setState(
      {
        ...this.state,
        participants: participants,
      },
      callback
    );
  };
  setParticipantMode = (mode) => {
    this.setState({
      ...this.state,
      participantMode: mode,
    });
  };

  handleSubmit(model) {
    const currentStep = this.state.steps.find((step) => step.active === true);
    const nextStep = this.state.steps.find(
      (step) => step.order === currentStep.order + 1
    );

    if (nextStep) {
      this.changeStep(model);
    } else {
      this.props.goalDefinitionCreationActions.createGoalDefinition(
        Object.assign(
          {
            editable: false,
            adminEditable: false,
            period: this.props.match.params.periodId,
          },
          this.state.finalModel,
          {
            indication: JSON.stringify(this.state.finalModel.indication),
            participants: this.state.finalModel.participants.map((p) => ({
              id: p.id,
            })),
          }
        )
      );
    }
  }

  handleSubmitKpi = (model) => {
    this.props.kpiCreationActions.createKpi(model);
    this.onNewKpiClose();
  };

  handlePreviousStep = () => {
    const currentStep = this.state.steps.find((step) => step.active === true);
    const previousStep = this.state.steps.find(
      (step) => step.order === currentStep.order - 1
    );
    if (previousStep) {
      this.setState({
        ...this.state,
        steps: this.state.steps.map((step) => {
          if (step.order === currentStep.order) {
            return Object.assign(step, { active: false, completed: false });
          }
          if (step.order === currentStep.order - 1) {
            return Object.assign(step, { active: true, completed: false });
          }
          return step;
        }),
      });
    }
  };

  handleNextStep = () => {
    this.form.current.submit();
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
  setCustom = (value) => {
    const { intl } = this.props;
    this.setState({
      ...this.state,
      custom: value,
      collaboratorEditable: 'manager',
      kpi: value
        ? {
            periodicity: {
              description: intl.formatMessage({
                id: 'kpi.periodicity.goal_custom',
              }),
            },
          }
        : null,
      kpiUnit: null,
    });
  };

  setCollaboratorEditable = (value) => {
    const { intl } = this.props;
    this.setState({
      ...this.state,
      collaboratorEditable: value,
      kpi: {
        periodicity: {
          description:
            value === 'collaborator'
              ? intl.formatMessage({ id: 'kpi.periodicity.D' })
              : intl.formatMessage({ id: 'kpi.periodicity.goal_custom' }),
        },
      },
    });
  };

  setKpiUnitChange = (unit) => {
    const { units } = this.props.unitList;

    this.setState({
      ...this.state,
      kpiUnit: units.find((u) => u.id === parseInt(unit)),
    });
  };

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { categories } = this.props.categoryList;
    const { types } = this.props.goalTypeList;
    const { kpis } = this.props.kpiList;
    const { periodicities: fetchedPeriodicities } = this.props.periodicityList;
    const { loading } = this.props.goalDefinitionCreation;
    const { teams } = this.props.teamList;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;
    const { units } = this.props.unitList;
    const { repartitions } = this.props.goalDefinitionRepartitionList;
    const kpi = this.state.kpi
      ? kpis.find((k) => k.id == this.state.kpi)
      : null;
    const { type } = this.state;
    const currentType = types.find((t) => t.id === parseInt(type));
    const unit = kpi
      ? kpi.unit.name + (kpi.unit.symbol ? ` (${kpi.unit.symbol})` : '')
      : null;
    const currentStep = this.state.steps.find((step) => step.active === true);

    const isLastStep = currentStep.order >= this.state.steps.length;
    const { classes } = this.props;
    let fields;
    let title;

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

    const isCustomPeriodicity = kpi && kpi.periodicity.code === 'C';
    const periodicities = isCustomPeriodicity
      ? [
          Object.assign({}, kpi.periodicity, {
            order: fetchedPeriodicities.length + 1,
          }),
        ]
      : fetchedPeriodicities;

    switch (currentStep.order) {
      case 1:
        title = intl.formatMessage({ id: 'admin.goal.creation.kpi_title' });
        const format =
          (kpi && kpi.manual) || this.state.custom ? 'Manuel' : 'Automatique';

        fields = (
          <React.Fragment>
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
                      onClick={() => this.setCustom(false)}
                      className={`${classes.link} ${
                        !this.state.custom ? 'active' : ''
                      }`}
                    >
                      {intl.formatMessage({
                        id: 'challenge.form.goals.automatic',
                      })}
                    </Grid>
                    <Grid item>
                      <NavigationSwitch
                        onChange={(event) =>
                          this.setCustom(event.target.checked)
                        }
                        defaultChecked={this.state.custom}
                        color='default'
                        checked={this.state.custom}
                        inputProps={{
                          'aria-label': 'checkbox with default color',
                        }}
                      />
                      <HiddenInput name={`custom`} value={this.state.custom} />
                    </Grid>
                    <Grid
                      item
                      onClick={() => this.setCustom(true)}
                      className={`${classes.link} ${
                        this.state.custom ? 'active' : ''
                      }`}
                    >
                      {intl.formatMessage({
                        id: 'challenge.form.goals.manual',
                      })}
                    </Grid>
                  </Grid>
                </Grid>
                {this.state.custom && (
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
                              this.setCollaboratorEditable(e.target.value)
                            }
                            value={this.state.collaboratorEditable}
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
                            value={this.state.collaboratorEditable}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name={`kpiName`}
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
                        label={intl.formatMessage({
                          id: 'challenge.form.goal_unit_label',
                        })}
                        options={units}
                        onChange={this.setKpiUnitChange}
                        optionTextName='name'
                        optionValueName='id'
                        required
                      />
                    </Grid>
                  </React.Fragment>
                )}
                {!this.state.custom && (
                  <React.Fragment>
                    <Grid item>
                      <Select
                        name='kpiCategory'
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
                        onChange={this.handleKpiCategoryChange}
                      />
                    </Grid>
                    <Grid item>
                      <Select
                        name='kpi'
                        label={intl.formatMessage({
                          id: 'admin.goal.kpi_label',
                        })}
                        initial={this.state.finalModel.kpi}
                        options={kpis.filter(
                          (kpi) =>
                            !this.state.kpiCategory ||
                            _.get(kpi, 'category.id') ===
                              parseInt(this.state.kpiCategory)
                        )}
                        optionValueName='id'
                        optionTextName='name'
                        onChange={this.handleKpiChange.bind(this)}
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item>
                      <Button onClick={this.onNewKpiOpen} text='nouveau'>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;nouveau kpi
                      </Button>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <InfoText>
                    {intl.formatMessage({ id: 'admin.goal.unit_label' })}
                  </InfoText>
                  <DefaultText lowercase style={{ minHeight: 19 }}>
                    {unit || _.get(this.state, 'kpiUnit.name')}
                  </DefaultText>
                </Grid>
                <Grid item>
                  <InfoText>
                    {intl.formatMessage({ id: 'admin.goal.periodicity_label' })}
                  </InfoText>
                  <DefaultText lowercase style={{ minHeight: 19 }}>
                    {_.get(
                      kpi,
                      'periodicity.description',
                      _.get(this.state.kpi, 'periodicity.description')
                    )}
                  </DefaultText>
                </Grid>
                <Grid item>
                  <InfoText>
                    {intl.formatMessage({ id: 'admin.goal.kpi_format_label' })}
                  </InfoText>
                  {(kpi || this.state.custom) && (
                    <DefaultText lowercase style={{ minHeight: 19 }}>
                      {format}
                    </DefaultText>
                  )}
                </Grid>
                {kpiPeriods}
              </Grid>
            </Grid>
          </React.Fragment>
        );
        break;
      case 2:
        title = intl.formatMessage({ id: 'admin.goal.creation.goal_title' });

        const filteredPeriodicities = periodicities.filter(
          (p) =>
            (p.order >= _.get(kpi, 'periodicity.order') && p.order > 1) ||
            this.state.custom
        );

        fields = (
          <React.Fragment>
            <Grid item xs={12} sm={6}>
              <TextField
                lowercase
                name='name'
                initial={this.state.finalModel.name}
                label={intl.formatMessage({ id: 'admin.goal.name_label' })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name='type'
                initial={this.state.finalModel.type}
                label={intl.formatMessage({ id: 'admin.goal.type_label' })}
                options={types}
                optionValueName='id'
                optionTextName='description'
                onChange={this.handleTypeChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Select
                name='category'
                initial={this.state.finalModel.category}
                label={intl.formatMessage({ id: 'admin.goal.category_label' })}
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
                initial={
                  isCustomPeriodicity
                    ? kpi.periodicity.id
                    : this.state.finalModel.periodicity
                }
                label={intl.formatMessage({
                  id: 'admin.goal.periodicity_label',
                })}
                options={filteredPeriodicities}
                optionValueName='id'
                optionTextName='description'
                fullWidth
                required
                disabled={isCustomPeriodicity}
              />
            </Grid>
            <Grid item xs={12}>
              <RichTextField
                name='indication'
                initial={this.state.finalModel.indication}
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
          </React.Fragment>
        );
        break;
      case 3:
        title = intl.formatMessage({
          id: 'admin.goal.creation.participants_title',
        });
        fields = (
          <React.Fragment>
            {!teams && this.renderLoader()}
            {teams && (
              <TransferList
                listIn={teamGroup}
                enableCollaboratorSelect={this.state.type === '1'}
                enableTeamSelect={true}
                onChange={this.setParticipants}
                selected={this.state.finalModel.participants}
              />
            )}
          </React.Fragment>
        );
        break;
      case 4:
        title = intl.formatMessage({ id: 'admin.goal.creation.goals_title' });
        const labels = {
          D: 'jour',
          W: 'semaine',
          M: 'mois',
          Q: 'trimestre',
          S: 'semestre',
          Y: 'an',
          C: 'période',
        };

        const explanationPeriods = {
          D: 'jours',
          W: 'semaines',
          M: 'mois',
          Q: 'trimestres',
          S: 'semestres',
          Y: 'années',
          C: 'périodes',
        };

        const currentPeriodicity = periodicities.find(
          (p) => p.id === parseInt(this.state.finalModel.periodicity)
        );
        const currentRepartition = repartitions.find(
          (r) => r.id === parseInt(this.state.repartition)
        );
        // const currentType = types.find(t => t.id === parseInt(this.state.finalModel.type))
        // const currentPeriodicity = periodicities[0]
        // const currentRepartition = repartitions[0]
        // const currentType = types[1]

        const periodicityCode = currentPeriodicity
          ? currentPeriodicity.code
          : kpi.periodicity.code;
        const goalRepartitionLabel =
          parseInt(this.state.repartition) === _.get(repartitions, '[0]').id
            ? intl.formatMessage({ id: 'admin.goal.target_label' })
            : intl
                .formatMessage({ id: 'admin.goal.creation_target_label' })
                .format(
                  labels[periodicityCode],
                  currentType.code === 'C' ? 'individuel' : 'équipe'
                );

        const explanation =
          this.state.repartition &&
          (currentRepartition.code === 'G'
            ? intl
                .formatMessage({
                  id: `admin.goal.creation_repartition_global${
                    currentType.code === 'C' ? '' : '_team'
                  }`,
                })
                .format(explanationPeriods[periodicityCode])
            : intl
                .formatMessage({
                  id: `admin.goal.creation_repartition_individual${
                    currentType.code === 'C' ? '' : '_team'
                  }`,
                })
                .format(explanationPeriods[periodicityCode]));
        fields = (
          <React.Fragment>
            <Grid
              container
              alignItems='center'
              direction='column'
              style={{ padding: 20 }}
              spacing={6}
            >
              <Grid item xs={12} sm={4} style={{ width: '100%' }}>
                <Select
                  name='repartition'
                  initial={this.state.finalModel.repartition}
                  label={intl.formatMessage({
                    id: 'admin.goal.repartition_label',
                  })}
                  options={repartitions.map((r) =>
                    r.code === 'I'
                      ? Object.assign(r, {
                          description: _.replace(
                            _.replace(
                              r.description,
                              'période',
                              labels[periodicityCode]
                            ),
                            /Individuelle/,
                            currentType.code === 'C' ? 'Individuelle' : 'Equipe'
                          ),
                        })
                      : r
                  )}
                  optionValueName='id'
                  optionTextName='description'
                  onChange={this.handleRepartitionChange}
                  bigLabel
                  fullWidth
                  required
                />
              </Grid>

              {this.state.repartition && (
                <Grid item xs={12} sm={4} style={{ width: '100%' }}>
                  <Grid
                    container
                    justify='center'
                    direction='column'
                    style={{ position: 'relative' }}
                  >
                    <Grid item>
                      <TextField
                        lowercase
                        bigLabel
                        type='number'
                        name='target'
                        initial={this.state.finalModel.target}
                        label={`👉 ${goalRepartitionLabel}`}
                        fullWidth
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} style={{ display: 'none' }}>
                      <TextField
                        type='number'
                        name='default'
                        initial={0}
                        label={intl.formatMessage({
                          id: 'admin.goal.default_label',
                        })}
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <div style={{ width: '70%', margin: 'auto', marginBottom: 10 }}>
              {explanation &&
                explanation
                  .split('\n')
                  .map((paragraph) => (
                    <DefaultText style={{ textTransform: 'none' }}>
                      {paragraph}
                    </DefaultText>
                  ))}
            </div>
          </React.Fragment>
        );
        break;
      case 5:
        title = intl.formatMessage({ id: 'admin.goal.creation.options_title' });

        fields = (
          <React.Fragment>
            <Grid container direction='row' justify='space-around'>
              <Grid item>
                <Grid container spacing={1} direction='column'>
                  <Grid item>
                    <Grid container alignItems='center'>
                      <Grid item>
                        <Switch
                          name='live'
                          initial={this.state.finalModel.live}
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

                  {_.get(currentType, 'code') === 'C' && (
                    <Grid item>
                      <Switch
                        name='editable'
                        initial={this.state.finalModel.editable}
                        label={intl.formatMessage({
                          id: 'admin.goal.editable_label',
                        })}
                      />
                    </Grid>
                  )}
                  {_.get(currentType, 'code') === 'T' && (
                    <Grid item>
                      <Switch
                        name='admin_editable'
                        initial={this.state.finalModel.admin_editable}
                        label={intl.formatMessage({
                          id: 'admin.goal.admin_editable_label',
                        })}
                      />
                    </Grid>
                  )}
                  <Grid item>
                    <Switch
                      name='allow_ranking'
                      initial={
                        this.state.finalModel.allow_ranking !== undefined
                          ? this.state.finalModel.allow_ranking
                          : true
                      }
                      label={intl.formatMessage({
                        id: 'admin.goal.allow_ranking_label',
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
                      initial={this.state.finalModel.allow_over_target}
                      label={intl.formatMessage({
                        id: 'admin.goal.allow_over_target_label',
                      })}
                    />
                  </Grid>
                  <Grid item>
                    <Switch
                      name='past_editable'
                      initial={this.state.finalModel.past_editable}
                      label={intl.formatMessage({
                        id: 'admin.goal.past_editable_label',
                      })}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        );
        break;
      case 6:
        fields = (
          <div style={{ textAlign: 'center', margin: 'auto' }}>
            <p style={{ fontSize: 19, color: '#555555' }}>Félicitations 🎉 !</p>
            <p style={{ fontSize: 19, color: '#555555' }}>
              Il ne vous reste plus qu'à personnaliser vos objectifs selon vos
              besoins
            </p>
          </div>
        );
        break;
    }
    return (
      <React.Fragment>
        <Formsy ref={this.form} onValidSubmit={this.handleSubmit.bind(this)}>
          <Stepper steps={this.state.steps} actionLoading={loading} />
          <BigText isContrast style={{ textAlign: 'center', marginBottom: 10 }}>
            {title}
          </BigText>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Card>
                <Grid container spacing={2} style={{ minHeight: 200 }}>
                  {fields}
                </Grid>
              </Card>
            </Grid>
            {isLastStep && (
              <Grid item xs={12}>
                <ProgressButton
                  type='submit'
                  text={intl.formatMessage({ id: 'common.submit' })}
                  loading={loading}
                  centered
                />
              </Grid>
            )}
          </Grid>
        </Formsy>
        <Grid item>
          <Grid container spacing={4} direction='row' justify='center'>
            {currentStep.order > 1 && (
              <Grid item>
                <ProgressButton
                  onClick={this.handlePreviousStep}
                  color='secondary'
                  text={intl.formatMessage({ id: 'common.previous' })}
                  loading={loading}
                  centered
                />
              </Grid>
            )}
            {!isLastStep && (
              <Grid item>
                <ProgressButton
                  onClick={this.handleNextStep}
                  text={intl.formatMessage({ id: 'common.next' })}
                  loading={loading}
                  centered
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    const { intl } = this.props;
    const { categories, loading: categoryListLoading } =
      this.props.categoryList;
    const { definition, error } = this.props.goalDefinitionCreation;
    const { types, loading: goalTypeListLoading } = this.props.goalTypeList;
    const { kpis, loading: kpiListLoading } = this.props.kpiList;
    const { periodicities, loading: periodicityListLoading } =
      this.props.periodicityList;
    const { teams, loading: teamLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupsLoading } = this.props.teamGroupTree;
    const { units, loading: unitLoading } = this.props.unitList;
    const { repartitions, loading: repartitionsLoading } =
      this.props.goalDefinitionRepartitionList;
    const loading =
      categoryListLoading ||
      goalTypeListLoading ||
      kpiListLoading ||
      periodicityListLoading ||
      repartitionsLoading ||
      unitLoading ||
      teamGroupsLoading;

    if (definition) {
      this.props.goalDefinitionCreationActions.clearGoalDefinitionCreation();
      this.props.history.goBack();
      toast.success(intl.formatMessage({ id: 'admin.goal.creation.success' }));
    }

    if (error) {
      toast.error(intl.formatMessage({ id: 'admin.goal.creation.error' }));
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
          periodicities &&
          units &&
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
      </div>
    );
  }
}

const mapStateToProps = ({
  categoryList,
  goalTypeList,
  kpiList,
  periodicityList,
  goalDefinitionCreation,
  teamList,
  goalDefinitionRepartitionList,
  teamGroupTree,
  unitList,
}) => ({
  categoryList,
  goalTypeList,
  goalDefinitionRepartitionList,
  kpiList,
  periodicityList,
  goalDefinitionCreation,
  teamList,
  teamGroupTree,
  unitList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
  goalTypeListActions: bindActionCreators(goalTypeListActions, dispatch),
  kpiListActions: bindActionCreators(kpiListActions, dispatch),
  unitListActions: bindActionCreators(unitListActions, dispatch),
  kpiCreationActions: bindActionCreators(kpiCreationActions, dispatch),
  periodicityListActions: bindActionCreators(periodicityListActions, dispatch),
  goalDefinitionCreationActions: bindActionCreators(
    goalDefinitionCreationActions,
    dispatch
  ),
  goalDefinitionRepartitionListActions: bindActionCreators(
    goalDefinitionRepartitionListActions,
    dispatch
  ),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(AdminGoalCreation)));

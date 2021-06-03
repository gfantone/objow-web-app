import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash';
import Formsy from 'formsy-react'
import { Grid, RadioGroup, FormControlLabel } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"
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
  RichText,
  TransferList,
  GreenRadio,
  Dialog,
  DialogActions,
  DialogTitle,
  Button
} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as goalTypeListActions from '../../../../services/GoalTypes/GoalTypeList/actions'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as kpiCreationActions from '../../../../services/Kpis/KpiCreation/actions'
import * as periodicityListActions from '../../../../services/Periodicities/PeriodicityList/actions'
import * as goalDefinitionCreationActions from '../../../../services/GoalDefinitions/GoalDefinitionCreation/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as unitListActions from '../../../../services/Units/UnitList/actions'
import * as goalDefinitionRepartitionListActions from '../../../../services/GoalDefinitionRepartitions/GoalDefinitionRepartitionList/actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle, faPlus, faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";

const styles = {
  indications: {
    '& .MuiInputBase-root': {
      display: 'none'
    }
  }
}

class AdminGoalCreation extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            kpi: null,
            kpiCategory: null,
            type: null,
            newKpiOpen: false,
            steps: [
              { order: 1, name: 'KPI', active: true},
              { order: 2, name: 'Informations'},
              { order: 3, name: 'Participants'},
              { order: 4, name: 'Configuration'},
              { order: 5, name: 'Options'},
              { order: 6, name: 'Validation'}
            ],
            showIndicationTools: false,
            repartition: null,
            finalModel: {

            }
        };
        this.props.goalDefinitionCreationActions.clearGoalDefinitionCreation()
        this.form = React.createRef();
    }

    componentDidMount() {
        this.props.handleTitle(Resources.ADMIN_TITLE);
        this.props.handleSubHeader(<AppBarSubTitle title={Resources.ADMIN_GOAL_CREATION_TITLE} />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.categoryListActions.getActiveCategoryList();
        this.props.goalTypeListActions.getGoalTypeList();
        this.props.kpiListActions.getKpiList();
        this.props.periodicityListActions.getPeriodicityList()
        this.props.teamListActions.getTeamList()
        this.props.unitListActions.getUnitList()
        this.props.goalDefinitionRepartitionListActions.getGoalDefinitionRepartitionList()
    }

    handleKpiChange(kpi) {
        this.setState({
            ...this.state,
            kpi: kpi
        })
    }

    handleKpiCategoryChange = (category) => {
      this.setState({
          ...this.state,
          kpiCategory: category
      })
    }

    handleTypeChange = (type) => {
        this.setState({
            ...this.state,
            type: type
        })
    }

    handleIndicationChange = (newIndication) => {
      this.setState({
          ...this.state,
          finalModel: _.merge(this.state.finalModel, { indication: newIndication })
      })
    }

    handleTeamsChange = (team) => {
      this.setState({
          ...this.state,
          currentTeam: team
      })
    }

    handleRepartitionChange = (repartition) => {
      this.setState({
          ...this.state,
          repartition: repartition
      })
    }

    changeStep(model) {
      const currentStep = this.state.steps.find(step => step.active === true)
      // Reset participants if we change goal type (team or individual)

      const apply = () => {
        this.setState({
          ...this.state,
          steps: this.state.steps.map(step => {
            if(step.order === currentStep.order) {
              return Object.assign(step, {active: false, completed: true})
            }
            if(step.order === currentStep.order + 1) {
              return Object.assign(step, {active: true})
            }
            return step
          }),
          finalModel: Object.assign(_.merge(this.state.finalModel, model), {
            participants: this.state.participants
          })
        })
      }

      if(currentStep.order !== 3 || _.get(this.state.participants, 'length', 0) > 0) {
        if(model.type && this.state.finalModel.type !== model.type) {
          this.setParticipants([], apply)
        } else {
          apply()
        }
      }
    }

    setParticipants = (participants, callback) => {

      this.setState({
          ...this.state,
          participants: participants
      }, callback)
    }
    setParticipantMode = (mode) => {
      this.setState({
          ...this.state,
          participantMode: mode
      })
    }

    handleSubmit(model) {
        const currentStep = this.state.steps.find(step => step.active === true)
        const nextStep = this.state.steps.find(step => step.order === currentStep.order + 1)
        if(nextStep) {
          this.changeStep(model)
        } else {
          this.props.goalDefinitionCreationActions.createGoalDefinition(Object.assign(
            {
              editable: false,
              adminEditable: false,
              period: this.props.match.params.periodId
            },
            this.state.finalModel,
            {
              indication: JSON.stringify(this.state.finalModel.indication),
              participants: this.state.finalModel.participants.map(p => ({id: p.id}))
            }
          ))
        }
    }

    handleSubmitKpi = (model) => {
      this.props.kpiCreationActions.createKpi(model)
    }

    handlePreviousStep = () => {
      const currentStep = this.state.steps.find(step => step.active === true)
      const previousStep = this.state.steps.find(step => step.order === currentStep.order - 1);
      if(previousStep) {
        this.setState({
          ...this.state,
          steps: this.state.steps.map(step => {
            if(step.order === currentStep.order) {
              return Object.assign(step, {active: false, completed: false})
            }
            if(step.order === currentStep.order - 1) {
              return Object.assign(step, {active: true, completed: false})
            }
            return step
          })
        })
      }
    }

    handleNextStep = () => {
      this.form.current.submit()
    }

    onNewKpiClose = () => {
      this.setState({
          ...this.state,
          newKpiOpen: false
      })
    }
    onNewKpiOpen = () => {
      this.setState({
          ...this.state,
          newKpiOpen: true
      })
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { categories } = this.props.categoryList;
        const { types } = this.props.goalTypeList;
        const { kpis } = this.props.kpiList;
        const { periodicities } = this.props.periodicityList;
        const { loading } = this.props.goalDefinitionCreation;
        const { teams } = this.props.teamList;
        const { units } = this.props.unitList;
        const { repartitions } = this.props.goalDefinitionRepartitionList
        const kpi = this.state.kpi ? kpis.find(k => k.id == this.state.kpi) : null;
        const { type } = this.state;
        const currentType = types.find(t => t.id === parseInt(type))
        const unit = kpi ? kpi.unit.name + (kpi.unit.symbol ? ` (${kpi.unit.symbol})` : '') : null;
        const currentStep = this.state.steps.find(step => step.active === true)

        const isLastStep = currentStep.order >= this.state.steps.length
        const { classes } = this.props
        let fields
        let title

        switch(currentStep.order){
          case 1:
            title = "Selection du KPI de l'objectif"
            const format = kpi && kpi.manual ? 'Manuel' : 'Automatique'
            fields = (
              <React.Fragment>
                <Grid item xs={12} sm={6}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Select name='kpiCategory' emptyText={Resources.GOAL_FILTER_ALL_CATEGORY_LABEL} label={Resources.ADMIN_GOAL_CREATION_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' fullWidth onChange={ this.handleKpiCategoryChange } />
                    </Grid>
                    <Grid item>
                      <Select name='kpi' label={Resources.ADMIN_GOAL_CREATION_KPI_LABEL} initial={ this.state.finalModel.kpi } options={
                          kpis.filter(
                            kpi => (!this.state.kpiCategory || _.get(kpi, 'category.id') === parseInt(this.state.kpiCategory))
                          )
                        } optionValueName='id' optionTextName='name' onChange={this.handleKpiChange.bind(this)} fullWidth required />
                    </Grid>
                    <Grid item>
                      <Button onClick={ this.onNewKpiOpen } text="nouveau">
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;nouveau kpi
                      </Button>
                    </Grid>
                  </Grid>

                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <InfoText>{Resources.ADMIN_GOAL_CREATION_UNIT_LABEL}</InfoText>
                      <DefaultText style={{minHeight: 19}}>{unit}</DefaultText>
                    </Grid>
                    <Grid item>
                      <InfoText>{Resources.ADMIN_GOAL_CREATION_PERIODICITY_LABEL}</InfoText>
                      <DefaultText style={{minHeight: 19}}>{_.get(kpi, 'periodicity.description')}</DefaultText>
                    </Grid>
                    <Grid item>
                      <InfoText>{Resources.ADMIN_GOAL_CREATION_KPI_FORMAT_LABEL}</InfoText>
                      {
                        kpi && <DefaultText style={{minHeight: 19}}>{ format }</DefaultText>
                      }
                    </Grid>
                  </Grid>

                </Grid>
              </React.Fragment>
            )
            break
          case 2:
            title = "Configuration de l'objectif"
            fields = (
              <React.Fragment>
                <Grid item xs={12} sm={6}>
                  <TextField name='name' initial={ this.state.finalModel.name } label={Resources.ADMIN_GOAL_CREATION_NAME_LABEL} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select name='type' initial={ this.state.finalModel.type } label={Resources.ADMIN_GOAL_CREATION_TYPE_LABEL} options={types} optionValueName='id' optionTextName='description' onChange={this.handleTypeChange} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select name='category' initial={ this.state.finalModel.category } label={Resources.ADMIN_GOAL_CREATION_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Select name='periodicity' initial={ this.state.finalModel.periodicity } label={Resources.ADMIN_GOAL_CREATION_PERIODICITY_LABEL} options={periodicities.filter(p => p.order >= _.get(kpi, 'periodicity.order') && p.order > 1)} optionValueName='id' optionTextName='description' fullWidth required />
                </Grid>
                <Grid item xs={12} className={ classes.indications }>
                  <DefaultText style={{ position: 'relative' }}>
                    <FontAwesomeIcon
                      icon={this.state.showIndicationTools ? faChevronUp : faChevronDown}
                      onClick={() => this.setState({...this.state, showIndicationTools: !this.state.showIndicationTools})}
                      style={{ position: "absolute", left: '70px', cursor: 'pointer', zIndex: 50 }}
                    />
                  </DefaultText>
                  <TextField
                    name='indication'
                    initial={ this.state.finalModel.indication }
                    readOnly={ false }
                    onChange={() => {}}
                    label={Resources.ADMIN_GOAL_CREATION_INDICATION_LABEL}
                    fullWidth
                    multiline
                    rowsMax={10}
                  />
                  <RichText
                    name='indication'
                    initial={ this.state.finalModel.indication || [ { children: [{ text: '' }],}] }
                    readOnly={ false }
                    onChange={ this.handleIndicationChange }
                    label={Resources.ADMIN_GOAL_CREATION_INDICATION_LABEL}
                    displayTools={this.state.showIndicationTools}
                    padding={'5px 0'}
                    fullWidth
                    multiline
                    rowsMax={10}
                    required
                  />
                </Grid>
              </React.Fragment>
            )
            break
          case 3:
            title = "Selection des participants"
            fields = (
              <React.Fragment>
                <TransferList
                  listIn={ teams }
                  enableCollaboratorSelect={ this.state.type === '1' }
                  onChange={ this.setParticipants }
                  selected={this.state.finalModel.participants}
                />
              </React.Fragment>
            )
            break
          case 4:
            title = "Configuration des objectifs"
            const labels = {
              "D": 'jour',
              "W": 'semaine',
              "M": 'mois',
              "Q": 'trimestre',
              "S": 'semestre',
              "Y": 'an',
            }

            const explanationPeriods = {
              "D": 'jours',
              "W": 'semaines',
              "M": 'mois',
              "Q": 'trimestres',
              "S": 'semestres',
              "Y": 'années',
            }
            const currentPeriodicity = periodicities.find(p => p.id === parseInt(this.state.finalModel.periodicity))
            const currentRepartition = repartitions.find(r => r.id === parseInt(this.state.repartition))
            // const currentType = types.find(t => t.id === parseInt(this.state.finalModel.type))
            // const currentPeriodicity = periodicities[0]
            // const currentRepartition = repartitions[0]
            // const currentType = types[1]


            const goalRepartitionLabel = parseInt(this.state.repartition) === _.get(repartitions, '[0]').id ?
              Resources.ADMIN_GOAL_CREATION_TARGET_LABEL :
              _.replace(Resources.ADMIN_GOAL_INDIVIDUAL_CREATION_TARGET_LABEL.format(labels[currentPeriodicity.code]), /individuel/, 'équipe')



            const explanation = this.state.repartition && (
              currentRepartition.code === "G" ?
                Resources[`ADMIN_GOAL_CREATION_REPARTITION_GLOBAL${ currentType.code === 'C' ? '' : '_TEAM' }`].format(explanationPeriods[currentPeriodicity.code])
                : Resources[`ADMIN_GOAL_CREATION_REPARTITION_INDIVIDUAL${ currentType.code === 'C' ? '' : '_TEAM' }`].format(explanationPeriods[currentPeriodicity.code])
            )
            fields = (
              <React.Fragment>
                <Grid container alignItems="center" direction="column" style={{padding: 20}} spacing={6}>
                  <Grid item xs={12} sm={4} style={{width: "100%"}}>
                    <Select
                      name='repartition'
                      initial={ this.state.finalModel.repartition }
                      label={Resources.ADMIN_GOAL_CREATION_REPARTITION_LABEL}
                      options={repartitions.map(r => r.code === "I" ?
                        Object.assign(r, {description: _.replace(
                          _.replace(r.description, 'période', labels[currentPeriodicity.code]),
                          /Individuelle/,
                          currentType.code === 'C' ? 'Individuelle' : 'Equipe'
                        )})
                        : r
                      )}
                      optionValueName='id'
                      optionTextName='description'
                      onChange={ this.handleRepartitionChange }
                      bigLabel
                      fullWidth
                      required
                    />
                  </Grid>

                  { this.state.repartition && (
                    <Grid item xs={12} sm={4} style={{width: "100%"}}>
                      <Grid container justify="center" direction="column" style={{ position: 'relative' }}>
                        <Grid item>
                          <TextField bigLabel type='number' name='target' initial={ this.state.finalModel.target } label={`👉 ${ goalRepartitionLabel }`} fullWidth required />
                        </Grid>

                        <Grid item xs={12} sm={6} style={{ display: 'none' }}>
                          <TextField type='number' name='default' initial={ 0 } label={Resources.ADMIN_GOAL_CREATION_DEFAULT_LABEL} fullWidth required/>
                        </Grid>

                      </Grid>
                    </Grid>
                  ) }
                </Grid>

                <div style={{ width: '70%', margin: 'auto', marginBottom: 10 }}>
                  { explanation && explanation.split("\n").map(paragraph => (
                      <DefaultText style={{ textTransform:'none'}}>
                        { paragraph }
                      </DefaultText>
                  )) }
                </div>

              </React.Fragment>
            )
            break
          case 5:
            title = "Selection des options"

            fields = (
              <React.Fragment>
                <Grid container spacing={1} direction="column">
                  <Grid item>
                    <Grid container alignItems='center'>
                      <Grid item>
                        <Switch name='live' initial={ this.state.finalModel.live } label={Resources.ADMIN_GOAL_CREATION_LIVE_LABEL} />
                      </Grid>
                      <Grid item>
                        <Tooltip title={Resources.ADMIN_GOAL_CREATION_LIVE_INFOS}>
                          <BlueText>
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </BlueText>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>

                  {
                    _.get(currentType, 'code') === 'C' && (
                      <Grid item>
                        <Switch name='editable' initial={ this.state.finalModel.editable } label={Resources.ADMIN_GOAL_CREATION_EDITABLE_LABEL} />
                      </Grid>
                    )
                  }
                  {
                    _.get(currentType, 'code') === 'T' && (
                      <Grid item>
                        <Switch name='admin_editable' initial={ this.state.finalModel.admin_editable } label={Resources.ADMIN_GOAL_CREATION_ADMIN_EDITABLE_LABEL} />
                      </Grid>
                    )
                  }
                </Grid>
              </React.Fragment>
            )
            break
          case 6:
            fields = (
              <div style={{ textAlign: 'center', margin: 'auto' }}>
                <p style={{fontSize: 19, color: '#555555'}}>
                  Félicitations 🎉 !
                </p>
                <p style={{fontSize: 19, color: '#555555'}} >
                  Il ne vous reste plus qu'à personnaliser vos objectifs selon vos besoins
                </p>
              </div>
            )
            break
        }
        return (
            <React.Fragment>
              <Formsy ref={ this.form } onValidSubmit={this.handleSubmit.bind(this)}>
                <Stepper steps={this.state.steps} />
                <BigText style={{ textAlign: 'center', marginBottom: 10 }}>
                  { title }
                </BigText>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Card>
                      <Grid container spacing={2} style={{minHeight: 200}}>
                        { fields }
                      </Grid>
                    </Card>
                  </Grid>
                  { isLastStep &&
                    <Grid item xs={12}>
                      <ProgressButton type='submit' text={Resources.ADMIN_GOAL_CREATION_SUBMIT_BUTTON} loading={loading} centered />
                    </Grid>
                  }
                </Grid>
              </Formsy>
              <Grid item>
                <Grid container spacing={4} direction='row' justify='center'>
                  { currentStep.order > 1 &&
                    <Grid item>
                      <ProgressButton onClick={ this.handlePreviousStep } color="secondary" text="précédent" loading={loading} centered />
                    </Grid>
                  }
                  { !isLastStep &&
                    <Grid item>
                      <ProgressButton onClick={ this.handleNextStep } text="suivant" loading={loading} centered />
                    </Grid>
                  }
                </Grid>
              </Grid>
            </React.Fragment>
        )
    }

    render() {
        const { categories, loading: categoryListLoading } = this.props.categoryList;
        const { definition } = this.props.goalDefinitionCreation;
        const { types, loading: goalTypeListLoading } = this.props.goalTypeList;
        const { kpis, loading: kpiListLoading } = this.props.kpiList;
        const { periodicities, loading: periodicityListLoading } = this.props.periodicityList;
        const { teams, loading: teamLoading } = this.props.teamList;
        const { units, loading: unitLoading } = this.props.unitList;
        const { repartitions, loading: repartitionsLoading } = this.props.goalDefinitionRepartitionList
        const loading = categoryListLoading || goalTypeListLoading || kpiListLoading || periodicityListLoading || teamLoading || repartitionsLoading || unitLoading;

        if (definition) {
            this.props.goalDefinitionCreationActions.clearGoalDefinitionCreation();
            this.props.history.goBack()
        }
        const criticities = [
          {order: 1, name: 'Basse'},
          {order: 2, name: 'Moyenne'},
          {order: 3, name: 'Haute'}
        ]

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && categories && types  && kpis && periodicities && teams && units && repartitions && this.renderData() }
                <Dialog
                    maxWidth='xs'
                    open={this.state.newKpiOpen}
                    onClose={this.onNewKpiClose}
                >
                    <DialogTitle>Demande de création de KPI</DialogTitle>
                    <Formsy onValidSubmit={this.handleSubmitKpi.bind(this)}>
                      <Grid container direction="column" spacing={2}>
                        <Grid item>
                          <TextField name='name' label={Resources.ADMIN_GOAL_CREATION_NAME_LABEL} fullWidth required />
                        </Grid>
                        <Grid item >
                          <Select name='criticity' label={Resources.ADMIN_GOAL_CREATION_CRITICITY_LABEL} options={criticities} optionValueName='order' optionTextName='name' fullWidth required />
                        </Grid>
                        <Grid item >
                          <Select name='category' label={Resources.ADMIN_GOAL_CREATION_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' fullWidth />
                        </Grid>
                        <Grid item>
                          <TextField name='description' label={Resources.ADMIN_GOAL_CREATION_DESCRIPTION_LABEL} fullWidth required />
                        </Grid>
                        <Grid item>
                          <ProgressButton type='submit' text={Resources.ADMIN_GOAL_CREATION_SUBMIT_BUTTON} loading={loading} centered />
                        </Grid>
                      </Grid>
                    </Formsy>
                    <DialogActions>
                        <Button onClick={this.onNewKpiClose}>Fermer</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({ categoryList, goalTypeList, kpiList, periodicityList, goalDefinitionCreation, teamList, goalDefinitionRepartitionList, unitList }) => ({
    categoryList,
    goalTypeList,
    goalDefinitionRepartitionList,
    kpiList,
    periodicityList,
    goalDefinitionCreation,
    teamList,
    unitList
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    goalTypeListActions: bindActionCreators(goalTypeListActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    unitListActions: bindActionCreators(unitListActions, dispatch),
    kpiCreationActions: bindActionCreators(kpiCreationActions, dispatch),
    periodicityListActions: bindActionCreators(periodicityListActions, dispatch),
    goalDefinitionCreationActions: bindActionCreators(goalDefinitionCreationActions, dispatch),
    goalDefinitionRepartitionListActions: bindActionCreators(goalDefinitionRepartitionListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminGoalCreation))

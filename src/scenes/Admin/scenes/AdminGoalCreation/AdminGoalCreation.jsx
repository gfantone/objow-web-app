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
import * as periodicityListActions from '../../../../services/Periodicities/PeriodicityList/actions'
import * as goalDefinitionCreationActions from '../../../../services/GoalDefinitions/GoalDefinitionCreation/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

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
      if(model.type && this.state.finalModel.type !== model.type) {
        this.setParticipants([], apply)
      } else {
        apply()
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
            fields = (
              <React.Fragment>

                <Grid item xs={12} sm={6}>
                  <Select name='kpiCategory' label={Resources.ADMIN_GOAL_CREATION_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' fullWidth onChange={ this.handleKpiCategoryChange } />
                  <Select name='kpi' label={Resources.ADMIN_GOAL_CREATION_KPI_LABEL} initial={ this.state.finalModel.kpi } options={
                      kpis.filter(kpi => !this.state.kpiCategory || _.get(kpi, 'category.id') === parseInt(this.state.kpiCategory))
                  } optionValueName='id' optionTextName='name' onChange={this.handleKpiChange.bind(this)} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <InfoText>{Resources.ADMIN_GOAL_CREATION_UNIT_LABEL}</InfoText>
                      <DefaultText>{unit}</DefaultText>
                    </Grid>
                    <Grid item>
                      <InfoText>{Resources.ADMIN_GOAL_CREATION_PERIODICITY_LABEL}</InfoText>
                      <DefaultText>{_.get(kpis.find(kpi => kpi.id === parseInt(this.state.kpi)), 'periodicity.description')}</DefaultText>
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
                  <Select name='periodicity' initial={ this.state.finalModel.periodicity } label={Resources.ADMIN_GOAL_CREATION_PERIODICITY_LABEL} options={periodicities} optionValueName='id' optionTextName='description' fullWidth required />
                </Grid>
                <Grid item xs={12} className={ classes.indications }>
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
            fields = (
              <React.Fragment>
                <Grid item xs={12} sm={6}>
                  <TextField type='number' name='target' initial={ this.state.finalModel.target } label={Resources.ADMIN_GOAL_CREATION_TARGET_LABEL} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField type='number' name='default' initial={ this.state.finalModel.default } label={Resources.ADMIN_GOAL_CREATION_DEFAULT_LABEL} fullWidth required />
                </Grid>
              </React.Fragment>
            )
            break
          case 5:
            title = "Selection des options"
            fields = (
              <React.Fragment>
                <Grid item xs={12}>
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
                    <Grid item xs={12}>
                      <Switch name='editable' initial={ this.state.finalModel.editable } label={Resources.ADMIN_GOAL_CREATION_EDITABLE_LABEL} />
                    </Grid>
                  )
                }
                {
                  _.get(currentType, 'code') === 'T' && (
                    <Grid item xs={12}>
                      <Switch name='admin_editable' initial={ this.state.finalModel.admin_editable } label={Resources.ADMIN_GOAL_CREATION_ADMIN_EDITABLE_LABEL} />
                    </Grid>
                  )
                }
              </React.Fragment>
            )
            break
          case 6:
            fields = (
              <div style={{ textAlign: 'center', margin: 'auto' }}>
                <BigText>
                  Félicitations !
                </BigText>
                <BigText>
                  Il ne vous reste plus qu'à personnaliser vos objectifs selon vos besoins
                </BigText>
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
        const { teams, loading: teamLoading } = this.props.teamList
        const loading = categoryListLoading || goalTypeListLoading || kpiListLoading || periodicityListLoading || teamLoading;

        if (definition) {
            this.props.goalDefinitionCreationActions.clearGoalDefinitionCreation();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && categories && types  && kpis && periodicities && teams && this.renderData() }
                <Dialog
                    maxWidth='xs'
                    open={this.state.newKpiOpen}
                >
                    <DialogTitle>Demande de création de KPI</DialogTitle>
                    <div>blablablabla pookie</div>
                    <DialogActions>
                        <Button onClick={this.onNewKpiClose}>Fermer</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = ({ categoryList, goalTypeList, kpiList, periodicityList, goalDefinitionCreation, teamList }) => ({
    categoryList,
    goalTypeList,
    kpiList,
    periodicityList,
    goalDefinitionCreation,
    teamList
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    goalTypeListActions: bindActionCreators(goalTypeListActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    periodicityListActions: bindActionCreators(periodicityListActions, dispatch),
    goalDefinitionCreationActions: bindActionCreators(goalDefinitionCreationActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminGoalCreation))

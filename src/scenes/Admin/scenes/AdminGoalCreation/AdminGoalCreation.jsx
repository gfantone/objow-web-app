import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash';
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"
import {AppBarSubTitle, BlueText, Card, DefaultText, InfoText, Loader, MainLayoutComponent, ProgressButton, Select, Switch, TextField, Tooltip, Stepper, RichText} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as goalTypeListActions from '../../../../services/GoalTypes/GoalTypeList/actions'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as periodicityListActions from '../../../../services/Periodicities/PeriodicityList/actions'
import * as goalDefinitionCreationActions from '../../../../services/GoalDefinitions/GoalDefinitionCreation/actions'
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
            type: null,
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
    }

    handleKpiChange(kpi) {
        this.setState({
            ...this.state,
            kpi: kpi
        })
    }

    handleTypeChange = (type) => {
        this.setState({
            ...this.state,
            type: type
        })
    }

    handleIndicationChange = (newIndication) => {
      console.log(newIndication);
      this.setState({
          ...this.state,
          finalModel: _.merge(this.state.finalModel, { indication: newIndication })
      })
    }

    changeStep(model) {
      const currentStep = this.state.steps.find(step => step.active === true)
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
        finalModel: _.merge(this.state.finalModel, model)
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
              indication: JSON.stringify(this.state.finalModel.indication)
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

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { categories } = this.props.categoryList;
        const { types } = this.props.goalTypeList;
        const { kpis } = this.props.kpiList;
        const { periodicities } = this.props.periodicityList;
        const { loading } = this.props.goalDefinitionCreation;
        const kpi = this.state.kpi ? kpis.find(k => k.id == this.state.kpi) : null;
        const { type } = this.state;
        const currentType = types.find(t => t.id === parseInt(type))
        const unit = kpi ? kpi.unit.name + (kpi.unit.symbol ? ` (${kpi.unit.symbol})` : '') : null;
        const currentStep = this.state.steps.find(step => step.active === true)
        const isLastStep = currentStep.order >= this.state.steps.length
        const { classes } = this.props

        let fields
        switch(currentStep.order){
          case 1:
            fields = (
              <React.Fragment>
                <Grid item xs={12} sm={6}>
                  <Select name='kpi' label={Resources.ADMIN_GOAL_CREATION_KPI_LABEL} initial={ this.state.finalModel.kpi } options={kpis} optionValueName='id' optionTextName='name' onChange={this.handleKpiChange.bind(this)} fullWidth required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoText>{Resources.ADMIN_GOAL_CREATION_UNIT_LABEL}</InfoText>
                  <DefaultText>{unit}</DefaultText>
                </Grid>
              </React.Fragment>
            )
            break
          case 2:
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
            break
          case 4:
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
            break
        }
        return (
            <React.Fragment>
              <Formsy ref={ this.form } onValidSubmit={this.handleSubmit.bind(this)}>
                <Stepper steps={this.state.steps} />


                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Card>
                      <Grid container spacing={2}>
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
        const loading = categoryListLoading || goalTypeListLoading || kpiListLoading || periodicityListLoading;

        if (definition) {
            this.props.goalDefinitionCreationActions.clearGoalDefinitionCreation();
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && categories && types  && kpis && periodicities && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ categoryList, goalTypeList, kpiList, periodicityList, goalDefinitionCreation }) => ({
    categoryList,
    goalTypeList,
    kpiList,
    periodicityList,
    goalDefinitionCreation
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    goalTypeListActions: bindActionCreators(goalTypeListActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    periodicityListActions: bindActionCreators(periodicityListActions, dispatch),
    goalDefinitionCreationActions: bindActionCreators(goalDefinitionCreationActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AdminGoalCreation))

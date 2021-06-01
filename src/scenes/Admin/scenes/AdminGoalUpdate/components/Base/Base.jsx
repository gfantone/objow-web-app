import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from 'formsy-react'
import {Grid} from '@material-ui/core'
import { withStyles } from "@material-ui/core/styles"
import {BlueText, Button, Card, DefaultText, Dialog, DialogActions, DialogContent, DialogTitle, InfoText, Loader, ProgressButton, Select, Switch, TextField, Tooltip, RichText} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as categoryListActions from '../../../../../../services/Categories/CategoryList/actions'
import * as goalTypeListActions from '../../../../../../services/GoalTypes/GoalTypeList/actions'
import * as kpiListActions from '../../../../../../services/Kpis/KpiList/actions'
import * as periodicityListActions from '../../../../../../services/Periodicities/PeriodicityList/actions'
import * as goalDefinitionUpdateActions from '../../../../../../services/GoalDefinitions/GoalDefinitionUpdate/actions'
import * as goalDefinitionActivationUpdateActions from '../../../../../../services/GoalDefinitions/GoalDefinitionActivationUpdate/actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInfoCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";


const styles = {
  indications: {
    '& .MuiInputBase-root': {
      display: 'none'
    }
  }
}

class Base extends Component {
    state = {
      kpi: null,
      open: false,
      indication: null
    }

    constructor(props) {
        super(props)
        this.props.goalDefinitionActivationUpdateActions.clearGoalDefinitionActivationUpdate()
    }
    componentDidMount() {
        this.props.categoryListActions.getActiveCategoryList()
        this.props.goalTypeListActions.getGoalTypeList()
        this.props.kpiListActions.getKpiList()
        this.props.periodicityListActions.getPeriodicityList()
    }

    onDisable() {
        this.props.goalDefinitionActivationUpdateActions.updateGoalDefinitionActivation(this.props.id, false)
    }

    setOpen(open) {
        const {loading} = this.props.goalDefinitionActivationUpdate
        if (!loading) {
            this.setState({
                ...this.state,
                open: open
            })
        }
    }
    handleIndicationChange = (newIndication) => {
      this.setState({
          ...this.state,
          indication: newIndication
      })
    }

    handleSubmit(model) {
        if (!model.editable) model.editable = false
        model.period = this.props.period
        this.props.goalDefinitionUpdateActions.updateGoalDefinition(
          this.props.id,
          Object.assign(model, {indication: JSON.stringify(this.state.indication)})
        )
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {categories} = this.props.categoryList
        const {types} = this.props.goalTypeList
        const {kpis} = this.props.kpiList
        const {periodicities} = this.props.periodicityList
        const {definition} = this.props.goalDefinitionDetail
        const {loading: updateLoading} = this.props.goalDefinitionUpdate
        const {loading: activationUpdateLoading} = this.props.goalDefinitionActivationUpdate
        const unit = definition.kpi.unit.name + (definition.kpi.unit.symbol ? ` (${definition.kpi.unit.symbol})` : '')
        const readonly = !definition.isActive

        return (
            <div>
                <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Select name='kpi' label={Resources.ADMIN_GOAL_UPDATE_KPI_LABEL} options={kpis} optionValueName='id' optionTextName='name' initial={definition.kpi.id} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InfoText>{Resources.ADMIN_GOAL_UPDATE_UNIT_LABEL}</InfoText>
                                        <DefaultText>{unit}</DefaultText>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name='name' label={Resources.ADMIN_GOAL_UPDATE_NAME_LABEL} initial={definition.name} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select name='type' label={Resources.ADMIN_GOAL_UPDATE_TYPE_LABEL} options={types} optionValueName='id' optionTextName='description' initial={definition.type.id} fullWidth disabled required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select name='category' label={Resources.ADMIN_GOAL_UPDATE_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' initial={definition.category.id} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select name='periodicity' label={Resources.ADMIN_GOAL_UPDATE_PERIODICITY_LABEL} options={periodicities} optionValueName='id' optionTextName='description' initial={definition.periodicity.id} fullWidth disabled required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField type='number' name='target' label={Resources.ADMIN_GOAL_UPDATE_TARGET_LABEL} initial={definition.target} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField type='number' name='default' label={Resources.ADMIN_GOAL_UPDATE_DEFAULT_LABEL} initial={definition.default} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} className={ this.props.classes.indications }>
                                      <DefaultText style={{ position: 'relative' }}>
                                        <FontAwesomeIcon
                                          icon={this.state.showIndicationTools ? faChevronUp : faChevronDown}
                                          onClick={() => this.setState({...this.state, showIndicationTools: !this.state.showIndicationTools})}
                                          style={{ position: "absolute", left: '70px', cursor: 'pointer', zIndex: 50 }}
                                        />
                                      </DefaultText>
                                      <TextField
                                        name='indication'
                                        initial={ definition.indication }
                                        readOnly={ false }
                                        onChange={() => {}}
                                        label={Resources.ADMIN_GOAL_CREATION_INDICATION_LABEL}
                                        fullWidth
                                        multiline
                                        rowsMax={10}
                                      />
                                      <RichText
                                        name='indication'
                                        initial={ JSON.parse(definition.indication) || [ { children: [{ text: '' }],}] }
                                        readOnly={ readonly }
                                        onChange={ this.handleIndicationChange }
                                        label={Resources.ADMIN_GOAL_CREATION_INDICATION_LABEL}
                                        displayTools={readonly}
                                        padding={'5px 0'}
                                        fullWidth
                                        multiline
                                        rowsMax={10}
                                        required
                                      />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems='center'>
                                            <Grid item>
                                                <Switch name='live' initial={definition.live} label={Resources.ADMIN_GOAL_UPDATE_LIVE_LABEL} disabled={readonly} />
                                            </Grid>
                                            <Grid item>
                                                <Tooltip title={Resources.ADMIN_GOAL_UPDATE_LIVE_INFOS}>
                                                    <BlueText>
                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                    </BlueText>
                                                </Tooltip>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    { definition.type.code == 'C' && <Grid item xs={12}>
                                        <Switch name='editable' initial={definition.editable} label={Resources.ADMIN_GOAL_UPDATE_EDITABLE_LABEL} disabled={readonly} />
                                    </Grid> }
                                    { definition.type.code == 'T' && <Grid item xs={12}>
                                        <Switch name='admin_editable' initial={definition.admin_editable} label={Resources.ADMIN_GOAL_UPDATE_ADMIN_EDITABLE_LABEL} disabled={readonly} />
                                    </Grid> }
                                </Grid>
                            </Card>
                        </Grid>
                        {!readonly && <Grid item xs={12}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <ProgressButton type='button' color='secondary' text={Resources.ADMIN_GOAL_UPDATE_DISABLE_BUTTON} disabled={updateLoading} centered onClick={() => this.setOpen(true)} />
                                </Grid>
                                <Grid item>
                                    <ProgressButton type='submit' text={Resources.ADMIN_GOAL_UPDATE_SUBMIT_BUTTON} loading={updateLoading} centered />
                                </Grid>
                            </Grid>
                        </Grid>}
                    </Grid>
                </Formsy>
                <Dialog open={this.state.open} onClose={() => this.setOpen(false)}>
                    <DialogTitle>{Resources.ADMIN_GOAL_UPDATE_DISABLE_MESSAGE.format(definition.name)}</DialogTitle>
                    <DialogContent>{Resources.ADMIN_GOAL_UPDATE_DISABLE_INFO}</DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setOpen(false)} color='secondary'>{Resources.ADMIN_GOAL_UPDATE_NO_BUTTON}</Button>
                        <ProgressButton type='button' text={Resources.ADMIN_GOAL_UPDATE_YES_BUTTON} loading={activationUpdateLoading} onClick={this.onDisable.bind(this)} />
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    render() {
        const {categories, loading: categoryListLoading} = this.props.categoryList
        const {types, loading: goalTypeListLoading} = this.props.goalTypeList
        const {kpis, loading: kpiListLoading} = this.props.kpiList
        const {periodicities, loading: periodicityListLoading} = this.props.periodicityList
        const loading = categoryListLoading || goalTypeListLoading || kpiListLoading || periodicityListLoading
        const {success} = this.props.goalDefinitionActivationUpdate

        if (success) {
            this.props.goalDefinitionActivationUpdateActions.clearGoalDefinitionActivationUpdate()
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

const mapStateToProps = ({categoryList, goalTypeList, kpiList, periodicityList, goalDefinitionUpdate, goalDefinitionActivationUpdate, goalDefinitionDetail}) => ({
    categoryList,
    goalTypeList,
    kpiList,
    periodicityList,
    goalDefinitionUpdate,
    goalDefinitionActivationUpdate,
    goalDefinitionDetail
})

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    goalTypeListActions: bindActionCreators(goalTypeListActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    periodicityListActions: bindActionCreators(periodicityListActions, dispatch),
    goalDefinitionUpdateActions: bindActionCreators(goalDefinitionUpdateActions, dispatch),
    goalDefinitionActivationUpdateActions: bindActionCreators(goalDefinitionActivationUpdateActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Base)))

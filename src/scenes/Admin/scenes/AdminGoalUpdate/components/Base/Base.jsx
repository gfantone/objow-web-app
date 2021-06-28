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
import * as goalDefinitionRepartitionListActions from '../../../../../../services/GoalDefinitionRepartitions/GoalDefinitionRepartitionList/actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faInfoCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import _ from 'lodash'


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
      showIndicationTools: false,
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
        this.props.goalDefinitionRepartitionListActions.getGoalDefinitionRepartitionList()
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
        const { repartitions } = this.props.goalDefinitionRepartitionList
        const {loading: updateLoading} = this.props.goalDefinitionUpdate
        const {loading: activationUpdateLoading} = this.props.goalDefinitionActivationUpdate
        const unit = definition.kpi.unit.name + (definition.kpi.unit.symbol ? ` (${definition.kpi.unit.symbol})` : '')
        const readonly = !definition.isActive


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

        const goalRepartitionLabel = parseInt(definition.repartition.id) === _.get(repartitions, '[0]').id ?
          Resources.ADMIN_GOAL_CREATION_TARGET_LABEL :
            Resources.ADMIN_GOAL_INDIVIDUAL_CREATION_TARGET_LABEL.format(
              labels[definition.periodicity.code],
              definition.type.code === 'C' ?
                'individuel' :
                'équipe'
            )
        const explanation = definition.repartition && (
          definition.repartition.code === "G" ?
            Resources[`ADMIN_GOAL_CREATION_REPARTITION_GLOBAL${ definition.type.code === 'C' ? '' : '_TEAM' }`].format(explanationPeriods[definition.periodicity.code])
            : Resources[`ADMIN_GOAL_CREATION_REPARTITION_INDIVIDUAL${ definition.type.code === 'C' ? '' : '_TEAM' }`].format(explanationPeriods[definition.periodicity.code])
        )
        return (
            <div>
                <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item>
                      <Card>
                        <Grid container direction="row" spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Grid container direction="column" spacing={2}>
                              <Grid item>
                                <Select name='kpiCategory' initial={ _.get(definition, 'kpi.category.id') } disabled emptyText={Resources.GOAL_FILTER_ALL_CATEGORY_LABEL} label={Resources.ADMIN_GOAL_CREATION_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' fullWidth />
                              </Grid>
                              <Grid item>
                                <Select name='kpi' label={Resources.ADMIN_GOAL_CREATION_KPI_LABEL} initial={ definition.kpi.id } options={
                                    kpis.filter(
                                      kpi => kpi.periodicity.code !== 'C'
                                    )
                                  } optionValueName='id' optionTextName='name' disabled fullWidth required />
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
                                  <DefaultText style={{minHeight: 19}}>{_.get(definition.kpi, 'periodicity.description')}</DefaultText>
                                </Grid>
                                <Grid item>
                                  <InfoText>{Resources.ADMIN_GOAL_CREATION_KPI_FORMAT_LABEL}</InfoText>
                                  {
                                    definition.kpi && <DefaultText style={{minHeight: 19}}>
                                    { definition.kpi, 'manual' ? 'Manuel' : 'Automatique' }
                                  </DefaultText>
                                }
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                    <Grid item>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField name='name' initial={ definition.name } label={Resources.ADMIN_GOAL_CREATION_NAME_LABEL} fullWidth required />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Select name='type' initial={ definition.type.id } label={Resources.ADMIN_GOAL_CREATION_TYPE_LABEL} options={types} optionValueName='id' optionTextName='description' fullWidth required />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Select name='category' initial={ definition.category.id } label={Resources.ADMIN_GOAL_CREATION_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' fullWidth required />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Select name='periodicity' initial={ definition.periodicity.id } label={Resources.ADMIN_GOAL_CREATION_PERIODICITY_LABEL} options={periodicities.filter(p => p.order >= _.get(definition.kpi, 'periodicity.order') && p.order > 1)} optionValueName='id' optionTextName='description' fullWidth required />
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
                              displayTools={this.state.showIndicationTools}
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
                    <Grid item>
                      <Card>
                        <Grid container spacing={2}>
                          <Grid container alignItems="center" direction="column" style={{padding: 20}} spacing={6}>
                            <Grid item xs={12} sm={4} style={{width: "100%"}}>
                              <Select
                                name='repartition'
                                initial={ definition.repartition.id }
                                label={Resources.ADMIN_GOAL_CREATION_REPARTITION_LABEL}
                                options={repartitions.map(r => r.code === "I" ?
                                  Object.assign(r, {description: _.replace(
                                    _.replace(r.description, 'période', labels[definition.periodicity.code]),
                                    /Individuelle/,
                                    definition.type.code === 'C' ? 'Individuelle' : 'Equipe'
                                  )})
                                  : r
                                )}
                                optionValueName='id'
                                optionTextName='description'
                                disabled
                                bigLabel
                                fullWidth
                                required
                              />
                            </Grid>

                            { definition.repartition && (
                              <Grid item xs={12} sm={4} style={{width: "100%"}}>
                                <Grid container justify="center" direction="column" style={{ position: 'relative' }}>
                                  <Grid item>
                                    <TextField disabled bigLabel type='number' name='target' initial={ definition.target } label={`👉 ${ goalRepartitionLabel }`} fullWidth required />
                                  </Grid>
                                </Grid>
                                <Grid item xs={12} sm={6} style={{ display: 'none' }}>
                                  <TextField type='number' name='default' initial={ 0 } label={Resources.ADMIN_GOAL_CREATION_DEFAULT_LABEL} fullWidth required/>
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
                        </Grid>
                      </Card>
                    </Grid>
                    <Grid item>
                      <Card>
                        <Grid container>
                          <Grid container spacing={1} direction="column">
                            <Grid item>
                              <Grid container alignItems='center'>
                                <Grid item>
                                  <Switch name='live' initial={ definition.live } label={Resources.ADMIN_GOAL_CREATION_LIVE_LABEL} />
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
                              _.get(definition.type, 'code') === 'C' && (
                                <Grid item>
                                  <Switch name='editable' initial={ definition.editable } label={Resources.ADMIN_GOAL_CREATION_EDITABLE_LABEL} />
                                </Grid>
                              )
                            }
                            {
                              _.get(definition.type, 'code') === 'T' && (
                                <Grid item>
                                  <Switch name='admin_editable' initial={ definition.admin_editable } label={Resources.ADMIN_GOAL_CREATION_ADMIN_EDITABLE_LABEL} />
                                </Grid>
                              )
                            }
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>
                  </Grid>

                  <Grid container spacing={4} style={{ marginTop: 5 }}>
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
        const { repartitions, loading: repartitionsLoading } = this.props.goalDefinitionRepartitionList
        const loading = categoryListLoading || goalTypeListLoading || kpiListLoading || periodicityListLoading || repartitionsLoading
        const {success} = this.props.goalDefinitionActivationUpdate

        if (success) {
            this.props.goalDefinitionActivationUpdateActions.clearGoalDefinitionActivationUpdate()
            this.props.history.goBack()
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && categories && types  && kpis && periodicities && repartitions && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({categoryList, goalTypeList, kpiList, periodicityList, goalDefinitionUpdate, goalDefinitionActivationUpdate, goalDefinitionRepartitionList, goalDefinitionDetail}) => ({
    categoryList,
    goalTypeList,
    kpiList,
    periodicityList,
    goalDefinitionUpdate,
    goalDefinitionActivationUpdate,
    goalDefinitionDetail,
    goalDefinitionRepartitionList
})

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    goalTypeListActions: bindActionCreators(goalTypeListActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    periodicityListActions: bindActionCreators(periodicityListActions, dispatch),
    goalDefinitionUpdateActions: bindActionCreators(goalDefinitionUpdateActions, dispatch),
    goalDefinitionRepartitionListActions: bindActionCreators(goalDefinitionRepartitionListActions, dispatch),
    goalDefinitionActivationUpdateActions: bindActionCreators(goalDefinitionActivationUpdateActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(Base)))

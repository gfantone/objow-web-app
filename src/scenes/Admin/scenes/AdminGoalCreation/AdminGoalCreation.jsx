import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash';
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import {AppBarSubTitle, BlueText, Card, DefaultText, InfoText, Loader, MainLayoutComponent, ProgressButton, Select, Switch, TextField, Tooltip} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as goalTypeListActions from '../../../../services/GoalTypes/GoalTypeList/actions'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as periodicityListActions from '../../../../services/Periodicities/PeriodicityList/actions'
import * as goalDefinitionCreationActions from '../../../../services/GoalDefinitions/GoalDefinitionCreation/actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";

class AdminGoalCreation extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            kpi: null,
            type: null
        };
        this.props.goalDefinitionCreationActions.clearGoalDefinitionCreation()
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

    handleSubmit(model) {
        model.period = this.props.match.params.periodId;
        this.props.goalDefinitionCreationActions.createGoalDefinition(model)
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

        return (
            <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Select name='kpi' label={Resources.ADMIN_GOAL_CREATION_KPI_LABEL} options={kpis} optionValueName='id' optionTextName='name' onChange={this.handleKpiChange.bind(this)} fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InfoText>{Resources.ADMIN_GOAL_CREATION_UNIT_LABEL}</InfoText>
                                    <DefaultText>{unit}</DefaultText>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name='name' label={Resources.ADMIN_GOAL_CREATION_NAME_LABEL} fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select name='type' label={Resources.ADMIN_GOAL_CREATION_TYPE_LABEL} options={types} optionValueName='id' optionTextName='description' onChange={this.handleTypeChange} fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select name='category' label={Resources.ADMIN_GOAL_CREATION_CATEGORY_LABEL} options={categories} optionValueName='id' optionTextName='name' fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select name='periodicity' label={Resources.ADMIN_GOAL_CREATION_PERIODICITY_LABEL} options={periodicities} optionValueName='id' optionTextName='description' fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField type='number' name='target' label={Resources.ADMIN_GOAL_CREATION_TARGET_LABEL} fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField type='number' name='default' label={Resources.ADMIN_GOAL_CREATION_DEFAULT_LABEL} fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='indication' label={Resources.ADMIN_GOAL_CREATION_INDICATION_LABEL} fullWidth multiline rowsMax={10} required />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container alignItems='center'>
                                        <Grid item>
                                            <Switch name='live' label={Resources.ADMIN_GOAL_CREATION_LIVE_LABEL} />
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
                                      <Switch name='editable' label={Resources.ADMIN_GOAL_CREATION_EDITABLE_LABEL} />
                                    </Grid>
                                  )
                                }
                                {
                                  _.get(currentType, 'code') === 'T' && (
                                    <Grid item xs={12}>
                                      <Switch name='admin_editable' label={Resources.ADMIN_GOAL_CREATION_ADMIN_EDITABLE_LABEL} />
                                    </Grid>
                                  )
                                }
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text={Resources.ADMIN_GOAL_CREATION_SUBMIT_BUTTON} loading={loading} centered />
                    </Grid>
                </Grid>
            </Formsy>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminGoalCreation)

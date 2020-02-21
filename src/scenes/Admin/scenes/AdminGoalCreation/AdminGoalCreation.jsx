import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { AppBarSubTitle, Card, DefaultText, InfoText, Loader, MainLayoutComponent, ProgressButton, Select, Switch, TextField } from '../../../../components'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as goalTypeListActions from '../../../../services/GoalTypes/GoalTypeList/actions'
import * as kpiListActions from '../../../../services/Kpis/KpiList/actions'
import * as periodicityListActions from '../../../../services/Periodicities/PeriodicityList/actions'
import * as goalDefinitionCreationActions from '../../../../services/GoalDefinitions/GoalDefinitionCreation/actions'

class AdminGoalCreation extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.state = {
            kpi: null
        };
        this.props.goalDefinitionCreationActions.clearGoalDefinitionCreation()
    }

    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<AppBarSubTitle title="Création d'un objectif" />);
        this.props.handleMaxWidth('md');
        this.props.activateReturn();
        this.props.categoryListActions.getCategoryList();
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
        const unit = kpi ? kpi.unit.name + (kpi.unit.symbol ? ` (${kpi.unit.symbol})` : '') : null;

        return (
            <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Select name='kpi' label='KPI' options={kpis} optionValueName='id' optionTextName='name' onChange={this.handleKpiChange.bind(this)} fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InfoText>Unité</InfoText>
                                    <DefaultText>{unit}</DefaultText>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name='name' label='Intitulé' fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select name='type' label='Type' options={types} optionValueName='id' optionTextName='description' fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select name='category' label='Catégorie' options={categories} optionValueName='id' optionTextName='name' fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Select name='periodicity' label='Périodicité' options={periodicities} optionValueName='id' optionTextName='description' fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField type='number' name='target' label='Obj. global annuel' fullWidth required />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField type='number' name='default' label='Réalisé par défaut' fullWidth required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name='indication' label='Indications' fullWidth multiline rowsMax={10} required />
                                </Grid>
                                <Grid item xs={12}>
                                    <Switch name='editable' label='Objectif modifiable par les managers' />
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressButton type='submit' text='Valider' loading={loading} centered />
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
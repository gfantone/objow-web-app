import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Grid } from '@material-ui/core'
import { Card, DefaultText, InfoText, Loader, ProgressButton, Select, Switch, TextField } from '../../../../../../components'
import * as categoryListActions from '../../../../../../services/Categories/CategoryList/actions'
import * as goalTypeListActions from '../../../../../../services/GoalTypes/GoalTypeList/actions'
import * as kpiListActions from '../../../../../../services/Kpis/KpiList/actions'
import * as periodicityListActions from '../../../../../../services/Periodicities/PeriodicityList/actions'
import * as goalDefinitionDetailActions from '../../../../../../services/GoalDefinitions/GoalDefinitionDetail/actions'
import * as goalDefinitionUpdateActions from '../../../../../../services/GoalDefinitions/GoalDefinitionUpdate/actions'

class Base extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kpi: null
        }
    }
    componentDidMount() {
        this.props.categoryListActions.getActiveCategoryList();
        this.props.goalTypeListActions.getGoalTypeList();
        this.props.kpiListActions.getKpiList();
        this.props.periodicityListActions.getPeriodicityList();
        this.props.goalDefinitionDetailActions.getGoalDefinition(this.props.id)
    }

    handleSubmit(model) {
        if (!model.editable) model.editable = false;
        model.period = this.props.period;
        this.props.goalDefinitionUpdateActions.updateGoalDefinition(this.props.id, model)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { categories } = this.props.categoryList;
        const { types } = this.props.goalTypeList;
        const { kpis } = this.props.kpiList;
        const { periodicities } = this.props.periodicityList;
        const { definition } = this.props.goalDefinitionDetail;
        const { loading } = this.props.goalDefinitionUpdate;
        const unit = definition.kpi.unit.name + (definition.kpi.unit.symbol ? ` (${definition.kpi.unit.symbol})` : '');
        const readonly = !definition.isActive

        return (
            <div>
                <Formsy onValidSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Select name='kpi' label='KPI' options={kpis} optionValueName='id' optionTextName='name' initial={definition.kpi.id} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InfoText>Unité</InfoText>
                                        <DefaultText>{unit}</DefaultText>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField name='name' label='Intitulé' initial={definition.name} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select name='type' label='Type' options={types} optionValueName='id' optionTextName='description' initial={definition.type.id} fullWidth disabled required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select name='category' label='Catégorie' options={categories} optionValueName='id' optionTextName='name' initial={definition.category.id} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Select name='periodicity' label='Périodicité' options={periodicities} optionValueName='id' optionTextName='description' initial={definition.periodicity.id} fullWidth disabled required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField type='number' name='target' label='Obj. global annuel' initial={definition.target} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField type='number' name='default' label='Réalisé par défaut' initial={definition.default} fullWidth disabled={readonly} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField name='indication' label='Indications' initial={definition.indication} fullWidth multiline rowsMax={10} disabled={readonly} required />
                                    </Grid>
                                    { definition.type.code == 'C' && <Grid item xs={12}>
                                        <Switch name='editable' initial={definition.editable} label='Objectif modifiable par les managers' disabled={readonly} />
                                    </Grid> }
                                </Grid>
                            </Card>
                        </Grid>
                        {!readonly && <Grid item xs={12}>
                            <ProgressButton type='submit' text='Valider' loading={loading} centered />
                        </Grid>}
                    </Grid>
                </Formsy>
            </div>
        )
    }

    render() {
        const { categories, loading: categoryListLoading } = this.props.categoryList;
        const { types, loading: goalTypeListLoading } = this.props.goalTypeList;
        const { kpis, loading: kpiListLoading } = this.props.kpiList;
        const { periodicities, loading: periodicityListLoading } = this.props.periodicityList;
        const { definition, loading: goalDefinitionDetailLoading } = this.props.goalDefinitionDetail;
        const loading = categoryListLoading || goalTypeListLoading || kpiListLoading || periodicityListLoading || goalDefinitionDetailLoading;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && categories && types  && kpis && periodicities && definition && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ categoryList, goalTypeList, kpiList, periodicityList, goalDefinitionUpdate, goalDefinitionDetail }) => ({
    categoryList,
    goalTypeList,
    kpiList,
    periodicityList,
    goalDefinitionUpdate,
    goalDefinitionDetail
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    goalTypeListActions: bindActionCreators(goalTypeListActions, dispatch),
    kpiListActions: bindActionCreators(kpiListActions, dispatch),
    periodicityListActions: bindActionCreators(periodicityListActions, dispatch),
    goalDefinitionDetailActions: bindActionCreators(goalDefinitionDetailActions, dispatch),
    goalDefinitionUpdateActions: bindActionCreators(goalDefinitionUpdateActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Base)

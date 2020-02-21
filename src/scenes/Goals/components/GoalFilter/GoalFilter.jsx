import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import { Button, DatePicker, Select } from '../../../../components'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'

class GoalFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: props.category,
            team: props.team,
            collaborator: props.collaborator,
            year: props.year,
            start: props.end,
            end: props.end
        }
    }

    componentDidMount() {
        this.props.categoryListActions.getCategoryList();
        this.props.teamListActions.getTeamList();
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
        this.props.previousPeriodListActions.getPreviousPeriodList()
    }

    componentWillReceiveProps(props) {
        if (
            props.category != this.state.category
            || props.team != this.state.team
            || props.collaborator != this.state.collaborator
            | props.year != this.state.year
            || props.start != this.state.start
            || props.end != this.state.end
        ) {
            this.setState({
                ...this.state,
                category: props.category,
                team: props.team,
                collaborator: props.collaborator,
                year: props.year,
                start: props.start,
                end: props.end
            })
        }
    }

    handleChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        })
    };

    handleSubmit(model) {
        const category = model.category != null && model.category != -1 ? Number(model.category) : null;
        const team = model.team != null && model.team != -1 && model.team != undefined ? Number(model.team) : null;
        const collaborator = model.collaborator != null && model.collaborator != -1 && model.collaborator != undefined ? Number(model.collaborator) : null;
        var start = model.start;
        var end = model.end;
        if (start) {
            start.setHours(0, 0, 0, 0)
        }
        if (end) {
            end.setHours(23, 59, 59)
        }
        this.props.onChange(category, team, collaborator, model.year, start, end);
        this.props.onClose()
    }

    renderData() {
        const { account } = this.props.auth;
        const { categories } = this.props.categoryList;
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;
        const { teams } = this.props.teamList;
        const selectedTeam = this.state.team ? teams.filter(team => team.id == this.state.team)[0] : null;
        const collaborators = selectedTeam ? selectedTeam.collaborators : null;
        const periods = [currentPeriod].concat(previousPeriods);

        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.onClose}>
                    <Formsy onSubmit={this.handleSubmit.bind(this)}>
                        <DialogTitle>Filtres</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Select name='category' label='Catégorie' options={categories} emptyText='Toutes' optionValueName='id' optionTextName='name' fullWidth initial={this.state.category} onChange={this.handleChange('category').bind(this)} />
                                </Grid>
                                { account.role.code == 'A' && <Grid item xs={12}>
                                    <Select name='team' label='Équipe' options={teams} optionValueName='id' optionTextName='name' fullWidth initial={this.state.team} onChange={this.handleChange('team').bind(this)} emptyDisabled />
                                </Grid> }
                                { account.role.code != 'C' && collaborators && <Grid item xs={12}>
                                    <Select name='collaborator' label='Collaborateur' options={collaborators} emptyText='Tous' optionValueName='id' optionTextName='fullname' fullWidth initial={this.state.collaborator} onChange={this.handleChange('collaborator').bind(this)} />
                                </Grid> }
                                <Grid item xs={12}>
                                    <Select name={'year'} label={'Année'} options={periods} optionValueName={'id'} optionTextName={'name'} fullWidth emptyDisabled={true} initial={this.state.year ? this.state.year : currentPeriod.id} onChange={this.handleChange('year').bind(this)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <DatePicker name='start' label='Date de début' initial={this.state.start} format='dd/MM/yyyy' fullWidth clearable />
                                </Grid>
                                <Grid item xs={12}>
                                    <DatePicker name='end' label='Date de fin' initial={this.state.end} format='dd/MM/yyyy' fullWidth clearable />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.onClose} color='secondary'>Annuler</Button>
                            <Button type='submit'>Filtrer</Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        )
    }

    render() {
        const { account } = this.props.auth;
        const { categories } = this.props.categoryList;
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;
        const { teams } = this.props.teamList;

        return (
            <div>
                { account && categories && currentPeriod && previousPeriods && teams && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ auth, categoryList, teamList, currentPeriodDetail, previousPeriodList }) => ({
    auth,
    categoryList,
    teamList,
    currentPeriodDetail,
    previousPeriodList
});

const mapDispatchToProps = (dispatch) => ({
    categoryListActions: bindActionCreators(categoryListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalFilter)
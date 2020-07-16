import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import { Button, Select } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as teamListActions from '../../../../../../services/Teams/TeamList/actions'
import * as currentPeriodDetailActions from '../../../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../../../services/Periods/PreviousPeriodList/actions'

class CollaboratorRankingListFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: props.team,
            collaborator: props.collaborator,
            year: props.year,
            display: true
        }
    }

    componentDidMount() {
        this.props.teamListActions.getTeamList();
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
        this.props.previousPeriodListActions.getPreviousPeriodList()
    }

    componentWillReceiveProps(props) {
        if (
            props.team != this.state.team
            || props.collaborator != this.state.collaborator
            || props.year != this.state.year
        ) {
            this.setState({
                ...this.state,
                team: props.team,
                collaborator: props.collaborator,
                year: props.year
            })
        }
    }

    handleChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        })
    };

    handleTeamChange = value => {
        const { teams } = this.props.teamList;
        const team = teams.find(x => x.id == value);
        const collaboratorId = team && team.collaborators.length > 0 ? team.collaborators[0].id : null;

        this.setState({
            ...this.state,
            team: value,
            collaborator: collaboratorId,
            display: false
        }, () => {
            this.setState({
                display: true
            })
        })
    };

    handleSubmit(model) {
        const collaborator = model.collaborator != null && model.collaborator != -1 && model.collaborator != undefined ? Number(model.collaborator) : null;
        this.props.onChange(collaborator, model.year);
        this.props.onClose()
    }

    renderData() {
        const { account } = this.props.accountDetail;
        const { teams } = this.props.teamList;
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;
        const selectedTeam = this.state.team ? teams.filter(team => team.id == this.state.team)[0] : null;
        const collaborators = selectedTeam ? selectedTeam.collaborators : null;
        const periods = [currentPeriod].concat(previousPeriods);

        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.onClose}>
                    <Formsy onSubmit={this.handleSubmit.bind(this)}>
                        <DialogTitle>{Resources.COLLABORATOR_RANKING_LIST_FILTER_TITLE}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                { account.role.code == 'A' && <Grid item xs={12}>
                                    <Select name='team' label={Resources.COLLABORATOR_RANKING_LIST_FILTER_TEAM_LABEL} options={teams} optionValueName='id' optionTextName='name' emptyDisabled fullWidth initial={this.state.team} onChange={this.handleTeamChange.bind(this)} />
                                </Grid> }
                                { account.role.code != 'C' && this.state.display && collaborators && <Grid item xs={12}>
                                    <Select name='collaborator' label={Resources.COLLABORATOR_RANKING_LIST_FILTER_COLLABORATOR_LABEL} options={collaborators} optionValueName='id' optionTextName='fullname' emptyDisabled fullWidth initial={this.state.collaborator} onChange={this.handleChange('collaborator').bind(this)} />
                                </Grid> }
                                <Grid item xs={12}>
                                    <Select name={'year'} label={Resources.COLLABORATOR_RANKING_LIST_FILTER_PERIOD_LABEL} options={periods} optionValueName={'id'} optionTextName={'name'} emptyDisabled fullWidth initial={this.state.year} onChange={this.handleChange('year').bind(this)} />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.onClose} color='secondary'>{Resources.COLLABORATOR_RANKING_LIST_FILTER_CANCEL_BUTTON}</Button>
                            <Button type='submit'>{Resources.COLLABORATOR_RANKING_LIST_FILTER_SUBMIT_BUTTON}</Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        )
    }

    render() {
        const { account } = this.props.accountDetail;
        const { teams } = this.props.teamList;
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;

        return (
            <div>
                { account && teams && currentPeriod && previousPeriods && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, teamList, currentPeriodDetail, previousPeriodList }) => ({
    accountDetail,
    teamList,
    currentPeriodDetail,
    previousPeriodList
});

const mapDispatchToProps = (dispatch) => ({
    teamListActions: bindActionCreators(teamListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRankingListFilter)

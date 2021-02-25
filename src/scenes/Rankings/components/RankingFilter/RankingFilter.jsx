import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Formsy from 'formsy-react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import { Button, DatePicker, Select, Switch, Loader } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'

class RankingFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myTeam: props.myTeam || false
        }
    }

    componentDidMount() {
        this.props.teamListActions.getTeamList();
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
        this.props.previousPeriodListActions.getPreviousPeriodList()
    }

    componentWillReceiveProps(props) {
        if (
            props.myTeam != this.state.myTeam
        ) {
            this.setState({
                ...this.state,
                myTeam: props.myTeam
            })
        }
    }

    renderLoader() {
        return <Loader centered />
    }

    handleChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        })
    };

    handleSubmit(model) {
        this.props.onChange(model.team);
        this.props.onClose()
    }

    renderData() {
        const { account } = this.props.accountDetail;
        const { teams } = this.props.teamList;

        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.onClose}>
                    <Formsy onSubmit={this.handleSubmit.bind(this)}>
                        <DialogTitle>{Resources.CHALLENGE_FILTER_TITLE}</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Select name="team" options={ teams.sort((a, b) => a.id === _.get(account, 'team.id') && b.id !== _.get(account, 'team.id')  ? -1 : 1) } optionValueName='id' optionTextName='name' emptyText='Toutes les équipes' initial={this.props.team} label='équipe' />
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.onClose} color='secondary'>{Resources.CHALLENGE_FILTER_CANCEL_BUTTON}</Button>
                            <Button type='submit'>{Resources.CHALLENGE_FILTER_SUBMIT_BUTTON}</Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>
            </div>
        )
    }

    render() {
        const { account } = this.props.accountDetail;
        const { teams, loading } = this.props.teamList;
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;

        return (
            <div>
                { loading && this.renderLoader() }
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

export default connect(mapStateToProps, mapDispatchToProps)(RankingFilter)

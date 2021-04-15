import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core'
import { Button, DatePicker, Select, Loader } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as challengeTypeListActions from "../../../../services/ChallengeTypes/ChallengeTypeList/actions"
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'

class ChallengeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: props.team,
            collaborator: props.collaborator,
            type: props.type,
            year: props.year,
            start: props.end,
            end: props.end,
            type: props.type
        }
    }

    componentDidMount() {
        this.props.challengeTypeListActions.getUsableChallengeTypeList()
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
        this.props.previousPeriodListActions.getPreviousPeriodList()
    }

    componentWillReceiveProps(props) {
        if (
            props.team != this.state.team
            || props.collaborator != this.state.collaborator
            || props.year != this.state.year
            || props.start != this.state.start
            || props.end != this.state.end
            || props.type != this.state.type
        ) {
            this.setState({
                ...this.state,
                team: props.team,
                collaborator: props.collaborator,
                year: props.year,
                start: props.start,
                end: props.end,
                type: props.type
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
        const team = model.team != null && model.team != -1 && model.team != undefined ? Number(model.team) : null;
        const type = model.type != null && model.type != -1 && model.type != undefined ? Number(model.type) : null;

        var start = model.start;
        var end = model.end;
        if (start) {
            start.setHours(0, 0, 0, 0)
        }
        if (end) {
            end.setHours(23, 59, 59)
        }
        this.props.onChange(this.state.team, this.state.collaborator, model.year, start, end, type);
        this.props.onClose()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { account } = this.props.accountDetail;
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods, loading } = this.props.previousPeriodList;
        const {types} = this.props.challengeTypeList;
        const periods = [currentPeriod].concat(previousPeriods);
        return (
            <div>
                <Dialog open={this.props.open} onClose={this.props.onClose}>
                    <Formsy onSubmit={this.handleSubmit.bind(this)}>
                        <DialogTitle>{Resources.CHALLENGE_FILTER_TITLE}</DialogTitle>
                        <DialogContent>
                            { loading && this.renderLoader() }
                            { !loading && (

                              <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                      <Select name='type' label={Resources.CHALLENGE_FILTER_TYPE_LABEL} options={types} optionValueName={'id'} optionTextName={'name'} fullWidth initial={this.state.type} emptyText={Resources.CHALLENGE_FILTER_COLLABORATOR_ALL_OPTION} onChange={this.handleChange('type').bind(this)}/>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <Select name={'year'} label={Resources.CHALLENGE_FILTER_PERIOD_LABEL} options={periods} optionValueName={'id'} optionTextName={'name'} emptyDisabled fullWidth initial={this.state.year} onChange={this.handleChange('year').bind(this)} />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <DatePicker name='start' label={Resources.CHALLENGE_FILTER_START_LABEL} initial={this.state.start} format='dd/MM/yyyy' fullWidth clearable />
                                  </Grid>
                                  <Grid item xs={12}>
                                      <DatePicker name='end' label={Resources.CHALLENGE_FILTER_END_LABEL} initial={this.state.end} format='dd/MM/yyyy' fullWidth clearable />
                                  </Grid>
                              </Grid>
                            )}
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
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;
        return (
            <div>

                { account && currentPeriod && previousPeriods && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, challengeTypeList, currentPeriodDetail, previousPeriodList }) => ({
    accountDetail,
    challengeTypeList,
    currentPeriodDetail,
    previousPeriodList
});

const mapDispatchToProps = (dispatch) => ({
    challengeTypeListActions: bindActionCreators(challengeTypeListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeFilter)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import _ from 'lodash'
import { Dialog, DialogActions, DialogContent, DialogTitle,Tooltip, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Chip, Avatar } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { Button, DatePicker, Select, Loader, IconButton } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'

const styles = {
  panel: {
      backgroundColor: 'initial',
      borderRadius: 'initial',
      boxShadow: 'none'
  },
  panelSummary: {
      padding: 'initial'
  },
  panelDetails: {
      padding: 'initial'
  },
  filterButtons: {
      marginTop: 10
  },
  filterIcon: {
    color: '#555555',
    marginRight: 5
  },
  filterChip: {
    marginRight: 5
  }
}

class ChallengeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: props.team,
            collaborator: props.collaborator,
            year: props.year,
            start: props.end,
            end: props.end
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
            || props.start != this.state.start
            || props.end != this.state.end
        ) {
            this.setState({
                ...this.state,
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
        this.props.onChange(team, collaborator, model.year, start, end);
        this.props.onClose()
    }

    handleDeleteCollaborator = () => {
      const { team, year, start, end } = this.state

      this.props.onChange(team, null, year, start, end);
      this.props.onClose()
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { account } = this.props.accountDetail;
        const { teams, loading } = this.props.teamList;
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;
        const selectedTeam = this.state.team ? teams.filter(team => team.id == parseInt(this.state.team))[0] : null;
        const collaborators = selectedTeam ? selectedTeam.collaborators : null;
        const selectedCollaborator = collaborators ? collaborators.filter(collaborator => collaborator.id === parseInt(this.state.collaborator))[0] : null;
        const periods = [currentPeriod].concat(previousPeriods);
        const chipAvatar = <Avatar src={_.get(selectedCollaborator, 'photo')}/>

        return (
            <div>
                <ExpansionPanel className={this.props.classes.panel}>
                  <ExpansionPanelSummary>
                    <div>
                      <Tooltip title={Resources.TEAM_CHALLENGE_LIST_FILTER_BUTTON}>
                          <IconButton size='small' className={this.props.classes.filterIcon}><FontAwesomeIcon icon={faSlidersH} /></IconButton>
                      </Tooltip>
                      { selectedTeam && (
                        <Chip
                          size="small"
                          label={selectedTeam.name}
                          style={{borderColor: _.get(selectedTeam, 'color.hex')}}
                          variant="outlined"
                          className={this.props.classes.filterChip}
                        />
                      ) }
                      { selectedCollaborator && (
                        <Chip
                          size="small"
                          label={selectedCollaborator.fullname}
                          onDelete={this.handleDeleteCollaborator}
                          avatar={ chipAvatar }
                          style={{borderColor: _.get(selectedCollaborator, 'team.color.hex')}}
                          variant="outlined"
                          className={this.props.classes.filterChip}
                        />
                      )  }
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Formsy onSubmit={this.handleSubmit.bind(this)}>
                        <Grid container spacing={2}>
                            { account.role.code == 'A' && <Grid item xs={3}>
                                <Select name='team' label={Resources.CHALLENGE_FILTER_TEAM_LABEL} options={teams} optionValueName='id' optionTextName='name' emptyDisabled fullWidth initial={this.state.team} onChange={this.handleChange('team').bind(this)} />
                            </Grid> }
                            { account.role.code != 'C' && collaborators && <Grid item xs={3}>
                                <Select name='collaborator' label={Resources.CHALLENGE_FILTER_COLLABORATOR_LABEL} options={collaborators} emptyText={Resources.CHALLENGE_FILTER_COLLABORATOR_ALL_OPTION} optionValueName='id' optionTextName='fullname' fullWidth initial={this.state.collaborator} onChange={this.handleChange('collaborator').bind(this)} />
                            </Grid> }
                            <Grid item xs={3}>
                                <Select name={'year'} label={Resources.CHALLENGE_FILTER_PERIOD_LABEL} options={periods} optionValueName={'id'} optionTextName={'name'} emptyDisabled fullWidth initial={this.state.year} onChange={this.handleChange('year').bind(this)} />
                            </Grid>
                            <Grid item xs={3}>
                                <DatePicker name='start' label={Resources.CHALLENGE_FILTER_START_LABEL} initial={this.state.start} format='dd/MM/yyyy' fullWidth clearable />
                            </Grid>
                            <Grid item xs={3}>
                                <DatePicker name='end' label={Resources.CHALLENGE_FILTER_END_LABEL} initial={this.state.end} format='dd/MM/yyyy' fullWidth clearable />
                            </Grid>
                        </Grid>
                        <Grid className={this.props.classes.filterButtons}>
                          <Button onClick={this.props.onClose} color='secondary'>{Resources.CHALLENGE_FILTER_CANCEL_BUTTON}</Button>
                          <Button type='submit'>{Resources.CHALLENGE_FILTER_SUBMIT_BUTTON}</Button>
                        </Grid>
                    </Formsy>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ChallengeFilter))

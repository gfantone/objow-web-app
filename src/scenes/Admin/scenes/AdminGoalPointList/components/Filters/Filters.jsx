import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import _ from 'lodash'
import { Tooltip, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Chip } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Button, DatePicker, Select, Loader, IconButton, Avatar } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as teamListActions from '../../../../../../services/Teams/TeamList/actions'
import * as currentPeriodDetailActions from '../../../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../../../services/Periods/PreviousPeriodList/actions'


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
      padding: 'initial',
  },
  filterButtons: {
      marginTop: 10
  },
  filterIcon: {
    color: '#555555',
    marginRight: 5,
    alignItems: 'flex-start'
  },
  filterChip: {
    marginRight: 5,
    marginBottom: 5
  },
  expansionPanelSummary: {
    '& > .MuiExpansionPanelSummary-content': {
      flexDirection: 'row',
      width: '100%',
    }
  },
  filterChips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterForm: {
    width: '100%',
  }
}

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            team: props.team,
            collaborator: props.collaborator,
            expandIcon: faChevronDown,
            initialized: false
        }
        this.filterForm = React.createRef();
        this.panel = React.createRef();
    }

    componentDidMount() {
        // this.props.categoryListActions.getActiveCategoryList();
        this.props.teamListActions.getTeamList();
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
        this.props.previousPeriodListActions.getPreviousPeriodList()
    }


    componentWillReceiveProps(props) {
        if (
            props.team != this.state.team
            || props.collaborator != this.state.collaborator
            || props.emptyTeam != this.state.emptyTeam
        ) {
            this.setState({
                ...this.state,
                team: props.team,
                collaborator: props.collaborator,
                emptyTeam: props.emptyTeam,
            })
        }
    }

    handleChange = name => value => {
        this.setState({
            ...this.state,
            [name]: value
        }, () => this.filterForm.current.submit())
    };

    resetCollaborator = (callback) => {
        this.setState({
            ...this.state,
            collaborator: null
        }, callback)
    }


    handleSubmit(model) {
        const team = model.team != null && model.team != -1 && model.team != undefined ? Number(model.team) : null;
        const collaborator = model.collaborator != null && model.collaborator != -1 && model.collaborator != undefined ? Number(model.collaborator) : null;

        this.onExpand(null, false, () => {
          this.props.onChange(team, collaborator);
          this.panel.current.click()
          // this.props.onClose()
        })

    }

    handleDeleteCollaborator = () => {
      const { team, collaborator } = this.state;

      this.props.onChange(team, null);
      // this.props.onClose()
    }

    handleDeleteTeam = (callback) => {
      const { team, collaborator } = this.state;

      this.props.onChange(null, null);
      // this.props.onClose()
    }

    onExpand = (event, expanded, callback) => {
      this.setState({
        ...this.state,
        expandIcon: expanded === true ? faChevronUp : faChevronDown
      }, callback)
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
        const chipAvatar = <Avatar src={_.get(selectedCollaborator, 'photo')} entityId={ _.get(selectedCollaborator, 'id') } fallbackName={ _.get(selectedCollaborator, 'fullname') } fontSize={ 10 } />
        const selectSize = 6

        // if(!this.state.team && !this.props.emptyTeam && teams.length > 0) {
        //   this.props.onChange(_.toString(teams[0].id))
        // }
        const deleteTeam = selectedCollaborator ? {} : { onDelete: this.handleDeleteTeam }
        return (
            <ExpansionPanel className={this.props.classes.panel} onChange={this.onExpand}>
              <ExpansionPanelSummary className={this.props.classes.expansionPanelSummary} ref={this.panel}>
                  <Tooltip title={Resources.TEAM_CHALLENGE_LIST_FILTER_BUTTON}>
                      <IconButton size='small' className={this.props.classes.filterIcon}><FontAwesomeIcon icon={this.state.expandIcon} /></IconButton>
                  </Tooltip>
                  <div className={this.props.classes.filterChips}>
                    { selectedTeam && _.includes(['A', 'M'], account.role.code) && (
                      <Chip
                        size="small"
                        label={_.includes(['M'], account.role.code) ? Resources.CHALLENGE_FILTER_MY_TEAM_LABEL : selectedTeam.name}
                        { ...deleteTeam }
                        style={{borderColor: _.get(selectedTeam, 'color.hex')}}
                        variant="outlined"
                        className={this.props.classes.filterChip}
                        />
                    ) }
                    { !selectedTeam && (
                      <Chip
                        size="small"
                        label={Resources.GOAL_FILTER_GLOBAL_CHIP}
                        variant="outlined"
                        className={this.props.classes.filterChip}
                      />
                    ) }
                    { selectedCollaborator && _.includes(['M', 'A'], account.role.code) && (
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
                <Formsy onSubmit={this.handleSubmit.bind(this)} className={this.props.classes.filterForm} ref={this.filterForm}>
                    <Grid container spacing={2}>
                        { account.role.code == 'A' &&
                          <Grid item xs={12} sm={selectSize}>
                              <Select
                                name='team'
                                label={ Resources.CHALLENGE_FILTER_TEAM_LABEL }
                                options={teams}
                                optionValueName='id'
                                optionTextName='name'
                                emptyText={ Resources.GOAL_FILTER_ALL_TEAM_LABEL }
                                
                                fullWidth
                                updateInitial
                                initial={ selectedCollaborator && selectedCollaborator.team.id || this.state.team }
                                onChange={(value) => {
                                  this.resetCollaborator(() => this.handleChange('team')(value))
                                }}
                              />
                          </Grid>
                        }

                        { account.role.code != 'C' && collaborators && selectedTeam &&
                          <Grid item xs={12} sm={selectSize}>
                              <Select
                                name='collaborator'
                                label={Resources.CHALLENGE_FILTER_COLLABORATOR_LABEL}
                                options={collaborators}
                                emptyText={Resources.CHALLENGE_FILTER_COLLABORATOR_ALL_OPTION}
                                optionValueName='id'
                                optionTextName='fullname'
                                fullWidth
                                initial={this.state.collaborator}
                                onChange={this.handleChange('collaborator').bind(this)}
                                />
                          </Grid>
                        }
                    </Grid>
                </Formsy>
              </ExpansionPanelDetails>
            </ExpansionPanel>
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

const mapStateToProps = ({ accountDetail, teamList, currentPeriodDetail, previousPeriodList, }) => ({
    accountDetail,
    teamList,
    currentPeriodDetail,
    previousPeriodList,
});

const mapDispatchToProps = (dispatch) => ({
    teamListActions: bindActionCreators(teamListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filters))

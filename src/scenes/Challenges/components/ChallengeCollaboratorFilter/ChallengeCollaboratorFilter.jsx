import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import _ from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Chip,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  DatePicker,
  Select,
  Loader,
  IconButton,
  Avatar,
  Dropdown,
  ProgressButton,
  DefaultText,
  Collaborator,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl, injectIntl } from 'react-intl';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as teamGroupTreeAction from '../../../../services/TeamGroups/TeamGroupTree/actions';
import * as teamCollaboratorListActions from '../../../../services/Teams/TeamCollaboratorList/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions';
import * as challengeParticipantListActions from '../../../../services/ChallengeParticipants/ChallengeParticipantList/actions';

const styles = (theme) => {
  return {
    panel: {
      backgroundColor: 'initial',
      borderRadius: 'initial',
      // width: '100%',
      boxShadow: 'none',
    },
    panelSummary: {
      padding: 'initial',
    },
    panelDetails: {
      padding: 'initial',
      flexWrap: 'wrap',
    },
    filterButtons: {
      marginTop: 10,
    },
    filterIcon: {
      color: '#555555',
      marginRight: 5,
      alignItems: 'flex-start',
    },
    filterChip: {
      marginRight: 5,
      marginBottom: 5,
    },
    expansionPanelSummary: {
      '& > .MuiExpansionPanelSummary-content': {
        flexDirection: 'row',
      },
    },
    filterChips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    filterForm: {
      width: '100%',
    },
    loader: {},
    activeColorPrimary: {
      color: theme.palette.primary.main,
    },
  };
};

class ChallengeCollaboratorFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: props.team,
      teamGroup: props.teamGroup,
      collaborator: props.collaborator,
      year: props.year,
      start: props.end,
      end: props.end,
      type: props.type,
      expandIcon: faChevronDown,
      filterOpen: false,
      search: '',
      searchCollaborator: [],
    };
    this.filterForm = React.createRef();
    this.panel = React.createRef();
    this.abortController = new AbortController();
  }

  fetchData = () => {
    const { account } = this.props.accountDetail;
    this.props.teamGroupTreeAction.getTeamGroupTree(
      false,
      false,
      this.abortController
    );

    if (!this.props.disableTeams) {
      this.props.teamListActions.getTeamList({
        disableCollaborators: true,
        teamGroup: this.state.teamGroup,
        abortController: this.abortController,
      });
    }

    if (this.state.team && !this.props.disableCollaborators) {
      this.props.teamCollaboratorListActions.getTeamCollaboratorList({
        teamId: this.state.team,
        collaboratorIds: this.props.scopeCollaborators,
        listCollaborators: 'true',
        abortController: this.abortController,
      });
    }

    if (this.state.teamGroup && !this.props.disableCollaborators) {
      // this.props.teamCollaboratorListActions.getTeamCollaboratorList({teamGroupId: this.state.teamGroup, collaboratorIds: this.props.scopeCollaborators, listCollaborators: 'true'})
    }

    if (
      (!this.state.teamGroup,
      !this.state.team &&
        _.get(account, 'team.id') &&
        !this.props.disableCollaborators)
    ) {
      this.props.teamCollaboratorListActions.getTeamCollaboratorList({
        teamId: _.get(account, 'team.id'),
        collaboratorIds: this.props.scopeCollaborators,
        listCollaborators: 'true',
        abortController: this.abortController,
      });
    }
  };

  componentDidMount() {
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.previousPeriodListActions.getPreviousPeriodList();
    this.fetchData();
    // this.props.teamGroupTreeAction.getTeamGroupTree()
    //
    // if (!this.props.disableTeams) {
    //   this.props.teamListActions.getTeamList({disableCollaborators: true});
    // }
    //
    // if(this.state.team && !this.props.disableCollaborators) {
    //   this.props.teamCollaboratorListActions.getTeamCollaboratorList({teamId: this.state.team})
    // }
    //
    // if(this.state.teamGroup && !this.props.disableCollaborators) {
    //   this.props.teamCollaboratorListActions.getTeamCollaboratorList({teamGroupId: this.state.teamGroup})
    // }
    // this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    // this.props.previousPeriodListActions.getPreviousPeriodList()
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  isReady = () => {
    const { teams, loading } = this.props.teamList;

    return !this.state.ready && !loading;
  };

  componentWillReceiveProps(props) {
    const { teams, loading } = this.props.teamList;

    const selectedTeam = props.team
      ? teams.filter((team) => team.id == parseInt(props.team))[0]
      : null;
    const ready = this.isReady();
    // console.log("selectedTeam", selectedTeam);
    const { loading: teamsLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupLoading } = this.props.teamGroupTree;
    const { loading: collaboratorsLoading } = this.props.teamCollaboratorList;
    const dataLoading =
      teamsLoading || teamGroupLoading || collaboratorsLoading;
    const teamGroups = this.teamGroupTreeToList(teamGroup);
    if (!props.teamGroup && !this.state.teamGroup && selectedTeam) {
      this.setState({
        ...this.state,
        teamGroup: _.get(selectedTeam, 'parent.id'),
      });
    }
    if (
      !props.teamGroup &&
      !this.state.teamGroup &&
      !selectedTeam &&
      !teamsLoading &&
      teamGroups.length > 0 &&
      teamGroups[0].id
    ) {
      this.setState(
        {
          ...this.state,
          teamGroup: teamGroups[0].id,
        },
        () =>
          this.onChangeAll(null, null, null, null, null, null, teamGroups[0].id)
      );
    }

    if (props.teamGroup && props.teamGroup !== this.props.teamGroup) {
      // this.props.teamCollaboratorListActions.getTeamCollaboratorList({teamGroupId: props.teamGroup, collaboratorIds: this.props.scopeCollaborators, listCollaborators: 'true'})
    } else {
      if (props.team && props.team !== this.props.team) {
        this.props.teamCollaboratorListActions.getTeamCollaboratorList({
          teamId: props.team,
          collaboratorIds: this.props.scopeCollaborators,
          listCollaborators: 'true',
        });
      }
    }

    if (
      !this.state.initialized &&
      (props.team != this.state.team ||
        props.teamGroup != this.state.teamGroup ||
        props.collaborator != this.state.collaborator ||
        props.year != this.state.year ||
        props.end != this.state.end ||
        props.start != this.state.start ||
        props.type != this.state.type)
    ) {
      this.setState({
        ...this.state,
        team: props.team,
        teamGroup: props.teamGroup || this.state.teamGroup,
        collaborator: props.collaborator,
        year: props.year,
        start: props.start,
        end: props.end,
        type: props.type,
      });
      if (!this.state.initialized) {
        this.setState({
          ...this.state,
          initialized: true,
        });
      }
    }

    // if(_.get(teamGroup, 'id') && !this.state.teamGroup){
    //   this.setState({
    //     ...this.state,
    //     teamGroup: _.get(teamGroup, 'id')
    //   })
    // }
    if (ready) {
      this.setState(
        {
          ...this.state,
          ready: true,
        },
        this.props.onLoaded
      );
    }
  }

  handleChange = (name) => (value) => {
    this.setState(
      {
        ...this.state,
        [name]: value,
      },
      () => this.filterForm.current.submit()
    );
  };

  // handleChangeTeamGroup = (value) => {
  //   this.setState(
  //     {
  //       ...this.state,
  //       teamGroup: value,
  //       team: null,
  //       collaborator: null,
  //     },
  //     () => this.filterForm.current.submit()
  //   );
  // };

  resetCollaborator = (callback) => {
    this.setState(
      {
        ...this.state,
        collaborator: null,
      },
      callback
    );
  };
  resetTeam = (callback) => {
    this.setState(
      {
        ...this.state,
        team: null,
        collaborator: null,
      },
      callback
    );
  };

  handleSubmit(model) {
    // const team = model.team != null && model.team != -1 && model.team != undefined ? Number(model.team) : null;
    // const teamGroup = model.teamGroup != null && model.teamGroup != -1 && model.teamGroup != undefined ? Number(model.teamGroup) : this.state.teamGroup;
    // const collaborator = model.collaborator != null && model.collaborator != -1 && model.collaborator != undefined ? Number(model.collaborator) : null;

    // var start = model.start;
    const { year, end, start, team, teamGroup, collaborator } = this.state;
    // var end = model.end;
    // if (start) {
    //     start.setHours(0, 0, 0, 0)
    // }
    // if (end) {
    //     end.setHours(23, 59, 59)
    // }
    this.setState(
      {
        ...this.state,
        // changeSelectionLoading: true,
        filterOpen: false,
      },
      () => {
        this.onExpand(null, false, () => {
          this.onChangeAll(
            team,
            collaborator,
            year,
            start,
            end,
            this.state.type,
            teamGroup
          );

          this.setFilterOpen(false);
          if (this.props.onClose) {
            this.props.onClose();
          }
        });
      }
    );
  }

  handleDeleteCollaborator = () => {
    const { team, teamGroup, year, start, end, type } = this.state;

    const { collaborators, loading: collaboratorsLoading } =
      this.props.teamCollaboratorList;
    const selectedCollaborator = collaborators
      ? collaborators.filter(
          (collaborator) =>
            collaborator.id === parseInt(this.props.collaborator)
        )[0]
      : null;

    this.onChangeAll(
      _.get(selectedCollaborator, 'team.id'),
      null,
      year,
      start,
      end,
      type,
      teamGroup
    );

    this.setFilterOpen(false);
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  onChangeTeamGroupAndTeem = (team, teamGroupId) => {
    const { teams: fetchedTeams, loading: teamsLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupLoading } = this.props.teamGroupTree;
    const { collaborators, loading: collaboratorsLoading } =
      this.props.teamCollaboratorList;
    const selectedCollaborator = collaborators
      ? collaborators.filter(
          (collaborator) =>
            collaborator.id ===
            parseInt(this.state.collaborator || this.props.collaborator)
        )[0]
      : null;

    const teams = fetchedTeams.filter(
      (t) =>
        _.compact(this.props.scopeTeams).length === 0 ||
        this.props.scopeTeams.indexOf(t.id) >= 0
    );

    const selectedTeam =
      this.state.team || this.props.team || selectedCollaborator
        ? teams.filter(
            (team) =>
              team.id ==
              parseInt(
                _.get(selectedCollaborator, 'team.id') ||
                  this.state.team ||
                  this.props.team
              )
          )[0]
        : null;

    const teamGroups = this.teamGroupTreeToList(teamGroup).filter(
      (tg) =>
        _.compact(this.props.scopeTeams).length === 0 ||
        _.intersection(tg.allTeamIds, this.props.scopeTeams).length > 0
    );

    const selectedTeamGroup =
      this.state.teamGroup || this.props.teamGroup || selectedTeam
        ? teamGroups.filter(
            (teamGroup) =>
              teamGroup.id ==
              parseInt(
                _.get(selectedTeam, 'parent.id') ||
                  this.state.teamGroup ||
                  this.props.teamGroup
              )
          )[0]
        : selectedTeam
        ? selectedTeam.parent
        : null;

    this.props.onChangeTeamGroupAndTeem(selectedTeam, selectedTeamGroup);
  };
  onChangeAll = (teamId, collaborator, year, start, end, type, teamGroupId) => {
    if (this.props.onChange) {
      this.props.onChange(
        teamId,
        collaborator,
        year,
        start,
        end,
        type,
        teamGroupId
      );
    }
    if (this.props.onChangeTeamGroupAndTeem) {
      this.onChangeTeamGroupAndTeem(teamId, teamGroupId);
    }
  };

  handleDeleteTeam = () => {
    const { teams, loading } = this.props.teamList;
    const { team, teamGroup, year, start, end, type } = this.state;
    const selectedTeam = this.state.team
      ? teams.filter((team) => team.id == parseInt(this.state.team))[0]
      : null;

    this.setState(
      {
        ...this.state,
        team: null,
        collaborator: null,
        teamGroup: _.get(selectedTeam, 'parent.id'),
      },
      () => {
        this.onChangeAll(
          null,
          null,
          year,
          start,
          end,
          type,
          teamGroup || _.get(selectedTeam, 'parent.id')
        );

        this.setFilterOpen(false);
        if (this.props.onClose) {
          this.props.onClose();
        }
      }
    );
  };

  onExpand = (event, expanded, callback) => {
    this.setState(
      {
        ...this.state,
        expandIcon: expanded ? faChevronUp : faChevronDown,
      },
      callback
    );
  };
  renderLoader() {
    return <Loader centered />;
  }

  teamGroupTreeToList = (teamGroup, level = 0) => {
    return _.flatten([
      Object.assign({}, teamGroup, {
        level,
        selectName: `${'\xA0\xA0\xA0\xA0'.repeat(level)}${
          level > 0 ? '‣' : ''
        } ${_.get(teamGroup, 'name', [])}`,
      }),
      ..._.get(teamGroup, 'teamGroups', []).map((child) =>
        this.teamGroupTreeToList(child, level + 1)
      ),
    ]);
  };

  setFilterOpen = (value) => {
    const { teams, loading: teamsLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupLoading } = this.props.teamGroupTree;
    const { collaborators, loading: collaboratorsLoading } =
      this.props.teamCollaboratorList;
    const loading = teamsLoading || teamGroupLoading || collaboratorsLoading;
    this.setState(
      {
        ...this.state,
        filterOpen: value,
      },
      () => {
        // if we are opening, trigger fetch data
        if (
          value &&
          !loading &&
          collaborators.length === 0 &&
          teamGroup.length === 0 &&
          teams.length === 0
        ) {
          this.fetchData();
        }
      }
    );
  };

  handleChangeTeamGroup = (teamGroup) => {
    this.props.teamListActions.getTeamList({
      disableCollaborators: true,
      teamGroup: teamGroup,
    });
    // this.props.teamCollaboratorListActions.getTeamCollaboratorList({teamGroupId: teamGroup, collaboratorIds: this.props.scopeCollaborators})
    this.setState({
      ...this.state,
      changeSelectionLoading: false,
      teamGroup: teamGroup,
      team: null,
      collaborator: null,
    });
    // this.props.onChangeTeamGroup(teamGroup);
    // console.log("filter", teamGroup);
  };

  handleChangeTeam = (team) => {
    this.setState(
      {
        ...this.state,
        changeSelectionLoading: false,
        team,
        collaborator: null,
      },
      () => {
        if (team) {
          this.props.teamCollaboratorListActions.getTeamCollaboratorList({
            teamId: team,
            collaboratorIds: this.props.scopeCollaborators,
            listCollaborators: true,
          });
        } else if (this.state.teamGroup) {
          // this.props.teamCollaboratorListActions.getTeamCollaboratorList({teamGroupId: this.state.teamGroup, collaboratorIds: this.props.scopeCollaborators, listCollaborators: true})
        }
      }
    );
  };

  handleChangeCollaborator = (collaborator) => {
    const { teams, loading: teamsLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupLoading } = this.props.teamGroupTree;
    const { collaborators, loading: collaboratorsLoading } =
      this.props.teamCollaboratorList;
    const selectedCollaborator = collaborators
      ? collaborators.filter((c) => c.id === parseInt(collaborator))[0]
      : null;
    this.setState({
      ...this.state,
      changeSelectionLoading: false,
      team: _.get(selectedCollaborator, 'team.id'),
      collaborator,
    });
  };

  renderData() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;

    const { teams: fetchedTeams, loading: teamsLoading } = this.props.teamList;
    const { teamGroup, loading: teamGroupLoading } = this.props.teamGroupTree;
    const { collaborators, loading: collaboratorsLoading } =
      this.props.teamCollaboratorList;
    const loading = teamsLoading || teamGroupLoading || collaboratorsLoading;
    // Get teams according to scope (challenge participant) if given
    const teams = fetchedTeams.filter(
      (t) =>
        _.compact(this.props.scopeTeams).length === 0 ||
        this.props.scopeTeams.indexOf(t.id) >= 0
    );

    const teamGroups = this.teamGroupTreeToList(teamGroup).filter(
      (tg) =>
        _.compact(this.props.scopeTeams).length === 0 ||
        _.intersection(tg.allTeamIds, this.props.scopeTeams).length > 0
    );

    const selectedCollaborator = collaborators
      ? collaborators.filter(
          (collaborator) =>
            collaborator.id ===
            parseInt(this.state.collaborator || this.props.collaborator)
        )[0]
      : null;
    const selectedTeam =
      this.state.team || this.props.team || selectedCollaborator
        ? teams.filter(
            (team) =>
              team.id ==
              parseInt(
                _.get(selectedCollaborator, 'team.id') ||
                  this.state.team ||
                  this.props.team
              )
          )[0]
        : null;

    // const defaultTeamGroup = _.get(teamGroups, '[0].id', null) ? teamGroups[0] : null

    const selectedTeamGroup =
      this.state.teamGroup || this.props.teamGroup || selectedTeam
        ? teamGroups.filter(
            (teamGroup) =>
              teamGroup.id ==
              parseInt(
                this.state.teamGroup ||
                  _.get(selectedTeam, 'parent.id') ||
                  this.props.teamGroup
              )
          )[0]
        : selectedTeam
        ? selectedTeam.parent
        : null;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    const periods = [currentPeriod].concat(previousPeriods);
    const chipAvatar = (
      <Avatar
        src={
          this.props.searchedCollaborator
            ? this.props.searchedCollaborator.photo
            : _.get(selectedCollaborator, 'photo')
        }
        entityId={_.get(selectedCollaborator, 'id')}
        fallbackName={_.get(selectedCollaborator, 'fullname')}
        fontSize={10}
      />
    );

    if (account.role.code == 'C') {
      return <div />;
    }
    const hasFilter = selectedTeam || selectedTeamGroup || selectedCollaborator;

    const isCollaborator = account.role.code === 'C';
    const isAdministrator = account.role.code === 'A';
    const isSuperManager = account.role.code === 'S';
    const isManager = account.role.code === 'M';

    return (
      <div>
        <Dropdown
          buttonContent={
            <div>
              <FontAwesomeIcon
                icon={this.state.filterOpen ? faChevronUp : faChevronDown}
              />
              <span style={{ marginLeft: 5 }}>
                {this.props.buttonText ||
                  intl.formatMessage({ id: 'common.selection' })}
              </span>
            </div>
          }
          position='right'
          active={hasFilter}
          open={this.state.filterOpen}
          setOpen={this.setFilterOpen}
          contentWidth={this.props.dropdownWidth}
          disabled={
            (isManager || isCollaborator) && this.props.disableCollaborators
          }
          zIndex={300}
        >
          <Formsy
            onSubmit={this.handleSubmit.bind(this)}
            className={this.props.classes.filterForm}
            ref={this.filterForm}
          >
            <Grid container spacing={1} direction='column'>
              <Grid item>
                <Grid container spacing={2}>
                  {(isAdministrator || isSuperManager) && (
                    <Grid item xs={12} sm={4}>
                      <Select
                        name='teamGroup'
                        label={
                          <span>
                            <span>
                              {intl.formatMessage({
                                id: 'filter.team_group_label',
                              })}
                            </span>
                            <span>
                              {teamGroupLoading && (
                                <CircularProgress
                                  style={{
                                    width: 20,
                                    height: 20,
                                    marginLeft: 10,
                                    marginBottom: -5,
                                  }}
                                  className={
                                    this.props.classes.activeColorPrimary
                                  }
                                />
                              )}
                            </span>
                          </span>
                        }
                        options={teamGroups}
                        optionValueName='id'
                        optionTextName='selectName'
                        emptyDisabled
                        fullWidth
                        initial={
                          selectedTeamGroup ? selectedTeamGroup.id : null
                        }
                        onChange={(value) => {
                          this.handleChangeTeamGroup(value);
                          // this.resetTeam(() => this.handleChange('teamGroup')(value))
                        }}
                        disabled={teamGroupLoading}
                      />
                    </Grid>
                  )}
                  {(isAdministrator || isSuperManager) &&
                    !this.props.disableTeams && (
                      <Grid item xs={12} sm={4}>
                        <Select
                          name='team'
                          label={
                            <span>
                              <span>
                                {intl.formatMessage({
                                  id: 'filter.team_label',
                                })}
                              </span>
                              <span>
                                {teamsLoading && (
                                  <CircularProgress
                                    style={{
                                      width: 20,
                                      height: 20,
                                      marginLeft: 10,

                                      marginBottom: -5,
                                    }}
                                    className={
                                      this.props.classes.activeColorPrimary
                                    }
                                  />
                                )}
                              </span>
                            </span>
                          }
                          options={teams.filter((t) =>
                            selectedTeamGroup
                              ? selectedTeamGroup.allTeamIds.indexOf(t.id) >= 0
                              : true
                          )}
                          optionValueName='id'
                          optionTextName='name'
                          emptyText={intl.formatMessage({
                            id: 'filter.team_all_option',
                          })}
                          fullWidth
                          initial={selectedTeam ? selectedTeam.id : null}
                          onChange={(value) => {
                            this.handleChangeTeam(value);
                            // this.resetCollaborator(() => this.handleChange('team')(value))
                          }}
                          disabled={teamsLoading}
                        />
                      </Grid>
                    )}
                  {!isCollaborator &&
                    collaborators &&
                    !this.props.disableCollaborators && (
                      <Grid item xs={12} {...(!isManager && { sm: 4 })}>
                        <Select
                          name='collaborator'
                          style={isManager && { width: 200 }}
                          label={
                            <span>
                              <span>
                                {intl.formatMessage({
                                  id: 'filter.collaborator_label',
                                })}
                              </span>
                              <span>
                                {collaboratorsLoading && (
                                  <CircularProgress
                                    style={{
                                      width: 20,
                                      height: 20,
                                      marginLeft: 10,

                                      marginBottom: -5,
                                    }}
                                    className={
                                      this.props.classes.activeColorPrimary
                                    }
                                  />
                                )}
                              </span>
                            </span>
                          }
                          options={collaborators.filter((c) =>
                            selectedTeam
                              ? c.team.id === selectedTeam.id
                              : selectedTeamGroup
                              ? selectedTeamGroup.allTeamIds.indexOf(
                                  c.team.id
                                ) >= 0
                              : true
                          )}
                          emptyText={intl.formatMessage({
                            id: 'filter.collaborator_all_option',
                          })}
                          optionValueName='id'
                          optionTextName='fullname'
                          fullWidth
                          initial={
                            selectedCollaborator
                              ? selectedCollaborator.id
                              : null
                          }
                          onChange={(value) =>
                            this.handleChangeCollaborator(value)
                          }
                          disabled={collaboratorsLoading}
                        />
                      </Grid>
                    )}
                </Grid>
              </Grid>
              <Grid item style={{ alignSelf: 'end' }}>
                <ProgressButton
                  type='submit'
                  loading={this.state.changeSelectionLoading}
                  text={intl.formatMessage({ id: 'common.submit' })}
                />
              </Grid>
            </Grid>
          </Formsy>
        </Dropdown>

        <div className={this.props.classes.filterChips}>
          {(this.props.searchedCollaborator || selectedTeamGroup) && (
            <Chip
              size='small'
              label={
                this.props.searchedCollaborator
                  ? this.props.searchedCollaborator.team.parent.name
                  : selectedTeamGroup.name
              }
              style={{ borderColor: '#333' }}
              variant='outlined'
              className={this.props.classes.filterChip}
            />
          )}
          {(this.props.searchedCollaborator ||
            (selectedTeam && !this.props.disableTeams)) && (
            <Chip
              size='small'
              label={
                isManager || account.role.code === ''
                  ? intl.formatMessage({ id: 'filter.my_team_label' })
                  : this.props.searchedCollaborator
                  ? this.props.searchedCollaborator.team.name
                  : selectedTeam.name
              }
              style={{ borderColor: _.get(selectedTeam, 'color.hex') }}
              variant='outlined'
              className={this.props.classes.filterChip}
              onDelete={!isManager ? this.handleDeleteTeam : null}
            />
          )}
          {(this.props.searchedCollaborator ||
            (selectedCollaborator && !this.props.disableCollaborators)) && (
            <Chip
              size='small'
              label={
                this.props.searchedCollaborator
                  ? this.props.searchedCollaborator.fullname
                  : selectedCollaborator.fullname
              }
              onDelete={this.handleDeleteCollaborator}
              avatar={chipAvatar}
              style={{
                borderColor: _.get(selectedCollaborator, 'team.color.hex'),
              }}
              variant='outlined'
              className={this.props.classes.filterChip}
            />
          )}
        </div>
      </div>
    );
  }

  render() {
    const { account } = this.props.accountDetail;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;

    return <div>{this.renderData()}</div>;
  }
}

const mapStateToProps = ({
  accountDetail,
  teamList,
  teamGroupTree,
  teamCollaboratorList,
  currentPeriodDetail,
  previousPeriodList,
}) => ({
  accountDetail,
  teamList,
  teamGroupTree,
  teamCollaboratorList,
  currentPeriodDetail,
  previousPeriodList,
});

const mapDispatchToProps = (dispatch) => ({
  teamListActions: bindActionCreators(teamListActions, dispatch),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
  teamCollaboratorListActions: bindActionCreators(
    teamCollaboratorListActions,
    dispatch
  ),
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch
  ),
  previousPeriodListActions: bindActionCreators(
    previousPeriodListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(ChallengeCollaboratorFilter)));

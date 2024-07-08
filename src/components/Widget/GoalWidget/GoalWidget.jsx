import React, { useEffect, useState } from 'react';
import { WrapperWidget } from '../WrapperWidget';
import { useIntl } from 'react-intl';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import * as teamCollaboratorGoalListActions from '../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalList/actions';
import * as teamGoalSummaryListActions from '../../../services/TeamGoalSummaries/TeamGoalSummaryList/actions';
import * as collaboratorGoalSummaryListActions from '../../../services/CollaboratorGoalSummaries/CollaboratorGoalSummaryList/actions';
import * as teamGroupTreeAction from '../../../services/TeamGroups/TeamGroupTree/actions';
import * as teamListActions from '../../../services/Teams/TeamList/actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import api from '../../../data/api/api';

import { Goal, GoalJti } from '../../../scenes/Goals/components';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { TeamThumb } from '../../Teams';
import { TeamGroup } from '../../TeamGroups';
import { Card, DefaultTitle, EmptyState, Loader } from '../../Common';

const styles = {
  thumbnail: {
    borderRadius: 20,
    marginBottom: 10,
    zIndex: 10,
  },

  boxWrapper: {
    padding: '15px',
    borderRadius: '6px',
    width: '100%',
    height: '100%',
  },
  item: {
    marginBottom: 10,
    position: 'relative',
    zIndex: 10,
    '&:last-of-type': {
      marginBottom: '0',
    },
  },

  panelWrapper: {
    position: 'relative',
    width: '100%',
    marginBottom: '18px',
    '&:last-of-type': {
      marginBottom: '0',
    },
  },

  panel: {
    backgroundColor: 'initial',
    borderRadius: 'initial',
    boxShadow: 'none',
    position: 'relative',
    '&.MuiExpansionPanel-root:before': {
      display: 'none',
    },
    '& .MuiExpansionPanelSummary-expandIcon': {
      position: 'absolute',
      left: '135px',
      top: '22px',
    },
    '&.offsetIcon1  .MuiExpansionPanelSummary-expandIcon': {
      left: '145px',
    },
    '&.offsetIcon2  .MuiExpansionPanelSummary-expandIcon': {
      left: '152px',
    },
    '&.offsetIcon3  .MuiExpansionPanelSummary-expandIcon': {
      left: '160px',
    },
    '& .teamGroupOffset .MuiExpansionPanelSummary-expandIcon': {
      marginLeft: 60,
    },
    '& .teamOffset .MuiExpansionPanelSummary-expandIcon': {
      marginLeft: 10,
    },
    '& .MuiExpansionPanelSummary-expandIcon.Mui-expanded': {
      top: '16px',
    },
    '& .MuiExpansionPanelSummary-root': {
      zIndex: 20,
      height: '64px',
      marginRight: '42px',
    },
  },
  panelGroup: {
    position: 'relative',
    '& .MuiExpansionPanelSummary-expandIcon': {
      left: '155px',
    },
  },

  panelGroupTeamGroup: {
    position: 'relative',
    '& .MuiExpansionPanelSummary-expandIcon': {
      left: '205px',
    },
  },

  panelGroupTeam: {
    position: 'relative',
    '& .MuiExpansionPanelSummary-expandIcon': {
      left: '145px',
    },
  },

  panelSummary: {
    marginTop: '-80px',
    padding: 'initial',
    position: 'relative',
  },

  panelDetails: {
    padding: '10px 0 0 0',
    zIndex: 5,
  },
  scrollWrapper: {
    overflowY: 'overlay',

    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(199, 199, 199, 0)',
      borderRadius: 5,
    },

    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0)',
    },
    '&::-webkit-scrollbar': {
      '-webkit-appearance': 'none',
      '&:vertical': {
        width: 10,
      },
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(199, 199, 199, 1)',
        borderRadius: 5,
      },
    },
  },
};

const GoalWidget = ({
  accountDetail,
  collaboratorGoalSummaryList,
  teamCollaboratorGoalList,
  teamGoalSummaryList,
  teamGoalSummaryListActions,
  teamCollaboratorGoalListActions,
  collaboratorGoalSummaryListActions,
  teamGroupTreeAction,
  teamListActions,
  teamGroupTree,
  teamList,
  loaderTree,
  loaderAdmin,
  width,
  ...props
}) => {
  const { images, imagesLoading } = props.systemImageList;
  const logo =
    images &&
    _.get(
      images.find((x) => x.code === 'LOGO'),
      'src'
    );
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState({});
  const [promises, setPromises] = useState({});
  const { account } = accountDetail;
  const isJti = account.isJtiEnv;

  const { classes } = props;
  const { teamGroup } = teamGroupTree;
  const isMobile = isWidthDown('xs', width);
  const intl = useIntl();

  useEffect(() => {
    const teamGroupIds = Object.keys(promises);
    teamGroupIds.forEach((teamGroupId) => {
      const promise = promises[teamGroupId];
      promise.then((result) => {
        setTeams((prevTeams) => ({
          ...prevTeams,
          [teamGroupId]: result.data,
        }));
      });
    });
  }, [promises]);

  useEffect(() => {
    const role_code = _.get(account, 'role.code');
    teamGoalSummaryListActions.clearTeamGoalSummaryList();
    teamCollaboratorGoalListActions.clearTeamCollaboratorGoalList();
    collaboratorGoalSummaryListActions.clearCollaboratorGoalSummaryList();
    if (role_code === 'M') {
      const team_id = _.get(account, 'team.id');
      teamGoalSummaryListActions.getTeamGoalSummaryListByTeam(team_id, 0);
      teamCollaboratorGoalListActions.getTeamCollaboratorGoalList(team_id, 0);
    }
    if (role_code === 'C') {
      const collaborator_id = _.get(account, 'id');
      collaboratorGoalSummaryListActions.getCollaboratorGoalSummaryList(
        collaborator_id,
        0
      );
      teamGoalSummaryListActions.getTeamGoalSummaryListByCollaborator(
        collaborator_id,
        0
      );
    }

    if (role_code === 'A' || role_code === 'S') {
      teamGroupTreeAction.getTeamGroupTree();
    }
  }, []);

  const loadTeams = (teamGroup) => {
    if (_.get(teamGroup, 'id')) {
      const promise = api.teams.listByGroup(teamGroup.id);
      setPromises({ ...promises, [teamGroup.id]: promise });
    }
  };

  useEffect(() => {
    const { loading: teamGoalSummaryLoading } = teamGoalSummaryList;

    const { loading: teamCollaboratorGoalLoading } = teamCollaboratorGoalList;
    const loading = teamGoalSummaryLoading || teamCollaboratorGoalLoading;

    if (selectedTeam && !loading) {
      teamGoalSummaryListActions.getTeamGoalSummaryListByTeam(
        selectedTeam.id,
        0
      );
      teamCollaboratorGoalListActions.getTeamCollaboratorGoalList(
        selectedTeam.id,
        0
      );
    }
  }, [selectedTeam]);

  // initialize root team group teams list
  useEffect(() => {
    if (!_.get(teamGroup, 'id')) {
      return;
    }

    const promise = api.teams.listByGroup(teamGroup.id);
    setPromises({ ...promises, [teamGroup.id]: promise });
  }, [teamGroupTree]);

  const sortGoals = (mergeGoals) => {
    return mergeGoals.sort((a, b) => {
      const comparison = a.end - b.end;
      return comparison * -1;
    });
  };

  const { goals: teamGoalSummary, loading: teamGoalSummaryLoading } =
    teamGoalSummaryList;

  const { goals: teamCollaboratorGoal, loading: teamCollaboratorGoalLoading } =
    teamCollaboratorGoalList;

  const {
    goals: collaboratorGoalSummary,
    loading: collaboratorGoalSummaryLoading,
  } = collaboratorGoalSummaryList;

  const loading =
    teamGoalSummaryLoading ||
    teamCollaboratorGoalLoading ||
    collaboratorGoalSummaryLoading;

  const mergeGoals = _.compact(
    _.concat(teamGoalSummary, teamCollaboratorGoal, collaboratorGoalSummary)
  );

  const sortedGoals = sortGoals(mergeGoals);
  const role_code = _.get(account, 'role.code');

  const renderTeamList = (teams) => {
    return (
      <div>
        {teams ? (
          teams.map((team) => (
            <Grid container spacing={2} key={team.id}>
              <Grid
                item
                style={{ cursor: 'pointer' }}
                xs={12}
                onClick={() => handleTeamClick(team)}
              >
                <TeamThumb
                  key={team.id}
                  team={Object.assign(team, {
                    collaborators: team.collaborator_ids || [],
                  })}
                  selected={team === selectedTeam}
                />
              </Grid>
            </Grid>
          ))
        ) : (
          <Loader centered />
        )}
      </div>
    );
  };

  const renderTeamGroup = (teamGroup, teams, defaultExpanded) => {
    const hasTeamGroups =
      teamGroup?.teamGroups && teamGroup?.teamGroups.length > 0;
    // const filteredTeams = teams.filter((team) =>
    //   _.get(teamGroup, 'teamIds', []).includes(team.id)
    // );
    return (
      <div key={teamGroup.id} className={classes.panelWrapper}>
        <div style={{ position: 'static' }}>
          <div className={`${classes.item}`}>
            <Card className={classes.thumbnail}>
              <TeamGroup
                team={Object.assign({}, teamGroup, {
                  teams:
                    teamGroup.teamGroups && teamGroup?.teamGroups.length > 0
                      ? teamGroup.teamGroups
                      : teamGroup.allTeamIds,
                })}
                teamNumberWording={hasTeamGroups ? 'team_groups' : 'teams'}
                hideTeamGroupUsers
                teamNumber
                hideManager
                image={teamGroup.parent ? null : logo}
              />
            </Card>
            <ExpansionPanel
              className={`${classes.panel}`}
              onChange={(e, expanded) => {
                if (expanded) {
                  loadTeams(teamGroup);
                }
              }}
              defaultExpanded={defaultExpanded}
            >
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                className={`${classes.panelSummary} ${classes.panelGroupTeam} ${
                  hasTeamGroups ? 'teamGroupOffset' : 'teamOffset'
                } ${
                  teams[teamGroup.id]
                    ? classes.panelGroupTeamGroup
                    : classes.panelGroup
                }`}
              ></ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.panelDetails}>
                <Grid container spacing={2} flexWrap='nowrap'>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={11}>
                    {teamGroup.teamsCount > 0 && teams[teamGroup.id] && (
                      <div
                        style={{
                          marginBottom:
                            teamGroup.teamGroups.length > 0 ? 10 : 0,
                        }}
                      >
                        {renderTeamList(teams[teamGroup.id])}
                      </div>
                    )}

                    {teamGroup.teamGroups.map((childGroup) =>
                      renderTeamGroup(childGroup, teams)
                    )}
                  </Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      </div>
    );
  };

  const renderTeamGroups = () => {
    const padding = isMobile ? { padding: 5 } : {};
    return (
      <Grid container direction='column'>
        <Grid xs item className={classes.boxWrapper} style={{ ...padding }}>
          <div className={classes.panelWrapper}>
            <div style={{ position: 'static' }}>
              {teamGroup && _.get(teamGroup, 'id') && (
                <div className={`${classes.item}`}>
                  {renderTeamGroup(teamGroup, teams, true)}
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    );
  };
  const handleTeamClick = (team) => {
    setSelectedTeam(team);
  };

  // Don't scroll if mobile
  // const heightStyle = isMobile ? {  } : { height: 350 };
  return (
    <WrapperWidget
      title={
        _.get(account, 'goalWording') ||
        intl.formatMessage({ id: 'admin.goal.title' })
      }
      url={selectedTeam ? `/goals/teams/${selectedTeam.id}/list` : '/goals'}
      loading={loading && mergeGoals.length === 0}
    >
      {selectedTeam && (
        <DefaultTitle
          lowercase
          style={{
            color: 'rgb(15,111,222)',
            cursor: 'pointer',
          }}
          onClick={() => {
            setSelectedTeam(null);
          }}
        >
          <Grid container alignItems='center'>
            <Grid item>
              <ChevronLeftRoundedIcon
                style={{
                  fontSize: 30,
                  marginBottom: -5,
                }}
              />
            </Grid>
            <Grid item>
              {intl.formatMessage({
                id: 'challenge.kpi_results.back_button',
              })}
            </Grid>
          </Grid>
        </DefaultTitle>
      )}
      <div
        className={isMobile ? '' : classes.scrollWrapper}
        style={{
          height: 350,
          overflowX: 'hidden',
          overflowY: 'overlay',
        }}
      >
        <div style={{ padding: 10 }}>
          {!loading &&
          (selectedTeam || role_code === 'C' || role_code === 'M') &&
          sortedGoals &&
          sortedGoals.length > 0
            ? sortedGoals.map((goal) => {
                let detailUrl = `/goals/detail/collaborator/${goal.id}`;
                if (goal.type === 'T') {
                  detailUrl = `/goals/detail/team/${goal.id}`;
                } else if (role_code !== 'C') {
                  detailUrl = `/goals/detail/team-collaborator/${goal.id}`;
                }
                return (
                  <div style={{ paddingBottom: 20 }}>
                    <NavLink
                      to={detailUrl}
                      key={goal.id}
                      style={{ textDecoration: 'none' }}
                    >
                      {isJti ? (
                        <GoalJti
                          goal={goal}
                          hideIcon
                          hideSubInfo
                          hideTimer
                          hideProgressionDetail
                          animate
                        />
                      ) : (
                        <Goal
                          goal={goal}
                          hideIcon
                          hideSubInfo
                          hideTimer
                          hideProgressionDetail
                          animate
                        />
                      )}
                    </NavLink>
                  </div>
                );
              })
            : selectedTeam && <EmptyState />}
        </div>
        {!selectedTeam && (
          <>
            {loaderAdmin || loaderTree ? (
              <Grid
                container
                style={{ height: '300px' }}
                alignItems='center'
                justifyContent='center'
              >
                <Grid item>
                  <Loader centered />
                </Grid>
              </Grid>
            ) : (
              (role_code === 'A' || role_code === 'S') && renderTeamGroups()
            )}
          </>
        )}
      </div>
    </WrapperWidget>
  );
};

const mapStateToProps = ({
  accountDetail,
  collaboratorGoalSummaryList,
  teamCollaboratorGoalList,
  teamGoalSummaryList,
  teamGroupTree,
  teamList,
  systemImageList,
}) => ({
  accountDetail,
  collaboratorGoalSummaryList,
  teamCollaboratorGoalList,
  teamGoalSummaryList,
  teamGroupTree,
  loaderTree: teamGroupTree.loading,
  teamList,
  loaderAdmin: teamList.loading,
  systemImageList,
});
const mapDispatchToProps = (dispatch) => ({
  collaboratorGoalSummaryListActions: bindActionCreators(
    collaboratorGoalSummaryListActions,
    dispatch
  ),
  teamCollaboratorGoalListActions: bindActionCreators(
    teamCollaboratorGoalListActions,
    dispatch
  ),
  teamGoalSummaryListActions: bindActionCreators(
    teamGoalSummaryListActions,
    dispatch
  ),
  teamGroupTreeAction: bindActionCreators(teamGroupTreeAction, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withWidth()(GoalWidget)));

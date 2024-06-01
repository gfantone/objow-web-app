import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { Carousel, WrapperWidget, Loader } from '../../../components';
import {
  Challenge,
  ChallengeCard,
} from '../../../scenes/Challenges/components';
import * as configListActions from '../../../services/Configs/ConfigList/actions';
import * as teamGroupBasedChallengeListActions from '../../../services/TeamGroupBasedChallenges/TeamGroupBasedChallengeList/actions';
import * as teamChallengeListActions from '../../../services/TeamChallenges/TeamChallengeList/actions';
import * as teamCollaboratorChallengeListActions from '../../../services/TeamCollaboratorChallenges/TeamCollaboratorChallengeList/actions';
import * as collaboratorChallengeListActions from '../../../services/CollaboratorChallenges/CollaboratorChallengeList/actions';
import api from '../../../data/api/api';
import { Grid } from '@mui/material';

const ChallengeWidget = ({
  accountDetail,
  configList,
  teamChallengeList,
  teamCollaboratorChallengeList,
  teamGroupBasedChallengeList,
  collaboratorChallengeList,
  configListActions,
  teamChallengeListActions,
  teamGroupBasedChallengeListActions,
  teamCollaboratorChallengeListActions,
  collaboratorChallengeListActions,
}) => {
  const intl = useIntl();

  useEffect(() => {
    const { account } = accountDetail;
    const role_code = _.get(account, 'role.code');
    if (['A', 'S'].indexOf(role_code) >= 0) {
      const team_group_id = _.get(account, 'team_group.id');
      teamCollaboratorChallengeListActions.getTeamCollaboratorChallengeListByTeamGroup(
        team_group_id,
        0
      );
      teamGroupBasedChallengeListActions.getTeamGroupBasedChallengeListByTeamGroup(
        team_group_id,
        0
      );
      teamChallengeListActions.getTeamChallengeListByTeamGroup(
        team_group_id,
        0
      );
    } else if (role_code === 'M') {
      const team_id = _.get(account, 'team.id');
      teamChallengeListActions.getTeamChallengeListByTeam(team_id, 0);
      teamGroupBasedChallengeListActions.getTeamGroupBasedChallengeListByTeam(
        team_id,
        0
      );
      teamCollaboratorChallengeListActions.getTeamCollaboratorChallengeList(
        team_id,
        0
      );
    } else {
      const collaborator_id = _.get(account, 'id');
      collaboratorChallengeListActions.getCollaboratorChallengeList(
        collaborator_id,
        0
      );
      teamChallengeListActions.getTeamChallengeListByCollaborator(
        collaborator_id,
        0
      );
      teamGroupBasedChallengeListActions.getTeamGroupBasedChallengeListByCollaborator(
        collaborator_id,
        0
      );
    }
  }, []);

  const sortChallenges = (mergeChallenges) => {
    return mergeChallenges.sort((a, b) => {
      const comparison = a.end - b.end;
      return comparison * -1;
    });
  };

  const { configs } = configList;

  const {
    challenges: teamCollaboratorChallenges,
    loading: teamCollaboratorChallengeLoading,
  } = teamCollaboratorChallengeList;

  const {
    challenges: teamGroupBasedChallenges,
    loading: teamGroupBasedChallengeLoading,
  } = teamGroupBasedChallengeList;

  const { challenges: teamChallenges, loading: teamChallengeLoading } =
    teamChallengeList;
  const {
    challenges: collaboratorChallenges,
    loading: collaboratorChallengeLoading,
  } = collaboratorChallengeList;

  const loading =
    teamCollaboratorChallengeLoading ||
    teamGroupBasedChallengeLoading ||
    teamChallengeLoading ||
    collaboratorChallengeLoading;

  const mergeChallenges = _.compact(
    _.concat(
      teamCollaboratorChallenges,
      teamGroupBasedChallenges,
      teamChallenges,
      collaboratorChallenges
    )
  );

  const sortedChallenges = sortChallenges(mergeChallenges);

  const slides = sortedChallenges.map((challenge, index) => {
    let detailUrl = '';
    const { account } = accountDetail;
    const role_code = _.get(account, 'role.code');
    if (['A', 'S'].indexOf(role_code) >= 0) {
      detailUrl =
        challenge.typeCode === 'CT'
          ? `/challenges/detail/team-group/${challenge.id}`
          : challenge.typeCode === 'TG'
          ? `/challenges/detail/team-group-based/${challenge.id}`
          : `/challenges/detail/team-group-collaborator/${challenge.id}`;
    } else if (role_code === 'M') {
      detailUrl =
        challenge.typeCode === 'CT'
          ? `/challenges/detail/team/${challenge.id}`
          : challenge.typeCode === 'TG'
          ? `/challenges/detail/team-group-based/${challenge.id}`
          : `/challenges/detail/team-collaborator/${challenge.id}`;
    } else {
      detailUrl =
        challenge.typeCode === 'CT'
          ? `/challenges/detail/team/${challenge.id}`
          : challenge.typeCode === 'TG'
          ? `/challenges/detail/team-group-based/${challenge.id}`
          : `/challenges/detail/collaborator/${challenge.id}`;
    }
    let fetchGoalPoints = null;
    if (['A', 'S'].indexOf(role_code) >= 0) {
      fetchGoalPoints = (id) =>
        api.challenges.goal_points(id, {
          team_group_id: account.team_group.id,
        });
    } else if (role_code === 'M') {
      fetchGoalPoints = (id) =>
        api.challenges.goal_points(id, {
          team_id: account.team.id,
        });
    } else {
      fetchGoalPoints = (id) =>
        api.challenges.goal_points(id, {
          collaborator_id: account.id,
        });
    }

    const fetchCurrentRank = (id) => {
      let query;
      if (challenge.typeCode === 'CC') {
        query = api.collaboratorChallenges.currentRank(id);
      } else if (challenge.typeCode === 'CT') {
        query = api.teamChallenges.currentRank(id);
      } else if (challenge.typeCode === 'TG') {
        query = api.teamGroupBasedChallenges.currentRank(id);
      }
      return query;
    };

    const fetchWonAwards = (id) => {
      let query;
      if (challenge.typeCode === 'CC') {
        query = api.collaboratorChallenges.wonAwards(id);
      } else if (challenge.typeCode === 'CT') {
        query = api.teamChallenges.wonAwards(id);
      } else if (challenge.typeCode === 'TG') {
        query = api.teamGroupBasedChallenges.wonAwards(id);
      }
      return query;
    };

    const fetchTopParticipants = (id) => {
      const query = api.challenges.top_participants(id);
      return query;
    };
    const fetchQueries = {
      fetchCurrentRank:
        account.role.code === 'C' ? (id) => fetchCurrentRank(id) : null,
      fetchWonAwards:
        account.role.code === 'C' ? (id) => fetchWonAwards(id) : null,
    };
    return (
      <div
        style={{ padding: '20px 25px' }}
        key={`challenge-slide-${challenge.sourceId}`}
      >
        <NavLink to={detailUrl} key={index} style={{ textDecoration: 'none' }}>
          <ChallengeCard>
            <Challenge
              configs={configs}
              scoreByTeam
              challenge={challenge}
              fetchGoalPoints={(sourceId) => fetchGoalPoints(sourceId)}
              fetchTopParticipants={(sourceId) =>
                api.challenges.top_participants(sourceId)
              }
              {...fetchQueries}
            />
          </ChallengeCard>
        </NavLink>
      </div>
    );
  });

  return (
    <WrapperWidget
      title={intl.formatMessage({ id: 'challenge.title' })}
      url='/challenges'
      loading={loading && !configs && !mergeChallenges}
    >
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item xs>
          {loading && slides.length === 0 ? (
            <Loader centered />
          ) : (
            <Carousel slides={slides} />
          )}
        </Grid>
      </Grid>
    </WrapperWidget>
  );
};

// recuperer le state du redux
const mapStateToProps = ({
  accountDetail,
  configList,
  teamChallengeList,
  teamCollaboratorChallengeList,
  teamGroupBasedChallengeList,
  collaboratorChallengeList,
}) => ({
  accountDetail,
  configList,
  teamGroupBasedChallengeList,
  teamChallengeList,
  teamCollaboratorChallengeList,
  collaboratorChallengeList,
});

// acction de troix defferents challenge
const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  teamChallengeListActions: bindActionCreators(
    teamChallengeListActions,
    dispatch
  ),
  teamGroupBasedChallengeListActions: bindActionCreators(
    teamGroupBasedChallengeListActions,
    dispatch
  ),
  teamCollaboratorChallengeListActions: bindActionCreators(
    teamCollaboratorChallengeListActions,
    dispatch
  ),
  collaboratorChallengeListActions: bindActionCreators(
    collaboratorChallengeListActions,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeWidget);

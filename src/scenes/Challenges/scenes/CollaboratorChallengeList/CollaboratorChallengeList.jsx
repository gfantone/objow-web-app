import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import {
  Challenge,
  ChallengeCard,
  ChallengeCollaboratorFilter,
  ChallengeFilter,
  ChallengeJti,
  TimeFilter,
} from '../../components';
import {
  CollaboratorFilterAndSearchBar,
  EmptyState,
  GridLink,
  IconButton,
  Loader,
  MainLayoutComponent,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as collaboratorChallengeListActions from '../../../../services/CollaboratorChallenges/CollaboratorChallengeList/actions';
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions';
import * as teamChallengeListActions from '../../../../services/TeamChallenges/TeamChallengeList/actions';
import * as teamGroupBasedChallengeListActions from '../../../../services/TeamGroupBasedChallenges/TeamGroupBasedChallengeList/actions';
import api from '../../../../data/api/api';
import _ from 'lodash';

class CollaboratorChallengeList extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.id = null;
    this.page = 0;
    this.year = null;
    this.start = null;
    this.end = null;
    this.type = null;
    this.state = {
      filterOpen: false,
      collaboratorFilterLoaded: false,
    };
  }

  refresh(id, page, year, start, end, type) {
    var url = `/challenges/collaborator/${id}?page=${page}`;
    if (year) url += `&year=${year}`;
    if (start) url += `&start=${start.getTime()}`;
    if (end) url += `&end=${end.getTime()}`;
    if (type) url += `&type=${type}`;
    this.props.history.replace(url);
  }

  handleFilterOpen() {
    this.setState({
      ...this.state,
      filterOpen: true,
    });
  }

  handleFilterClose() {
    this.setState({
      ...this.state,
      filterOpen: false,
    });
  }

  handleTimeChange(page) {
    this.refresh(this.id, page, this.year, this.start, this.end, this.type);
  }

  loadData(props) {
    const id = props.match.params.id;
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page'));
    const year = params.get('year');
    const startParam = params.get('start');
    const start = startParam ? new Date(Number(startParam)) : null;
    const endParam = params.get('end');
    const end = endParam ? new Date(Number(endParam)) : null;
    const currentStart = this.start ? this.start.getTime().toString() : null;
    const currentEnd = this.end ? this.end.getTime().toString() : null;
    const type = params.get('type');

    if (
      id != this.id ||
      page != this.page ||
      type != this.type ||
      year != this.year ||
      startParam != currentStart ||
      endParam != currentEnd
    ) {
      this.id = id;
      this.page = page;
      this.year = year;
      this.start = start;
      this.end = end;
      this.type = type;
      const time = page == 1 ? -1 : page == 2 ? 1 : 0;
      this.props.collaboratorChallengeListActions.getCollaboratorChallengeList(
        id,
        time,
        year,
        start,
        end,
        type
      );
      this.props.collaboratorDetailActions.getCollaboratorDetail(id);
      this.props.teamChallengeListActions.getTeamChallengeListByCollaborator(
        id,
        time,
        year,
        start,
        end,
        type
      );
      this.props.teamGroupBasedChallengeListActions.getTeamGroupBasedChallengeListByCollaborator(
        id,
        time,
        year,
        start,
        end,
        type
      );
    }
  }

  componentDidMount() {
    const { intl } = this.props;
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page'));
    const { account } = this.props.accountDetail;

    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );
    this.props.handleSubHeader(
      <TimeFilter
        initial={page}
        handleTimeChange={this.handleTimeChange.bind(this)}
      />
    );
    if (!account.isJtiEnv) {
      this.props.handleButtons(
        <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
          <FontAwesomeIcon icon={faSlidersH} />
        </IconButton>
      );
    }

    this.loadData(this.props);
  }

  componentWillReceiveProps(props) {
    this.loadData(props);
  }

  componentWillUnmount() {
    this.props.collaboratorChallengeListActions.getCollaboratorChallengeListClear();
    this.props.teamChallengeListActions.getTeamChallengeListClear();
    this.props.teamGroupBasedChallengeListActions.getTeamGroupBasedChallengeListClear();
  }

  handleFilterChange(team, collaborator, year, start, end, type, teamGroup) {
    const collaboratorId =
      this.props.accountDetail.account.role.code == 'C'
        ? this.id
        : collaborator;
    if (collaboratorId) {
      this.refresh(collaboratorId, this.page, year, start, end, type);
    } else if (!collaborator && !team && teamGroup) {
      var url = `/challenges/department/${teamGroup}?page=${this.page}`;
      if (year) url += `&year=${year}`;
      if (start) url += `&start=${start.getTime()}`;
      if (end) url += `&end=${end.getTime()}`;
      if (type) url += `&type=${type}`;
      this.props.history.replace(url);
    } else {
      const teamId =
        this.props.accountDetail.account.role.code == 'M'
          ? this.props.collaboratorDetail.collaborator.team.id
          : team;
      var url = `/challenges/team/${
        teamId || this.props.match.params.id
      }?page=${this.page}`;
      if (year) url += `&year=${year}`;
      if (start) url += `&start=${start.getTime()}`;
      if (end) url += `&end=${end.getTime()}`;
      if (type) url += `&type=${type}`;
      this.props.history.replace(url);
    }
  }

  onCollaboratorFilterLoaded() {
    if (!this.state.collaboratorFilterLoaded) {
      this.setState({
        ...this.state,
        collaboratorFilterLoaded: true,
      });
    }
  }

  fetchWonAwards = (challenge) => {
    let query;
    if (challenge.typeCode === 'CC') {
      query = api.collaboratorChallenges.wonAwards(challenge.id);
    } else if (challenge.typeCode === 'CT') {
      query = api.teamChallenges.wonAwards(challenge.id);
    } else if (challenge.typeCode === 'TG') {
      query = api.teamGroupBasedChallenges.wonAwards(challenge.id);
    }
    return query;
  };

  fetchCurrentRank = (challenge) => {
    let query;
    if (challenge.typeCode === 'CC') {
      query = api.collaboratorChallenges.currentRank(challenge.id);
    } else if (challenge.typeCode === 'CT') {
      query = api.teamChallenges.currentRank(challenge.id);
    } else if (challenge.typeCode === 'TG') {
      query = api.teamGroupBasedChallenges.currentRank(challenge.id);
    }
    return query;
  };

  mergeChallenges(collaboratorChallenges, teamChallenges) {
    return collaboratorChallenges.concat(teamChallenges).sort((a, b) => {
      const comparison = a.end - b.end;
      return this.page ? comparison * -1 : comparison;
    });
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderEmptyState() {
    const { intl } = this.props;
    return (
      <EmptyState
        title={intl.formatMessage({ id: 'challenge.list.empty_state_title' })}
        message={intl.formatMessage({
          id: 'challenge.list.empty_state_message',
        })}
      />
    );
  }

  renderData(hasChallenges = false) {
    const { challenges: teamChallenges } = this.props.teamChallengeList;
    const { challenges: collaboratorChallenges } =
      this.props.collaboratorChallengeList;
    const {
      challenges: teamGroupChallenges,
      loading: teamGroupChallengeListLoading,
    } = this.props.teamGroupBasedChallengeList;
    const { configs } = this.props.configList;
    const challenges = _.sortBy(
      this.mergeChallenges(
        this.mergeChallenges(collaboratorChallenges, teamChallenges),
        teamGroupChallenges
      ),
      (c) => c.sort_order,
      (c) => (this.page === 1 ? -c.end : c.end),
      (c) => -c.participants,
      (c) => -c.totalParticipants,
      (c) => c.id
    );
    const { collaborator } = this.props.collaboratorDetail;
    const teamId =
      collaborator && collaborator.team ? collaborator.team.id : null;
    const collaboratorId = collaborator ? collaborator.id : null;
    const { account } = this.props.accountDetail;
    const isJti = account.isJtiEnv;

    return (
      <React.Fragment>
        {_.get(account, 'role.code') !== 'C' && (
          <div style={{ marginBottom: 5 }}>
            <CollaboratorFilterAndSearchBar
              open={this.state.filterOpen}
              onClose={this.handleFilterClose.bind(this)}
              onChange={this.handleFilterChange.bind(this)}
              team={teamId}
              collaborator={collaboratorId}
              year={this.year}
              start={this.start}
              end={this.end}
              type={this.type}
              onLoaded={this.onCollaboratorFilterLoaded.bind(this)}
            />
          </div>
        )}
        {!hasChallenges ? (
          this.renderEmptyState()
        ) : (
          <Grid container spacing={2}>
            {challenges.map((challenge) => {
              let detailurl = '';
              if (challenge.typeCode === 'CT') {
                detailurl = `/challenges/detail/team/${challenge.id}`;
              } else if (challenge.typeCode === 'TG') {
                detailurl = `/challenges/detail/team-group-based/${challenge.id}`;
              } else {
                detailurl = `/challenges/detail/collaborator/${challenge.id}`;
              }

              return (
                <GridLink
                  key={challenge.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  component={Link}
                  to={detailurl}
                >
                  <ChallengeCard>
                    {isJti ? (
                      <ChallengeJti
                        challenge={challenge}
                        configs={configs}
                        fetchGoalPoints={() =>
                          api.challenges.goal_points(challenge.sourceId, {
                            collaborator_id: this.id,
                          })
                        }
                        fetchTopParticipants={() =>
                          api.challenges.top_participants(challenge.sourceId)
                        }
                        scoreByTeam
                      />
                    ) : (
                      <Challenge
                        challenge={challenge}
                        configs={configs}
                        fetchWonAwards={() => this.fetchWonAwards(challenge)}
                        fetchCurrentRank={() =>
                          this.fetchCurrentRank(challenge)
                        }
                        fetchGoalPoints={() =>
                          api.challenges.goal_points(challenge.sourceId, {
                            collaborator_id: this.id,
                          })
                        }
                        fetchTopParticipants={() =>
                          api.challenges.top_participants(challenge.sourceId)
                        }
                      />
                    )}
                  </ChallengeCard>
                </GridLink>
              );
            })}
          </Grid>
        )}
      </React.Fragment>
    );
  }

  render() {
    const {
      challenges: collaboratorChallenges,
      loading: collaboratorChallengeListLoading,
    } = this.props.collaboratorChallengeList;
    const {
      challenges: teamGroupChallenges,
      loading: teamGroupChallengeListLoading,
    } = this.props.teamGroupBasedChallengeList;
    const { collaborator, loading: collaboratorDetailLoading } =
      this.props.collaboratorDetail;
    const { challenges: teamChallenges, loading: teamChallengeListLoading } =
      this.props.teamChallengeList;
    const { configs, loading: configLoading } = this.props.configList;
    const loading =
      collaboratorChallengeListLoading ||
      teamGroupChallengeListLoading ||
      collaboratorDetailLoading ||
      teamChallengeListLoading ||
      configLoading;
    const teamId =
      collaborator && collaborator.team ? collaborator.team.id : null;
    const collaboratorId = collaborator ? collaborator.id : null;
    const { account } = this.props.accountDetail;

    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }

    let hasChallenges = false;

    if (teamChallenges && collaboratorChallenges && teamGroupChallenges) {
      hasChallenges =
        collaboratorChallenges.length > 0 ||
        teamChallenges.length > 0 ||
        teamGroupChallenges.length > 0;
    }
    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          collaboratorChallenges &&
          teamChallenges &&
          configs &&
          this.renderData(hasChallenges)}
        {this.state.filterOpen && (
          <ChallengeFilter
            open={this.state.filterOpen}
            onClose={this.handleFilterClose.bind(this)}
            onChange={this.handleFilterChange.bind(this)}
            team={this.props.match.params.id}
            collaborator={collaboratorId}
            year={this.year}
            start={this.start}
            end={this.end}
            type={this.type}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  configList,
  collaboratorChallengeList,
  collaboratorDetail,
  teamChallengeList,
  teamGroupBasedChallengeList,
}) => ({
  accountDetail,
  configList,
  collaboratorChallengeList,
  collaboratorDetail,
  teamGroupBasedChallengeList,
  teamChallengeList,
});

const mapDispatchToProps = (dispatch) => ({
  configListActions: bindActionCreators(configListActions, dispatch),
  collaboratorChallengeListActions: bindActionCreators(
    collaboratorChallengeListActions,
    dispatch
  ),
  collaboratorDetailActions: bindActionCreators(
    collaboratorDetailActions,
    dispatch
  ),
  teamGroupBasedChallengeListActions: bindActionCreators(
    teamGroupBasedChallengeListActions,
    dispatch
  ),
  teamChallengeListActions: bindActionCreators(
    teamChallengeListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(CollaboratorChallengeList)));

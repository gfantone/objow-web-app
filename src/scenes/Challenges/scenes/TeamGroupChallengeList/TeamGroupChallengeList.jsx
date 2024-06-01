import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import {
  Challenge,
  ChallengeCard,
  ChallengeCollaboratorFilter,
  ChallengeFilter,
  ChallengeSearchBarCollaborators,
  TimeFilter,
} from '../../components';

import {
  EmptyState,
  GridLink,
  IconButton,
  Loader,
  MainLayoutComponent,
  CollaboratorFilterAndSearchBar,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as configListActions from '../../../../services/Configs/ConfigList/actions';
import * as teamGroupBasedChallengeListActions from '../../../../services/TeamGroupBasedChallenges/TeamGroupBasedChallengeList/actions';
import * as teamChallengeListActions from '../../../../services/TeamChallenges/TeamChallengeList/actions';
import * as teamCollaboratorChallengeListActions from '../../../../services/TeamCollaboratorChallenges/TeamCollaboratorChallengeList/actions';
import * as challengeParticipantListActions from '../../../../services/ChallengeParticipants/ChallengeParticipantList/actions';
import api from '../../../../data/api/api';
import '../../../../helpers/StringHelper';
import _ from 'lodash';

const styles = {
  iconMargin: {
    marginRight: 16,
  },
};

class TeamGroupChallengeList extends MainLayoutComponent {
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
    var url = `/challenges/department/${id}?page=${page}`;
    if (year) url += `&year=${year}`;
    if (start) url += `&start=${start.getTime()}`;
    if (end) url += `&end=${end.getTime()}`;
    if (type) url += `&type=${type}`;
    this.props.history.replace(url);
  }

  handleCreateChallenge() {
    this.props.history.push(`/challenges/team/${this.id}/creation`);
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

  onCollaboratorFilterLoaded() {
    if (!this.state.collaboratorFilterLoaded) {
      this.setState({
        ...this.state,
        collaboratorFilterLoaded: true,
      });
    }
  }

  handleTimeChange(page) {
    this.refresh(this.id, page, this.year, this.start, this.end, this.type);
  }

  loadData(props) {
    const id = props.match.params.id;
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page'));
    const year = params.get('year');
    const type = params.get('type');
    const startParam = params.get('start');
    const start = startParam ? new Date(Number(startParam)) : null;
    const endParam = params.get('end');
    const end = endParam ? new Date(Number(endParam)) : null;
    const currentStart = this.start ? this.start.getTime().toString() : null;
    const currentEnd = this.end ? this.end.getTime().toString() : null;

    if (
      id != this.id ||
      page != this.page ||
      year != this.year ||
      type != this.type ||
      startParam != currentStart ||
      endParam != currentEnd
    ) {
      this.id = id;
      this.page = page;
      this.year = year;
      this.type = type;
      this.start = start;
      this.end = end;
      const time = page == 1 ? -1 : page == 2 ? 1 : 0;
      this.props.teamChallengeListActions.getTeamChallengeListByTeamGroup(
        id,
        time,
        year,
        start,
        end,
        type
      );
      this.props.teamGroupBasedChallengeListActions.getTeamGroupBasedChallengeListByTeamGroup(
        id,
        time,
        year,
        start,
        end,
        type
      );
      this.props.teamCollaboratorChallengeListActions.getTeamCollaboratorChallengeListByTeamGroup(
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
    const { account } = this.props.accountDetail;
    const { classes } = this.props;
    const params = new URLSearchParams(window.location.search);
    const page = Number(params.get('page'));
    this.props.handleTitle(
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' })
    );
    this.props.handleSubHeader(
      <TimeFilter
        initial={page}
        handleTimeChange={this.handleTimeChange.bind(this)}
      />
    );
    const canCreate = account.hasManagerChallengeEditAccess;

    this.props.handleButtons(
      <div>
        {canCreate && (
          <Tooltip
            title={intl.formatMessage({ id: 'challenge.list.create_button' })}
          >
            <IconButton
              size='small'
              onClick={this.handleCreateChallenge.bind(this)}
              classes={{ root: classes.iconMargin }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title={intl.formatMessage({ id: 'filter.submit_button' })}>
          <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
            <FontAwesomeIcon icon={faSlidersH} />
          </IconButton>
        </Tooltip>
      </div>
    );
    if (account.role.code == 'A' || account.role.code == 'S') {
      this.props.activateReturn();
    }

    this.loadData(this.props);
  }

  componentWillReceiveProps(props) {
    this.loadData(props);
  }

  componentWillUnmount() {
    this.props.teamChallengeListActions.getTeamChallengeListClear();
    this.props.teamGroupBasedChallengeListActions.getTeamGroupBasedChallengeListClear();
    this.props.teamCollaboratorChallengeListActions.getTeamCollaboratorChallengeListClear();
  }

  handleFilterChange(team, collaborator, year, start, end, type, teamGroup) {
    if (!collaborator && !team) {
      this.refresh(
        teamGroup || this.props.match.params.id,
        this.page,
        year,
        start,
        end,
        type
      );
    } else if (!collaborator && team) {
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
    } else {
      var url = `/challenges/collaborator/${collaborator}?page=${this.page}`;
      if (year) url += `&year=${year}`;
      if (start) url += `&start=${start.getTime()}`;
      if (end) url += `&end=${end.getTime()}`;
      if (type) url += `&type=${type}`;
      this.props.history.replace(url);
    }
  }
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

  getChallengeList = (challenges) => {
    const teamId = this.props.match.params.id;
    const { account } = this.props.accountDetail;

    const teamIds = _.get(account, 'team.id')
      ? [_.get(account, 'team.id')]
      : _.get(account, 'team_group.allTeamIds');
    return challenges;
    return challenges.filter((challenge) => {
      const includesManagerTeam =
        account.team &&
        challenge.participantTeamIds.indexOf(account.team.id) >= 0;
      return (
        includesManagerTeam ||
        ((account.role.code === 'A' || account.role.code === 'S') &&
          challenge.participantTeamIds.indexOf(parseInt(teamId)) >= 0)
      );
    });
  };

  renderData(hasChallenges = false) {
    const { challenges: teamGroupChallenges } =
      this.props.teamGroupBasedChallengeList;
    const { challenges: teamChallenges } = this.props.teamChallengeList;
    const { challenges: collaboratorChallenges } =
      this.props.teamCollaboratorChallengeList;

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

    const { configs } = this.props.configList;
    const { account } = this.props.accountDetail;

    return (
      <React.Fragment>
        <div style={{ marginBottom: 5 }}>
          <CollaboratorFilterAndSearchBar
            open={this.state.filterOpen}
            onClose={this.handleFilterClose.bind(this)}
            onChange={this.handleFilterChange.bind(this)}
            teamGroup={this.props.match.params.id}
            year={this.year}
            start={this.start}
            end={this.end}
            type={this.type}
            onLoaded={this.onCollaboratorFilterLoaded.bind(this)}
          />
        </div>

        {!hasChallenges ? (
          this.renderEmptyState()
        ) : (
          <Grid container spacing={2}>
            {this.getChallengeList(challenges).map((challenge) => {
              let detailurl = '';
              if (challenge.typeCode === 'CT') {
                detailurl = `/challenges/detail/team-group/${challenge.id}`;
              } else if (challenge.typeCode === 'TG') {
                detailurl = `/challenges/detail/team-group-based/${challenge.id}`;
              } else {
                detailurl = `/challenges/detail/team-group-collaborator/${challenge.id}`;
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
                    <Challenge
                      challenge={challenge}
                      configs={configs}
                      fetchGoalPoints={() =>
                        api.challenges.goal_points(challenge.sourceId, {
                          team_group_id: this.id,
                        })
                      }
                      fetchTopParticipants={() =>
                        api.challenges.top_participants(challenge.sourceId)
                      }
                      scoreByTeam
                    />
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
      challenges: teamGroupChallenges,
      loading: teamGroupChallengeListLoading,
    } = this.props.teamGroupBasedChallengeList;
    const { challenges: teamChallenges, loading: teamChallengeListLoading } =
      this.props.teamChallengeList;
    const {
      challenges: collaboratorChallenges,
      loading: teamCollaboratorChallengeListLoading,
    } = this.props.teamCollaboratorChallengeList;
    const { configs, loading: configLoading } = this.props.configList;
    const loading =
      teamChallengeListLoading ||
      teamGroupChallengeListLoading ||
      teamCollaboratorChallengeListLoading ||
      configLoading;

    const { account } = this.props.accountDetail;

    if (!account.hasChallengeAccess) {
      return <Redirect to={'/'} />;
    }

    let hasChallenges = false;

    if (teamChallenges && collaboratorChallenges && teamGroupChallenges) {
      hasChallenges =
        this.getChallengeList(
          this.mergeChallenges(
            this.mergeChallenges(teamChallenges, collaboratorChallenges),
            teamGroupChallenges
          )
        ).length > 0;
    }

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading &&
          collaboratorChallenges &&
          teamChallenges &&
          teamGroupChallenges &&
          configs &&
          this.renderData(hasChallenges)}
        {this.state.filterOpen && (
          <ChallengeFilter
            open={this.state.filterOpen}
            onClose={this.handleFilterClose.bind(this)}
            onChange={this.handleFilterChange.bind(this)}
            teamGroup={this.props.match.params.id}
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
  teamChallengeList,
  teamCollaboratorChallengeList,
  teamGroupBasedChallengeList,
}) => ({
  accountDetail,
  configList,
  teamGroupBasedChallengeList,
  teamChallengeList,
  teamCollaboratorChallengeList,
});

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(injectIntl(TeamGroupChallengeList))));

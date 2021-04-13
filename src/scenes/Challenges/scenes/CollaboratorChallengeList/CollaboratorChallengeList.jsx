import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import {Challenge, ChallengeCard, ChallengeCollaboratorFilter, ChallengeFilter, TimeFilter} from '../../components'
import { EmptyState, GridLink, IconButton, Loader, MainLayoutComponent } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorChallengeListActions from '../../../../services/CollaboratorChallenges/CollaboratorChallengeList/actions'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import * as teamChallengeListActions from '../../../../services/TeamChallenges/TeamChallengeList/actions'

class CollaboratorChallengeList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.page = 0;
        this.year = null;
        this.start = null;
        this.end = null;
        this.state = {
            filterOpen: false,
            collaboratorFilterLoaded: false
        }
    }

    refresh(id, page, year, start, end) {
        var url = `/challenges/collaborator/${id}?page=${page}`;
        if (year) url += `&year=${year}`;
        if (start) url += `&start=${start.getTime()}`;
        if (end) url += `&end=${end.getTime()}`;
        this.props.history.replace(url)
    }

    handleFilterOpen() {
        this.setState({
            ...this.state,
            filterOpen: true
        })
    }

    handleFilterClose() {
        this.setState({
            ...this.state,
            filterOpen: false
        })
    }

    handleTimeChange(page) {
        this.refresh(this.id, page, this.year, this.start, this.end)
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

        if (id != this.id || page != this.page || year != this.year || startParam != currentStart || endParam != currentEnd) {
            this.id = id;
            this.page = page;
            this.year = year;
            this.start = start;
            this.end = end;
            const time = page == 1 ? -1 : page == 2 ? 1 : 0;
            this.props.collaboratorChallengeListActions.getCollaboratorChallengeList(id, time, year, start, end);
            this.props.collaboratorDetailActions.getCollaboratorDetail(id);
            this.props.teamChallengeListActions.getTeamChallengeListByCollaborator(id, time, year, start, end)
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const page = Number(params.get('page'));
        const { account } = this.props.accountDetail;

        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_SHORT_TITLE);
        this.props.handleSubHeader(<TimeFilter initial={page} handleTimeChange={this.handleTimeChange.bind(this)} />);
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        this.loadData(this.props)
    }

    componentWillReceiveProps(props) {
        this.loadData(props)
    }

    handleFilterChange(team, collaborator, year, start, end) {
        const collaboratorId = this.props.accountDetail.account.role.code == 'C' ? this.id : collaborator;
        if (collaboratorId) {
            this.refresh(collaboratorId, this.page, year, start, end)
        } else {
            const teamId = this.props.accountDetail.account.role.code == 'M' ? this.props.collaboratorDetail.collaborator.team.id : team;
            var url = `/challenges/team/${teamId || this.props.match.params.id}?page=${this.page}`;
            if (year) url += `&year=${year}`;
            if (start) url += `&start=${start.getTime()}`;
            if (end) url += `&end=${end.getTime()}`;
            this.props.history.push(url)
        }
    }

    onCollaboratorFilterLoaded() {
      if(!this.state.collaboratorFilterLoaded) {
        this.setState({
          ...this.state,
          collaboratorFilterLoaded: true
        })
      }
    }

    mergeChallenges(collaboratorGoals, teamGoals) {
        return collaboratorGoals.concat(teamGoals).sort((a, b) => {
            const comparison = a.end - b.end;
            return this.page == 0 || this.page == 2 ? comparison : comparison * -1
        })
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.COLLABORATOR_CHALLENGE_LIST_EMPTY_STATE_TITLE} message={Resources.COLLABORATOR_CHALLENGE_LIST_EMPTY_STATE_MESSAGE} />
    }

    renderData() {
        const { challenges: collaboratorChallenges } = this.props.collaboratorChallengeList;
        const { challenges: teamChallenges } = this.props.teamChallengeList;
        const challenges = this.mergeChallenges(collaboratorChallenges, teamChallenges);
        const { collaborator } = this.props.collaboratorDetail;
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null;
        const collaboratorId = collaborator ? collaborator.id : null;

        return (
            <Grid container spacing={2}>
              { challenges.map(challenge=> {
                const detailurl = challenge.typeCode != 'CT' ? `/challenges/detail/collaborator/${challenge.id}` : `/challenges/detail/team/${challenge.id}`;

                return (
                  <GridLink key={challenge.id} item xs={12} sm={6} md={4} component={Link} to={detailurl}>
                    <ChallengeCard>
                      <Challenge challenge={challenge} />
                    </ChallengeCard>
                  </GridLink>
                )
              }) }
            </Grid>
        )
    }

    render() {
        const { challenges: collaboratorChallenges, loading: collaboratorChallengeListLoading } = this.props.collaboratorChallengeList;
        const { collaborator, loading: collaboratorDetailLoading } = this.props.collaboratorDetail;
        const { challenges: teamChallenges, loading: teamChallengeListLoading } = this.props.teamChallengeList;
        const loading = collaboratorChallengeListLoading || collaboratorDetailLoading || teamChallengeListLoading || !this.state.collaboratorFilterLoaded;
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null;
        const collaboratorId = collaborator ? collaborator.id : null;
        const { account } = this.props.accountDetail;

        if(!account.hasChallengeAccess) {
          return <Redirect to={'/'} />
        }

        return (
            <div>
                <ChallengeCollaboratorFilter
                  open={this.state.filterOpen}
                  onClose={this.handleFilterClose.bind(this)}
                  onChange={this.handleFilterChange.bind(this)}
                  team={teamId}
                  collaborator={collaboratorId}
                  year={this.year}
                  start={this.start}
                  end={this.end}
                  onLoaded={this.onCollaboratorFilterLoaded.bind(this)}
                />
                { loading && this.renderLoader() }
                { !loading && collaboratorChallenges && teamChallenges && this.renderData() }
                { !loading && collaboratorChallenges && teamChallenges && collaboratorChallenges.length == 0 && teamChallenges.length == 0 && this.renderEmptyState() }
                {
                  this.state.filterOpen &&
                  <ChallengeFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={this.props.match.params.id}
                    year={this.year}
                    start={this.start}
                    end={this.end}
                  />
                }

            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorChallengeList, collaboratorDetail, teamChallengeList }) => ({
    accountDetail,
    collaboratorChallengeList,
    collaboratorDetail,
    teamChallengeList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorChallengeListActions: bindActionCreators(collaboratorChallengeListActions, dispatch),
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch),
    teamChallengeListActions: bindActionCreators(teamChallengeListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CollaboratorChallengeList))

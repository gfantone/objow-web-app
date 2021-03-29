import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Tooltip } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import { Challenge, ChallengeCard, ChallengeNewFilter, TimeFilter } from '../../components'
import { EmptyState, GridLink, IconButton, Loader, MainLayoutComponent } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamChallengeListActions from '../../../../services/TeamChallenges/TeamChallengeList/actions'
import * as teamCollaboratorChallengeListActions from '../../../../services/TeamCollaboratorChallenges/TeamCollaboratorChallengeList/actions'
import '../../../../helpers/StringHelper'

const styles = {
    iconMargin: {
        marginRight: 16
    }
};

class TeamChallengeList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.page = 0;
        this.year = null;
        this.start = null;
        this.end = null;
        this.state = {
            filterOpen: false
        }
    }

    refresh(id, page, year, start, end) {
        var url = `/challenges/team/${id}?page=${page}`;
        if (year) url += `&year=${year}`;
        if (start) url += `&start=${start.getTime()}`;
        if (end) url += `&end=${end.getTime()}`;
        this.props.history.replace(url)
    }

    handleCreateChallenge() {
        this.props.history.push(`/challenges/team/${this.id}/creation`)
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
            this.props.teamChallengeListActions.getTeamChallengeListByTeam(id, time, year, start, end);
            this.props.teamCollaboratorChallengeListActions.getTeamCollaboratorChallengeList(id, time, year, start, end)
        }
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        const { classes } = this.props;
        const params = new URLSearchParams(window.location.search);
        const page = Number(params.get('page'));
        this.props.handleTitle(account.challengeWording || Resources.CHALLENGE_SHORT_TITLE);
        this.props.handleSubHeader(<TimeFilter initial={page} handleTimeChange={this.handleTimeChange.bind(this)} />);
        const canCreate = account.hasManagerChallengeEditAccess

        this.props.handleButtons(
            <div>
              {
                canCreate && (
                  <Tooltip title={Resources.TEAM_CHALLENGE_LIST_CREATE_BUTTON}>
                    <IconButton size='small' onClick={this.handleCreateChallenge.bind(this)} classes={{root: classes.iconMargin}}><FontAwesomeIcon icon={faPlus} /></IconButton>
                  </Tooltip>
                )
              }
              <Tooltip title={Resources.TEAM_CHALLENGE_LIST_FILTER_BUTTON}>
                  <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>
              </Tooltip>
          </div>
        );
        if (account.role.code == 'A') {
            this.props.activateReturn()
        }
        this.loadData(this.props)
    }

    componentWillReceiveProps(props) {
        this.loadData(props)
    }

    handleFilterChange(team, collaborator, year, start, end) {
        if (!collaborator) {
            const teamId = this.props.accountDetail.account.role.code == 'M' ? this.id : team;
            this.refresh(teamId, this.page, year, start, end)
        } else {
            var url = `/challenges/collaborator/${collaborator}?page=${this.page}`;
            if (year) url += `&year=${year}`;
            if (start) url += `&start=${start.getTime()}`;
            if (end) url += `&end=${end.getTime()}`;
            this.props.history.push(url)
        }
    }

    mergeChallenges(collaboratorGoals, teamGoals) {
        return collaboratorGoals.concat(teamGoals).sort((a, b) => {
            const comparison = a.end - b.end;
            return this.page ? comparison : comparison * -1
        })
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.TEAM_CHALLENGE_LIST_EMPTY_STATE_TITLE} message={Resources.TEAM_CHALLENGE_LIST_EMPTY_STATE_MESSAGE} />
    }

    renderData() {
        const { challenges: teamChallenges } = this.props.teamChallengeList;
        const { challenges: collaboratorChallenges } = this.props.teamCollaboratorChallengeList;
        const challenges = this.mergeChallenges(collaboratorChallenges, teamChallenges);

        return (
          <Grid container spacing={2}>
            <ChallengeNewFilter
              open={this.state.filterOpen}
              onClose={this.handleFilterClose.bind(this)}
              onChange={this.handleFilterChange.bind(this)}
              team={this.props.match.params.id}
              year={this.year}
              start={this.start}
              end={this.end}
            />
            { challenges.map(challenge=> {
                const detailurl = challenge.typeCode != 'CT' ? `/challenges/detail/team-collaborator/${challenge.id}` : `/challenges/detail/team/${challenge.id}`;

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
        const { challenges: teamChallenges, loading: teamChallengeListLoading } = this.props.teamChallengeList;
        const { challenges: collaboratorChallenges, loading: teamCollaboratorChallengeListLoading } = this.props.teamCollaboratorChallengeList;
        const loading = teamChallengeListLoading || teamCollaboratorChallengeListLoading;

        const { account } = this.props.accountDetail;

        if(!account.hasChallengeAccess) {
          return <Redirect to={'/'} />
        }

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && collaboratorChallenges && teamChallenges && (collaboratorChallenges.length > 0 || teamChallenges.length > 0) && this.renderData() }
                { !loading && collaboratorChallenges && teamChallenges && collaboratorChallenges.length == 0 && teamChallenges.length == 0 && this.renderEmptyState() }
                
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, teamChallengeList, teamCollaboratorChallengeList }) => ({
    accountDetail,
    teamChallengeList,
    teamCollaboratorChallengeList
});

const mapDispatchToProps = (dispatch) => ({
    teamChallengeListActions: bindActionCreators(teamChallengeListActions, dispatch),
    teamCollaboratorChallengeListActions: bindActionCreators(teamCollaboratorChallengeListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withRouter(TeamChallengeList)))

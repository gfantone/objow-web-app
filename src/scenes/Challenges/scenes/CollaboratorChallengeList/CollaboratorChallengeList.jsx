import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import {Challenge, ChallengeCard, ChallengeFilter} from '../../components'
import { EmptyState, GridLink, IconButton, Loader, MainLayoutComponent, TimeFilter } from '../../../../components'
import * as collaboratorChallengeListActions from '../../../../services/CollaboratorChallenges/CollaboratorChallengeList/actions'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import * as teamChallengeListActions from '../../../../services/TeamChallenges/TeamChallengeList/actions'

class CollaboratorChallengeList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.current = true;
        this.year = null;
        this.start = null;
        this.end = null;
        this.state = {
            filterOpen: false
        }
    }

    refresh(id, current, year, start, end) {
        var url = `/challenges/collaborator/${id}?current=${current}`;
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

    handleTimeChange(current) {
        this.refresh(this.id, current, this.year, this.start, this.end)
    }

    loadData(props) {
        const id = props.match.params.id;
        const params = new URLSearchParams(window.location.search);
        const currentParam = params.get('current');
        const current = currentParam ? currentParam.toBoolean() : this.current;
        const year = params.get('year');
        const startParam = params.get('start');
        const start = startParam ? new Date(Number(startParam)) : null;
        const endParam = params.get('end');
        const end = endParam ? new Date(Number(endParam)) : null;
        const currentStart = this.start ? this.start.getTime().toString() : null;
        const currentEnd = this.end ? this.end.getTime().toString() : null;

        if (id != this.id || current != this.current || year != this.year || startParam != currentStart || endParam != currentEnd) {
            this.id = id;
            this.current = current;
            this.year = year;
            this.start = start;
            this.end = end;
            this.props.collaboratorChallengeListActions.getCollaboratorChallengeList(id, current, year, start, end);
            this.props.collaboratorDetailActions.getCollaboratorDetail(id);
            this.props.teamChallengeListActions.getTeamChallengeListByCollaborator(id, current, year, start, end)
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const currentParam = params.get('current');
        const current = currentParam ? currentParam.toBoolean() : this.current;
        this.props.handleTitle('Challenges');
        this.props.handleSubHeader(<TimeFilter initial={current} handleTimeChange={this.handleTimeChange.bind(this)} />);
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        this.loadData(this.props)
    }

    componentWillReceiveProps(props) {
        this.loadData(props)
    }

    handleFilterChange(team, collaborator, year, start, end) {
        const collaboratorId = this.props.accountDetail.account.role.code == 'C' ? this.id : collaborator;
        if (collaboratorId) {
            this.refresh(collaboratorId, this.current, year, start, end)
        } else {
            const teamId = this.props.accountDetail.account.role.code == 'M' ? this.props.collaboratorDetail.collaborator.team.id : team;
            var url = `/challenges/team/${teamId}?current=${this.current}`;
            if (year) url += `&year=${year}`;
            if (start) url += `&start=${start.getTime()}`;
            if (end) url += `&end=${end.getTime()}`;
            this.props.history.push(url)
        }
    }

    mergeChallenges(collaboratorGoals, teamGoals) {
        return collaboratorGoals.concat(teamGoals).sort((a, b) => {
            const comparison = a.end - b.end;
            return this.current ? comparison : comparison * -1
        })
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title='Aucun challenge trouvé' message="Si vous avez appliqué des filtres, changez-les pour afficher d'autres challenges" />
    }

    renderData() {
        const { challenges: collaboratorChallenges } = this.props.collaboratorChallengeList;
        const { challenges: teamChallenges } = this.props.teamChallengeList;
        const challenges = this.mergeChallenges(collaboratorChallenges, teamChallenges);

        return <Grid container spacing={2}>
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
    }

    render() {
        const { challenges: collaboratorChallenges, loading: collaboratorChallengeListLoading } = this.props.collaboratorChallengeList;
        const { collaborator, loading: collaboratorDetailLoading } = this.props.collaboratorDetail;
        const { challenges: teamChallenges, loading: teamChallengeListLoading } = this.props.teamChallengeList;
        const loading = collaboratorChallengeListLoading || collaboratorDetailLoading || teamChallengeListLoading;
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null;
        const collaboratorId = collaborator ? collaborator.id : null;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && collaboratorChallenges && teamChallenges && this.renderData() }
                { !loading && collaboratorChallenges && teamChallenges && collaboratorChallenges.length == 0 && teamChallenges.length == 0 && this.renderEmptyState() }
                <ChallengeFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={teamId}
                    collaborator={collaboratorId}
                    year={this.year}
                    start={this.start}
                    end={this.end}
                />
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

import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid} from '@material-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSlidersH} from '@fortawesome/free-solid-svg-icons'
import {Goal, GoalFilter} from '../../components'
import {Card, EmptyState, GridLink, IconButton, Loader, MainLayoutComponent, TimeFilter} from '../../../../components'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import * as collaboratorGoalSummaryListActions from '../../../../services/CollaboratorGoalSummaries/CollaboratorGoalSummaryList/actions'
import * as teamGoalListSummaryActions from '../../../../services/TeamGoalSummaries/TeamGoalSummaryList/actions'
import '../../../../helpers/StringHelper'

class CollaboratorGoalList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.current = true;
        this.category = null;
        this.year = null;
        this.start = null;
        this.end = null;
        this.name = null;
        this.state = {
            filterOpen: false
        }
    }

    refresh(id, current, category, year, start, end, name) {
        var url = `/goals/collaborators/${id}/list?current=${current}`;
        if (category) url += `&category=${category}`;
        if (year) url += `&year=${year}`;
        if (start) url += `&start=${start.getTime()}`;
        if (end) url += `&end=${end.getTime()}`;
        if (name) url += `&name=${name}`;
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
        this.refresh(this.id, current, this.category, this.year, this.start, this.end, this.name)
    }

    loadData(props) {
        const id = props.match.params.id;
        const params = new URLSearchParams(window.location.search);
        const currentParam = params.get('current');
        const current = currentParam ? currentParam.toBoolean() : this.current;
        const category = params.get('category');
        const year = params.get('year');
        const startParam = params.get('start');
        const start = startParam ? new Date(Number(startParam)) : null;
        const endParam = params.get('end');
        const end = endParam ? new Date(Number(endParam)) : null;
        const currentStart = this.start ? this.start.getTime().toString() : null;
        const currentEnd = this.end ? this.end.getTime().toString() : null;
        const nameParam = params.get('name');
        const name = nameParam ? decodeURIComponent(nameParam) : null;

        if (id != this.id || current != this.current || category != this.category || year != this.year || startParam != currentStart || endParam != currentEnd || name != this.name) {
            this.id = id;
            this.current = current;
            this.category = category;
            this.year = year;
            this.start = start;
            this.end = end;
            this.name = name;
            this.props.collaboratorDetailActions.getCollaboratorDetail(id);
            this.props.collaboratorGoalSummaryListActions.getCollaboratorGoalSummaryList(id, this.current, this.category, this.year, start, end, this.name);
            this.props.teamGoalListSummaryActions.getTeamGoalSummaryListByCollaborator(id, this.current, this.category, this.year, start, end, this.name)
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const currentParam = params.get('current');
        const current = currentParam ? currentParam.toBoolean() : this.current;
        const name = params.get('name');
        this.props.activateReturn();
        this.props.activateSearch(name);
        this.props.handleTitle('Objectifs');
        this.props.handleSubHeader(<TimeFilter initial={current} handleTimeChange={this.handleTimeChange.bind(this)} />);
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        this.loadData(this.props)
    }

    applySearch(prevProps) {
        if (prevProps.search != this.props.search) {
            const search = this.props.search ? encodeURIComponent(this.props.search) : null;
            this.refresh(this.id, this.current, this.category, this.year, this.start, this.end, search)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData(this.props);
        this.applySearch(prevProps)
    }

    handleFilterChange(category, team, collaborator, year, start, end) {
        const collaboratorId = this.props.accountDetail.account.role.code == 'C' ? this.id : collaborator;
        if (collaboratorId) {
            this.refresh(collaboratorId, this.current, category, year, start, end, this.name)
        } else {
            const teamId = this.props.accountDetail.account.role.code == 'M' ? this.props.collaboratorDetail.collaborator.team.id : team;
            var url = `/goals/teams/${teamId}/list?current=${this.current}`;
            if (category) url += `&category=${category}`;
            if (year) url += `&year=${year}`;
            if (start) url += `&start=${start.getTime()}`;
            if (end) url += `&end=${end.getTime()}`;
            if (this.name) url += `&name=${this.name}`;
            this.props.history.push(url)
        }
    }

    mergeGoals(collaboratorGoals, teamGoals) {
        return collaboratorGoals.concat(teamGoals).sort((a, b) => {
            const comparison = a.end - b.end;
            return this.current ? comparison : comparison * -1
        })
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title='Aucun objectif trouvé' message="Si vous avez appliqué des filtres, changez-les pour afficher d'autres objectifs" />
    }

    renderData() {
        const { goals: collaboratorGoals } = this.props.collaboratorGoalSummaryList;
        const { goals: teamGoals } = this.props.teamGoalSummaryList;
        const goals = this.mergeGoals(collaboratorGoals, teamGoals);

        return (
            <div>
                <Grid container spacing={2}>
                    { goals.map(goal => {
                        const url = goal.type == 'C' ? `/goals/detail/collaborator/${goal.id}` : `/goals/detail/team/${goal.id}`;

                        return (
                            <GridLink key={goal.id} item xs={12} sm={6} md={4} component={Link} to={url}>
                                <Card>
                                    <Goal goal={goal} />
                                </Card>
                            </GridLink>
                        )
                    }) }
                </Grid>
            </div>
        )
    }

    render() {
        const { collaborator } = this.props.collaboratorDetail;
        const { goals: collaboratorGoals, loading: collaboratorGoalListLoading } = this.props.collaboratorGoalSummaryList;
        const { goals: teamGoals, loading: teamGoalListLoading } = this.props.teamGoalSummaryList;
        const loading = collaboratorGoalListLoading || teamGoalListLoading;
        const hasGoals = collaboratorGoals && teamGoals && (collaboratorGoals.length > 0 || teamGoals.length > 0);
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null;
        const collaboratorId = collaborator ? collaborator.id : null;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && hasGoals && this.renderData() }
                { !loading && !hasGoals && this.renderEmptyState() }
                <GoalFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    category={this.category}
                    year={this.year}
                    team={teamId}
                    collaborator={collaboratorId}
                    start={this.start}
                    end={this.end}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorDetail, collaboratorGoalSummaryList, teamGoalSummaryList }) => ({
    accountDetail,
    collaboratorDetail,
    collaboratorGoalSummaryList,
    teamGoalSummaryList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch),
    collaboratorGoalSummaryListActions: bindActionCreators(collaboratorGoalSummaryListActions, dispatch),
    teamGoalListSummaryActions: bindActionCreators(teamGoalListSummaryActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorGoalList)

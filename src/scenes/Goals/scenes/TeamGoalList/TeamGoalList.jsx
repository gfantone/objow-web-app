import React from 'react'
import { Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid } from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH } from '@fortawesome/free-solid-svg-icons'
import { Redirect } from 'react-router-dom'
import { Goal, GoalFilter, GoalCollaboratorFilter } from '../../components'
import { Card, GridLink, IconButton, Loader, MainLayoutComponent, TimeFilter, EmptyState } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as teamCollaboratorGoalListActions from '../../../../services/TeamCollaboratorGoals/TeamCollaboratorGoalList/actions'
import * as teamGoalSummaryListActions from '../../../../services/TeamGoalSummaries/TeamGoalSummaryList/actions'
import '../../../../helpers/StringHelper'
import {TEAM_GOAL_LIST_EMPTY_STATE_MESSAGE} from "../../../../Resources";
import _ from 'lodash'

const styles = {
    zoom: {
        transition: 'transform .5s',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    }
}

class TeamGoalList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.current = 0;
        this.category = "";
        this.year = null;
        this.start = null;
        this.end = null;
        this.name = null;
        this.onlyCollaborator = true;
        this.onlyTeam = true;
        this.definition = "";
        this.state = {
            filterOpen: false,
            collaboratorFilterLoaded: false
        }
    }

    refresh(id, current, category, year, start, end, name, onlyCollaborator, onlyTeam, definition) {
        var url = `/goals/teams/${id}/list?current=${current}`;
        if (category) url += `&category=${category}`;
        if (year) url += `&year=${year}`;
        if (start) url += `&start=${start.getTime()}`;
        if (end) url += `&end=${end.getTime()}`;
        if (name) url += `&name=${name}`;
        if (definition) url += `&definition=${definition}`;
        if (onlyCollaborator !== null) url += `&onlyCollaborator=${onlyCollaborator}`;
        if (onlyTeam !== null) url += `&onlyTeam=${onlyTeam}`;
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
        this.refresh(this.id, current, this.category, this.year, this.start, this.end, this.name, this.onlyCollaborator, this.onlyTeam, this.definition)
    }

    loadData(props) {
        const id = props.match.params.id;
        const params = new URLSearchParams(window.location.search);
        const currentParam = params.get('current');
        const current = currentParam ? currentParam : this.current;
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
        const definition = params.get('definition');
        const onlyCollaboratorParam = params.get('onlyCollaborator');
        const onlyCollaborator = onlyCollaboratorParam ? onlyCollaboratorParam.toBoolean() : true;
        const onlyTeamParam = params.get('onlyTeam');
        const onlyTeam = onlyTeamParam ? onlyTeamParam.toBoolean() : true;

        if (id != this.id || current != this.current || category != this.category || year != this.year || startParam != currentStart || endParam != currentEnd || name != this.name || onlyCollaborator != this.onlyCollaborator || onlyTeam != this.onlyTeam || definition != this.definition) {
            this.id = id;
            this.current = current;
            this.category = category;
            this.year = year;
            this.start = start;
            this.end = end;
            this.name = name;
            this.definition = definition;
            this.onlyCollaborator = onlyCollaborator;
            this.onlyTeam = onlyTeam;
            const all = parseInt(this.current) === 1
            if (onlyCollaborator === true) {
                this.props.teamCollaboratorGoalListActions.getTeamCollaboratorGoalList(id, current, category, year, start, end, name, definition, all);
            } else {
                this.props.teamCollaboratorGoalListActions.getEmptyTeamCollaboratorGoalList()
            }
            if (onlyTeam === true) {
                this.props.teamGoalSummaryListActions.getTeamGoalSummaryListByTeam(id, current, category, year, start, end, name, definition, all)
            } else {
                this.props.teamGoalSummaryListActions.getEmptyTeamGoalSummaryList()
            }
        }
    }

    componentDidMount() {
        const params = new URLSearchParams(window.location.search);
        const currentParam = params.get('current');
        const current = currentParam ? currentParam : this.current;
        const name = params.get('name');
        this.props.activateReturn();
        this.props.activateSearch(name);
        this.props.handleTitle(Resources.GOAL_SHORT_TITLE);
        this.props.handleSubHeader(<TimeFilter initial={current} handleTimeChange={this.handleTimeChange.bind(this)} />);
        this.props.handleButtons(
          <IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
            <FontAwesomeIcon icon={faSlidersH} />
        </IconButton>);
        this.loadData(this.props)
    }

    applySearch(prevProps) {
        if (prevProps.search != this.props.search) {
            const search = this.props.search ? encodeURIComponent(this.props.search) : null;
            this.refresh(this.id, this.current, this.category, this.year, this.start, this.end, search, this.onlyCollaborator, this.onlyTeam)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData(this.props);
        this.applySearch(prevProps)
    }

    handleFilterChange(category, team, collaborator, year, start, end, onlyCollaborator, onlyTeam, definition) {

        if (!collaborator) {
            const teamId = this.props.accountDetail.account.role.code == 'M' ? this.id : team;
            this.refresh(teamId || this.props.match.params.id, this.current, category, year, start, end, this.name, onlyCollaborator, onlyTeam, definition)
        } else {
            var url = `/goals/collaborators/${collaborator}/list?current=${this.current}`;
            if (category) url += `&category=${category}`;
            if (year) url += `&year=${year}`;
            if (start) url += `&start=${start.getTime()}`;
            if (end) url += `&end=${end.getTime()}`;
            if (this.name) url += `&name=${this.name}`;
            if (definition) url += `&definition=${definition}`;
            if (onlyCollaborator !== null) url += `&onlyCollaborator=${onlyCollaborator}`;
            if (onlyTeam !== null) url += `&onlyTeam=${onlyTeam}`;
            this.props.history.push(url)
        }
    }

    mergeGoals(collaboratorGoals, teamGoals) {
        return collaboratorGoals.concat(teamGoals).sort((a, b) => {
            if (a.end !== b.end) {
                const comparison = a.end - b.end
                return parseInt(this.current) !== 1 ? comparison : comparison * -1
            } else {
                if (a.definitionId < b.definitionId)
                    return -1
                if ( a.definitionId > b.definitionId)
                    return 1
                return 0
            }
        })
    }
    onCollaboratorFilterLoaded() {
      if(!this.state.collaboratorFilterLoaded) {
        this.setState({
          ...this.state,
          collaboratorFilterLoaded: true
        })
      }
    }

    renderLoader() {
        return <Loader centered />
    }

    renderEmptyState() {
        return <EmptyState title={Resources.TEAM_GOAL_LIST_EMPTY_STATE_TITLE} message={TEAM_GOAL_LIST_EMPTY_STATE_MESSAGE} />
    }

    renderData() {
        const {classes} = this.props
        const { goals: collaboratorGoals } = this.props.teamCollaboratorGoalList;
        const { goals: teamGoals } = this.props.teamGoalSummaryList;
        const goals = this.mergeGoals(collaboratorGoals, teamGoals);


        return (
              <Grid container spacing={3}>
                { goals.map(goal => {
                  const url = goal.type == 'C' ? `/goals/detail/team-collaborator/${goal.id}` : `/goals/detail/team/${goal.id}`;

                  return (
                    <GridLink key={goal.id} item xs={12} sm={6} md={4} component={Link} to={url}>
                      <Card className={classes.zoom}>
                        <Goal goal={goal} />
                      </Card>
                    </GridLink>
                  )
                }) }
              </Grid>
        )
    }

    render() {
        const { account } = this.props.accountDetail;
        const { goals: collaboratorGoals, loading: teamCollaboratorGoalListLoading } = this.props.teamCollaboratorGoalList;
        const { goals: teamGoals, loading: teamGoalListLoading } = this.props.teamGoalSummaryList;
        const loading = teamCollaboratorGoalListLoading || teamGoalListLoading || this.props.collaboratorFilterLoaded;
        const hasGoals = collaboratorGoals && teamGoals && (collaboratorGoals.length > 0 || teamGoals.length > 0);

        if(!account.hasGoalAccess) {
          return <Redirect to={'/challenges'} />
        }

        if (account.role.code == 'C' || account.role.code == 'M' && account.team.id != this.props.match.params.id) {
            return <Redirect to='/goals' />
        }

        return (
            <div>
                <GoalCollaboratorFilter
                  open={this.state.filterOpen}
                  onClose={this.handleFilterClose.bind(this)}
                  onChange={this.handleFilterChange.bind(this)}
                  team={this.props.match.params.id}
                  category={this.category}
                  year={this.year}
                  start={this.start}
                  end={this.end}
                  definition={this.definition}
                  current={this.current}

                  onlyCollaborator={this.onlyCollaborator}
                  onlyTeam={this.onlyTeam}
                  onLoaded={this.onCollaboratorFilterLoaded.bind(this)}
                />
                { loading && this.renderLoader() }
                { !loading && hasGoals && this.renderData() }
                { !loading && !hasGoals && this.renderEmptyState() }
                <GoalFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    category={this.category}
                    year={this.year}
                    team={this.props.match.params.id}
                    start={this.start}
                    end={this.end}
                    onlyCollaborator={this.onlyCollaborator}
                    onlyTeam={this.onlyTeam}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, teamCollaboratorGoalList, teamGoalSummaryList }) => ({
    accountDetail,
    teamCollaboratorGoalList,
    teamGoalSummaryList
});

const mapDispatchToProps = (dispatch) => ({
    teamCollaboratorGoalListActions: bindActionCreators(teamCollaboratorGoalListActions, dispatch),
    teamGoalSummaryListActions: bindActionCreators(teamGoalSummaryListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TeamGoalList))

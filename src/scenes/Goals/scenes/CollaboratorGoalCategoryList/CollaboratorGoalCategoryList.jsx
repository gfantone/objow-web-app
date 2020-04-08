import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import * as collaboratorGoalCategoryListActions from '../../../../services/CollaboratorGoalCategories/CollaboratorGoalCategoryList/actions'
import {IconButton} from "../../../../components/Common/components/IconButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlidersH} from "@fortawesome/free-solid-svg-icons";
import {Loader} from "../../../../components/Common/components/Loader";
import {Grid} from "@material-ui/core";
import {CategoryFilter} from "../../components/CategoryFilter";
import {GridLink} from "../../../../components/Common/components/GridLink";
import {Link} from "react-router-dom";
import {Category} from "../../components/Category";
import {MainLayoutComponent} from "../../../../components";

class CollaboratorGoalCategoryList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.id = null;
        this.year = null;
        this.state = {
            filterOpen: false
        }
    }

    refresh(id, year) {
        var url = `/goals/collaborators/${id}/categories`;
        if (year) url += `?year=${year}`;
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

    loadData(props) {
        const id = props.match.params.id;
        const params = new URLSearchParams(window.location.search);
        const year = params.get('year');

        if (id != this.id || year != this.year) {
            this.id = id;
            this.year = year;
            this.props.collaboratorDetailActions.getCollaboratorDetail(id);
            this.props.collaboratorGoalCategoryListActions.getCollaboratorGoalCategories(id, this.year);
        }
    }

    componentDidMount() {
        if (this.props.accountDetail.account.role.code == 'A') this.props.activateReturn();
        this.props.handleTitle('Objectifs');
        this.props.handleMaxWidth('sm');
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}>
            <FontAwesomeIcon icon={faSlidersH} />
        </IconButton>);
        this.loadData(this.props)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.loadData(this.props)
    }

    handleFilterChange(team, collaborator, year) {
        const collaboratorId = this.props.accountDetail.account.role.code == 'C' ? this.id : collaborator;
        if (collaboratorId) {
            this.refresh(collaboratorId, year)
        } else {
            const teamId = this.props.accountDetail.account.role.code == 'M' ? this.props.collaboratorDetail.collaborator.team.id : team;
            var url = `/goals/teams/${teamId}/categories`;
            if (year) url += `?year=${year}`;
            this.props.history.push(url)
        }
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const {categories} = this.props.collaboratorGoalCategoryList;
        const all_category = {name: 'Toutes', icon: 'project'};
        const allUrl = this.year ? `/goals/collaborators/${this.props.match.params.id}/list?year=${this.year}` : `/goals/collaborators/${this.props.match.params.id}/list`;

        return (
            <div>
                <Grid container spacing={2}>
                    <GridLink item xs={12} sm={4} component={Link} to={allUrl}>
                        <Category category={all_category} />
                    </GridLink>
                    {categories.map(category => {
                        return (
                            <GridLink key={category.id} item xs={12} sm={4} component={Link} to={`/goals/collaborators/${this.props.match.params.id}/list?category=${category.categoryId}&year=${category.periodId}`}>
                                <Category category={category} />
                            </GridLink>
                        )
                    })}
                </Grid>
            </div>
        )
    }

    render() {
        const {collaborator} = this.props.collaboratorDetail;
        const {categories, loading} = this.props.collaboratorGoalCategoryList;
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null;
        const collaboratorId = collaborator ? collaborator.id : null;

        return (
            <div>
                {loading && this.renderLoader()}
                {!loading && categories && this.renderData()}
                <CategoryFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    year={this.year}
                    team={teamId}
                    collaborator={collaboratorId}
                />
            </div>
        )
    }
}

const mapStateToProps = ({accountDetail, collaboratorDetail, collaboratorGoalCategoryList}) => ({
    accountDetail,
    collaboratorDetail,
    collaboratorGoalCategoryList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch),
    collaboratorGoalCategoryListActions: bindActionCreators(collaboratorGoalCategoryListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorGoalCategoryList)

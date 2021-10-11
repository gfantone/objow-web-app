import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSlidersH} from '@fortawesome/free-solid-svg-icons'
import { SubHeader } from './components'
import { PlayerRanking, RankingFilter } from '../../components'
import {EmptyState, MainLayoutComponent, IconButton} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryDetailActions from '../../../../services/Categories/CategoryDetail/actions'
import * as collaboratorListActions from '../../../../services/Collaborators/CollaboratorList/actions'
import * as collaboratorCategoryRankListActions from '../../../../services/CollaboratorCategoryRanks/CollaboratorCategoryRankList/actions'
import {Redirect} from "react-router";

class PlayerCategoryRanking extends MainLayoutComponent {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        this.categoryId = this.props.match.params.category;
        this.periodId = this.props.match.params.period
        this.props.activateReturn();
        this.props.handleTitle(Resources.RANKING_SHORT_TITLE);
        this.props.handleSubHeader(<SubHeader />);
        this.props.handleMaxWidth('md');
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        this.props.categoryDetailActions.getCategoryDetail(this.categoryId);
        this.props.collaboratorCategoryRankListActions.getCollaboratorCategoryRankListByCategory(this.categoryId, this.periodId)
        this.props.collaboratorListActions.getCollaboratorList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const categoryId = this.props.match.params.category
        const periodId = this.props.match.params.period
        if (this.categoryId != categoryId || this.periodId != periodId) {
            this.categoryId = categoryId
            this.periodId = periodId
            this.props.categoryDetailActions.getCategoryDetail(this.categoryId);
            this.props.collaboratorCategoryRankListActions.getCollaboratorCategoryRankListByCategory(this.categoryId, this.periodId)
        }
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

    refresh(team) {
        const { collaborator, period, category } = this.props.match.params

        var url = `/rankings/collaborators/${collaborator}/categories/${category}/years/${period}`;
        if(team) url += `?team=${team}`;
        this.props.history.replace(url)
    }

    handleFilterChange(team) {
        this.refresh(team)
    }

    renderEmptyState() {
        return <EmptyState title={Resources.COLLABORATOR_CATEGORY_RANKING_EMPTY_STATE_TITLE} />
    }

    addColorToRanks(ranks, collaborators) {
      return collaborators ? ranks.map(rank => (
        Object.assign({}, rank, {color: _.get(
          collaborators.find(collaborator => collaborator.id === rank.collaboratorId)
          , 'team.color.hex')})
      )) : ranks
    }

    renderData() {
        const { ranks } = this.props.collaboratorCategoryRankList;
        const { collaborators } = this.props.collaboratorList;

        // Filter by team
        const params = new URLSearchParams(window.location.search);
        const team = params.get('team');

        return <PlayerRanking ranking={
          team ? this.addColorToRanks(ranks, collaborators).filter(rank =>
            _.get(collaborators.find(c => c.id === _.get(rank, 'collaboratorId')), 'team.id') === parseInt(team)
          ) : this.addColorToRanks(ranks, collaborators)
        } collaboratorId={this.props.match.params.collaborator} />
    }

    render() {
        const { account } = this.props.accountDetail;
        const { ranks, loading } = this.props.collaboratorCategoryRankList;
        const { collaborators, loading: collaboratorLoading } = this.props.collaboratorList;

        if (!account.hasRankingAccess) {
            return <Redirect to={`/`} />
        }

        if (!account.hasCategoryRankAccess) {
            return <Redirect to='/' />
        }

        const params = new URLSearchParams(window.location.search);
        const team = params.get('team');

        return (
            <div>
                { !loading && ranks && ranks.length > 0 && this.renderData() }
                { !loading && ranks && ranks.length == 0 && this.renderEmptyState() }
                {
                  this.state.filterOpen &&
                  <RankingFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={team}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorList, categoryDetail, collaboratorCategoryRankList }) => ({
    accountDetail,
    categoryDetail,
    collaboratorList,
    collaboratorCategoryRankList
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorListActions: bindActionCreators(collaboratorListActions, dispatch),
    categoryDetailActions: bindActionCreators(categoryDetailActions, dispatch),
    collaboratorCategoryRankListActions: bindActionCreators(collaboratorCategoryRankListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerCategoryRanking)

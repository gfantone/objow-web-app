import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {IconButton, Loader, MainLayoutComponent} from '../../../../components'
import { CollaboratorRankingListFilter, PlayerRankList, SubHeader, TeamRankList } from './components'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlidersH} from "@fortawesome/free-solid-svg-icons";

class CollaboratorRankingList extends MainLayoutComponent {
    constructor(props) {
        super(props);
        this.collaboratorId = null;
        this.page = 0;
        this.year = null;
        this.state = {
            filterOpen: false
        }
    }

    refresh(collaboratorId, page, year) {
        var url = `/rankings/collaborator/${collaboratorId}?page=${page}`;
        if (year) url += `&year=${year}`;
        this.props.history.replace(url)
    }

    handleHeaderChange(page) {
        this.refresh(this.collaboratorId, page, this.year)
    }

    loadData(props) {
        const collaboratorId = props.match.params.id;
        const params = new URLSearchParams(window.location.search);
        const pageParam = params.get('page');
        const page = pageParam ? Number(pageParam) : 0;
        const year = params.get('year');
        if (collaboratorId != this.collaboratorId) {
            this.collaboratorId = collaboratorId;
            this.props.collaboratorDetailActions.getCollaboratorDetail(collaboratorId)
        }
        if (page != this.page) {
            this.page = page;
        }
        if (year != this.year) {
            this.year = year
        }
    }

    componentDidMount() {
        const { account } = this.props.accountDetail;
        this.props.handleTitle('Classements');
        if (account.hasTeamRankAccess) {
            const params = new URLSearchParams(window.location.search);
            const pageParam = params.get('page');
            const page = pageParam ? Number(pageParam) : 0;
            this.props.handleSubHeader(<SubHeader page={page} onChange={this.handleHeaderChange.bind(this)} />)
        }
        this.props.handleMaxWidth('md');
        this.props.handleButtons(<IconButton size='small' onClick={this.handleFilterOpen.bind(this)}><FontAwesomeIcon icon={faSlidersH} /></IconButton>);
        if (this.props.accountDetail.account.role.code != 'C') {
            this.props.activateReturn()
        }
        this.loadData(this.props)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.loadData(nextProps)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { account } = this.props.accountDetail;
        const { collaborator } = this.props.collaboratorDetail;

        return (
            <div>
                { this.page == 0 && <PlayerRankList id={collaborator.id} year={this.year} /> }
                { account.hasTeamRankAccess && this.page == 1 && <TeamRankList id={collaborator.team ? collaborator.team.id : -1} year={this.year} /> }
            </div>
        )
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

    handleFilterChange(collaborator, year) {
        const collaboratorId = this.props.accountDetail.account.role.code == 'C' ? this.id : collaborator;
        this.refresh(collaboratorId, this.page, year)
    }

    render() {
        const { collaborator } = this.props.collaboratorDetail;
        const teamId = collaborator && collaborator.team ? collaborator.team.id : null;
        const collaboratorId = collaborator ? collaborator.id : null;

        return (
            <div>
                { collaborator && this.renderData() }
                <CollaboratorRankingListFilter
                    open={this.state.filterOpen}
                    onClose={this.handleFilterClose.bind(this)}
                    onChange={this.handleFilterChange.bind(this)}
                    team={teamId}
                    collaborator={collaboratorId}
                    year={this.year}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, collaboratorDetail }) => ({
    accountDetail,
    collaboratorDetail
});

const mapDispatchToProps = (dispatch) => ({
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRankingList)

import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {StoreCollaboratorDepartment, SubHeader} from './components'
import {MainLayoutComponent} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as collaboratorDetailActions from '../../../../services/Collaborators/CollaboratorDetail/actions'
import {StoreTeamDepartment} from "../../components/StoreTeamDepartment";

class CollaboratorRewardStore extends MainLayoutComponent {
    state = {page: 0, period: null}

    handlePageChange(page) {
        this.setState({
            ...this.state,
            page: page
        })
    }

    componentDidMount() {
        const id = this.props.match.params.id
        const {account} = this.props.accountDetail
        this.props.handleTitle(Resources.REWARD_TITLE)
        this.props.handleSubHeader(<SubHeader page={this.state.page} onChange={this.handlePageChange.bind(this)} />)
        if (account.role.code !== 'C') {
            this.props.activateReturn()
        }
        this.props.collaboratorDetailActions.getCollaboratorDetail(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const params = new URLSearchParams(window.location.search)
        const period = Number(params.get('period'))
        if (period !== this.state.period) {
            this.setState(({
                ...this.state,
                period: period
            }))
        }
    }

    handleAddClick(reward) {
        alert('Add')
    }

    render() {
        const {collaborator, loading} = this.props.collaboratorDetail

        return (
            <div>
                {!loading && collaborator && this.state.page === 0 && <StoreCollaboratorDepartment id={collaborator.id} periodId={this.state.period} onAddClick={this.handleAddClick.bind(this)} />}
                {!loading && collaborator && collaborator.team && this.state.page === 1 && <StoreTeamDepartment id={collaborator.team.id} periodId={this.state.period} onAddClick={this.handleAddClick.bind(this)} />}
            </div>
        )
    }

}

const mapStateToProps = ({accountDetail, collaboratorDetail}) => ({
    accountDetail,
    collaboratorDetail
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorDetailActions: bindActionCreators(collaboratorDetailActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CollaboratorRewardStore)

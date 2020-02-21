import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { SubHeader } from './components'
import { DataTable, IconButton, Loader, MainLayoutComponent } from '../../../../components'
import * as userListActions from '../../../../services/Users/UserList/actions'
import { bindActionCreators } from 'redux'
import '../../../../helpers/NumberHelper'

class AdminUserList extends MainLayoutComponent {
    loadUserList(isActive) {
        this.props.userListActions.getUserList(isActive)
    }

    handleCreateClick() {
        this.props.history.push('/admin/users/creation')
    }

    handlePageChange = (page) => {
        this.loadUserList(page == 0)
    };

    componentDidMount() {
        this.props.handleTitle('Administration');
        this.props.handleSubHeader(<SubHeader onChange={this.handlePageChange.bind(this)} />);
        this.props.handleButtons(<IconButton size='small' onClick={this.handleCreateClick.bind(this)}><FontAwesomeIcon icon={faPlus} /></IconButton>);
        this.props.activateReturn();
        this.loadUserList(true)
    }

    renderLoader() {
        return <Loader centered />
    }

    renderData() {
        const { history } = this.props;
        const { users } = this.props.userList;
        var columns = [
            { name: 'id', label: 'Ref' },
            { name: 'fullname', label: 'Nom' },
            { name: 'email', label: 'Email' },
            { name: 'role.name', label: 'Fonction' },
            { name: 'team.name', label: 'Équipe' },
            { name: 'lastLogin', label: 'Dernière connexion', options: {
                customBodyRender: value => {
                    return <span>{ value ? value.toDate().toLocaleString() : 'Aucune' }</span>
                },
                filter: false
            } }
        ];
        const options = {
            selectableRows: 'none',
            onRowClick: (colData, cellMeta) => { history.push(`/admin/users/modification/${colData[0]}`) }
        };
        return <DataTable data={users} columns={columns} options={options} />
    }

    render() {
        const { users, loading } = this.props.userList;

        return (
            <div>
                { loading && this.renderLoader() }
                { !loading && users && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ userList }) => ({
    userList
});

const mapDispatchToProps = (dispatch) => ({
    userListActions: bindActionCreators(userListActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserList)
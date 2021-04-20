import React from 'react'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFileUpload, faFileDownload, faPlus} from '@fortawesome/free-solid-svg-icons'
import {SubHeader, UserListImport} from './components'
import {DataTable, IconButton, Loader, MainLayoutComponent} from '../../../../components'
import * as userListActions from '../../../../services/Users/UserList/actions'
import * as userListExportActions from '../../../../services/Users/UserListExport/actions'
import {bindActionCreators} from 'redux'
import '../../../../helpers/NumberHelper'
import {Tooltip} from "@material-ui/core";

class AdminUserList extends MainLayoutComponent {
    state = {importOpen: false};

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
        this.props.handleButtons(<div>
            <Tooltip title='Exporter'>
                <IconButton size='small' onClick={this.export.bind(this)} style={{marginRight: 8}}><FontAwesomeIcon icon={faFileDownload} /></IconButton>
            </Tooltip>
            <Tooltip title='Importer'>
                <IconButton size='small' onClick={this.onOpen.bind(this)} style={{marginRight: 8}}><FontAwesomeIcon icon={faFileUpload} /></IconButton>
            </Tooltip>
            <Tooltip title='Créer'>
                <IconButton size='small' onClick={this.handleCreateClick.bind(this)}><FontAwesomeIcon icon={faPlus} /></IconButton>
            </Tooltip>
        </div>);
        this.props.activateReturn();
        this.loadUserList(true)
    }

    export() {
      const { users } = this.props.userList;
      const request = new FormData();
      request.append('users', users);
      const response = this.props.userListExportActions.exportUserList(request)
      console.log(response);
    }

    renderLoader() {
        return <Loader centered />
    }

    onOpen() {
        this.setState({
            ...this.state,
            importOpen: true
        })
    }

    onClose() {
        this.setState({
            ...this.state,
            importOpen: false
        })
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
        return (
            <div>
                <DataTable data={users} columns={columns} options={options} />
                <UserListImport open={this.state.importOpen} onClose={this.onClose.bind(this)} />
            </div>
        )
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
    userListActions: bindActionCreators(userListActions, dispatch),
    userListExportActions: bindActionCreators(userListExportActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserList)

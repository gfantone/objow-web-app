import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardMedia, Grid } from '@material-ui/core';
import {
  faFileUpload,
  faFileDownload,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { injectIntl } from 'react-intl';
import { SubHeader, UserListImport } from './components';
import {
  DataTable,
  IconButton,
  Loader,
  MainLayoutComponent,
} from '../../../../components';
import { ChallengeSearchBar } from '../../../../scenes/Challenges/components';
import * as userListActions from '../../../../services/Users/UserList/actions';
import * as userListExportActions from '../../../../services/Users/UserListExport/actions';
import { bindActionCreators } from 'redux';
import '../../../../helpers/NumberHelper';
import { Tooltip } from '@material-ui/core';
import api from '../../../../data/api/api';
import _ from 'lodash';

class AdminUserList extends MainLayoutComponent {
  state = {
    importOpen: false,
    isActive: true,
    users: [],
    page: 1,
    lastUpdatedPage: 0,
    usersLoaded: false,
    tabPage: 0,
  };

  loadUserList(isActive) {
    this.props.userListActions.getUserList({
      isActive,
      simple: true,
      page: this.state.page,
      search: this.state.search,
    });
  }

  handleCreateClick() {
    this.props.history.push('/admin/users/creation');
  }

  handlePageChange = (page) => {
    const isActive = page == 0;
    this.setState(
      {
        ...this.state,
        isActive: isActive,
        tabPage: page,
        page: 1,
        lastUpdatedPage: 0,
        usersLoaded: false,
        users: [],
      },
      () => {
        this.loadUserList(isActive);
      }
    );
  };

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: 'menu.admin_button' }));
    this.props.handleSubHeader(
      <SubHeader onChange={this.handlePageChange.bind(this)} />
    );
    this.props.handleButtons(
      <div>
        <Tooltip title={intl.formatMessage({ id: 'common.export' })}>
          <IconButton
            size='small'
            onClick={this.export.bind(this)}
            style={{ marginRight: 8 }}
          >
            <FontAwesomeIcon icon={faFileDownload} />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.formatMessage({ id: 'common.import' })}>
          <IconButton
            size='small'
            onClick={this.onOpen.bind(this)}
            style={{ marginRight: 8 }}
          >
            <FontAwesomeIcon icon={faFileUpload} />
          </IconButton>
        </Tooltip>
        <Tooltip title={intl.formatMessage({ id: 'common.create' })}>
          <IconButton size='small' onClick={this.handleCreateClick.bind(this)}>
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
        </Tooltip>
      </div>
    );
    this.props.activateReturn();
    this.loadUserList(true);
  }

  async export() {
    const { users } = this.props.userList;
    const request = new FormData();
    request.append('users', users);

    const response = await api.users.export(request, this.state.isActive);

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute(
      'download',
      `objow_users_${new Date().toLocaleDateString()}.csv`
    );
    document.body.appendChild(a);

    a.click();
  }

  componentDidUpdate() {
    const { users, loading, hasError } = this.props.userList;
    if (users && !loading && !hasError) {
      this.setState({
        ...this.state,
        usersLoaded: false,
        page: this.state.page + 1,
        lastUpdatedPage: this.state.page,
        users: _.uniqBy([...this.state.users, ...users], (u) => u.id),
      });

      if (this.state.page !== this.state.lastUpdatedPage) {
        const isActive = this.state.tabPage == 0;

        this.loadUserList(isActive);
      }
    }

    if (hasError && !this.state.usersLoaded) {
      this.setState({
        ...this.state,
        usersLoaded: true,
      });
    }
  }

  renderLoader() {
    return <Loader centered />;
  }

  onOpen() {
    this.setState({
      ...this.state,
      importOpen: true,
    });
  }

  onClose() {
    this.setState({
      ...this.state,
      importOpen: false,
    });
  }

  handleSearch = (search) => {
    this.setState(
      {
        ...this.state,
        page: 1,
        lastUpdatedPage: 0,
        usersLoaded: false,
        users: [],
        search,
      },
      () => {
        if (this.state.searchTimeout) {
          clearTimeout(this.state.searchTimeout);
        }
        const searchTimeout = setTimeout(() => {
          this.loadUserList(this.state.isActive);
        }, 500);
        this.setState({
          ...this.state,
          searchTimeout,
        });
      }
    );
  };

  renderData() {
    const { intl } = this.props;
    const { history } = this.props;
    const { users } = this.state;
    const localStorageSortColumnKey = 'ADMIN_USER_LIST_SORT_COLUMN';
    const localStorageSortDirectionKey = 'ADMIN_USER_LIST_SORT_DIRECTION';
    var columns = [
      { name: 'id', label: intl.formatMessage({ id: 'admin.user.id' }) },
      {
        name: 'fullname',
        label: intl.formatMessage({ id: 'admin.user.fullname' }),
      },
      {
        name: 'email',
        sort: true,
        label: intl.formatMessage({ id: 'admin.user.email' }),
      },
      {
        name: 'role.name',
        label: intl.formatMessage({ id: 'admin.user.role' }),
      },
      {
        name: 'team.name',
        sort: true,
        label: intl.formatMessage({ id: 'admin.user.team' }),
      },
      {
        name: 'team.parent.name',
        sort: true,
        label: intl.formatMessage({ id: 'common.team_group' }),
      },
      {
        name: 'locale',
        label: intl.formatMessage({ id: 'admin.user.locale' }),
        options: {
          customBodyRender: (value) => {
            const icons = {
              fr: require(`../../../../assets/img/system/flags/fr.svg`),
              en: require(`../../../../assets/img/system/flags/gb.svg`),
            };
            return (
              <CardMedia
                image={icons[value]}
                style={{ height: 15, width: 20 }}
              />
            );
          },
          filter: false,
        },
      },
      {
        name: 'lastLogin',
        label: intl.formatMessage({ id: 'admin.user.last_login' }),
        options: {
          customBodyRender: (value) => {
            return (
              <span>
                {value
                  ? value.toDate().toLocaleString()
                  : intl.formatMessage({ id: 'admin.user.last_login_empty' })}
              </span>
            );
          },
          filter: false,
        },
      },
    ];
    const defaultSortColumn = localStorage.getItem(localStorageSortColumnKey);
    const defaultSortDirection = localStorage.getItem(
      localStorageSortDirectionKey
    );

    const options = {
      sortOrder: { name: defaultSortColumn, direction: defaultSortDirection },
      selectableRows: 'none',
      onRowClick: (colData, cellMeta) => {
        history.push(`/admin/users/modification/${colData[0]}`);
      },
      onColumnSortChange: (changedColumn, direction) => {
        localStorage.setItem(localStorageSortColumnKey, changedColumn);
        localStorage.setItem(localStorageSortDirectionKey, direction);
      },
      search: false,

      // onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
      // }
    };
    return (
      <div>
        <DataTable
          data={users.map((user) =>
            columns.map((column) => _.get(user, column.name))
          )}
          columns={columns}
          options={options}
        />
        <UserListImport
          open={this.state.importOpen}
          onClose={this.onClose.bind(this)}
        />
      </div>
    );
  }

  render() {
    const { loading } = this.props.userList;
    const { users } = this.state;
    const { intl } = this.props;

    return (
      <div>
        <Grid container spacing={1}>
          <Grid item>
            <ChallengeSearchBar
              onChange={this.handleSearch}
              placeholder={intl.formatMessage({
                id: 'admin.user.search_placeholder',
              })}
            />
          </Grid>
          <Grid item xs={12}>
            {!((users && users.length > 0) || !loading) && this.renderLoader()}
            {((users && users.length > 0) || !loading) && this.renderData()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ userList, userListExport }) => ({
  userList,
  userListExport,
});

const mapDispatchToProps = (dispatch) => ({
  userListActions: bindActionCreators(userListActions, dispatch),
  userListExportActions: bindActionCreators(userListExportActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AdminUserList));

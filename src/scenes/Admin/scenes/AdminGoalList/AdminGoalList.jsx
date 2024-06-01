import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { injectIntl } from 'react-intl';
import { SubHeader } from './components';
import {
  DataTable,
  IconButton,
  Loader,
  MainLayoutComponent,
} from '../../../../components';
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions';
import _ from 'lodash';

const styles = {
  root: {
    position: 'relative',
  },
  iconMargin: {
    marginRight: 16,
  },
  loader: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

class AdminGoalList extends MainLayoutComponent {
  state = { isActive: true };

  loadData() {
    this.props.actions.getGoalDefinitionList(
      this.props.match.params.periodId,
      this.state.isActive,
    );
  }

  onChange(isActive) {
    this.setState(
      {
        ...this.state,
        isActive: isActive,
      },
      () => {
        this.loadData();
      },
    );
  }

  handleCreate() {
    this.props.history.push(
      `/admin/periods/${this.props.match.params.periodId}/goals/creation`,
    );
  }

  handleCreateFolder() {
    this.props.history.push('/admin/category');
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.activateReturn();
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(
      <SubHeader onChange={this.onChange.bind(this)} />,
    );
    this.props.handleMaxWidth('lg');
    this.props.handleButtons(
      <IconButton size="small" onClick={this.handleCreate.bind(this)}>
        <FontAwesomeIcon icon={faPlus} />
      </IconButton>,
    );
    this.loadData();
  }

  _renderLoader() {
    return (
      <div className={this.props.classes.loader}>
        <Loader />
      </div>
    );
  }

  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { definitions } = this.props.goalDefinitionList;
    const localStorageSortColumnKey = 'ADMIN_GOAL_LIST_SORT_COLUMN';
    const localStorageSortDirectionKey = 'ADMIN_GOAL_LIST_SORT_DIRECTION';

    var columns = [
      {
        name: 'id',
        label: intl.formatMessage({ id: 'admin.goal.list.columns.id' }),
      },
      {
        name: 'isActive',
        label: 'Ref',
        options: { display: false, filter: false },
      },
      {
        name: 'name',
        label: intl.formatMessage({ id: 'admin.goal.list.columns.name' }),
      },
      {
        name: 'kpi.unit.name',
        label: intl.formatMessage({ id: 'admin.goal.list.columns.unit' }),
      },
      {
        name: 'type.description',
        label: intl.formatMessage({ id: 'admin.goal.list.columns.type' }),
      },
      {
        name: 'periodicity.description',
        label: intl.formatMessage({
          id: 'admin.goal.list.columns.periodicity',
        }),
      },
      {
        name: 'target',
        label: intl.formatMessage({ id: 'admin.goal.list.columns.target' }),
      },
      {
        name: 'default',
        label: intl.formatMessage({ id: 'admin.goal.list.columns.default' }),
      },
      {
        name: 'category.name',
        label: intl.formatMessage({ id: 'admin.goal.list.columns.category' }),
      },
    ];

    const defaultSortColumn = localStorage.getItem(localStorageSortColumnKey);
    const defaultSortDirection = localStorage.getItem(
      localStorageSortDirectionKey,
    );
    const options = {
      sortOrder: { name: defaultSortColumn, direction: defaultSortDirection },
      selectableRows: 'none',
      onRowClick: (colData, cellMeta) => {
        this.props.history.push(
          `/admin/periods/${this.props.match.params.periodId}/goals/modification/${colData[0]}`,
          colData[1],
        );
      },
      onColumnSortChange: (changedColumn, direction) => {
        localStorage.setItem(localStorageSortColumnKey, changedColumn);
        localStorage.setItem(localStorageSortDirectionKey, direction);
      },
    };
    return (
      <DataTable
        data={definitions.map((definition) =>
          columns.map((column) => _.get(definition, column.name)),
        )}
        columns={columns}
        options={options}
      />
    );
  }

  render() {
    const { definitions, loading } = this.props.goalDefinitionList;

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && definitions && this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({ goalDefinitionList }) => ({
  goalDefinitionList,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(goalDefinitionListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(withRouter(injectIntl(AdminGoalList))));

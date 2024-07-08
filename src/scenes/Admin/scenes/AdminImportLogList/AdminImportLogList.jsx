import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { injectIntl } from "react-intl";
import {
  AppBarSubTitle,
  DataTable,
  Loader,
  MainLayoutComponent,
  Tooltip,
  IconButton,
} from "../../../../components";
import { GoalListImport } from "../AdminGoalList/GoalListImport";
import SubHeader from "./SubHeader";
import * as importLogListActions from "../../../../services/ImportLogs/ImportLogList/actions";
import * as importUsersLogListActions from "../../../../services/ImportUsersLogs/ImportUsersLogList/actions";
import * as importGoalsLogListActions from "../../../../services/ImportGoalsLogs/ImportGoalsLogList/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faFileUpload,
  faCheck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../helpers/StringHelper";
import api from "../../../../data/api/api";

import _ from "lodash";

class AdminImportLogList extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  handlePageChange = (newValue) => {
    this.setState({ ...this.state, page: newValue }, () => {
      const { intl } = this.props;
      this.props.handleButtons(
        <div>
          <Tooltip title={intl.formatMessage({ id: "common.import" })}>
            <IconButton
              size="small"
              onClick={this.onOpen}
              style={{ marginRight: 8 }}
            >
              <FontAwesomeIcon icon={faFileUpload} />
            </IconButton>
          </Tooltip>
        </div>
      );
    });
  };

  componentDidMount() {
    const { intl } = this.props;

    this.props.handleTitle(intl.formatMessage({ id: "admin.title" }));
    // this.props.handleSubHeader(<AppBarSubTitle title="Journal d'import" />);

    this.props.handleSubHeader(
      <SubHeader onChange={this.handlePageChange.bind(this)} />
    );
    this.props.activateReturn();

    this.props.importLogListActions.getImportLogList();
    this.props.importUsersLogListActions.getImportUsersLogList();
    this.props.importGoalsLogListActions.getImportGoalsLogList();
  }

  onOpen = () => {
    this.setState({
      ...this.state,
      importOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      ...this.state,
      importOpen: false,
    });
  };

  renderLoader() {
    return <Loader centered />;
  }
  async export_users(id, endpoint = api.importUsersLogs) {
    const { logs } = this.props.importUsersLogList;
    const log = logs.find((l) => l.id === parseInt(id));

    const response = await endpoint.export(id);

    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    const splitFile = log.file_name.split("/");
    a.setAttribute("download", splitFile[splitFile.length - 1]);
    document.body.appendChild(a);

    a.click();
  }

  async export_goals(id, endpoint = api.importGoalsLogs) {
    const { logs } = this.props.importGoalsLogList;
    const log = logs.find((l) => l.id === parseInt(id));

    const response = await endpoint.export(id);

    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    const splitFile = log.file_name.split("/");
    a.setAttribute("download", splitFile[splitFile.length - 1]);
    document.body.appendChild(a);

    a.click();
  }

  async export(id, endpoint = api.importLogs) {
    const { logs } = this.props.importLogList;
    const log = logs.find((l) => l.id === parseInt(id));

    const response = await endpoint.export(id);

    const blob = new Blob([response.data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    const splitFile = log.file.split("/");
    a.setAttribute("download", splitFile[splitFile.length - 1]);
    document.body.appendChild(a);

    a.click();
  }

  renderData() {
    const { intl } = this.props;
    var { logs } = this.props.importLogList;
    const localStorageSortColumnKey = "ADMIN_IMPORT_LOG_SORT_COLUMN";
    const localStorageSortDirectionKey = "ADMIN_IMPORT_LOG_SORT_DIRECTION";
    const columns = [
      {
        name: "id",
        label: intl.formatMessage({ id: "admin.import_log.columns.id" }),
      },
      {
        name: "file",
        label: intl.formatMessage({ id: "admin.import_log.columns.file" }),
        options: {
          customBodyRender: (value) => {
            const value_list = value.split("/");
            if (value_list.length > 0) {
              return value_list[value_list.length - 1];
            } else {
              return "";
            }
          },
        },
      },
      {
        name: "date",
        label: intl.formatMessage({ id: "admin.import_log.columns.date" }),
        options: {
          filter: false,
          customBodyRender: (value) => {
            return value.toDate().toLocaleString();
          },
        },
      },
      {
        name: "state.name",
        label: intl.formatMessage({ id: "admin.import_log.columns.state" }),
      },
      {
        name: "id",
        label: intl.formatMessage({ id: "admin.import_log.columns.download" }),
        options: {
          sort: false,
          customBodyRender: (value) => {
            return (
              <FontAwesomeIcon
                style={{ marginLeft: "35px", cursor: "pointer" }}
                onClick={() => this.export(value)}
                icon={faDownload}
              />
            );
          },
        },
      },
    ];
    const defaultSortColumn = localStorage.getItem(localStorageSortColumnKey);
    const defaultSortDirection = localStorage.getItem(
      localStorageSortDirectionKey
    );
    const options = {
      sortOrder: { name: defaultSortColumn, direction: defaultSortDirection },
      selectableRows: "none",
      onColumnSortChange: (changedColumn, direction) => {
        localStorage.setItem(localStorageSortColumnKey, changedColumn);
        localStorage.setItem(localStorageSortDirectionKey, direction);
      },
    };

    return (
      <DataTable
        data={logs.map((log) =>
          columns.map((column) => _.get(log, column.name))
        )}
        columns={columns}
        options={options}
      />
    );
  }
  renderDataUsers() {
    const { intl } = this.props;
    var { logs } = this.props.importUsersLogList;
    const localStorageSortColumnKey = "ADMIN_IMPORT_USERS_LOG_SORT_COLUMN";
    const localStorageSortDirectionKey =
      "ADMIN_IMPORT_USERS_LOG_SORT_DIRECTION";
    const columns = [
      {
        name: "id",
        label: intl.formatMessage({ id: "admin.import_log.columns.id" }),
      },
      {
        name: "file_name",
        label: intl.formatMessage({ id: "admin.import_log.columns.file" }),
      },
      {
        name: "date",
        label: intl.formatMessage({ id: "admin.import_log.columns.date" }),
        options: {
          filter: false,
          customBodyRender: (value) => {
            return value.toDate().toLocaleString();
          },
        },
      },
      {
        name: "id",
        label: intl.formatMessage({ id: "admin.import_log.columns.state" }),
        options: {
          customBodyRender: (value) => {
            const log = logs.filter((l) => l.id === value)[0];
            const isDone =
              log.total_lines === log.success_lines + log.error_lines;
            return (
              <div style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                  style={{ color: isDone ? "#00E234" : "orange" }}
                  icon={isDone ? faCheck : faClock}
                />
              </div>
            );
          },
        },
      },
      {
        name: "success_lines",
        label: intl.formatMessage({
          id: "admin.import_log.columns.success_lines",
        }),
        options: {
          customBodyRender: (value) => {
            return (
              <div>
                <div style={{ textAlign: "center", marginRight: 20 }}>
                  {value}
                </div>
              </div>
            );
          },
        },
      },
      {
        name: "error_lines",
        label: intl.formatMessage({
          id: "admin.import_log.columns.error_lines",
        }),
        options: {
          customBodyRender: (value) => {
            return (
              <div>
                <div style={{ textAlign: "center", marginRight: 20 }}>
                  {value}
                </div>
              </div>
            );
          },
        },
      },
      {
        name: "id",
        label: intl.formatMessage({ id: "admin.import_log.columns.download" }),
        options: {
          sort: false,
          customBodyRender: (value) => {
            return (
              <FontAwesomeIcon
                style={{ marginLeft: "35px", cursor: "pointer" }}
                onClick={() => this.export_users(value, api.importUsersLogs)}
                icon={faDownload}
              />
            );
          },
        },
      },
    ];
    const defaultSortColumn = localStorage.getItem(localStorageSortColumnKey);
    const defaultSortDirection = localStorage.getItem(
      localStorageSortDirectionKey
    );
    const options = {
      sortOrder: { name: defaultSortColumn, direction: defaultSortDirection },
      selectableRows: "none",
      onColumnSortChange: (changedColumn, direction) => {
        localStorage.setItem(localStorageSortColumnKey, changedColumn);
        localStorage.setItem(localStorageSortDirectionKey, direction);
      },
    };

    return (
      <DataTable
        data={logs.map((log) =>
          columns.map((column) => _.get(log, column.name))
        )}
        columns={columns}
        options={options}
      />
    );
  }

  renderDataGoals() {
    const { intl } = this.props;
    var { logs } = this.props.importGoalsLogList;
    const localStorageSortColumnKey = "ADMIN_IMPORT_USERS_LOG_SORT_COLUMN";
    const localStorageSortDirectionKey =
      "ADMIN_IMPORT_USERS_LOG_SORT_DIRECTION";
    const columns = [
      {
        name: "id",
        label: intl.formatMessage({ id: "admin.import_log.columns.id" }),
      },
      {
        name: "file_name",
        label: intl.formatMessage({ id: "admin.import_log.columns.file" }),
      },
      {
        name: "date",
        label: intl.formatMessage({ id: "admin.import_log.columns.date" }),
        options: {
          filter: false,
          customBodyRender: (value) => {
            return value.toDate().toLocaleString();
          },
        },
      },
      {
        name: "success_lines",
        label: intl.formatMessage({
          id: "admin.import_log.columns.success_lines",
        }),
        options: {
          customBodyRender: (value) => {
            return (
              <div>
                <div style={{ textAlign: "center", marginRight: 20 }}>
                  {value}
                </div>
              </div>
            );
          },
        },
      },
      {
        name: "error_lines",
        label: intl.formatMessage({
          id: "admin.import_log.columns.error_lines",
        }),
        options: {
          customBodyRender: (value) => {
            return (
              <div>
                <div style={{ textAlign: "center", marginRight: 20 }}>
                  {value}
                </div>
              </div>
            );
          },
        },
      },
      {
        name: "id",
        label: intl.formatMessage({ id: "admin.import_log.columns.download" }),
        options: {
          sort: false,
          customBodyRender: (value) => {
            return (
              <FontAwesomeIcon
                style={{ marginLeft: "35px", cursor: "pointer" }}
                onClick={() => this.export_goals(value, api.importGoalsLogs)}
                icon={faDownload}
              />
            );
          },
        },
      },
    ];
    const defaultSortColumn = localStorage.getItem(localStorageSortColumnKey);
    const defaultSortDirection = localStorage.getItem(
      localStorageSortDirectionKey
    );
    const options = {
      sortOrder: { name: defaultSortColumn, direction: defaultSortDirection },
      selectableRows: "none",
      onColumnSortChange: (changedColumn, direction) => {
        localStorage.setItem(localStorageSortColumnKey, changedColumn);
        localStorage.setItem(localStorageSortDirectionKey, direction);
      },
    };

    return (
      <DataTable
        data={logs.map((log) =>
          columns.map((column) => _.get(log, column.name))
        )}
        columns={columns}
        options={options}
      />
    );
  }

  render() {
    const { logs, loading: logsLoading } = this.props.importLogList;
    const { logs: logsUsers, loading: logsUsersLoading } =
      this.props.importUsersLogList;
    const { logs: logsGoals, loading: logsGoalsLoading } =
      this.props.importGoalsLogList;
    const loading = logsLoading || logsUsersLoading || logsGoalsLoading;

    return (
      <div>
        {loading && this.renderLoader()}
        {!loading && logs && this.state.page === 0 && this.renderData()}
        {!loading &&
          logsUsers &&
          this.state.page === 1 &&
          this.renderDataUsers()}
        {!loading &&
          logsGoals &&
          this.state.page === 2 &&
          this.renderDataGoals()}
        <GoalListImport open={this.state.importOpen} onClose={this.onClose} />
      </div>
    );
  }
}

const mapStateToProps = ({
  importLogList,
  importUsersLogList,
  importGoalsLogList,
}) => ({
  importLogList,
  importUsersLogList,
  importGoalsLogList,
});

const mapDispatchToProps = (dispatch) => ({
  importLogListActions: bindActionCreators(importLogListActions, dispatch),
  importUsersLogListActions: bindActionCreators(
    importUsersLogListActions,
    dispatch
  ),
  importGoalsLogListActions: bindActionCreators(
    importGoalsLogListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AdminImportLogList));

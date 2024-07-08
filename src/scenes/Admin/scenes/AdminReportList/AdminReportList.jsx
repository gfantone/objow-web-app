import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Formsy from "formsy-react";
import { DialogContent, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  AppBarSubTitle,
  DataTable,
  Loader,
  MainLayoutComponent,
  GridLink,
  RoundedTabs,
  RoundedTab,
  Dialog,
  DialogActions,
  DialogTitle,
  Select,
  TextField,
  ProgressButton,
  Button,
} from "../../../../components";
import { injectIntl } from "react-intl";
import { SubHeader, WeekOverlaps } from "./components";
import { AdminMetabase } from "../AdminMetabase";
import * as kpiListActions from "../../../../services/Kpis/KpiList/actions";
import * as configListActions from "../../../../services/Configs/ConfigList/actions";
import * as categoryListActions from "../../../../services/Categories/CategoryList/actions";
import * as kpiCreationActions from "../../../../services/Kpis/KpiCreation/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCalendar } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import dayjs from "dayjs";

const styles = {
  kpiDialog: {
    width: 900,
  },
  weekOverlapDialog: {
    width: 700,
    maxWidth: 700,
  },
};

class AdminReportList extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
    };
  }

  componentDidMount() {
    const { intl } = this.props;
    this.props.handleTitle(intl.formatMessage({ id: "admin.title" }));
    this.props.handleSubHeader(
      <SubHeader handleChangeTab={this.handleChangeTab} />
    );
    this.props.activateReturn();
    this.props.kpiListActions.getKpiList();
    this.props.categoryListActions.getActiveCategoryList();
  }

  handleChangeTab = (value) => {
    this.setState({
      ...this.state,
      tabValue: value,
    });
  };

  renderLoader() {
    return <Loader centered />;
  }

  handleSubmitKpi = (model) => {
    this.props.kpiCreationActions.createKpi(model);
    this.onNewKpiClose();
  };

  onNewKpiClose = () => {
    this.setState({
      ...this.state,
      newKpiOpen: false,
    });
  };
  onNewKpiOpen = () => {
    this.setState({
      ...this.state,
      newKpiOpen: true,
    });
  };

  onWeekOverlapsClose = () => {
    this.setState({
      ...this.state,
      weekOverlapsOpen: false,
    });
  };

  onWeekOverlapsOpen = () => {
    this.setState({
      ...this.state,
      weekOverlapsOpen: true,
    });
  };

  renderData() {
    const { intl } = this.props;
    const { kpis } = this.props.kpiList;
    const { configs } = this.props.configList;
    const MTBS = configs && configs.find((c) => c.code === "MTBS");
    const localStorageSortColumnKey = "ADMIN_REPORT_LIST_SORT_COLUMN";
    const localStorageSortDirectionKey = "ADMIN_REPORT_LIST_SORT_DIRECTION";

    const columns = [
      {
        name: "id",
        label: intl.formatMessage({ id: "admin.report.columns.kpi_ref" }),
      },
      {
        name: "code",
        label: intl.formatMessage({ id: "admin.report.columns.kpi_code" }),
      },
      {
        name: "name",
        label: intl.formatMessage({ id: "admin.report.columns.kpi_name" }),
      },
      {
        name: "unit.name",
        label: intl.formatMessage({ id: "admin.report.columns.result_unit" }),
      },
      {
        name: "manual",
        label: intl.formatMessage({ id: "admin.report.columns.format" }),
        options: {
          customBodyRender: (value) => {
            return value
              ? intl.formatMessage({ id: "admin.report.columns.format_manual" })
              : intl.formatMessage({
                  id: "admin.report.columns.format_standard",
                });
          },
        },
      },
      {
        name: "periodicity.description",
        label: intl.formatMessage({ id: "admin.report.columns.periodicity" }),
      },
      {
        name: "category.name",
        label: intl.formatMessage({ id: "admin.report.columns.category" }),
      },
    ];
    const defaultSortColumn = localStorage.getItem(localStorageSortColumnKey);
    const defaultSortDirection = localStorage.getItem(
      localStorageSortDirectionKey
    );
    const options = {
      sortOrder: { name: defaultSortColumn, direction: defaultSortDirection },
      selectableRows: "none",
      onRowClick: (colData, cellMeta) => {
        this.props.history.push(`/admin/reports/${colData[0]}`);
      },
      onColumnSortChange: (changedColumn, direction) => {
        localStorage.setItem(localStorageSortColumnKey, changedColumn);
        localStorage.setItem(localStorageSortDirectionKey, direction);
      },
    };
    return (
      <React.Fragment>
        <Grid container spacing={1}>
          <Grid item xs={12} container justify="flex-end" spacing={1}>
            <Grid item>
              <Button onClick={this.onWeekOverlapsOpen} text="nouveau">
                <FontAwesomeIcon icon={faCalendar} style={{ marginRight: 5 }} />
                Gestion des semaines
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={this.onNewKpiOpen} text="nouveau">
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: 5 }} />
                nouveau kpi
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {this.state.tabValue === 0 && (
              <DataTable
                data={kpis.map((kpi) =>
                  columns.map((column) => _.get(kpi, column.name))
                )}
                columns={columns}
                options={options}
              />
            )}
            {this.state.tabValue === 1 && <AdminMetabase MTBS={MTBS} />}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  render() {
    const { intl, classes } = this.props;
    const { kpis, loading: kpiLoading } = this.props.kpiList;
    const { configs, loading: configLoading } = this.props.configList;
    const { categories, loading: categoryListLoading } =
      this.props.categoryList;

    const loading = kpiLoading || configLoading || categoryListLoading;

    const criticities = [
      { order: 1, name: "Basse" },
      { order: 2, name: "Moyenne" },
      { order: 3, name: "Haute" },
    ];

    return (
      <div>
        {loading && configLoading && this.renderLoader()}
        {!loading && !configLoading && kpis && this.renderData()}
        <Dialog
          open={this.state.newKpiOpen}
          onClose={this.onNewKpiClose}
          classes={{ paper: this.props.classes.kpiDialog }}
        >
          <DialogTitle>Demande de création de KPI</DialogTitle>
          <Formsy onValidSubmit={this.handleSubmitKpi.bind(this)}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Select
                      name="criticity"
                      label={intl.formatMessage({
                        id: "admin.goal.criticity_label",
                      })}
                      options={criticities}
                      optionValueName="order"
                      optionTextName="name"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Select
                      name="category"
                      label={intl.formatMessage({
                        id: "admin.goal.category_label",
                      })}
                      options={categories}
                      optionValueName="id"
                      optionTextName="name"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  label={intl.formatMessage({
                    id: "admin.goal.kpi_name_label",
                  })}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="description"
                  label={intl.formatMessage({
                    id: "admin.goal.description_label",
                  })}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <DialogActions>
              <ProgressButton
                type="submit"
                text={intl.formatMessage({ id: "common.submit" })}
                loading={loading}
                centered
              />
              <Button onClick={this.onNewKpiClose} color="secondary">
                {intl.formatMessage({ id: "common.cancel" })}
              </Button>
            </DialogActions>
          </Formsy>
        </Dialog>
        <Dialog
          open={this.state.weekOverlapsOpen}
          onClose={this.onWeekOverlapsClose}
          classes={{ paper: this.props.classes.weekOverlapDialog }}
        >
          <DialogTitle>Répartitions des semaines</DialogTitle>
          <DialogContent>
            <WeekOverlaps />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ kpiList, configList, categoryList }) => ({
  kpiList,
  categoryList,
  configList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
  kpiListActions: bindActionCreators(kpiListActions, dispatch),
  kpiCreationActions: bindActionCreators(kpiCreationActions, dispatch),
  configListActions: bindActionCreators(configListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(withStyles(styles)(AdminReportList)));

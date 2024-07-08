import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { Grid } from '@material-ui/core';
import { injectIntl } from 'react-intl';
import { Period, SubHeader } from './components';
import {
  MainLayoutComponent,
  ProgressButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components';
import * as collaboratorDataListActions from '../../../../services/CollaboratorData/CollaboratorDataList/actions';
import * as collaboratorDataUpdateActions from '../../../../services/CollaboratorData/CollaboratorDataUpdate/actions';
import * as kpiDetailActions from '../../../../services/Kpis/KpiDetail/actions';
import { toast } from 'react-toastify';

class AdminReportDetail extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.props.collaboratorDataUpdateActions.clearCollaboratorDataUpdate();
  }

  componentDidMount() {
    const { intl } = this.props;
    const id = this.props.match.params.id;
    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(<SubHeader />);
    this.props.activateReturn();
    this.props.collaboratorDataListActions.getCollaboratorDataList(id);
    this.props.kpiDetailActions.getKpiDetail(id);
  }

  handleSubmit(model) {
    const data = [];
    const keys = Object.keys(model);
    keys.map((key) => {
      const item = { id: key, value: model[key] };
      data.push(item);
    });
    this.props.collaboratorDataUpdateActions.updateCollaboratorData(data);
  }

  renderData() {
    const { intl } = this.props;
    const { data } = this.props.collaboratorDataList;
    const { kpi } = this.props.kpiDetail;
    const { loading } = this.props.collaboratorDataUpdate;
    const firstData = data && data.length > 0 ? data[0] : null;

    return (
      <Formsy onSubmit={this.handleSubmit.bind(this)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>
                    {intl.formatMessage({ id: 'common.collaborator' })}
                  </TableHeadCell>
                  <TableHeadCell>
                    {intl.formatMessage({ id: 'common.teams' })}
                  </TableHeadCell>
                  {firstData && firstData.dataId && (
                    <TableHeadCell>
                      <Period
                        periodicity={firstData.periodicity}
                        start={firstData.dataStart}
                      />
                    </TableHeadCell>
                  )}
                  {firstData && firstData.previousDataId && (
                    <TableHeadCell>
                      <Period
                        periodicity={firstData.periodicity}
                        start={firstData.previousDataStart}
                      />
                    </TableHeadCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        {item.firstname} {item.lastname}
                      </TableCell>
                      <TableCell>{item.team}</TableCell>
                      {item.dataId && (
                        <TableCell>
                          {kpi.manual && (
                            <TextField
                              disableInitialUpdate
                              type="number"
                              name={item.dataId}
                              initial={item.dataValue}
                            />
                          )}
                          {!kpi.manual && (
                            <span>{item.dataValue.toLocaleString()}</span>
                          )}
                        </TableCell>
                      )}
                      {item.previousDataId && (
                        <TableCell>
                          {kpi.manual && item.previousDataId && (
                            <TextField
                              disableInitialUpdate
                              type="number"
                              name={item.previousDataId}
                              initial={parseFloat(item.previousDataValue)}
                            />
                          )}
                          {!kpi.manual && (
                            <span>
                              {item.previousDataValue.toLocaleString()}
                            </span>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Grid>
          {kpi.manual && (
            <Grid item xs={12}>
              <ProgressButton
                type="submit"
                text={intl.formatMessage({ id: 'common.submit' })}
                loading={loading}
                centered
              />
            </Grid>
          )}
        </Grid>
      </Formsy>
    );
  }

  render() {
    const { intl } = this.props;
    const { data, loading: collaboratorDataListLoading } =
      this.props.collaboratorDataList;
    const { kpi, loading: kpiDetailLoading } = this.props.kpiDetail;
    const loading = collaboratorDataListLoading || kpiDetailLoading;
    const { success, hasError: error } = this.props.collaboratorDataUpdate;

    if (success) {
      this.props.collaboratorDataUpdateActions.clearCollaboratorDataUpdate();
      this.props.history.goBack();
      toast.success(
        intl.formatMessage({ id: 'common.update_success_message' }),
      );
    }
    if (error) {
      toast.error(intl.formatMessage({ id: 'common.update_error_message' }));
    }

    return <div>{!loading && data && kpi && this.renderData()}</div>;
  }
}

const mapStateToProps = ({
  collaboratorDataList,
  collaboratorDataUpdate,
  kpiDetail,
}) => ({
  collaboratorDataList,
  collaboratorDataUpdate,
  kpiDetail,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorDataListActions: bindActionCreators(
    collaboratorDataListActions,
    dispatch,
  ),
  collaboratorDataUpdateActions: bindActionCreators(
    collaboratorDataUpdateActions,
    dispatch,
  ),
  kpiDetailActions: bindActionCreators(kpiDetailActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(AdminReportDetail));

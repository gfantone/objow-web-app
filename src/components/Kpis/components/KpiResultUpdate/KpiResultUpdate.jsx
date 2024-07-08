import React, { useState, useRef, useEffect } from 'react';
import Formsy from 'formsy-react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'sheetjs-style';
import {
  DefaultTitle,
  DefaultText,
  CollaboratorFilterAndSearchBar,
  Loader,
} from '../../../../components';
import {
  ChallengeKpiCollaboratorUpdate,
  CollaboratorDataSpreadsheet,
  CollaboratorInputSpreadsheet,
  CollaboratorInputCreateForm,
} from '../../../../scenes/Challenges/components/ChallengeKpiResultUpdate/components';
import {
  ChallengeCollaboratorFilter,
  ChallengeSearchBarCollaborators,
} from '../../../../scenes/Challenges/components';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { useIntl, injectIntl } from 'react-intl';
import { Grid, IconButton, withWidth, isWidthUp } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchangeAlt,
  faArrowUp,
  faArrowDown,
  faChevronLeft,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';
import * as collaboratorDataListActions from '../../../../services/CollaboratorData/CollaboratorDataList/actions';
import * as collaboratorInputListActions from '../../../../services/CollaboratorInput/CollaboratorInputList/actions';
import * as collaboratorDataUpdateActions from '../../../../services/CollaboratorData/CollaboratorDataUpdate/actions';
import * as collaboratorInputCreationActions from '../../../../services/CollaboratorInput/CollaboratorInputCreation/actions';
import * as challengeParticipantListActions from '../../../../services/ChallengeParticipants/ChallengeParticipantList/actions';
import * as kpiDetailActions from '../../../../services/Kpis/KpiDetail/actions';
import api from '../../../../data/api/api';
import _ from 'lodash';

const styles = {
  spreadsheet: {
    paddingLeft: 0,
    width: '100%',
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
  link: {
    fontSize: 16,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    color: 'rgb(15,111,222)',
    opacity: 1,
  },
};

const KpiResultUpdate = ({
  kpi: kpiInput,
  onClose,
  width,
  classes,
  collaboratorEdit,
  start: startDate,
  end: endDate,
  coverImage,
  participantIds,
  participantTeamIds,
  challenge,
  fetchUsers,
  usersState,
  ...props
}) => {
  const intl = useIntl();

  const {
    data,
    loading: collaboratorDataListLoading,
    hasError: dataListError,
  } = props.collaboratorDataList;
  const {
    input,
    loading: collaboratorInputListLoading,
    hasError: inputListError,
  } = props.collaboratorInputList;
  const { kpi, loading: kpiDetailLoading } = props.kpiDetail;
  const { loading, success, hasError: error } = props.collaboratorDataUpdate;
  const { success: inputSuccess, hasError: inputError } =
    props.collaboratorInputCreation;
  const [initialized, setInitialized] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [gridCsv, setGridCsv] = React.useState();
  const [filterDate, setFilterDate] = React.useState(Date.now());
  const [collaborator, setCollaborator] = React.useState();
  const [collaboratorInputFilters, setCollaboratorInputFilters] =
    React.useState({});
  const [collaboratorDataFilters, setCollaboratorDataFilters] = React.useState(
    {}
  );
  const abortController = new AbortController();
  const isCollaboratorEditable =
    typeof _.get(kpiInput, 'collaborator_editable') === 'string'
      ? _.get(kpiInput, 'collaborator_editable').toBoolean()
      : _.get(kpiInput, 'collaborator_editable', false);

  const isDesktop = isWidthUp('md', width);

  const filterData = (newFilterDate) => {
    if (newFilterDate) {
      setFilterDate(newFilterDate.getTime());
      // Admin and manager must select a collaborator
      if (collaboratorEdit || collaborator) {
        const ajustedDate =
          newFilterDate.getTime() / 1000 > endDate
            ? endDate * 1000 - 8000000
            : newFilterDate.getTime();
        props.collaboratorDataListActions.getCollaboratorDataList(
          _.get(kpiInput, 'id'),
          isCollaboratorEditable,
          ajustedDate,
          ajustedDate,
          { collaborator, page, abortController, raw: true }
        );
      }
    }
  };

  const filterInputList = (teamGroup, team, collaborator, page, search) => {
    setCollaboratorInputFilters({
      teamGroup,
      team,
      collaborator,
      page,
      search,
    });
    const ajustedEnd = endDate ? parseInt(endDate) * 1000 : null;
    const ajustedStart = startDate ? parseInt(startDate) * 1000 : null;
    props.collaboratorInputListActions.getCollaboratorInputList(
      _.get(kpiInput, 'id'),
      true,
      ajustedStart,
      ajustedEnd,
      { teamGroup, team, collaborator, page, search, abortController }
    );
  };

  const filterDataList = (teamGroup, team, collaborator, page, search) => {
    setCollaboratorDataFilters({ teamGroup, team, collaborator, page, search });
    const ajustedEnd = endDate ? parseInt(endDate) * 1000 : null;
    const ajustedStart = startDate ? parseInt(startDate) * 1000 : null;

    props.collaboratorDataListActions.getCollaboratorDataList(
      _.get(kpiInput, 'id'),
      isCollaboratorEditable,
      ajustedStart,
      ajustedEnd,
      {
        teamGroup,
        team,
        collaborator,
        page,
        search,
        abortController,
        raw: true,
      }
    );
  };

  if (!initialized && data) {
    props.collaboratorDataListActions.getCollaboratorDataListClear();
    props.collaboratorInputListActions.getCollaboratorInputListClear();
    props.kpiDetailActions.getKpiDetailClear();
  }

  if (!initialized && kpiInput && !data) {
    if (!kpiDetailLoading) {
      props.kpiDetailActions.getKpiDetail(_.get(kpiInput, 'id'));
    }
    if (kpi && kpi.id === parseInt(_.get(kpiInput, 'id'))) {
      // check if collaborator editable is true to determine if we get start and end from date select
      const start = kpi.collaborator_editable ? filterDate : startDate * 1000;
      const end = kpi.collaborator_editable ? filterDate : endDate * 1000;
      if (kpi.collaborator_editable) {
        const ajustedEnd = endDate ? parseInt(endDate) * 1000 : null;
        const ajustedStart = startDate ? parseInt(startDate) * 1000 : null;

        props.collaboratorInputListActions.getCollaboratorInputList(
          _.get(kpiInput, 'id'),
          true,
          ajustedStart,
          ajustedEnd,
          { abortController }
        );
      }

      if (collaboratorEdit || !kpi.collaborator_editable) {
        const ajustedEnd =
          end / 1000 > parseInt(endDate) ? parseInt(endDate) * 1000 : end;
        const ajustedStart =
          start / 1000 > parseInt(startDate)
            ? parseInt(startDate) * 1000
            : start;

        props.collaboratorDataListActions.getCollaboratorDataList(
          _.get(kpiInput, 'id'),
          isCollaboratorEditable,
          ajustedStart,
          ajustedEnd,
          { page, abortController, raw: true }
        );
      }
      setInitialized(true);
    }
  }

  useEffect(() => {
    if (!kpiInput) {
      close();
    }
  }, [kpiInput]);

  const close = () => {
    props.collaboratorDataListActions.getCollaboratorDataListClear();
    props.collaboratorInputListActions.getCollaboratorInputListClear();
    props.kpiDetailActions.getKpiDetailClear();
    abortController.abort();
    setInitialized(false);
    onClose(null);
  };

  const exportToCsv = async (source = api.collaboratorInput) => {
    const response = await source.export(
      _.get(kpiInput, 'id'),
      collaboratorInputFilters
    );

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${kpi.name}.csv`);
    document.body.appendChild(a);

    a.click();
  };

  const exportToExcel = async (source = api.collaboratorInput) => {
    const response = await source.excel_export(
      _.get(kpiInput, 'id'),
      collaboratorInputFilters
    );
    const formattedResponse = response.data['data'].map((item) => {
      const result = {};
      response.data['columns'].forEach((column, key) => {
        result[intl.formatMessage({ id: column })] = item[key];
      });
      return result;
    });

    const ws = XLSX.utils.json_to_sheet(formattedResponse);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    FileSaver.saveAs(data, `${kpi.name}.xlsx`);
  };

  const onCollaboratorFilter = (team, currentCollaborator) => {
    if (currentCollaborator && filterDate) {
      const ajustedDate =
        filterDate / 1000 > endDate ? endDate * 1000 - 8000000 : filterDate;

      props.collaboratorDataListActions.getCollaboratorDataList(
        _.get(kpiInput, 'id'),
        isCollaboratorEditable,
        ajustedDate,
        ajustedDate,
        { collaborator: currentCollaborator, page, abortController, raw: true }
      );
    }
  };

  const kpiCollaboratorEditable = kpi
    ? String(_.get(kpi, 'collaborator_editable', 'False')).toBoolean()
    : null;

  if (kpiDetailLoading) {
    return (
      <div
        style={{
          width: 500,
          height: 200,
        }}
      >
        <Grid
          container
          spacing={1}
          direction='column'
          alignItems='center'
          justifyContent='center'
          style={{
            minHeight: '100%',
          }}
        >
          <Grid item>
            <Loader centered />
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minWidth: isDesktop ? 500 : 0,
        minHeight: 200,
      }}
    >
      <Grid container spacing={2} direction='column' style={{ height: '100%' }}>
        {collaboratorEdit && (
          <Grid item xs={12}>
            <ChallengeKpiCollaboratorUpdate
              data={data}
              input={input}
              close={close}
              filterData={filterData}
              filterDate={
                filterDate / 1000 < parseInt(startDate)
                  ? startDate * 1000 + 4000000
                  : filterDate / 1000 > endDate
                  ? endDate * 1000 - 8000000
                  : filterDate
              }
              filterInputList={filterInputList}
              minDate={startDate}
              maxDate={endDate}
              kpi={kpi}
              image={coverImage}
            />
          </Grid>
        )}

        {!collaboratorEdit && (
          <React.Fragment>
            {kpiCollaboratorEditable === true && (
              <React.Fragment>
                <Grid
                  container
                  direction='column'
                  spacing={1}
                  style={{ maxWidth: !coverImage && page === 1 ? 600 : '100%' }}
                >
                  {page === 0 && (
                    <React.Fragment>
                      <Grid item xs={12} style={{ width: 'calc(100% - 15px)' }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <DefaultTitle
                              style={{ textTransform: 'none', fontSize: 18 }}
                            >
                              {intl.formatMessage({
                                id: 'challenge.kpi_results.title',
                              })}{' '}
                              :{' '}
                              <span style={{ fontWeight: 'bold' }}>
                                {_.get(kpi, 'name')}
                              </span>
                            </DefaultTitle>
                            <Grid item xs={12}>
                              <DefaultText
                                style={{
                                  textTransform: 'none',
                                  fontSize: 14,
                                  opacity: 0.8,
                                }}
                              >
                                {intl.formatMessage({
                                  id: 'challenge.kpi_results.subtitle',
                                })}
                              </DefaultText>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <CollaboratorInputSpreadsheet
                          data={input}
                          kpi={kpi}
                          close={close}
                          filterInputList={filterInputList}
                          hasNextInputPage={!inputListError}
                          loading={collaboratorInputListLoading}
                          image={coverImage}
                          participantTeamIds={participantTeamIds}
                          participantIds={participantIds}
                          setGridCsv={setGridCsv}
                          exportToExcel={exportToExcel}
                          exportToCsv={exportToCsv}
                          switchToCreation={() => setPage(1)}
                        />
                      </Grid>
                    </React.Fragment>
                  )}
                  {page === 1 && (
                    <React.Fragment>
                      <Grid
                        item
                        xs={12}
                        sm={coverImage ? 6 : 12}
                        style={{ width: 'calc(100% - 15px)' }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <DefaultTitle
                              style={{ textTransform: 'none', fontSize: 18 }}
                            >
                              {`${intl.formatMessage({
                                id: 'challenge.kpi_results.add_kpi_title',
                              })} : `}
                              <span style={{ fontWeight: 'bold' }}>
                                {_.get(kpi, 'name')}
                              </span>
                            </DefaultTitle>
                          </Grid>
                          <Grid item xs={12}>
                            <DefaultText
                              style={{
                                textTransform: 'none',
                                fontSize: 14,
                                opacity: 0.8,
                              }}
                            >
                              {`${intl.formatMessage({
                                id: 'challenge.kpi_results.subtitle',
                              })}`}
                            </DefaultText>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        onClick={() => setPage(0)}
                        className={classes.link}
                      >
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          style={{ marginRight: 5 }}
                        />
                        {`${intl.formatMessage({
                          id: 'challenge.kpi_results.back_button',
                        })}`}
                      </Grid>
                      <Grid item>
                        <CollaboratorFilterAndSearchBar
                          fetchUsers={fetchUsers}
                          usersState={usersState}
                          collaborator={collaborator}
                          participantTeamIds={participantTeamIds}
                          participantIds={participantIds}
                          onChange={(team, collaborator) => {
                            onCollaboratorFilter(team, collaborator);
                            setCollaborator(collaborator);
                          }}
                        />
                      </Grid>

                      <Grid item>
                        <CollaboratorInputCreateForm
                          data={_.get(data, '[0]')}
                          collaborator={collaborator}
                          kpi={kpi}
                          close={close}
                          filterData={filterData}
                          filterDate={
                            filterDate / 1000 < parseInt(startDate)
                              ? startDate * 1000 + 4000000
                              : filterDate / 1000 > endDate
                              ? endDate * 1000 - 4000000
                              : filterDate
                          }
                          minDate={startDate}
                          maxDate={endDate}
                          onSuccess={() => {
                            toast.success(
                              intl.formatMessage({
                                id: 'common.update_success_message',
                              })
                            );
                            setPage(0);
                          }}
                          image={coverImage}
                        />
                      </Grid>
                    </React.Fragment>
                  )}
                </Grid>
              </React.Fragment>
            )}
            {kpiCollaboratorEditable === false && (
              <React.Fragment>
                <Grid
                  item
                  xs={12}
                  style={{
                    width: isDesktop ? 'calc(50% - 15px)' : 'calc(100% - 15px)',
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <DefaultTitle
                        style={{ textTransform: 'none', fontSize: 18 }}
                      >
                        {`${intl.formatMessage({
                          id: 'challenge.kpi_results.edit_kpi_title',
                        })} :  `}
                        <span
                          style={{
                            fontWeight: 'bold',
                            display: 'block',
                          }}
                        >
                          {kpiInput ? kpiInput.name : ''}
                        </span>
                      </DefaultTitle>
                      <Grid item xs={12}>
                        <DefaultText
                          style={{
                            textTransform: 'none',
                            fontSize: 14,
                            opacity: 0.8,
                          }}
                        >
                          {`${intl.formatMessage({
                            id: 'challenge.kpi_results.subtitle',
                          })}`}
                        </DefaultText>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <CollaboratorDataSpreadsheet
                    data={data}
                    kpi={kpi}
                    close={close}
                    image={coverImage}
                    startDate={startDate}
                    endDate={endDate}
                    reloadData={() => {
                      const ajustedEnd = endDate
                        ? parseInt(endDate) * 1000
                        : null;
                      const ajustedStart = startDate
                        ? parseInt(startDate) * 1000
                        : null;

                      filterDataList(null, null, null, 1);
                    }}
                    filterDataList={filterDataList}
                    hasNextDataPage={!dataListError}
                    loading={collaboratorDataListLoading}
                    participantTeamIds={participantTeamIds}
                    participantIds={participantIds}
                    exportToExcel={() => exportToExcel(api.collaboratorData)}
                    exportToCsv={() => exportToCsv(api.collaboratorData)}
                  />
                </Grid>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Grid>
    </div>
  );
};

const mapStateToProps = ({
  collaboratorDataList,
  collaboratorDataUpdate,
  kpiDetail,
  collaboratorInputCreation,
  collaboratorInputList,
  challengeParticipantList,
}) => ({
  collaboratorDataList,
  collaboratorInputList,
  collaboratorDataUpdate,
  collaboratorInputCreation,
  kpiDetail,
  challengeParticipantList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorDataListActions: bindActionCreators(
    collaboratorDataListActions,
    dispatch
  ),
  collaboratorInputListActions: bindActionCreators(
    collaboratorInputListActions,
    dispatch
  ),
  collaboratorDataUpdateActions: bindActionCreators(
    collaboratorDataUpdateActions,
    dispatch
  ),
  collaboratorInputCreationActions: bindActionCreators(
    collaboratorInputCreationActions,
    dispatch
  ),
  kpiDetailActions: bindActionCreators(kpiDetailActions, dispatch),
  challengeParticipantListActions: bindActionCreators(
    challengeParticipantListActions,
    dispatch
  ),
});

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(KpiResultUpdate))
);

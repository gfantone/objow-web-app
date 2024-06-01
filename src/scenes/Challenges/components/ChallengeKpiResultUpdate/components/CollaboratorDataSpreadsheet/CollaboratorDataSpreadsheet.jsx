import React, { useState, useRef, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Formsy from 'formsy-react';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import {
  Spreadsheet,
  Loader,
  DefaultTitle,
  DefaultText,
  ProgressButton,
  Avatar,
  DatePicker,
  TextField,
  Tooltip,
  Button,
} from '../../../../../../components';
import { CollaboratorInputImageList } from '../';
import { ChallengeCollaboratorFilter, ChallengeSearchBar } from '../../../';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchangeAlt,
  faArrowUp,
  faArrowDown,
  faEdit,
  faChevronLeft,
  faFile,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';
import {
  Grid,
  IconButton,
  withWidth,
  isWidthUp,
  CardMedia,
} from '@material-ui/core';
import * as collaboratorDataUpdateActions from '../../../../../../services/CollaboratorData/CollaboratorDataUpdate/actions';
import { hasImageExtension } from '../../../../../../helpers/UrlHelper';
import { useIntl, injectIntl } from 'react-intl';
import _ from 'lodash';

const styles = {
  spreadsheet: {
    paddingLeft: 0,
    width: '100%',
  },
  searchBar: {
    width: '40vw',
    maxWidth: '40vw',
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
  coverImage: {
    position: 'absolute',
    top: '-12px',
    height: 'calc(100% + 20px)',
    width: 'calc(50% + 20px)',
    borderRadius: '0 4px 4px 0',
  },
};

const CollaboratorDataSpreadsheet = ({
  data: fetchedData,
  hasNextDataPage,
  loading: dataLoading,
  kpi,
  classes,
  width,
  close,
  startDate,
  endDate,
  image: coverImage,
  reloadData,
  filterDataList,
  participantTeamIds,
  participantIds,
  exportToExcel,
  exportToCsv,
  ...props
}) => {
  const intl = useIntl();
  const { loading, success, hasError: error } = props.collaboratorDataUpdate;

  const [data, setData] = React.useState();
  const [nextPage, setNextPage] = React.useState(1);
  const [replaceData, setReplaceData] = React.useState(true);
  const [grid, setGrid] = React.useState();
  const [sort, setSort] = React.useState(['firstname', 'lastname']);
  const [lastSort, setLastSort] = React.useState();
  const [lastSortDirection, setLastSortDirection] = React.useState();
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  const [currentData, setCurrentData] = React.useState();

  const [collaborator, setCollaborator] = useState();
  const [team, setTeam] = useState();
  const [teamGroup, setTeamGroup] = useState();
  const [search, setSearch] = useState();
  const searchRef = useRef(search);
  const nextPageRef = useRef(nextPage);

  const readOnly = kpi && !kpi.manual;
  const isDesktop = isWidthUp('md', width);

  useEffect(() => {
    setSubmitDisabled(false);
  }, [grid]);

  useEffect(() => {
    const sortDirection =
      lastSort && sort[0] === lastSort[0] && lastSortDirection === 'asc'
        ? 'desc'
        : 'asc';
    setLastSort(sort);
    setLastSortDirection(sortDirection);
    if (sort && sortDirection && data && kpi) {
      refreshGrid(sort, sortDirection);
    }
  }, [sort]);

  useEffect(() => {
    if (fetchedData) {
      if (!replaceData) {
        setGrid();

        setData(_.uniqWith([...data, ...fetchedData], _.isEqual));
      } else {
        setGrid();

        setData(fetchedData);
        setReplaceData(false);
      }
    }
  }, [fetchedData]);

  const onCollaboratorFilter = (
    team,
    collaborator,
    year,
    start,
    end,
    type,
    teamGroup
  ) => {
    if (collaborator) {
      setTeam();
      setTeamGroup();
      setCollaborator(collaborator);
    } else if (team) {
      setTeam(team);
      setTeamGroup();
      setCollaborator();
    } else if (teamGroup) {
      setTeam();
      setTeamGroup(teamGroup);
      setCollaborator();
    }

    // setTeam(team)
    // setTeamGroup(teamGroup)
    // setCollaborator(collaborator)
    if (filterDataList) {
      setReplaceData(true);
      filterDataList(teamGroup, team, collaborator, 1, search);
    }
  };

  const handleSubmit = () => {
    let payload = _.flatten(grid)
      .filter((cell) => cell.type === 'data' && cell.id)
      .map((cell) =>
        cell.id === -1
          ? {
              id: cell.id,
              value: cell.value,
              kpi: cell.kpi,
              start: startDate,
              end: endDate,
              collaborator: cell.collaborator,
            }
          : cell.value !== null && cell.value !== undefined
          ? {
              id: cell.id,
              value: cell.value,
            }
          : { id: cell.id }
      );
    payload = payload.filter(
      (d) =>
        (d.id === -1 &&
          d.value !== null &&
          d.value !== undefined &&
          d.value > 0) ||
        d.id > 0
    );
    props.collaboratorDataUpdateActions.updateCollaboratorData(payload);
  };

  const handleDataSubmit = (model) => {
    const formData = new FormData();
    formData.append('id', currentData.dataId);
    formData.append('value', model.value);
    formData.append('description', model.description || '');

    if (currentData.dataId == -1) {
      formData.append('collaborator', currentData.collaborator_id);
      formData.append('kpi', currentData.kpi_id);
      formData.append('start', startDate);
      formData.append('end', endDate);
    }

    const images = model.images
      ? _.compact(
          model.images.map((image, index) => {
            if (image && image.id) {
              return image.id;
            }
          })
        )
      : [];

    const model_image_ids = _.get(model, 'images', []).map((i) =>
      parseInt(i.id)
    );

    const deleted_images = _.get(currentData, 'images', []).filter(
      (i) => !model_image_ids.includes(parseInt(i.id))
    );

    const image_uploads = model.images
      ? _.compact(
          model.images.map((image, index) => {
            if (image && !image.id) {
              return image;
            }
          })
        )
      : [];

    const imageUploadSizeReached = image_uploads.some(
      (image) => image.size > 20000000
    );
    deleted_images.forEach((image, index) => {
      formData.append(`deleted_images`, image.id);
    });
    image_uploads.forEach((image, index) => {
      formData.append(`image_uploads`, image);
    });

    if (imageUploadSizeReached) {
      toast.error(
        intl.formatMessage({
          id: 'challenge.kpi_results.form.file_size_error',
        })
      );
      return;
    }

    // formData.append(`images`, model.images && _.compact(model.images.map(image => image.collaborator_input_id ? null : image)) || [])
    // if(newImage instanceof Blob) {
    //   formData.append('image', newImage)
    // }

    // props.collaboratorInputUpdateActions.updateCollaboratorInput(formData)
    props.collaboratorDataUpdateActions.updateCollaboratorData(formData);
  };

  const refreshGrid = (
    sort = ['firstname', 'lastname'],
    sortDirection = 'asc'
  ) => {
    let newGrid = [
      [
        {
          value: (
            <div
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                setSort(['firstname', 'lastname']);
              }}
            >
              <Grid container spacing={1} justify='center'>
                <Grid item>
                  {intl.formatMessage({ id: 'common.collaborator' })}
                </Grid>
                <Grid item>
                  <IconButton
                    size='small'
                    style={{
                      color: 'white',
                      transform: sort[0] !== 'firstname' ? 'rotate(90deg)' : '',
                      fontSize: sort[0] !== 'firstname' ? 12 : 16,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        sort[0] === 'firstname'
                          ? sortDirection === 'asc'
                            ? faArrowUp
                            : faArrowDown
                          : faExchangeAlt
                      }
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ),
          readOnly: true,
          className: 'dataCell baseCell period-M headerCell',
        },
        {
          value: (
            <div
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                setSort(['team']);
              }}
            >
              <Grid container spacing={1} justify='center'>
                <Grid item>{intl.formatMessage({ id: 'common.team' })}</Grid>
                <Grid item>
                  <IconButton
                    size='small'
                    style={{
                      color: 'white',
                      transform: sort[0] !== 'team' ? 'rotate(90deg)' : '',
                      fontSize: sort[0] !== 'team' ? 12 : 16,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        sort[0] === 'team'
                          ? sortDirection === 'asc'
                            ? faArrowUp
                            : faArrowDown
                          : faExchangeAlt
                      }
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ),
          readOnly: true,
          className: 'dataCell baseCell period-M headerCell',
        },
        {
          value: (
            <div
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                setSort(['team_group']);
              }}
            >
              <Grid container spacing={1} justify='center'>
                <Grid item>
                  {intl.formatMessage({ id: 'common.team_group' })}
                </Grid>
                <Grid item>
                  <IconButton
                    size='small'
                    style={{
                      color: 'white',
                      transform:
                        sort[0] !== 'team_group' ? 'rotate(90deg)' : '',
                      fontSize: sort[0] !== 'team_group' ? 12 : 16,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        sort[0] === 'team_group'
                          ? sortDirection === 'asc'
                            ? faArrowUp
                            : faArrowDown
                          : faExchangeAlt
                      }
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ),
          readOnly: true,
          className: 'dataCell baseCell period-M headerCell',
        },
        {
          value: (
            <div
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                setSort(['description']);
              }}
            >
              <Grid container spacing={1} justify='center'>
                <Grid item>
                  {intl.formatMessage({
                    id: 'challenge.kpi_results.columns.indications',
                  })}
                </Grid>
                <Grid item>
                  <IconButton
                    size='small'
                    style={{
                      color: 'white',
                      transform:
                        sort[0] !== 'description' ? 'rotate(90deg)' : '',
                      fontSize: sort[0] !== 'description' ? 12 : 16,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        sort[0] === 'description'
                          ? sortDirection === 'asc'
                            ? faArrowUp
                            : faArrowDown
                          : faExchangeAlt
                      }
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ),
          readOnly: true,
          className: 'dataCell baseCell period-M headerCell',
        },
        {
          value: (
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Grid container spacing={1} justify='center'>
                <Grid item>
                  {intl.formatMessage({
                    id: 'challenge.kpi_results.columns.images',
                  })}
                </Grid>
              </Grid>
            </div>
          ),
          readOnly: true,
          className: 'dataCell baseCell period-M headerCell',
        },
        {
          value: (
            <div
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                setSort(['dataValue']);
              }}
            >
              <Grid container spacing={1} justify='center'>
                <Grid item>
                  {intl.formatMessage({
                    id: 'challenge.kpi_results.columns.result',
                  })}
                </Grid>
                <Grid item>
                  <IconButton
                    size='small'
                    style={{
                      color: 'white',
                      transform: sort[0] !== 'dataValue' ? 'rotate(90deg)' : '',
                      fontSize: sort[0] !== 'dataValue' ? 12 : 16,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        sort[0] === 'dataValue'
                          ? sortDirection === 'asc'
                            ? faArrowUp
                            : faArrowDown
                          : faExchangeAlt
                      }
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          ),
          readOnly: readOnly,
          type: 'data',
          className: 'dataCell baseCell period-M headerCell',
        },
        {
          value: (
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Grid container spacing={1} justify='center'>
                <Grid item>
                  {intl.formatMessage({
                    id: 'challenge.kpi_results.columns.actions',
                  })}
                </Grid>
              </Grid>
            </div>
          ),
          readOnly: true,
          className: 'dataCell baseCell period-M headerCell',
        },
      ],
    ];
    const currentData = data.map((line) =>
      Object.assign({}, line, {
        dataValue:
          grid && grid.length > 0
            ? _.flatten(grid).find(
                (cell) => parseInt(cell.id) === parseInt(line.dataId)
              ).value
            : line.dataValue,
      })
    );
    _.orderBy(
      currentData,
      sort,
      sort.map((s) => sortDirection)
    ).forEach((line) => {
      newGrid = [
        ...newGrid,
        [
          {
            value: (
              <Grid container spacing={1} style={{ flexWrap: 'nowrap' }}>
                <Grid item>
                  <Avatar
                    src={
                      _.get(line, 'user.photo') || '/assets/img/user/avatar.svg'
                    }
                    className={classes.userAvatar}
                    fallbackName={`${line.firstname} ${line.lastname}`}
                  />
                </Grid>
                <Grid item style={{ minWidth: 180, maxWidth: 350 }}>
                  {line.firstname} {line.lastname}
                </Grid>
              </Grid>
            ),
            readOnly: true,
            className: 'collaboratorCell noBorder whiteCell baseCell',
          },
          {
            value: (
              <div item style={{ minWidth: 180, maxWidth: 350 }}>
                {line.team}
              </div>
            ),
            readOnly: true,
            className: 'collaboratorCell noBorder whiteCell baseCell',
          },
          {
            value: (
              <div item style={{ minWidth: 180, maxWidth: 350 }}>
                {line.team_group}
              </div>
            ),
            readOnly: true,
            className: 'collaboratorCell noBorder whiteCell baseCell',
          },
          {
            value: (
              <Tooltip title={line.description} rootClass={classes.tooltip}>
                <Grid
                  item
                  style={{
                    width: 200,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {line.description}
                </Grid>
              </Tooltip>
            ),
            readOnly: true,
            className: 'collaboratorCell baseCell whiteCell noBorder period-M',
          },
          {
            value: line.images ? (
              <Grid container justify='center' spacing={2}>
                {line.images.map((image) => (
                  <Grid item>
                    {hasImageExtension(image.path) ? (
                      <Tooltip
                        title={
                          <img
                            src={image.path}
                            style={{
                              maxWidth: 300,
                              maxHeight: 250,
                              cursor: 'pointer',
                            }}
                          />
                        }
                        rootClass={classes.tooltip}
                      >
                        <a href={image.path} target='_blank'>
                          <img
                            src={image.path}
                            style={{
                              maxWidth: 150,
                              maxHeight: 20,
                              cursor: 'pointer',
                            }}
                          />
                        </a>
                      </Tooltip>
                    ) : (
                      <Tooltip title={_.last(image.path.split('/'))}>
                        <a
                          href={image.path}
                          target='_blank'
                          style={{ color: '#333' }}
                        >
                          <FontAwesomeIcon icon={faFile} />
                        </a>
                      </Tooltip>
                    )}
                  </Grid>
                ))}
              </Grid>
            ) : (
              ''
            ),
            readOnly: true,
            className: 'collaboratorCell baseCell whiteCell noBorder period-M',
          },
          {
            value: line.dataValue,
            readOnly: readOnly,
            type: 'data',
            id: line.dataId,
            kpi: line.kpi_id,
            collaborator: line.collaborator_id,
            className: 'dataCell baseCell period-M',
          },
          {
            value: (
              <Grid container justify='center'>
                <Grid item>
                  <IconButton
                    size='small'
                    style={{ fontSize: 16, marginBottom: 7 }}
                    onClick={() => setCurrentData(line)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </IconButton>
                </Grid>
              </Grid>
            ),
            readOnly: true,
            className: 'collaboratorCell baseCell whiteCell noBorder period-M',
          },
        ],
      ];
    });

    setGrid(newGrid);
  };

  if (data && kpi && !grid) {
    refreshGrid();
  }

  if (success) {
    props.collaboratorDataUpdateActions.clearCollaboratorDataUpdate();
    toast.success(intl.formatMessage({ id: 'common.update_success_message' }));
    if (currentData) {
      setTimeout(() => {
        setCurrentData(null);
        if (reloadData) {
          setReplaceData(true);
          reloadData();
        }
      }, 100);
    } else {
      close();
    }
  }

  if (error) {
    props.collaboratorDataUpdateActions.clearCollaboratorDataUpdate();
    toast.error(intl.formatMessage({ id: 'common.update_error_message' }));
    if (!currentData) {
      close();
    }
  }

  const handleObserver = () => {
    if (hasNextDataPage && !dataLoading) {
      setNextPage(nextPage + 1);
    }
  };

  useEffect(() => {
    if (filterDataList && _.get(nextPageRef, 'current') !== nextPage) {
      filterDataList(teamGroup, team, collaborator, nextPage, search);
    }
    nextPageRef.current = nextPage;
  }, [nextPage]);

  useEffect(() => {
    if (filterDataList && _.get(searchRef, 'current') !== search) {
      setReplaceData(true);
      filterDataList(teamGroup, team, collaborator, 1, search);
    }
    searchRef.current = search;
  }, [search]);

  return (
    <React.Fragment>
      {!currentData && (
        <React.Fragment>
          <Grid container>
            <Grid item xs={12}>
              <Grid container spacing={1} style={{ marginBottom: 10 }}>
                {exportToCsv && (
                  <Grid item>
                    <Button onClick={() => exportToCsv()}>
                      <FontAwesomeIcon
                        icon={faFileDownload}
                        style={{ marginRight: 5 }}
                      />
                      {intl.formatMessage({ id: 'common.csv_export' })}
                    </Button>
                  </Grid>
                )}
                {exportToExcel && (
                  <Grid item>
                    <Button onClick={() => exportToExcel()}>
                      <FontAwesomeIcon
                        icon={faFileDownload}
                        style={{ marginRight: 5 }}
                      />
                      {intl.formatMessage({ id: 'common.excel_export' })}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={1} style={{ position: 'relative' }}>
            <Grid item>
              <ChallengeCollaboratorFilter
                onChange={onCollaboratorFilter}
                team={team}
                teamGroup={teamGroup}
                collaborator={collaborator}
                scopeTeams={participantTeamIds}
                scopeCollaborators={participantIds}
              />
            </Grid>
            {filterDataList && (
              <Grid item style={{ position: 'absolute', left: 110 }}>
                <ChallengeSearchBar
                  search={search}
                  onChange={(value) => {
                    if (value !== search) {
                      setSearch(value);
                    }
                  }}
                  inputClass={classes.searchBar}
                />
              </Grid>
            )}
          </Grid>

          <React.Fragment>
            <div
              style={{
                width: 'calc(100% + 20px)',
                maxHeight: `calc(100vh - ${isDesktop ? 290 : 370}px - ${
                  kpi && kpi.collaborator_editable ? 25 : 0
                }px)`,
                overflowY: 'overlay',
                overflowX: 'overlay',
                paddingRight: 10,
              }}
            >
              {grid && (
                <Spreadsheet
                  grid={grid}
                  baseClassName={classes.spreadsheet}
                  onCellsChanged={(changes, currentGrid) => {
                    setSubmitDisabled(true);
                    setGrid(currentGrid);
                  }}
                />
              )}
              <div style={{ height: 40, marginTop: 10 }}>
                {dataLoading && <Loader centered />}

                {!dataLoading && hasNextDataPage && (
                  <Grid container justify='center'>
                    <Grid
                      item
                      onClick={handleObserver}
                      className={classes.link}
                    >
                      {intl.formatMessage({
                        id: 'challenge.kpi_results.see_more',
                      })}
                    </Grid>
                  </Grid>
                )}
              </div>
            </div>
            <Grid container justify='center' style={{ marginTop: 15 }}>
              <Grid item>
                <Formsy onValidSubmit={handleSubmit}>
                  <ProgressButton
                    disabled={readOnly || submitDisabled}
                    type='submit'
                    text={intl.formatMessage({ id: 'common.submit' })}
                    loading={loading}
                    centered
                  />
                </Formsy>
              </Grid>
            </Grid>
          </React.Fragment>
        </React.Fragment>
      )}
      {currentData && (
        <Grid
          container
          spacing={2}
          justify='space-between'
          style={{ maxWidth: coverImage ? '100%' : 600 }}
        >
          <Grid item xs={12} sm={coverImage ? 6 : 12}>
            <Formsy onValidSubmit={handleDataSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container direction='column' alignItems='flex-start'>
                    <Grid
                      item
                      onClick={() => setCurrentData()}
                      className={classes.link}
                    >
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        style={{ marginRight: 5 }}
                      />
                      {intl.formatMessage({
                        id: 'challenge.kpi_results.back_button',
                      })}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name='collaborator'
                    label={intl.formatMessage({ id: 'common.collaborator' })}
                    initial={`${currentData.firstname} ${currentData.lastname}`}
                    fullWidth
                    disabled
                    lowercase
                  />
                </Grid>

                <Grid item xs={12}>
                  <div
                    style={{
                      maxHeight: '40vh',
                      overflow: 'auto',
                      width: '100%',
                      paddingRight: 20,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <Grid container spacing={2} justifyContent='space-between'>
                      <Grid item xs={12}>
                        <TextField
                          name='value'
                          label={intl.formatMessage({
                            id: 'challenge.kpi_results.form.data_value',
                          })}
                          placeholder={intl.formatMessage({
                            id: 'challenge.kpi_results.form.data_value_placeholder',
                          })}
                          initial={currentData.dataValue}
                          type='number'
                          fullWidth
                          required
                          lowercase
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name='description'
                          label={intl.formatMessage({
                            id: 'challenge.kpi_results.form.data_description',
                          })}
                          placeholder={intl.formatMessage({
                            id: 'challenge.kpi_results.form.data_description_placeholder',
                          })}
                          initial={currentData.description}
                          fullWidth
                          lowercase
                          multiline
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CollaboratorInputImageList
                          images={currentData.images || []}
                        />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>

                <Grid item xs={12} style={{ marginTop: 15 }}>
                  <ProgressButton
                    type='submit'
                    text={intl.formatMessage({ id: 'common.submit' })}
                    loading={loading}
                    centered
                  />
                </Grid>
              </Grid>
            </Formsy>
          </Grid>
          {isDesktop && coverImage && (
            <Grid item xs={12} sm={6}>
              <CardMedia image={coverImage} className={classes.coverImage} />
            </Grid>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({ collaboratorDataUpdate }) => ({
  collaboratorDataUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorDataUpdateActions: bindActionCreators(
    collaboratorDataUpdateActions,
    dispatch
  ),
});

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CollaboratorDataSpreadsheet))
);

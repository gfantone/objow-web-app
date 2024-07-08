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
  InfoText,
  HiddenInput,
  Tooltip,
  Button,
  CollaboratorFilterAndSearchBar,
} from '../../../../../../components';
import { ChallengeCollaboratorFilter, ChallengeSearchBar } from '../../../';
import { CollaboratorInputImageList } from '../';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchangeAlt,
  faArrowUp,
  faArrowDown,
  faEye,
  faFileImage,
  faUpload,
  faEdit,
  faSyncAlt,
  faChevronLeft,
  faFile,
  faDownload,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';
import {
  Grid,
  IconButton,
  withWidth,
  isWidthUp,
  CardMedia,
} from '@material-ui/core';
import * as collaboratorInputUpdateActions from '../../../../../../services/CollaboratorInput/CollaboratorInputUpdate/actions';
import { useIntl, injectIntl } from 'react-intl';
import { hasImageExtension } from '../../../../../../helpers/UrlHelper';
import _ from 'lodash';

const styles = {
  spreadsheet: {
    paddingLeft: 0,
    width: '100%',
    minHeight: 200,
  },
  userAvatar: {
    width: 30,
    height: 30,
  },
  customImageInput: {
    display: 'none',
  },
  customImage: {
    height: '100%',
    backgroundColor: '#f7f8fc',
    cursor: 'pointer',
    opacity: 0.75,
    '&:hover': {
      opacity: 1,
    },
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundSize: 'contain',
    backgroundPosition: 'top',
  },
  link: {
    fontSize: 16,
    cursor: 'pointer',
    alignSelf: 'flex-start',
    color: 'rgb(15,111,222)',
    opacity: 1,
  },
  tooltip: {
    display: 'block',
  },
  searchBar: {
    width: '40vw',
    maxWidth: '40vw',
  },
  coverImage: {
    position: 'absolute',
    top: '-12px',
    height: 'calc(100% + 20px)',
    width: 'calc(50% + 20px)',
    borderRadius: '0 4px 4px 0',
  },
  inputs: {
    '& label, & label.Mui-focused, & input:not(.Mui-error), & textarea:not(.Mui-error)':
      {
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'Avenir',
        color: '#555555',
      },
  },
};

const CollaboratorInputSpreadsheet = ({
  data: fetchedData,
  kpi,
  classes,
  width,
  close,
  isReadOnly,
  filterInputList,
  hasNextInputPage,
  loading: inputLoading,
  image: coverImage,
  participantTeamIds,
  participantIds,
  setGridCsv,
  hideFilters,
  exportToExcel,
  exportToCsv,
  switchToCreation,
  ...props
}) => {
  const intl = useIntl();
  const { loading, success, hasError: error } = props.collaboratorInputUpdate;

  const [data, setData] = React.useState();
  const [currentData, setCurrentData] = React.useState();
  const [replaceData, setReplaceData] = React.useState(true);
  const [nextPage, setNextPage] = React.useState(1);
  const [search, setSearch] = React.useState();
  const [grid, setGrid] = React.useState();
  const [sort, setSort] = React.useState(['firstname', 'lastname']);
  const [lastSort, setLastSort] = React.useState();
  const [lastSortDirection, setLastSortDirection] = React.useState();
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [currentInput, setCurrentInput] = React.useState();
  const customImageInput = useRef();

  const [image, setImage] = useState();
  const [newImage, setNewImage] = useState();
  const [collaborator, setCollaborator] = useState();
  const [team, setTeam] = useState();
  const [teamGroup, setTeamGroup] = useState();
  const [initialized, setInitialized] = useState();
  const readOnly = (kpi && !kpi.manual) || isReadOnly;
  const isDesktop = isWidthUp('md', width);

  const reset = () => {
    // setImage()
    // setNewImage()
    // setCollaborator()
    // setTeam()
    // setTeamGroup()
    // setInitialized()
    // setData()
    // setCurrentData()
    // setReplaceData(true)
    // setNextPage(1)
    // setSearch()
    // setGrid()
    // setSort()
    // setSubmitDisabled()
  };

  // Infinite scroll
  const handleObserver = () => {
    if (hasNextInputPage && !inputLoading) {
      setNextPage(nextPage + 1);
    }
  };

  useEffect(() => {
    if (filterInputList) {
      filterInputList(teamGroup, team, collaborator, nextPage, search);
    }
  }, [nextPage]);

  useEffect(() => {
    if (filterInputList) {
      setReplaceData(true);
      filterInputList(teamGroup, team, collaborator, 1, search);
    }
  }, [search]);

  const observer = new IntersectionObserver(handleObserver);
  const rankLoader = useRef();

  useEffect(() => {
    if (!initialized) {
      if (rankLoader.current) {
        // observer.observe(rankLoader.current)
        setInitialized(true);
      }
    }
  });

  useEffect(() => {
    if (fetchedData) {
      if (!replaceData) {
        setGrid();
        setGridCsv && setGridCsv();
        setData(_.uniqBy([...data, ...fetchedData], 'id'));
      } else {
        setGrid();
        setGridCsv && setGridCsv();
        setData(fetchedData);
        setReplaceData(false);
      }
    }
  }, [fetchedData]);

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

  const handleSubmit = () => {
    const payload = _.flatten(grid)
      .filter((cell) => cell.type === 'data' && cell.id)
      .map((cell) =>
        cell.value !== null && cell.value !== undefined
          ? {
              id: cell.id,
              value: cell.value,
            }
          : { id: cell.id }
      );

    props.collaboratorInputUpdateActions.updateCollaboratorInput(payload);
  };

  const handleInputSubmit = (model) => {
    const formData = new FormData();
    formData.append('id', currentInput.id);
    formData.append('value', model.value);
    formData.append('description', model.description || '');

    const model_image_ids = _.get(model, 'images', []).map((i) =>
      parseInt(i.id)
    );

    const deleted_images = _.get(currentInput, 'images', []).filter(
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

    image_uploads.forEach((image, index) => {
      formData.append(`image_uploads`, image);
    });
    console.log(deleted_images);
    deleted_images.forEach((image, index) => {
      formData.append(`deleted_images`, image.id);
    });

    // formData.append(`images`, model.images && _.compact(model.images.map(image => image.collaborator_input_id ? null : image)) || [])
    // if(newImage instanceof Blob) {
    //   formData.append('image', newImage)
    // }

    props.collaboratorInputUpdateActions.updateCollaboratorInput(formData);
  };

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
    if (filterInputList) {
      setReplaceData(true);
      filterInputList(teamGroup, team, collaborator, 1, search);
    }
  };

  const handleImport = () => {
    customImageInput.current.click();
  };

  const editColumn = isReadOnly
    ? {}
    : {
        value: (
          <div style={{ textAlign: 'center', cursor: 'pointer' }}>
            <Grid container spacing={1} justify='center'>
              <Grid item>Actions</Grid>
            </Grid>
          </div>
        ),
        readOnly: true,
        className: 'dataCell baseCell period-M headerCell',
      };
  const refreshGrid = (sort = ['start'], sortDirection = 'desc') => {
    let newGridCsv = [
      [
        intl.formatMessage({ id: 'common.date' }),
        intl.formatMessage({ id: 'common.collaborator' }),
        intl.formatMessage({ id: 'common.team' }),
        intl.formatMessage({ id: 'common.team_group' }),
        intl.formatMessage({ id: 'challenge.kpi_results.columns.indications' }),
        intl.formatMessage({ id: 'challenge.kpi_results.columns.results' }),
      ],
    ];
    let newGrid = [
      [
        {
          value: (
            <div
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                setSort(['start']);
              }}
            >
              <Grid container spacing={1} justify='center'>
                <Grid item>{intl.formatMessage({ id: 'common.date' })}</Grid>
                <Grid item>
                  <IconButton
                    size='small'
                    style={{
                      color: 'white',
                      transform: sort[0] !== 'start' ? 'rotate(90deg)' : '',
                      fontSize: sort[0] !== 'start' ? 12 : 16,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        sort[0] === 'start'
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
            <div style={{ textAlign: 'center', cursor: 'pointer' }}>
              <Grid
                container
                spacing={1}
                justify='center'
                onClick={() => {
                  setSort(['team']);
                }}
              >
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
                setSort(['value']);
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
                      transform: sort[0] !== 'value' ? 'rotate(90deg)' : '',
                      fontSize: sort[0] !== 'value' ? 12 : 16,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={
                        sort[0] === 'value'
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
        editColumn,
      ],
    ];

    const currentData = data.map((line) =>
      Object.assign({}, line, {
        dataValue:
          grid && grid.length > 0
            ? _.flatten(grid).find(
                (cell) => parseInt(cell.id) === parseInt(line.id)
              ).value
            : line.value,
      })
    );
    _.orderBy(
      currentData,
      sort,
      sort.map((s) => sortDirection)
    ).forEach((line) => {
      const date = new Date(line.start * 1000).toLocaleDateString();
      newGridCsv = [
        ...newGridCsv,
        [
          date,
          `${line.firstname} ${line.lastname}`,
          line.team,
          line.teamGroup,
          line.indication || '',
          line.dataValue,
        ],
      ];
      newGrid = [
        ...newGrid,
        [
          {
            value: date,
            readOnly: true,
            className: 'collaboratorCell noBorder whiteCell baseCell',
          },
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
              <Grid container spacing={1} style={{ flexWrap: 'nowrap' }}>
                <Grid item style={{ minWidth: 180, maxWidth: 350 }}>
                  {line.team}
                </Grid>
              </Grid>
            ),
            readOnly: true,
            className: 'collaboratorCell noBorder whiteCell baseCell',
          },
          {
            value: (
              <Grid container spacing={1} style={{ flexWrap: 'nowrap' }}>
                <Grid item style={{ minWidth: 180, maxWidth: 350 }}>
                  {line.teamGroup}
                </Grid>
              </Grid>
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
            value: line.value,
            readOnly: readOnly,
            type: 'data',
            id: line.id,
            className: `baseCell period-M ${
              readOnly ? 'collaboratorCell whiteCell noBorder' : 'dataCell'
            }`,
          },
          isReadOnly
            ? {}
            : {
                value: (
                  <Grid container justify='center'>
                    <Grid item>
                      <IconButton
                        size='small'
                        style={{ fontSize: 16, marginBottom: 7 }}
                        onClick={() => setCurrentInput(line)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </IconButton>
                    </Grid>
                  </Grid>
                ),
                readOnly: true,
                className:
                  'collaboratorCell baseCell whiteCell noBorder period-M',
              },
        ],
      ];
    });

    setGrid(newGrid);
    setGridCsv && setGridCsv(newGridCsv);
  };

  if (data && kpi && !grid) {
    refreshGrid();
  }

  useEffect(() => {
    if (data) {
      refreshGrid();
    } else {
      setGrid(null);
      setGridCsv && setGridCsv(null);
    }
  }, [data]);

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

  if (success) {
    props.collaboratorInputUpdateActions.clearCollaboratorInputUpdate();
    toast.success(intl.formatMessage({ id: 'common.update_success_message' }));
    if (currentInput) {
      setCurrentInput();
      setReplaceData(true);
      if (filterInputList) {
        filterInputList(teamGroup, team, collaborator, 1, search);
      }
    } else {
      close();
    }
  }

  if (error) {
    props.collaboratorInputUpdateActions.clearCollaboratorInputUpdate();
    toast.error(intl.formatMessage({ id: 'common.update_error_message' }));
    if (!currentInput) {
      close();
    }
  }

  return (
    <React.Fragment>
      {!currentInput && (
        <React.Fragment>
          <Grid container style={{ marginBottom: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {switchToCreation && (
                  <Grid item>
                    <Button onClick={switchToCreation}>
                      {intl.formatMessage({
                        id: 'challenge.kpi_results.add_data_button',
                      })}
                    </Button>
                  </Grid>
                )}
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
                      {intl.formatMessage({
                        id: 'common.excel_export',
                      })}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} style={{ position: 'relative' }}>
            {!hideFilters && (
              <React.Fragment>
                <CollaboratorFilterAndSearchBar
                  // open={this.state.filterOpen}
                  collaborator={collaborator}
                  team={team}
                  onClose={() => {}}
                  onChange={onCollaboratorFilter}
                  scopeTeams={participantTeamIds}
                  scopeCollaborators={participantIds}
                />
              </React.Fragment>
            )}
          </Grid>
          <div>
            <React.Fragment>
              <Grid
                container
                spacing={1}
                direction='column'
                style={{
                  width: 'calc(100% + 20px)',
                  maxHeight: `calc(100vh - ${isDesktop ? 240 : 330}px - ${
                    kpi && kpi.collaborator_editable ? 100 : 0
                  }px)`,
                  overflowY: 'overlay',
                  overflowX: 'overlay',
                  paddingRight: 10,
                }}
              >
                {grid && (
                  <Grid item>
                    <Spreadsheet
                      grid={grid}
                      baseClassName={classes.spreadsheet}
                      onCellsChanged={(changes, currentGrid) => {
                        setSubmitDisabled(true);
                        setGrid(currentGrid);
                      }}
                    />
                  </Grid>
                )}
              </Grid>

              <div
                ref={rankLoader}
                style={{ width: '100%', height: 1, marginTop: 0 }}
              />
            </React.Fragment>
            <div style={{ height: 40, marginTop: 10 }}>
              {inputLoading && <Loader centered />}

              {!inputLoading && hasNextInputPage && (
                <Grid container justify='center'>
                  <Grid item onClick={handleObserver} className={classes.link}>
                    {intl.formatMessage({
                      id: 'challenge.kpi_results.see_more',
                    })}
                  </Grid>
                </Grid>
              )}
            </div>
          </div>
          {!readOnly && (
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
          )}
        </React.Fragment>
      )}
      {currentInput && (
        <Grid
          container
          spacing={2}
          justify='space-between'
          style={{ maxWidth: coverImage ? '100%' : 600 }}
        >
          <Grid item xs={12} sm={coverImage ? 6 : 12}>
            <Formsy onValidSubmit={handleInputSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container direction='column' alignItems='flex-start'>
                    <Grid
                      item
                      onClick={() => setCurrentInput()}
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
                    initial={`${currentInput.firstname} ${currentInput.lastname}`}
                    fullWidth
                    disabled
                    lowercase
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DatePicker
                    format='dd/MM/yyyy'
                    fullWidth
                    initial={new Date(parseInt(currentInput.start) * 1000)}
                    label={intl.formatMessage({ id: 'common.date' })}
                    disabled
                    name='filterDate'
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
                          initial={currentInput.value}
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
                          initial={currentInput.description}
                          fullWidth
                          lowercase
                          multiline
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CollaboratorInputImageList
                          images={currentInput.images}
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

const mapStateToProps = ({ collaboratorInputUpdate }) => ({
  collaboratorInputUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorInputUpdateActions: bindActionCreators(
    collaboratorInputUpdateActions,
    dispatch
  ),
});

export default withWidth()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CollaboratorInputSpreadsheet))
);

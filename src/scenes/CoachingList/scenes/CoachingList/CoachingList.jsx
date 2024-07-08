import React from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTrashAlt,
  faCheck,
  faTimes,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Grid, IconButton, RadioGroup, makeStyles } from '@material-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { withStyles } from '@material-ui/core/styles';
import { SubHeader } from './components';
import {
  DefaultText,
  EmptyState,
  GreenRadio,
  IconButton as HeaderIconButton,
  Linkify,
  MainLayoutComponent,
  OrangeRadio,
  ProgressButton,
  RedRadio,
  TableChip,
  TextField,
  RichTextField,
  DefaultTitle,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  Button,
  HiddenInput,
  DialogActions,
  DatePicker,
  TimerTag,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { injectIntl } from 'react-intl';
import * as coachingItemListActions from '../../../../services/CoachingItems/CoachingItemList/actions';
import * as coachingItemListCreationActions from '../../../../services/CoachingItems/CoachingItemListCreation/actions';
import * as coachingItemListUpdateActions from '../../../../services/CoachingItems/CoachingItemListUpdate/actions';
import * as coachingItemRemovingActions from '../../../../services/CoachingItems/CoachingItemRemoving/actions';
import * as coachingItemUpdateActions from '../../../../services/CoachingItems/CoachingItemUpdate/actions';
import * as userDetailActions from '../../../../services/Users/UserDetail/actions';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { CoachingItem } from './components';

const styles = {
  endDate: {
    padding: 5,
    borderRadius: 15,
    background: '#ccc',
  },
  coachingItem: {
    '& .rich-text > div': {
      backgroundColor: 'transparent !important',
      borderBottom: '1px solid #333',
      fontSize: '15px',
    },
  },
  columnTitle: {
    borderRadius: '5px 5px 0 0',
  },
  editTitle: {
    '& input': {
      fontSize: '18px !important',
      fontWeight: 'bold',
    },
  },
  listItem: {
    padding: 10,
    minHeight: 40,
    cursor: 'pointer',
    position: 'relative',
    overflow: 'visible',
  },
  timer: {
    position: 'absolute',
    top: -7,
    right: 10,
  },
  listItemContent: {
    padding: 8,
    margin: '0 0 8px 0',

    // change background colour if dragging
  },
  editDialog: {
    width: '900px',
    maxWidth: 'none',
    position: 'relative',
  },

  dialogCloseIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    fontSize: 18,
  },
  listScroll: {
    overflowX: 'hidden',
    overflowY: 'overlay',
    '&::-webkit-scrollbar-track': {
      background: '#ddd',
      borderRadius: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      border: '2px solid #ddd',
      background: '#888',
    },
    '&::-webkit-scrollbar': {
      '-webkit-appearance': 'none',
      '&:vertical': {
        width: 8,
      },
    },
  },
};

// const useStyles = makeStyles((theme) => {
//   return {
//     activeColorPrimary: {
//       color: theme.palette.primary.main,
//     },
//   };
// });

const grid = 8;
const getItemStyle = (isDragging, draggableStyle, customStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? '' : '',
  overflowX: isDragging ? 'hidden' : '',
  overflowY: isDragging ? 'overlay' : '',

  // styles we need to apply on draggables
  ...draggableStyle,
  ...customStyle,
});

const getListStyle = (isDraggingOver, customStyle) => ({
  background: isDraggingOver ? '#E1F5FE' : '',
  padding: 10,
  overflow: 'auto',
  // minHeight: 30,
  ...customStyle,
  //
  // padding: grid,
});

class CoachingList extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.id = this.props.match.params.id;
    this.loading = false;
    this.titleRef = React.createRef();
    this.state = {
      items: [],
      previousItems: [],
      deletePromptOpen: false,
      currentItem: null,
    };
  }

  handleAddItem(state) {
    var items = this.state.items.filter((item) => !item.isNew);
    const order = items.filter((item) => item.state === state).length + 1;
    items.push({
      id: `N${items.length}`,
      title: null,
      instruction: null,
      state: state,
      collaborator: this.id,
      isNew: true,
      isCreating: true,
      order,
    });
    this.setState(
      {
        ...this.state,
        items: items,
      },
      () => {
        const inputs = this.titleRef.current.getElementsByTagName('input');
        if (inputs.length > 0) {
          inputs[0].focus();
        }
      }
    );
  }

  handleChange = (id) => (name) => (value) => {
    const { account } = this.props.accountDetail;
    const items = this.state.items.map((item) => {
      if (item.id === id && item.title) {
        return Object.assign({}, item, { isCreating: false });
      }
      return item;
    });
    const index = items.findIndex((item) => item.id == id);
    items[index][name] = value;
    if (
      (name == 'state' || name == 'order') &&
      account.role.code == 'C' &&
      account.canUpdateCoaching
    ) {
      this.props.coachingItemUpdateActions.updateCoachingItem(id, value);
    }

    this.setState(
      {
        ...this.state,
        items: items,
      },
      this.handleSubmit
    );
  };

  handleRemoveItem = (id) => {
    const items = this.state.items;
    const index = items.findIndex((item) => item.id == id);
    const item = items[index];
    if (!item.isNew) {
      this.props.coachingItemRemovingActions.removeCoachingItem(item.id);
    }
    items.splice(index, 1);

    const reorderedItems = items.map((currentItem) => {
      // Reorder column
      if (item.state === currentItem.state && currentItem.order > item.order) {
        return Object.assign({}, currentItem, {
          order: currentItem.order - 1,
        });
      }

      return currentItem;
    });

    this.setState(
      {
        ...this.state,
        currentItem: null,
        deletePromptOpen: false,
        openEditItem: false,
        items: reorderedItems,
      },
      this.handleSubmit
    );
  };

  handleSubmitEdit = (model) => {
    const id = this.state.currentItem.id;
    const { account } = this.props.accountDetail;

    const items = this.state.items.map((item) => {
      if (item.id === id && item.title) {
        return Object.assign(
          {},
          item,
          model,
          { instruction: JSON.stringify(model.instruction) },
          { isCreating: false }
        );
      }
      return item;
    });

    this.setState(
      {
        ...this.state,
        items: items,
      },
      this.handleSubmit
    );
  };

  handleSubmit(model, force) {
    const { account } = this.props.accountDetail;
    const isCollaborator = account.role.code == 'C';
    const { items: previousItems } = this.props.coachingItemList;

    if (this.checkEditPermission() || force) {
      this.loading = false;
      const items = this.state.items.map((item) =>
        Object.assign({}, item, {
          end:
            item.end && typeof item.end === 'string'
              ? new Date(item.end).toUTCJSON()
              : item.end,
        })
      );
      const oldItems = items.filter((item) => !item.isNew);
      const newItems = items.filter((item) => item.isNew);

      if (
        _.differenceWith(
          this.state.previousItems.filter((item) => !item.isNew),
          oldItems,
          _.isEqual
        ).length > 0
      ) {
        this.props.coachingItemListUpdateActions.updateCoachingItemList(
          oldItems
        );
      }
      if (newItems.length > 0) {
        this.props.coachingItemListCreationActions.createCoachingItemList(
          newItems
        );
      }
    }
  }

  checkEditPermission() {
    const { account } = this.props.accountDetail;
    const isCollaborator = account.role.code == 'C';
    return !isCollaborator && account.canUpdateCoaching;
  }

  componentDidMount() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const isCollaborator = account.role.code == 'C';
    this.props.handleTitle(intl.formatMessage({ id: 'coaching_list.title' }));
    this.props.handleSubHeader(<SubHeader />);
    // this.props.handleMaxWidth('md');
    if (!isCollaborator) {
      // if (account.canUpdateCoaching) {
      //     this.props.handleButtons(<HeaderIconButton size='small' onClick={this.handleAddItem.bind(this)}><FontAwesomeIcon icon={faPlus} /></HeaderIconButton>)
      // }
      this.props.activateReturn();
    }
    this.loading = true;
    this.props.coachingItemListActions.getCoachingItemList(this.id);
    this.props.userDetailActions.getUserDetail(this.id);
  }

  componentWillReceiveProps(props) {
    const { items } = props.coachingItemList;
    const { success, items: createdItems } = props.coachingItemListCreation;
    const { success: successUpdate, items: updatedItems } =
      props.coachingItemListUpdate;

    if (this.loading && items) {
      this.setState({
        ...this.state,
        previousItems: items,
        items: items,
      });
    }

    if (successUpdate) {
      this.setState({
        ...this.state,
        previousItems: this.state.items,
      });
    }
    if (success) {
      const fetchedItems = success ? createdItems : updatedItems;
      if (
        this.state.items.filter((item) => item.isNew).length > 0 &&
        fetchedItems &&
        fetchedItems.length > 0
      ) {
        const newItems = this.state.items.map((item) => {
          if (item.isNew) {
            return Object.assign({}, item, fetchedItems[0], {
              isNew: false,
            });
          }
          return item;
        });
        this.setState({
          ...this.state,
          previousItems: newItems,
          items: newItems,
        });
      }
    }
  }

  renderEmptyState() {
    const { intl } = this.props;
    const message =
      this.props.accountDetail.account.role.code == 'C'
        ? intl.formatMessage({
            id: 'coaching_list.empty_state_collaborator_message',
          })
        : intl.formatMessage({
            id: 'coaching_list.empty_state_manager_message',
          });
    return (
      <EmptyState
        title={intl.formatMessage({ id: 'coaching_list.empty_state_title' })}
        message={message}
      />
    );
  }

  updateItemTitle = (model) => {
    if (model.title) {
      this.handleChange(model.id)('title')(model.title);
    }
  };

  editItem(item) {
    this.setState({
      ...this.state,
      currentItem: item,
      openEditItem: true,
    });
  }

  setDeletePromptOpen = (value) => {
    this.setState({
      ...this.state,
      deletePromptOpen: value,
    });
  };

  onCloseEditItem = (item) => {
    this.setState({
      ...this.state,
      currentItem: null,
      openEditItem: false,
    });
  };

  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list or don't have permission (collaborators can't drop in archived column)
    if (
      !destination ||
      (!this.checkEditPermission() && destination.droppableId === 4)
    ) {
      return;
    }

    const previousState = parseInt(source.droppableId);
    const newState = parseInt(destination.droppableId);
    const currentItem = _.sortBy(this.state.items, [
      (item) => item.order,
    ]).filter((i) => i.state === previousState)[source.index];

    const items = this.state.items.map((item) => {
      // Change state and order of current item
      if (item.id === currentItem.id) {
        return Object.assign({}, item, {
          order: destination.index + 1,
          state: newState,
        });
      }
      // Move in same column
      if (previousState === newState) {
        const increasing = source.index < destination.index;
        const isInRange = increasing
          ? _.inRange(item.order, source.index + 1, destination.index + 2)
          : _.inRange(item.order, destination.index + 1, source.index + 2);

        if (item.state === newState && isInRange) {
          return Object.assign({}, item, {
            order: increasing ? item.order - 1 : item.order + 1,
          });
        }

        // Move between columns
      } else {
        // Make space for new item in column
        if (item.state === newState && item.order >= destination.index + 1) {
          // console.log("Make space for new item in column", item.title)
          return Object.assign({}, item, {
            order: item.order + 1,
          });
        }

        // Reorder column where item comes from
        if (item.state === previousState && item.order > source.index + 1) {
          // console.log("Reorder column where item comes from", item.title)
          return Object.assign({}, item, {
            order: item.order - 1,
          });
        }
      }

      return item;
    });

    this.setState(
      {
        ...this.state,
        items: items,
      },
      () => this.handleSubmit(null, true)
    );
    // console.log(this.state.items.filter(i => i.state === previousState), source.index);
    // }
  };

  renderData() {
    const { intl, classes } = this.props;
    const { account } = this.props.accountDetail;
    const { loading: coachingItemListCreationLoading, success: createSuccess } =
      this.props.coachingItemListCreation;
    const { loading: coachingItemListUpdateLoading, success: updateSuccess } =
      this.props.coachingItemListUpdate;
    const loading =
      coachingItemListCreationLoading || coachingItemListUpdateLoading;
    const isCollaborator = account.role.code == 'C';
    const canUpdateCoaching = this.checkEditPermission();
    const titles = [
      intl.formatMessage({ id: 'coaching_list.state.pending' }),
      intl.formatMessage({ id: 'coaching_list.state.in_progress' }),
      intl.formatMessage({ id: 'coaching_list.state.done' }),
      intl.formatMessage({ id: 'coaching_list.state.archived' }),
    ];
    // const themeClasses = useStyles();

    const colors = ['#728B9E', '#0F3D5C', '#00E094', '#DFDFDF'];
    const backgroundColors = ['#DDE3EA', '#A5B3C1', '#B4E2D2', '#EDEDED'];
    // const colors = ["rgb(16, 61, 92)", "rgb(16, 61, 92)", "rgb(16, 61, 92)", "rgb(16, 61, 92)"]
    // const backgroundColors = ["#A8B6C4", "#A8B6C4", "#A8B6C4", "#A8B6C4"]
    // console.log(this.state.items);
    const columnsItems = [1, 2, 3, 4].map((number, index) => {
      return {
        title: titles[index],
        state: number,
        color: colors[index],
        backgroundColor: backgroundColors[index],
        items: this.state.items.filter((item) => item.state === number),
      };
    });

    if (createSuccess) {
      this.props.coachingItemListCreationActions.createCoachingItemListClear();
      this.props.coachingItemListUpdateActions.updateCoachingItemListClear();
      toast.success(
        intl.formatMessage({ id: 'coaching_list.created_success' })
      );
    }
    if (updateSuccess) {
      this.props.coachingItemListCreationActions.createCoachingItemListClear();
      this.props.coachingItemListUpdateActions.updateCoachingItemListClear();
      this.onCloseEditItem();
      toast.success(
        intl.formatMessage({ id: 'coaching_list.updated_success' })
      );
    }

    return (
      <Grid container spacing={4}>
        <Grid item xs ref={this.titleRef}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Grid container spacing={2} style={{ minWidth: 1220 }}>
              {columnsItems.map((column, columnIndex) => {
                const displayAddButton = column.state <= 3 && canUpdateCoaching;

                return (
                  <React.Fragment>
                    <Grid item xs={3}>
                      <Grid container>
                        <Grid item xs={12}>
                          <Card marginDisabled className={classes.columnTitle}>
                            <div
                              style={{
                                padding: 10,
                                color: column.color,
                                background: column.color,
                              }}
                            >
                              <DefaultTitle
                                style={{
                                  color: column.state > 3 ? '#555' : 'white',
                                  fontWeight: 'bold',
                                  textTransform: 'none',
                                  fontSize: 18,
                                }}
                              >
                                {column.title}
                              </DefaultTitle>
                            </div>
                          </Card>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          style={
                            displayAddButton
                              ? {}
                              : {
                                  paddingBottom: 10,
                                  background: column.backgroundColor,
                                  borderRadius: '0 0 5px 5px',
                                }
                          }
                        >
                          <div
                            className={classes.listScroll}
                            style={{
                              maxHeight: displayAddButton
                                ? 'calc(100vh - 310px)'
                                : 'calc(100vh - 260px)',
                              background: column.backgroundColor,
                            }}
                          >
                            <Droppable droppableId={String(column.state)}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  style={getListStyle(snapshot.isDraggingOver, {
                                    background: column.backgroundColor,
                                    paddingBottom: displayAddButton ? 0 : 0,
                                    borderRadius: displayAddButton
                                      ? 0
                                      : '0 0 5px 5px',
                                    opacity: column.state > 3 ? 0.6 : 1,
                                  })}
                                >
                                  {_.sortBy(column.items, [
                                    (item) => item.order,
                                  ])
                                    .filter((item) => item.title)
                                    .map((item, index) => {
                                      const end =
                                        typeof item.end === 'object' && item.end
                                          ? String(
                                              Math.round(
                                                item.end.getTime() / 1000
                                              ) +
                                                item.end.getTimezoneOffset() *
                                                  60
                                            )
                                          : item.end;
                                      return (
                                        <Draggable
                                          key={`draggable${columnIndex}-${index}`}
                                          draggableId={`draggable${columnIndex}-${index}`}
                                          index={index}
                                          isDragDisabled={loading}
                                        >
                                          {(provided, snapshot) => {
                                            return (
                                              <div
                                                onClick={() =>
                                                  this.editItem(item)
                                                }
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                  snapshot.isDragging,
                                                  provided.draggableProps.style,
                                                  {
                                                    paddingBottom: 5,
                                                    paddingTop: 5,
                                                  }
                                                )}
                                              >
                                                <CoachingItem
                                                  item={item}
                                                  hideTimer={column.state > 3}
                                                />
                                              </div>
                                            );
                                          }}
                                        </Draggable>
                                      );
                                    })}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </div>
                          <React.Fragment>
                            {displayAddButton && (
                              <div
                                style={{
                                  padding: 10,
                                  borderRadius: '0 0 5px 5px',
                                  background: column.backgroundColor,
                                }}
                              >
                                {column.items.length &&
                                !column.items[column.items.length - 1].title ? (
                                  <Formsy onValidSubmit={this.updateItemTitle}>
                                    <Grid
                                      container
                                      spacing={1}
                                      ref={this.titleRef}
                                    >
                                      <Grid item xs={12}>
                                        <Card
                                          marginDisabled
                                          className={classes.listItem}
                                        >
                                          <TextField
                                            name='title'
                                            ref={this.titleRef}
                                            style={{ width: '100%' }}
                                            placeholder={intl.formatMessage({
                                              id: 'coaching_list.title_placeholder',
                                            })}
                                            lowercase
                                          />
                                          <HiddenInput
                                            name='id'
                                            value={
                                              column.items[
                                                column.items.length - 1
                                              ].id
                                            }
                                          />
                                        </Card>
                                      </Grid>
                                      <Grid
                                        item
                                        container
                                        xs={12}
                                        spacing={2}
                                        justify='flex-end'
                                      >
                                        <Grid item>
                                          <Button
                                            onClick={() =>
                                              this.handleRemoveItem(
                                                column.items[
                                                  column.items.length - 1
                                                ].id
                                              )
                                            }
                                            color='secondary'
                                            style={{
                                              paddingLeft: 0,
                                              paddingRight: 0,
                                            }}
                                          >
                                            <FontAwesomeIcon icon={faTimes} />
                                          </Button>
                                        </Grid>
                                        <Grid item>
                                          <Button
                                            type='submit'
                                            centered
                                            style={{
                                              paddingLeft: 0,
                                              paddingRight: 0,
                                            }}
                                          >
                                            <FontAwesomeIcon icon={faCheck} />
                                          </Button>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Formsy>
                                ) : (
                                  <Grid container>
                                    <Grid
                                      item
                                      xs
                                      style={{ cursor: 'pointer' }}
                                      onClick={() =>
                                        this.handleAddItem(column.state)
                                      }
                                    >
                                      <Card
                                        marginDisabled
                                        className={classes.listItem}
                                      >
                                        <Grid container justify='center'>
                                          <IconButton size='small'>
                                            <FontAwesomeIcon
                                              icon={faPlus}
                                              style={{ color: column.color }}
                                              // className={
                                              //   classes.activeColorPrimary
                                              // }
                                            />
                                          </IconButton>
                                        </Grid>
                                      </Card>
                                    </Grid>
                                  </Grid>
                                )}
                              </div>
                            )}
                          </React.Fragment>
                        </Grid>
                      </Grid>
                    </Grid>
                  </React.Fragment>
                );
              })}
            </Grid>
          </DragDropContext>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { account } = this.props.accountDetail;
    const { items, loading } = this.props.coachingItemList;
    const { intl, classes } = this.props;
    const { loading: coachingItemListCreationLoading, success: createSuccess } =
      this.props.coachingItemListCreation;
    const { loading: coachingItemListUpdateLoading, success: updateSuccess } =
      this.props.coachingItemListUpdate;
    const submitLoading =
      coachingItemListCreationLoading || coachingItemListUpdateLoading;

    const today = new Date();

    if (!account.hasCoachingAccess) {
      return <Redirect to={'/'} />;
    }

    const canUpdateCoaching = this.checkEditPermission();

    const currentItemEndDate = _.get(this.state, 'currentItem.end');
    const currentItemEndFormatted =
      currentItemEndDate && typeof currentItemEndDate === 'string'
        ? currentItemEndDate.toDate2()
        : currentItemEndDate;

    return (
      <div>
        {!loading && items && this.renderData()}

        <Dialog
          open={this.state.openEditItem}
          onClose={this.onCloseEditItem}
          classes={{ paper: classes.editDialog }}
        >
          <React.Fragment>
            <IconButton
              size='small'
              onClick={this.onCloseEditItem}
              className={classes.dialogCloseIcon}
            >
              <FontAwesomeIcon icon={faTimes} />
            </IconButton>
            <Formsy onValidSubmit={this.handleSubmitEdit}>
              {this.state.currentItem && (
                <React.Fragment>
                  <DialogTitle>
                    <Grid container>
                      {canUpdateCoaching ? (
                        <Grid item xs className={classes.editTitle}>
                          <TextField
                            name='title'
                            initial={this.state.currentItem.title}
                            style={{ width: 'calc(100% - 40px)' }}
                            lowercase
                          />
                        </Grid>
                      ) : (
                        <Grid item xs>
                          <DefaultTitle
                            style={{
                              fontWeight: 'bold',
                              textTransform: 'none',
                              fontSize: 20,
                            }}
                            noWrap
                          >
                            {this.state.currentItem.title}
                          </DefaultTitle>
                        </Grid>
                      )}
                    </Grid>
                  </DialogTitle>
                  <DialogContent>
                    <Grid
                      container
                      spacing={2}
                      style={{ marginTop: 10, minHeight: 200 }}
                      direction='row-reverse'
                    >
                      <Grid item xs={12} sm={4}>
                        <Grid container spacing={1}>
                          {canUpdateCoaching ? (
                            <Grid item xs={12}>
                              <Grid container direction='column'>
                                <Grid item>
                                  <DefaultTitle
                                    style={{
                                      textAlign: 'left',
                                      fontWeight: 'bold',
                                      textTransform: 'none',
                                      fontSize: 16,
                                    }}
                                  >
                                    {intl.formatMessage({
                                      id: 'coaching_list.end_label',
                                    })}
                                  </DefaultTitle>
                                </Grid>
                                <Grid item>
                                  <DatePicker
                                    clearable
                                    format='dd/MM/yyyy'
                                    fullWidth
                                    initial={currentItemEndFormatted}
                                    minDate={today}
                                    name='end'
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          ) : (
                            <React.Fragment>
                              {this.state.currentItem.end && (
                                <React.Fragment>
                                  <Grid item>
                                    <DefaultTitle
                                      style={{
                                        textAlign: 'left',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        fontSize: 16,
                                      }}
                                    >
                                      {intl.formatMessage({
                                        id: 'coaching_list.end_label',
                                      })}
                                    </DefaultTitle>
                                  </Grid>
                                  <Grid item container spacing={1}>
                                    <Grid item>
                                      <FontAwesomeIcon icon={faCalendarAlt} />
                                    </Grid>
                                    <Grid item>
                                      {this.state.currentItem.end
                                        .toDate2()
                                        .toLocaleDateString()}
                                    </Grid>
                                  </Grid>
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          )}
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={8}>
                        <Grid container spacing={1}>
                          {!canUpdateCoaching && (
                            <Grid item xs={12}>
                              <DefaultTitle
                                style={{
                                  textAlign: 'left',
                                  fontWeight: 'bold',
                                  textTransform: 'none',
                                  fontSize: 16,
                                }}
                                noWrap
                              >
                                Description
                              </DefaultTitle>
                            </Grid>
                          )}

                          <Grid
                            item
                            xs={12}
                            style={{ fontSize: 14, textAlign: 'left' }}
                          >
                            <RichTextField
                              name='instruction'
                              initial={JSON.parse(
                                this.state.currentItem.instruction
                              )}
                              readOnly={!canUpdateCoaching}
                              bigLabel
                              label={canUpdateCoaching ? 'Description' : ''}
                              noTool={!canUpdateCoaching}
                              fullWidth
                              multiline
                              required
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </DialogContent>
                  {canUpdateCoaching && (
                    <DialogActions>
                      <Button
                        onClick={() => this.setDeletePromptOpen(true)}
                        color='secondary'
                      >
                        {intl.formatMessage({ id: 'common.delete' })}
                      </Button>
                      <ProgressButton
                        text={intl.formatMessage({ id: 'common.submit' })}
                        loading={submitLoading}
                        centered
                      />
                    </DialogActions>
                  )}
                </React.Fragment>
              )}
            </Formsy>
          </React.Fragment>
        </Dialog>
        {canUpdateCoaching && (
          <Dialog
            open={this.state.deletePromptOpen}
            onClose={() => this.setDeletePromptOpen(false)}
          >
            <DialogTitle>
              {intl.formatMessage({ id: 'coaching_list.delete_prompt' })}
            </DialogTitle>
            <DialogContent>
              {intl.formatMessage({ id: 'coaching_list.delete_prompt2' })}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => this.setDeletePromptOpen(false)}
                color='secondary'
              >
                {intl.formatMessage({ id: 'common.no' })}
              </Button>
              <ProgressButton
                type='button'
                text={intl.formatMessage({ id: 'common.yes' })}
                onClick={() => this.handleRemoveItem(this.state.currentItem.id)}
              />
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  coachingItemList,
  coachingItemListCreation,
  coachingItemListUpdate,
  userDetail,
}) => ({
  accountDetail,
  coachingItemList,
  coachingItemListCreation,
  coachingItemListUpdate,
  userDetail,
});

const mapDispatchToProps = (dispatch) => ({
  coachingItemListActions: bindActionCreators(
    coachingItemListActions,
    dispatch
  ),
  coachingItemListCreationActions: bindActionCreators(
    coachingItemListCreationActions,
    dispatch
  ),
  coachingItemListUpdateActions: bindActionCreators(
    coachingItemListUpdateActions,
    dispatch
  ),
  coachingItemRemovingActions: bindActionCreators(
    coachingItemRemovingActions,
    dispatch
  ),
  userDetailActions: bindActionCreators(userDetailActions, dispatch),
  coachingItemUpdateActions: bindActionCreators(
    coachingItemUpdateActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(CoachingList)));

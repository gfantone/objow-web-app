import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import _ from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Chip,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  DatePicker,
  Select,
  Loader,
  IconButton,
  Avatar,
} from '../../../../components';
import { useIntl, injectIntl } from 'react-intl';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import * as teamCollaboratorListActions from '../../../../services/Teams/TeamCollaboratorList/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions';
import * as Resources from '../../../../Resources';

const styles = {
  panel: {
    backgroundColor: 'initial',
    borderRadius: 'initial',
    // width: '100%',
    boxShadow: 'none',
  },
  panelSummary: {
    padding: 'initial',
  },
  panelDetails: {
    padding: 'initial',
  },
  filterButtons: {
    marginTop: 10,
  },
  filterIcon: {
    color: '#555555',
    marginRight: 5,
    alignItems: 'flex-start',
  },
  filterChip: {
    marginRight: 5,
    marginBottom: 5,
  },
  expansionPanelSummary: {
    '& > .MuiExpansionPanelSummary-content': {
      flexDirection: 'row',
    },
  },
  filterChips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterForm: {
    width: '100%',
  },
};

class BadgeCollaboratorFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team: props.team,
      collaborator: props.collaborator,
      year: props.year,
      category: props.category,
      start: props.end,
      end: props.end,
      expandIcon: faChevronDown,
    };
    this.filterForm = React.createRef();
    this.panel = React.createRef();
  }

  componentDidMount() {
    this.props.teamListActions.getTeamList({ disableCollaborators: true });
    this.props.categoryListActions.getActiveCategoryList();
    if (this.state.team) {
      this.props.teamCollaboratorListActions.getTeamCollaboratorList({
        teamId: this.state.team,
      });
    }
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.previousPeriodListActions.getPreviousPeriodList();
  }

  isReady = () => {
    const { teams, loading: teamLoading } = this.props.teamList;

    const loading = teamLoading;
    return !this.state.ready && !loading && teams;
  };

  componentWillReceiveProps(props) {
    const ready = this.isReady();
    if (
      props.team != this.state.team ||
      props.collaborator != this.state.collaborator ||
      props.year != this.state.year ||
      props.category != this.state.category ||
      props.start != this.state.start ||
      props.end != this.state.end
    ) {
      this.setState(
        {
          ...this.state,
          team: props.team,
          collaborator: props.collaborator,
          year: props.year,
          category: props.category,
          start: props.start,
          end: props.end,
        },
        () => {
          if (props.team) {
            this.props.teamCollaboratorListActions.getTeamCollaboratorList({
              teamId: props.team,
            });
          }
        }
      );
    }
    if (ready) {
      this.setState(
        {
          ...this.state,
          ready: true,
        },
        this.props.onLoaded
      );
    }
  }

  handleChange = (name) => (value) => {
    this.setState(
      {
        ...this.state,
        [name]: value,
      },
      () => this.filterForm.current.submit()
    );
  };

  resetCollaborator = (callback) => {
    this.setState(
      {
        ...this.state,
        collaborator: null,
      },
      callback
    );
  };

  handleSubmit(model) {
    const team =
      model.team != null && model.team != -1 && model.team != undefined
        ? Number(model.team)
        : null;
    const collaborator =
      model.collaborator != null &&
      model.collaborator != -1 &&
      model.collaborator != undefined
        ? Number(model.collaborator)
        : null;
    const { year } = this.state;
    var start = model.start;
    var end = model.end;
    if (start) {
      start.setHours(0, 0, 0, 0);
    }
    if (end) {
      end.setHours(23, 59, 59);
    }
    const { teams } = this.props.teamList;
    const selectedTeam = this.state.team
      ? teams.filter((team) => team.id == parseInt(this.state.team))[0]
      : null;

    const { category } = this.state;

    const defaultCollaborator = _.get(selectedTeam, 'collaborator_ids[0]');
    this.onExpand(null, false, () => {
      this.props.onChange(collaborator || defaultCollaborator, year, category);
      this.panel.current.click();
      this.props.onClose();
    });
  }

  onDeleteCategory = () => {
    const { teams } = this.props.teamList;
    const selectedTeam = this.state.team
      ? teams.filter((team) => team.id == parseInt(this.state.team))[0]
      : null;
    const defaultCollaborator = _.get(selectedTeam, 'collaborator_ids[0]');
    this.setState(
      {
        ...this.state,
        category: null,
      },
      () => {
        this.props.onChange(
          this.state.collaborator || defaultCollaborator,
          this.state.year,
          this.state.category
        );
        this.props.onClose();
      }
    );
  };

  onExpand = (event, expanded, callback) => {
    this.setState(
      {
        ...this.state,
        expandIcon: expanded ? faChevronUp : faChevronDown,
      },
      callback
    );
  };
  renderLoader() {
    return <Loader centered />;
  }

  renderData() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    const teams = this.props.teamList.teams.filter((team) => !team.custom);
    const { categories } = this.props.categoryList;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    const selectedTeam = this.state.team
      ? teams.filter((team) => team.id == parseInt(this.state.team))[0]
      : null;
    const { collaborators } = this.props.teamCollaboratorList;
    const selectedCollaborator = collaborators
      ? collaborators.filter(
          (collaborator) =>
            collaborator.id === parseInt(this.state.collaborator)
        )[0]
      : null;
    const periods = [currentPeriod].concat(previousPeriods);
    const chipAvatar = (
      <Avatar
        src={_.get(selectedCollaborator, 'photo')}
        entityId={_.get(selectedCollaborator, 'id')}
        fallbackName={_.get(selectedCollaborator, 'fullname')}
        fontSize={10}
      />
    );

    // this.props.onLoaded()
    if (account.role.code == 'C') {
      return <div />;
    }
    return (
      <ExpansionPanel
        className={this.props.classes.panel}
        onChange={this.onExpand}
      >
        <ExpansionPanelSummary
          className={this.props.classes.expansionPanelSummary}
          ref={this.panel}
        >
          <Tooltip title={intl.formatMessage({ id: 'filter.submit_button' })}>
            <IconButton size='small' className={this.props.classes.filterIcon}>
              <FontAwesomeIcon icon={this.state.expandIcon} />
            </IconButton>
          </Tooltip>
          <div className={this.props.classes.filterChips}>
            {selectedTeam && (
              <Chip
                size='small'
                label={
                  account.role.code === 'M'
                    ? intl.formatMessage({ id: 'filter.my_team_label' })
                    : selectedTeam.name
                }
                style={{ borderColor: _.get(selectedTeam, 'color.hex') }}
                variant='outlined'
                className={this.props.classes.filterChip}
              />
            )}
            {selectedCollaborator && (
              <Chip
                size='small'
                label={selectedCollaborator.fullname}
                onDelete={this.handleDeleteCollaborator}
                avatar={chipAvatar}
                style={{
                  borderColor: _.get(selectedCollaborator, 'team.color.hex'),
                }}
                variant='outlined'
                className={this.props.classes.filterChip}
              />
            )}
            {this.state.category && (
              <Chip
                size='small'
                label={
                  categories.find((c) => c.id === parseInt(this.state.category))
                    .name
                }
                onDelete={this.onDeleteCategory}
                variant='outlined'
                className={this.props.classes.filterChip}
              />
            )}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Formsy
            onSubmit={this.handleSubmit.bind(this)}
            className={this.props.classes.filterForm}
            ref={this.filterForm}
          >
            <Grid container spacing={2}>
              {(account.role.code == 'A' || account.role.code == 'S') && (
                <Grid item xs={4}>
                  <Select
                    name='team'
                    label={intl.formatMessage({ id: 'filter.team_label' })}
                    options={teams}
                    optionValueName='id'
                    optionTextName='name'
                    emptyDisabled
                    fullWidth
                    initial={this.state.team}
                    onChange={(value) => {
                      this.resetCollaborator(() =>
                        this.handleChange('team')(value)
                      );
                    }}
                  />
                </Grid>
              )}
              {account.role.code != 'C' && collaborators && (
                <Grid item xs={4}>
                  <Select
                    name='collaborator'
                    label={intl.formatMessage({
                      id: 'filter.collaborator_label',
                    })}
                    options={collaborators}
                    emptyDisabled
                    optionValueName='id'
                    optionTextName='fullname'
                    fullWidth
                    initial={this.state.collaborator}
                    onChange={this.handleChange('collaborator').bind(this)}
                  />
                </Grid>
              )}
              <Grid item xs={4}>
                <Select
                  name='category'
                  label={intl.formatMessage({ id: 'filter.category_label' })}
                  options={categories}
                  emptyText={intl.formatMessage({
                    id: 'filter.category_all_option',
                  })}
                  optionValueName='id'
                  optionTextName='name'
                  fullWidth
                  updateInitial
                  initial={this.state.category}
                  onChange={this.handleChange('category').bind(this)}
                />
              </Grid>
            </Grid>
          </Formsy>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  render() {
    const { account } = this.props.accountDetail;
    const { teams, loading } = this.props.teamList;
    const { categories, categoriesLoading } = this.props.categoryList;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    return (
      <div>
        {account &&
          teams &&
          currentPeriod &&
          previousPeriods &&
          categories &&
          this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  teamList,
  categoryList,
  teamCollaboratorList,
  currentPeriodDetail,
  previousPeriodList,
}) => ({
  accountDetail,
  teamList,
  categoryList,
  teamCollaboratorList,
  currentPeriodDetail,
  previousPeriodList,
});

const mapDispatchToProps = (dispatch) => ({
  teamListActions: bindActionCreators(teamListActions, dispatch),
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
  teamCollaboratorListActions: bindActionCreators(
    teamCollaboratorListActions,
    dispatch
  ),
  currentPeriodDetailActions: bindActionCreators(
    currentPeriodDetailActions,
    dispatch
  ),
  previousPeriodListActions: bindActionCreators(
    previousPeriodListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(BadgeCollaboratorFilter)));

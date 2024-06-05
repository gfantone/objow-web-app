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
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions';
import * as teamListActions from '../../../../services/Teams/TeamList/actions';
import * as teamCollaboratorListActions from '../../../../services/Teams/TeamCollaboratorList/actions';
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions';
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions';
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions';
import * as teamGoalCategoryListActions from '../../../../services/TeamGoalCategories/TeamGoalCategoryList/actions';
import * as collaboratorGoalCategoryListActions from '../../../../services/CollaboratorGoalCategories/CollaboratorGoalCategoryList/actions';
import * as Resources from '../../../../Resources';

const styles = {
  panel: {
    backgroundColor: 'initial',
    borderRadius: 'initial',

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
      width: '100%',
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

class GoalCollaboratorFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
      team: props.team,
      collaborator: props.collaborator,
      year: props.year,
      start: props.end,
      end: props.end,
      onlyCollaborator: props.onlyCollaborator,
      onlyTeam: props.onlyTeam,
      definition: props.definition,
      page: props.page,
      current: props.current,
      expandIcon: faChevronDown,
      initialized: false,
      panel: React.createRef(),
    };
    this.filterForm = React.createRef();
    this.definitionSelect = React.createRef();
  }

  componentDidMount() {
    // this.props.categoryListActions.getActiveCategoryList();
    this.props.teamListActions.getTeamList({ disableCollaborators: true });
    if (this.state.team) {
      this.props.teamCollaboratorListActions.getTeamCollaboratorList({
        teamId: this.state.team,
      });
    }
    this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
    this.props.previousPeriodListActions.getPreviousPeriodList();
  }

  componentDidUpdate() {
    const { definitions } = this.props.goalDefinitionList;
    const { categories: teamCategories } = this.props.teamGoalCategoryList;
    const { categories: collaboratorCategories } =
      this.props.collaboratorGoalCategoryList;

    if (!this.state.initialized) {
      this.updateGoalDefinitions();
    }
  }

  updateGoalDefinitions = () => {
    const { period: currentPeriod } = this.props.currentPeriodDetail;

    const periodId = this.props.year || _.get(currentPeriod, 'id');

    if (currentPeriod) {
      if (this.state.collaborator) {
        this.props.collaboratorGoalCategoryListActions.getCollaboratorGoalCategories(
          this.state.collaborator,
          periodId
        );
        this.props.goalDefinitionListActions.getGoalDefinitionListByCollaborator(
          this.state.collaborator,
          periodId,
          this.state.current
        );
        this.setState({
          ...this.state,
          initialized: true,
        });
      } else if (this.state.team) {
        this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(
          this.state.team,
          periodId
        );
        this.props.goalDefinitionListActions.getGoalDefinitionListByTeam(
          periodId,
          this.state.team,
          this.state.current
        );
        this.setState({
          ...this.state,
          initialized: true,
        });
      }

      if (this.state.team) {
        this.props.teamCollaboratorListActions.getTeamCollaboratorList({
          teamId: this.state.team,
        });
      }
    }
  };

  isReady = () => {
    const { categories, loading: categoriesLoading } = this.props.categoryList;
    const { teams, loading: teamLoading } = this.props.teamList;
    const { definitions, loading: definitionsLoading } =
      this.props.goalDefinitionList;

    const loading = categoriesLoading || teamLoading || definitionsLoading;
    return !this.state.ready && !loading;
  };

  componentWillReceiveProps(props) {
    const ready = this.isReady();

    if (props.current !== this.state.current) {
      this.setState(
        {
          ...this.state,
          current: props.current,
        },
        this.updateGoalDefinitions
      );
    }

    if (
      props.team != this.state.team ||
      props.collaborator != this.state.collaborator ||
      (props.category !== null && props.category != this.state.category) ||
      props.year != this.state.year ||
      props.start != this.state.start ||
      props.end != this.state.end ||
      props.onlyCollaborator != this.state.onlyCollaborator ||
      props.onlyTeam != this.state.onlyTeam ||
      (props.definition !== null && props.definition != this.state.definition)
    ) {
      this.setState(
        {
          ...this.state,
          category: props.category === null ? '' : props.category,
          team: props.team,
          collaborator: props.collaborator,
          year: props.year,
          onlyCollaborator: props.onlyCollaborator,
          onlyTeam: props.onlyTeam,
          start: props.start,
          end: props.end,
          definition: props.definition === null ? '' : props.definition,
          current: props.current,
        },
        this.updateGoalDefinitions
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
    const form = this.filterForm.current;
    if (name === 'team' || name === 'collaborator') {
      this.updateGoalDefinitions();
    }
    this.setState(
      {
        ...this.state,
        [name]: value,
      },
      () => form.submit()
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

    const {
      start,
      end,
      year,
      category,
      onlyCollaborator,
      onlyTeam,
      definition,
    } = this.state;

    this.onExpand(null, false, () => {
      this.props.onChange(
        category,
        team,
        collaborator,
        year,
        start,
        end,
        onlyCollaborator || null,
        onlyTeam || null,
        definition
      );
      this.state.panel.current.click();
      this.props.onClose();
    });
  }

  handleDeleteCollaborator = () => {
    const {
      start,
      end,
      year,
      team,
      collaborator,
      category,
      onlyCollaborator,
      onlyTeam,
      definition,
    } = this.state;

    this.props.onChange(
      category,
      team,
      null,
      year,
      start,
      end,
      onlyCollaborator || null,
      onlyTeam || null,
      definition
    );
    this.props.onClose();
  };

  handleDeleteCategory = () => {
    const {
      start,
      end,
      year,
      team,
      collaborator,
      category,
      onlyCollaborator,
      onlyTeam,
      definition,
    } = this.state;

    this.props.onChange(
      '',
      team,
      collaborator,
      year,
      start,
      end,
      onlyCollaborator || null,
      onlyTeam || null,
      definition
    );
    this.props.onClose();
    this.setState(
      {
        ...this.state,
        category: '',
      },
      () => {}
    );
  };

  handleDeleteDefinition = () => {
    const {
      start,
      end,
      year,
      team,
      collaborator,
      category,
      onlyCollaborator,
      onlyTeam,
      definition,
    } = this.state;

    this.props.onChange(
      category,
      team,
      collaborator,
      year,
      start,
      end,
      onlyCollaborator || null,
      onlyTeam || null,
      ''
    );
    this.props.onClose();
    this.setState(
      {
        ...this.state,
        definition: '',
      },
      () => {
        //
      }
    );
  };

  onExpand = (event, expanded, callback) => {
    this.setState(
      {
        ...this.state,
        expandIcon: expanded === true ? faChevronUp : faChevronDown,
      },
      callback
    );
  };
  renderLoader() {
    return <Loader centered />;
  }

  filterDefinitions = (definitions) => {
    return definitions.filter(
      (definition) =>
        !this.state.category ||
        parseInt(definition.categoryId) === parseInt(this.state.category)
    );
  };

  renderData() {
    const { intl } = this.props;
    const { account } = this.props.accountDetail;
    console.log('this.props.teamList', this.props.teamList)
    const teams = this.props.teamList.teams.filter((team) => !team.custom);
    // const { categories } = this.props.categoryList;
    const { categories: teamCategories } = this.props.teamGoalCategoryList;
    const { categories: collaboratorCategories } =
      this.props.collaboratorGoalCategoryList;
    const categories = this.state.collaborator
      ? collaboratorCategories
      : this.state.team
      ? teamCategories
      : null;
    const { definitions } = this.props.goalDefinitionList;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    const selectedTeam = this.state.team
      ? teams.filter((team) => team.id == parseInt(this.state.team))[0]
      : null;
    const selectedCategory =
      this.state.category && categories
        ? categories.filter(
            (category) => category.categoryId == parseInt(this.state.category)
          )[0]
        : null;
    const selectedDefinition =
      this.state.definition && definitions
        ? definitions.filter(
            (definition) => definition.id == parseInt(this.state.definition)
          )[0]
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
    const selectSize = account.role.code == 'M' ? 4 : 6;
    this.props.onLoaded();

    return (
      <ExpansionPanel
        className={this.props.classes.panel}
        onChange={this.onExpand}
      >
        <ExpansionPanelSummary
          className={this.props.classes.expansionPanelSummary}
          ref={this.state.panel}
        >
          <Tooltip title={intl.formatMessage({ id: 'filter.submit_button' })}>
            <IconButton size='small' className={this.props.classes.filterIcon}>
              <FontAwesomeIcon icon={this.state.expandIcon} />
            </IconButton>
          </Tooltip>
          <div className={this.props.classes.filterChips}>
            {selectedTeam && _.includes(['A', 'S', 'M'], account.role.code) && (
              <Chip
                size='small'
                label={
                  _.includes(['M'], account.role.code)
                    ? intl.formatMessage({ id: 'filter.my_team_label' })
                    : selectedTeam.name
                }
                style={{ borderColor: _.get(selectedTeam, 'color.hex') }}
                variant='outlined'
                className={this.props.classes.filterChip}
              />
            )}
            {selectedCollaborator &&
              _.includes(['M', 'S', 'A'], account.role.code) && (
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
            {selectedCategory && (
              <Chip
                size='small'
                label={selectedCategory.name}
                onDelete={this.handleDeleteCategory}
                variant='outlined'
                className={this.props.classes.filterChip}
              />
            )}
            {!selectedCategory && _.includes(['C'], account.role.code) && (
              <Chip
                size='small'
                label={intl.formatMessage({ id: 'filter.all_category_label' })}
                variant='outlined'
                className={this.props.classes.filterChip}
              />
            )}

            {selectedDefinition && (
              <Chip
                size='small'
                label={selectedDefinition.name}
                onDelete={this.handleDeleteDefinition}
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
                <Grid item xs={12} sm={selectSize}>
                  <Select
                    name='team'
                    label={intl.formatMessage({ id: 'filter.team_label' })}
                    options={teams}
                    optionValueName='id'
                    optionTextName='name'
                    emptyDisabled
                    fullWidth
                    updateInitial
                    initial={
                      (selectedCollaborator && selectedCollaborator.team.id) ||
                      this.state.team
                    }
                    onChange={(value) => {
                      this.resetCollaborator(() =>
                        this.handleChange('team')(value)
                      );
                    }}
                  />
                </Grid>
              )}

              {account.role.code != 'C' && collaborators && (
                <Grid item xs={12} sm={selectSize}>
                  <Select
                    name='collaborator'
                    label={intl.formatMessage({
                      id: 'filter.collaborator_label',
                    })}
                    options={collaborators}
                    emptyText={intl.formatMessage({
                      id: 'filter.collaborator_all_option',
                    })}
                    optionValueName='id'
                    optionTextName='fullname'
                    fullWidth
                    initial={this.state.collaborator}
                    onChange={this.handleChange('collaborator').bind(this)}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={selectSize}>
                <Select
                  name='category'
                  label={intl.formatMessage({ id: 'filter.category_label' })}
                  options={categories}
                  emptyText={intl.formatMessage({
                    id: 'filter.category_all_option',
                  })}
                  optionValueName='categoryId'
                  optionTextName='name'
                  fullWidth
                  updateInitial
                  initial={this.state.category}
                  onChange={this.handleChange('category').bind(this)}
                />
              </Grid>
              <Grid item xs={12} sm={selectSize}>
                <Select
                  name='definition'
                  label={intl.formatMessage({ id: 'filter.goal_label' })}
                  options={this.filterDefinitions(definitions)}
                  emptyText={intl.formatMessage({
                    id: 'filter.collaborator_all_option',
                  })}
                  optionValueName='id'
                  optionTextName='name'
                  updateInitial
                  fullWidth
                  initial={this.state.definition}
                  onChange={this.handleChange('definition').bind(this)}
                />
              </Grid>
            </Grid>
          </Formsy>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }

  render() {
    const { categories, loading: categoriesLoading } = this.props.categoryList;
    const { account } = this.props.accountDetail;
    const { teams, loading: teamLoading } = this.props.teamList;
    const { definitions, loading: definitionsLoading } =
      this.props.goalDefinitionList;
    const { period: currentPeriod } = this.props.currentPeriodDetail;
    const { periods: previousPeriods } = this.props.previousPeriodList;
    const loading = categoriesLoading || teamLoading || definitionsLoading;
    return (
      <div>
        {account &&
          teams &&
          categories &&
          currentPeriod &&
          previousPeriods &&
          definitions &&
          this.renderData()}
      </div>
    );
  }
}

const mapStateToProps = ({
  accountDetail,
  teamList,
  teamCollaboratorList,
  categoryList,
  currentPeriodDetail,
  previousPeriodList,
  goalDefinitionList,
  collaboratorGoalCategoryList,
  teamGoalCategoryList,
}) => ({
  accountDetail,
  teamList,
  teamCollaboratorList,
  categoryList,
  currentPeriodDetail,
  previousPeriodList,
  goalDefinitionList,
  collaboratorGoalCategoryList,
  teamGoalCategoryList,
});

const mapDispatchToProps = (dispatch) => ({
  categoryListActions: bindActionCreators(categoryListActions, dispatch),
  teamListActions: bindActionCreators(teamListActions, dispatch),
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
  goalDefinitionListActions: bindActionCreators(
    goalDefinitionListActions,
    dispatch
  ),
  teamGoalCategoryListActions: bindActionCreators(
    teamGoalCategoryListActions,
    dispatch
  ),
  collaboratorGoalCategoryListActions: bindActionCreators(
    collaboratorGoalCategoryListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(injectIntl(GoalCollaboratorFilter)));

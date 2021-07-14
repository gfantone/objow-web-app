import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Formsy from 'formsy-react'
import _ from 'lodash'
import { Dialog, DialogActions, DialogContent, DialogTitle,Tooltip, Grid, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Chip } from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Button, DatePicker, Select, Loader, IconButton, Avatar } from '../../../../components'
import * as Resources from '../../../../Resources'
import * as categoryListActions from '../../../../services/Categories/CategoryList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'
import * as goalDefinitionListActions from '../../../../services/GoalDefinitions/GoalDefinitionList/actions'
import * as teamGoalCategoryListActions from '../../../../services/TeamGoalCategories/TeamGoalCategoryList/actions'
import * as collaboratorGoalCategoryListActions from '../../../../services/CollaboratorGoalCategories/CollaboratorGoalCategoryList/actions'

const styles = {
  panel: {
      backgroundColor: 'initial',
      borderRadius: 'initial',

      boxShadow: 'none'
  },
  panelSummary: {
      padding: 'initial'
  },
  panelDetails: {
      padding: 'initial',
  },
  filterButtons: {
      marginTop: 10
  },
  filterIcon: {
    color: '#555555',
    marginRight: 5,
    alignItems: 'flex-start'
  },
  filterChip: {
    marginRight: 5,
    marginBottom: 5
  },
  expansionPanelSummary: {
    '& > .MuiExpansionPanelSummary-content': {
      flexDirection: 'row',
      width: '100%',
    }
  },
  filterChips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterForm: {
    width: '100%',
  }
}

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
            initialized: false
        }
        this.filterForm = React.createRef();
        this.definitionSelect = React.createRef();
        this.panel = React.createRef();
    }

    componentDidMount() {
        // this.props.categoryListActions.getActiveCategoryList();
        this.props.teamListActions.getTeamList();
        this.props.currentPeriodDetailActions.getCurrentPeriodDetail();
        this.props.previousPeriodListActions.getPreviousPeriodList()
    }

    componentDidUpdate() {
      const { definitions } = this.props.goalDefinitionList;
      const {categories: teamCategories} = this.props.teamGoalCategoryList
      const {categories: collaboratorCategories} = this.props.collaboratorGoalCategoryList

      if(!this.state.initialized) {
        this.updateGoalDefinitions()
      }
    }

    updateGoalDefinitions = () => {
      const { period: currentPeriod } = this.props.currentPeriodDetail;

      // console.log(this.state.collaborator);
      if(currentPeriod) {
        if(this.state.collaborator) {
          this.props.collaboratorGoalCategoryListActions.getCollaboratorGoalCategories(this.state.collaborator, currentPeriod.id)
          this.props.goalDefinitionListActions.getGoalDefinitionListByCollaborator(this.state.collaborator, currentPeriod.id, this.state.current)
          this.setState({
            ...this.state,
            initialized: true
          })
        } else if(this.state.team) {
          this.props.teamGoalCategoryListActions.getTeamGoalCategoryList(this.state.team, currentPeriod.id)
          this.props.goalDefinitionListActions.getGoalDefinitionListByTeam(currentPeriod.id, this.state.team, this.state.current)
          this.setState({
            ...this.state,
            initialized: true
          })
        }
      }
    }

    componentWillReceiveProps(props) {

        if(props.current !== this.state.current) {
          this.setState({
            ...this.state,
            current: props.current
          }, this.updateGoalDefinitions)
        }

        if (
            props.team != this.state.team
            || props.collaborator != this.state.collaborator
            || props.category !== null && props.category != this.state.category
            || props.year != this.state.year
            || props.start != this.state.start
            || props.end != this.state.end
            || props.onlyCollaborator != this.state.onlyCollaborator
            || props.onlyTeam != this.state.onlyTeam
            || props.definition !== null && props.definition != this.state.definition
        ) {
            this.setState({
                ...this.state,
                category: props.category === null ? "" : props.category,
                team: props.team,
                collaborator: props.collaborator,
                year: props.year,
                start: props.end,
                end: props.end,
                onlyCollaborator: props.onlyCollaborator,
                onlyTeam: props.onlyTeam,
                end: props.end,
                definition: props.definition === null ? "" : props.definition,
                current: props.current,
            }, this.updateGoalDefinitions)
        }
    }

    handleChange = name => value => {
        if(name === 'team' || name === 'collaborator') {
          this.updateGoalDefinitions()
        }
        this.setState({
            ...this.state,
            [name]: value
        }, () => this.filterForm.current.submit())
    };

    resetCollaborator = (callback) => {
        this.setState({
            ...this.state,
            collaborator: null
        }, callback)
    }

    handleSubmit(model) {
        const team = model.team != null && model.team != -1 && model.team != undefined ? Number(model.team) : null;
        const collaborator = model.collaborator != null && model.collaborator != -1 && model.collaborator != undefined ? Number(model.collaborator) : null;

        const { start, end, year, category, onlyCollaborator, onlyTeam, definition } = this.state;

        this.onExpand(null, false, () => {
          this.props.onChange(category, team, collaborator, year, start, end, onlyCollaborator || null, onlyTeam || null, definition);
          this.panel.current.click()
          this.props.onClose()
        })

    }

    handleDeleteCollaborator = () => {
      const { start, end, year, team, collaborator, category, onlyCollaborator, onlyTeam, definition } = this.state;

      this.props.onChange(category, team, null, year, start, end, onlyCollaborator || null, onlyTeam || null, definition);
      this.props.onClose()
    }

    handleDeleteCategory = () => {
      const { start, end, year, team, collaborator, category, onlyCollaborator, onlyTeam, definition } = this.state;

      this.setState({
        ...this.state,
        category: ""
      }, () => {
        this.props.onChange("", team, collaborator, year, start, end, onlyCollaborator || null, onlyTeam || null, definition);
        this.props.onClose()
      })

    }

    handleDeleteDefinition = () => {
      const { start, end, year, team, collaborator, category, onlyCollaborator, onlyTeam, definition } = this.state;

      this.setState({
        ...this.state,
        definition: ""
      }, () => {
        //
        this.props.onChange(category, team, collaborator, year, start, end, onlyCollaborator || null, onlyTeam || null, "");
        this.props.onClose()
      })
    }

    onExpand = (event, expanded, callback) => {
      this.setState({
        ...this.state,
        expandIcon: expanded === true ? faChevronUp : faChevronDown
      }, callback)
    }
    renderLoader() {
        return <Loader centered />
    }

    filterDefinitions = (definitions) => {
      return definitions.filter(definition => !this.state.category || parseInt(definition.categoryId) === parseInt(this.state.category))
    }

    renderData() {
        const { account } = this.props.accountDetail;
        const { teams, loading } = this.props.teamList;
        // const { categories } = this.props.categoryList;
        const {categories: teamCategories} = this.props.teamGoalCategoryList
        const {categories: collaboratorCategories} = this.props.collaboratorGoalCategoryList
        const categories = this.state.collaborator ? collaboratorCategories : this.state.team ? teamCategories : null
        const { definitions } = this.props.goalDefinitionList;
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;
        const selectedTeam = this.state.team ? teams.filter(team => team.id == parseInt(this.state.team))[0] : null;
        const selectedCategory = this.state.category && categories ? categories.filter(category => category.categoryId == parseInt(this.state.category))[0] : null;
        const selectedDefinition = this.state.definition && definitions ? definitions.filter(definition => definition.id == parseInt(this.state.definition))[0] : null;
        const collaborators = selectedTeam ? selectedTeam.collaborators : null;
        const selectedCollaborator = collaborators ? collaborators.filter(collaborator => collaborator.id === parseInt(this.state.collaborator))[0] : null;
        const periods = [currentPeriod].concat(previousPeriods);
        const chipAvatar = <Avatar src={_.get(selectedCollaborator, 'photo')} entityId={ _.get(selectedCollaborator, 'id') } fallbackName={ _.get(selectedCollaborator, 'fullname') } fontSize={ 10 } />

        this.props.onLoaded()
        return (
            <ExpansionPanel className={this.props.classes.panel} onChange={this.onExpand}>
              <ExpansionPanelSummary className={this.props.classes.expansionPanelSummary} ref={this.panel}>
                  <Tooltip title={Resources.TEAM_CHALLENGE_LIST_FILTER_BUTTON}>
                      <IconButton size='small' className={this.props.classes.filterIcon}><FontAwesomeIcon icon={this.state.expandIcon} /></IconButton>
                  </Tooltip>
                  <div className={this.props.classes.filterChips}>
                    { selectedTeam && _.includes(['A', 'M'], account.role.code) && (
                      <Chip
                        size="small"
                        label={_.includes(['M'], account.role.code) ? Resources.CHALLENGE_FILTER_MY_TEAM_LABEL : selectedTeam.name}
                        style={{borderColor: _.get(selectedTeam, 'color.hex')}}
                        variant="outlined"
                        className={this.props.classes.filterChip}
                        />
                    ) }
                    { selectedCollaborator && _.includes(['M', 'A'], account.role.code) && (
                      <Chip
                        size="small"
                        label={selectedCollaborator.fullname}
                        onDelete={this.handleDeleteCollaborator}
                        avatar={ chipAvatar }
                        style={{borderColor: _.get(selectedCollaborator, 'team.color.hex')}}
                        variant="outlined"
                        className={this.props.classes.filterChip}
                        />
                    )  }
                    { selectedCategory && (
                      <Chip
                        size="small"
                        label={selectedCategory.name}
                        onDelete={this.handleDeleteCategory}
                        variant="outlined"
                        className={this.props.classes.filterChip}
                        />
                    )  }
                    { !selectedCategory && _.includes(['C'], account.role.code) && (
                      <Chip
                        size="small"
                        label={Resources.GOAL_FILTER_ALL_CATEGORY_LABEL}
                        variant="outlined"
                        className={this.props.classes.filterChip}
                        />
                    )  }

                    { selectedDefinition && (
                      <Chip
                        size="small"
                        label={selectedDefinition.name}
                        onDelete={this.handleDeleteDefinition}
                        variant="outlined"
                        className={this.props.classes.filterChip}
                        />
                    )  }
                  </div>

              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Formsy onSubmit={this.handleSubmit.bind(this)} className={this.props.classes.filterForm} ref={this.filterForm}>
                    <Grid container spacing={2}>
                        { account.role.code == 'A' &&
                          <Grid item xs={12} sm={6}>
                              <Select
                                name='team'
                                label={Resources.CHALLENGE_FILTER_TEAM_LABEL}
                                options={teams}
                                optionValueName='id'
                                optionTextName='name'
                                emptyDisabled
                                fullWidth
                                initial={this.state.team}
                                onChange={(value) => {
                                  this.resetCollaborator(() => this.handleChange('team')(value))
                                }}
                              />
                          </Grid>
                        }

                        { account.role.code != 'C' && collaborators &&
                          <Grid item xs={12} sm={6}>
                              <Select
                                name='collaborator'
                                label={Resources.CHALLENGE_FILTER_COLLABORATOR_LABEL}
                                options={collaborators}
                                emptyText={Resources.CHALLENGE_FILTER_COLLABORATOR_ALL_OPTION}
                                optionValueName='id'
                                optionTextName='fullname'
                                fullWidth
                                initial={this.state.collaborator}
                                onChange={this.handleChange('collaborator').bind(this)}
                                />
                          </Grid>
                        }
                        <Grid item xs={12} sm={6}>
                          <Select
                            name='category'
                            label={Resources.GOAL_FILTER_CATEGORY_LABEL}
                            options={categories}
                            emptyText={Resources.GOAL_FILTER_CATEGORY_ALL_OPTION}
                            optionValueName='categoryId'
                            optionTextName='name'
                            fullWidth
                            updateInitial
                            initial={this.state.category}
                            onChange={this.handleChange('category').bind(this)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Select
                              name='definition'
                              label={Resources.GOAL_FILTER_GOAL_LABEL}
                              options={this.filterDefinitions(definitions)}
                              emptyText={Resources.CHALLENGE_FILTER_COLLABORATOR_ALL_OPTION}
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
        )
    }

    render() {
        const { categories } = this.props.categoryList;
        const { account } = this.props.accountDetail;
        const { teams, loading } = this.props.teamList;
        const {definitions} = this.props.goalDefinitionList
        const { period: currentPeriod } = this.props.currentPeriodDetail;
        const { periods: previousPeriods } = this.props.previousPeriodList;
        return (
            <div>

                { account && teams && categories && currentPeriod && previousPeriods && definitions && this.renderData() }
            </div>
        )
    }
}

const mapStateToProps = ({ accountDetail, teamList, categoryList, currentPeriodDetail, previousPeriodList, goalDefinitionList, collaboratorGoalCategoryList, teamGoalCategoryList }) => ({
    accountDetail,
    teamList,
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
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch),
    goalDefinitionListActions: bindActionCreators(goalDefinitionListActions, dispatch),
    teamGoalCategoryListActions: bindActionCreators(teamGoalCategoryListActions, dispatch),
    collaboratorGoalCategoryListActions: bindActionCreators(collaboratorGoalCategoryListActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GoalCollaboratorFilter))

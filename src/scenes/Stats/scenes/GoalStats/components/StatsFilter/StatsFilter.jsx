import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid, Hidden} from '@material-ui/core'
import {BaseForm, MobileForm} from './components'
import {Card, DefaultTitle, Loader} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as collaboratorGoalCategoryListActions from '../../../../../../services/CollaboratorGoalCategories/CollaboratorGoalCategoryList/actions'
import * as currentPeriodDetailActions from '../../../../../../services/Periods/CurrentPeriodDetail/actions'
import * as goalDefinitionListActions from '../../../../../../services/GoalDefinitions/GoalDefinitionList/actions'
import * as previousPeriodListActions from '../../../../../../services/Periods/PreviousPeriodList/actions'
import * as teamGoalCategoryListActions from '../../../../../../services/TeamGoalCategories/TeamGoalCategoryList/actions'
import * as teamListActions from '../../../../../../services/Teams/TeamList/actions';

const StatsFilter = ({initialCategory, initialCollaborator, initialPeriod, initialTeam, onChange, onFilterRequiredLoaded, ...props}) => {
    const [selectedCategory, setSelectedCategory] = React.useState(initialCategory)
    const [selectedCollaborator, setSelectedCollaborator] = React.useState(initialCollaborator)
    const [selectedDefinition, setSelectedDefinition] = React.useState(null)
    const [selectedPeriod, setSelectedPeriod] = React.useState(initialPeriod)
    const [selectedTeam, setSelectedTeam] = React.useState(initialTeam)
    const {categories: collaboratorCategories, loading: collaboratorGoalCategoryListLoading} = props.collaboratorGoalCategoryList
    const {period: currentPeriod, loading: currentPeriodDetailLoading} = props.currentPeriodDetail
    const {definitions, loading: goalDefinitionListLoading} = props.goalDefinitionList
    const {periods: previousPeriods, loading: previousPeriodListLoading} = props.previousPeriodList
    const {categories: teamCategories, loading: teamGoalCategoryListLoading} = props.teamGoalCategoryList
    const {teams, loading: teamListLoading} = props.teamList
    const categories = selectedCollaborator ? collaboratorCategories : selectedTeam ? teamCategories : null
    const categoryDefinitions = selectedCategory && definitions ? definitions.filter(x => x.categoryId === selectedCategory) : null
    const categoryDisabled = !categories || collaboratorGoalCategoryListLoading || teamGoalCategoryListLoading
    const collaborators = selectedTeam && teams && teams.length > 0 ? teams.filter(x => x.id === selectedTeam)[0].collaborators : null
    const definitionDisabled = !categoryDefinitions || goalDefinitionListLoading
    const periods = currentPeriod && previousPeriods ? [currentPeriod].concat(previousPeriods) : null
    const requiredLoading = currentPeriodDetailLoading || previousPeriodListLoading || teamListLoading

    useEffect(() => {
        props.currentPeriodDetailActions.getCurrentPeriodDetail()
        props.previousPeriodListActions.getPreviousPeriodList()
        props.teamListActions.getTeamList()
        loadCategories(selectedCollaborator, selectedPeriod, selectedTeam)
        loadDefinitions(selectedCollaborator, selectedPeriod, selectedTeam)
    }, [])

    useEffect(() => {
        onFilterRequiredLoaded(!currentPeriodDetailLoading && !previousPeriodListLoading && !teamListLoading)
    }, [currentPeriodDetailLoading, previousPeriodListLoading, teamListLoading])

    useEffect(() => {
        if (
            selectedCategory
            && (
                (selectedCollaborator && !collaboratorGoalCategoryListLoading && collaboratorCategories && collaboratorCategories.filter(x => x.categoryId === selectedCategory).length === 0)
                || (!selectedCollaborator && selectedTeam && !teamGoalCategoryListLoading && teamCategories && teamCategories.filter(x => x.categoryId === selectedCategory).length === 0)
            )
        ) {
            const category = selectedCollaborator ? collaboratorCategories[0].categoryId : teamCategories[0].categoryId
            setSelectedCategory(category)
        }
    }, [collaboratorCategories, collaboratorGoalCategoryListLoading, teamCategories, teamGoalCategoryListLoading])

    useEffect(() => {
        if (selectedDefinition && !goalDefinitionListLoading && definitions && definitions.filter(x => x.id === selectedDefinition).length === 0) {
            setSelectedDefinition(null)
            onChange(selectedCollaborator, null, selectedPeriod, selectedTeam)
        }
    }, [definitions, goalDefinitionListLoading])

    function handleCategoryChange(value) {
        const newCategory = value ? Number(value) : null
        if (selectedCategory !== newCategory) {
            setSelectedCategory(newCategory)
            setSelectedDefinition(null)
            onChange(selectedCollaborator, null, selectedPeriod, selectedTeam)
        }
    }

    function handleCollaboratorChange(value) {
        const newCollaborator = value ? Number(value) : null
        if (selectedCollaborator !== newCollaborator) {
            setSelectedCollaborator(newCollaborator)
            const team = !newCollaborator ? selectedTeam : null
            onChange(newCollaborator, selectedDefinition, selectedPeriod, team)
            loadCategories(newCollaborator, selectedPeriod, team)
            loadDefinitions(newCollaborator, selectedPeriod, team)
        }
    }

    function handleDefinitionChange(value) {
        const newDefinition = value ? Number(value) : null
        if (selectedDefinition !== newDefinition) {
            setSelectedDefinition(newDefinition)
            onChange(selectedCollaborator, newDefinition, selectedPeriod, selectedTeam)
        }
    }

    function handlePeriodChange(value) {
        const newPeriod = value ? Number(value) : null
        if (selectedPeriod !== newPeriod) {
            setSelectedPeriod(newPeriod)
            setSelectedDefinition(null)
            const team = !selectedCollaborator ? selectedTeam : null
            onChange(selectedCollaborator, null, newPeriod, team)
            loadCategories(selectedCollaborator, newPeriod, team)
            loadDefinitions(selectedCollaborator, newPeriod, team)
        }
    }

    function handleTeamChange(value) {
        const newTeam = value ? Number(value) : null
        if (selectedTeam !== newTeam) {
            setSelectedTeam(newTeam)
            setSelectedCollaborator(null)
            onChange(null, selectedDefinition, selectedPeriod, newTeam)
            loadCategories(null, selectedPeriod, newTeam)
            loadDefinitions(null, selectedPeriod, newTeam)
        }
    }

    function loadCategories(collaborator, period, team) {
        if (collaborator) {
            props.collaboratorGoalCategoryListActions.getCollaboratorGoalCategories(collaborator, period)
        } else if (team) {
            props.teamGoalCategoryListActions.getTeamGoalCategoryList(team, period)
        }
    }

    function loadDefinitions(collaborator, period, team) {
        if (selectedCollaborator) {
            props.goalDefinitionListActions.getGoalDefinitionListByCollaborator(collaborator, period)
        } else if (selectedTeam) {
            props.goalDefinitionListActions.getGoalDefinitionListByTeam(period, team)
        }
    }

    function renderData() {
        return (
            <React.Fragment>
                <Hidden smUp implementation='css'>
                    <MobileForm
                        categories={categories}
                        category={selectedCategory}
                        categoryLoading={categoryDisabled}
                        collaborator={selectedCollaborator}
                        collaborators={collaborators}
                        definition={selectedDefinition}
                        definitionDisabled={definitionDisabled}
                        definitions={categoryDefinitions}
                        period={selectedPeriod}
                        periods={periods}
                        team={selectedTeam}
                        teams={teams}
                        onCategoryChange={handleCategoryChange}
                        onCollaboratorChange={handleCollaboratorChange}
                        onDefinitionChange={handleDefinitionChange}
                        onPeriodChange={handlePeriodChange}
                        onTeamChange={handleTeamChange}
                    />
                </Hidden>
                <Hidden xsDown implementation='css'>
                    <BaseForm
                        categories={categories}
                        category={selectedCategory}
                        categoryLoading={categoryDisabled}
                        collaborator={selectedCollaborator}
                        collaborators={collaborators}
                        definition={selectedDefinition}
                        definitionDisabled={definitionDisabled}
                        definitions={categoryDefinitions}
                        period={selectedPeriod}
                        periods={periods}
                        team={selectedTeam}
                        teams={teams}
                        onCategoryChange={handleCategoryChange}
                        onCollaboratorChange={handleCollaboratorChange}
                        onDefinitionChange={handleDefinitionChange}
                        onPeriodChange={handlePeriodChange}
                        onTeamChange={handleTeamChange}
                    />
                </Hidden>
            </React.Fragment>
        )
    }

    function renderLoader() {
        return <Loader centered />
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <DefaultTitle>{Resources.STATS_FILTER_TITLE}</DefaultTitle>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    {requiredLoading && renderLoader()}
                    {!requiredLoading && periods && teams && renderData()}
                </Card>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = ({accountDetail, collaboratorGoalCategoryList, currentPeriodDetail, goalDefinitionList, previousPeriodList, teamGoalCategoryList, teamList}) => ({
    accountDetail,
    collaboratorGoalCategoryList,
    currentPeriodDetail,
    goalDefinitionList,
    previousPeriodList,
    teamGoalCategoryList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorGoalCategoryListActions: bindActionCreators(collaboratorGoalCategoryListActions, dispatch),
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    goalDefinitionListActions: bindActionCreators(goalDefinitionListActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch),
    teamGoalCategoryListActions: bindActionCreators(teamGoalCategoryListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StatsFilter)

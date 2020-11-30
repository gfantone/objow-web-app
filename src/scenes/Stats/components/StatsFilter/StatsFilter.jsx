import React from 'react'
import {connect} from 'react-redux'
import {Grid, Hidden} from '@material-ui/core'
import Formsy from 'formsy-react'
import {Card, DefaultTitle, Select} from '../../../../components'
import * as Resources from '../../../../Resources'

const StatsFilter = ({categories, categoryId, categoryLoading, collaboratorId, definitions, goalId, periodId, periods, teamId, teams, onChange, ...props}) => {
    const {account} = props.accountDetail
    const [selectedCategory, setSelectedCategory] = React.useState(categoryId)
    const [selectedCollaborator, setSelectedCollaborator] = React.useState(collaboratorId)
    const [selectedDefinition, setSelectedDefinition] = React.useState(goalId)
    const [selectedPeriod, setSelectedPeriod] = React.useState(periodId ? periodId : periods[0].id)
    const [selectedTeam, setSelectedTeam] = React.useState(teamId)
    const categoryDefinitions = definitions.filter(x => x.category.id === selectedCategory && x.period === selectedPeriod)
    const team = selectedTeam ? teams.filter(x => x.id === selectedTeam)[0] : null
    const collaborators = team ? team.collaborators : null

    function handleChange(newCategory, newCollaborator, newDefinition, newPeriod, newTeam) {
        if (onChange) onChange(newCategory, newCollaborator, newDefinition, newPeriod, newTeam)
    }

    function handleCategoryChange(newCategory) {
        setSelectedCategory(Number(newCategory))
        handleChange(Number(newCategory), selectedCollaborator, selectedDefinition, selectedPeriod, selectedTeam)
    }

    function handleCollaboratorChange(newCollaborator) {
        setSelectedCollaborator(Number(newCollaborator))
        handleChange(selectedCategory, Number(newCollaborator), selectedDefinition, selectedPeriod, selectedTeam)
    }

    function handleDefinitionChange(newDefinition) {
        setSelectedDefinition(Number(newDefinition))
        handleChange(selectedCategory, selectedCollaborator, Number(newDefinition), selectedPeriod, selectedTeam)
    }

    function handlePeriodChange(newPeriod) {
        setSelectedPeriod(Number(newPeriod))
        handleChange(selectedCategory, selectedCollaborator, selectedDefinition, Number(newPeriod), selectedTeam)
    }

    function handleTeamChange(newTeam) {
        setSelectedTeam(Number(newTeam))
        handleChange(selectedCategory, selectedCollaborator, selectedDefinition, selectedPeriod, Number(newTeam))
    }

    function renderMobileFilter() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.STATS_FILTER_TITLE}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Formsy>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Select
                                        disabled={categoryLoading}
                                        emptyDisabled
                                        fullWidth
                                        initial={selectedCategory}
                                        label={Resources.STATS_FILTER_CATEGORY_LABEL}
                                        name='category'
                                        options={categories}
                                        optionValueName='categoryId'
                                        optionTextName='name'
                                        onChange={handleCategoryChange}
                                    />
                                </Grid>
                                {account.role.code === 'A' && <Grid item xs={12}>
                                    <Select
                                        emptyDisabled
                                        fullWidth
                                        initial={selectedTeam}
                                        label={Resources.STATS_FILTER_TEAM_LABEL}
                                        name='team'
                                        options={teams}
                                        optionValueName='id'
                                        optionTextName='name'
                                        onChange={handleTeamChange}
                                    />
                                </Grid>}
                                {account.role.code !== 'C' && <Grid item xs={12}>
                                    <Select
                                        emptyText={Resources.STATS_FILTER_COLLABORATOR_EMPTY_OPTION}
                                        fullWidth
                                        initial={selectedCollaborator}
                                        label={Resources.STATS_FILTER_COLLABORATOR_LABEL}
                                        name='collaborator'
                                        options={collaborators}
                                        optionValueName='id'
                                        optionTextName='fullname'
                                        onChange={handleCollaboratorChange}
                                    />
                                </Grid>}
                                <Grid item xs={12}>
                                    <Select
                                        fullWidth
                                        initial={selectedDefinition}
                                        label={Resources.STATS_FILTER_GOAL_LABEL}
                                        name='definition'
                                        options={categoryDefinitions}
                                        optionValueName='id'
                                        optionTextName='name'
                                        onChange={handleDefinitionChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Select
                                        emptyDisabled
                                        fullWidth
                                        initial={selectedPeriod}
                                        label={Resources.STATS_FILTER_PERIOD_LABEL}
                                        name='period'
                                        options={periods}
                                        optionValueName='id'
                                        optionTextName='name'
                                        onChange={handlePeriodChange}
                                    />
                                </Grid>
                            </Grid>
                        </Formsy>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    function renderOtherFilter() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.STATS_FILTER_TITLE}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Formsy>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Select
                                                disabled={categoryLoading}
                                                emptyDisabled
                                                fullWidth
                                                initial={selectedCategory}
                                                label={Resources.STATS_FILTER_CATEGORY_LABEL}
                                                name='category'
                                                options={categories}
                                                optionValueName='categoryId'
                                                optionTextName='name'
                                                onChange={handleCategoryChange}
                                            />
                                        </Grid>
                                        {account.role.code === 'A' && <Grid item xs={12}>
                                            <Select
                                                emptyDisabled
                                                fullWidth
                                                initial={selectedTeam}
                                                label={Resources.STATS_FILTER_TEAM_LABEL}
                                                name='team'
                                                options={teams}
                                                optionValueName='id'
                                                optionTextName='name'
                                                onChange={handleTeamChange}
                                            />
                                        </Grid>}
                                        {account.role.code !== 'C' && <Grid item xs={12}>
                                            <Select
                                                emptyText={Resources.STATS_FILTER_COLLABORATOR_EMPTY_OPTION}
                                                fullWidth
                                                initial={selectedCollaborator}
                                                label={Resources.STATS_FILTER_COLLABORATOR_LABEL}
                                                name='collaborator'
                                                options={collaborators}
                                                optionValueName='id'
                                                optionTextName='fullname'
                                                onChange={handleCollaboratorChange}
                                            />
                                        </Grid>}
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Select
                                                fullWidth
                                                initial={selectedDefinition}
                                                label={Resources.STATS_FILTER_GOAL_LABEL}
                                                name='definition'
                                                options={categoryDefinitions}
                                                optionValueName='id'
                                                optionTextName='name'
                                                onChange={handleDefinitionChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Select
                                                emptyDisabled
                                                fullWidth
                                                initial={selectedPeriod}
                                                label={Resources.STATS_FILTER_PERIOD_LABEL}
                                                name='period'
                                                options={periods}
                                                optionValueName='id'
                                                optionTextName='name'
                                                onChange={handlePeriodChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Formsy>
                    </Card>
                </Grid>
            </Grid>
        )
    }

    return (
        <div>
            <Hidden smUp implementation='css'>
                {renderMobileFilter()}
            </Hidden>
            <Hidden xsDown implementation='css'>
                {renderOtherFilter()}
            </Hidden>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(StatsFilter)

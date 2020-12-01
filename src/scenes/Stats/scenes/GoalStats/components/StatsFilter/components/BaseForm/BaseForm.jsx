import React from 'react'
import {connect} from 'react-redux'
import {Grid} from '@material-ui/core'
import Formsy from 'formsy-react'
import {Select} from '../../../../../../../../components'
import * as Resources from '../../../../../../../../Resources'

const BaseForm =
    ({
        categories,
        category,
        categoryLoading,
        collaborator,
        collaborators,
        definition,
         definitionDisabled,
        definitions,
        period,
        periods,
        team,
        teams,
        onCategoryChange,
        onCollaboratorChange,
        onDefinitionChange,
        onPeriodChange,
        onTeamChange,
        ...props
     }) => {
        const {account} = props.accountDetail

        return (
            <Formsy>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Select
                                    disabled={categoryLoading}
                                    emptyDisabled
                                    fullWidth
                                    initial={category}
                                    label={Resources.STATS_FILTER_CATEGORY_LABEL}
                                    name='category'
                                    options={categories}
                                    optionValueName='categoryId'
                                    optionTextName='name'
                                    onChange={onCategoryChange}
                                />
                            </Grid>
                            {account.role.code === 'A' && <Grid item xs={12}>
                                <Select
                                    emptyDisabled
                                    fullWidth
                                    initial={team}
                                    label={Resources.STATS_FILTER_TEAM_LABEL}
                                    name='team'
                                    options={teams}
                                    optionValueName='id'
                                    optionTextName='name'
                                    onChange={onTeamChange}
                                />
                            </Grid>}
                            {account.role.code !== 'C' && <Grid item xs={12}>
                                <Select
                                    emptyText={Resources.STATS_FILTER_COLLABORATOR_EMPTY_OPTION}
                                    fullWidth
                                    initial={collaborator}
                                    label={Resources.STATS_FILTER_COLLABORATOR_LABEL}
                                    name='collaborator'
                                    options={collaborators}
                                    optionValueName='id'
                                    optionTextName='fullname'
                                    onChange={onCollaboratorChange}
                                />
                            </Grid>}
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Select
                                    disabled={definitionDisabled}
                                    fullWidth
                                    initial={definition}
                                    label={Resources.STATS_FILTER_GOAL_LABEL}
                                    name='definition'
                                    options={definitions}
                                    optionValueName='id'
                                    optionTextName='name'
                                    onChange={onDefinitionChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Select
                                    emptyDisabled
                                    fullWidth
                                    initial={period}
                                    label={Resources.STATS_FILTER_PERIOD_LABEL}
                                    name='period'
                                    options={periods}
                                    optionValueName='id'
                                    optionTextName='name'
                                    onChange={onPeriodChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Formsy>
        )
    }

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(BaseForm)

import React from 'react'
import {Grid} from '@material-ui/core'
import {GoalDescription, GoalLevels} from './components'

const GoalIndications = (props) => {
    const {indications} = props

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <GoalLevels levels={indications.levels} />
                </Grid>
                <Grid item xs={12}>
                    <GoalDescription definition={indications.definition} />
                </Grid>
            </Grid>
        </div>
    )
}

export default GoalIndications
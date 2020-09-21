import React, {useEffect} from 'react'
import {Grid} from '@material-ui/core'
import {Goal} from './components'
import {DefaultTitle} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import {uuidv4} from "../../../../../../helpers/UUIDHelper"

const Goals = ({categories, goals, kpis, goalAdding, onGoalAdded, ...props}) => {
    const [currentGoals, setCurrentGoals] = React.useState(goals.map(x => ({key: uuidv4(), category: x.kpi.category ? x.kpi.category.id : null, kpi: x.kpi.id, goalName: x.name, target: x.target, points: x.points})))
    const deletionDisabled = currentGoals.length === 1

    useEffect(() => {
        if (goalAdding) {
            const key = uuidv4()
            setCurrentGoals(goals => [...goals, {key: key, category: null, kpi: null, goalName: null, target: null, points: null}])
            onGoalAdded()
        }
    }, [goalAdding])

    function handleRemoveGoalClick(key) {
        setCurrentGoals(x => x.filter(y => y.key != key))
    }

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.CHALLENGE_CREATION_GOAL_AREA}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Grid item container spacing={2}>
                        {currentGoals.map((goal, index) => {
                            return <Goal
                                key={goal.key}
                                categories={categories}
                                deletionDisabled={deletionDisabled}
                                goal={goal}
                                index={index}
                                kpis={kpis}
                                onRemoveClick={() => handleRemoveGoalClick(goal.key)}
                            />
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Goals

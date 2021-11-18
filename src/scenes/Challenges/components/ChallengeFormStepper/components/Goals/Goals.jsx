import React, {useEffect} from 'react'
import {Grid} from '@material-ui/core'
import {Goal} from './components'
import {DefaultTitle, DatePicker, Card, IconButton as MenuIconButton} from '../../../../../../components'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as Resources from '../../../../../../Resources'
import {uuidv4} from "../../../../../../helpers/UUIDHelper"

const Goals = ({categories, goals, kpis, goalAdding, onGoalAdded, onEndChange, onStartChange, start, end, period, handleAddGoal, setNewKpiOpen, ...props}) => {
    const [currentGoals, setCurrentGoals] = React.useState(goals ? goals.map(x => ({key: uuidv4(), category: x.kpi.category ? x.kpi.category.id : null, kpi: x.kpi, goalName: x.name, target: x.target, points: x.points})) : [{key: uuidv4(), category: null, kpi: null, goalName: null, target: null, points: null}])

    const deletionDisabled = currentGoals.length === 1

    const today = new Date()
    const startMinDate = new Date(today.getFullYear(), today.getMonth(), 1)
    const startMaxDate = end ? end : period.end.toDate2()
    const endMinDate = start ? start : today

    useEffect(() => {
        if (goalAdding) {
            setCurrentGoals(goals => [...goals, {key: uuidv4(), category: null, kpi: null, goalName: null, target: null, points: null}])
            onGoalAdded()
        }
    }, [goalAdding])

    function handleRemoveGoalClick(key) {
        setCurrentGoals(x => x.filter(y => y.key != key))
    }

    return (
        <div>
            <Grid container spacing={2} direction='column'>
              <Grid item>
                <Card>
                  <Grid container spacing={2} justify='center' direction='row'>
                      <Grid item xs={3}>
                        <DatePicker
                          clearable
                          format='dd/MM/yyyy'
                          fullWidth
                          initial={start}
                          label={Resources.CHALLENGE_CREATION_INFO_START_LABEL}
                          maxDate={startMaxDate}
                          minDate={startMinDate}
                          name='start'
                          required
                          validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                          onChange={onStartChange}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <DatePicker
                          clearable
                          format='dd/MM/yyyy'
                          fullWidth
                          initial={end}
                          label={Resources.CHALLENGE_CREATION_INFO_END_LABEL}
                          maxDate={period.end.toDate2()}
                          minDate={endMinDate}
                          name='end'
                          required
                          validationErrors={{isDefaultRequiredValue: Resources.COMMON_REQUIRED_ERROR}}
                          onChange={onEndChange}
                        />
                      </Grid>
                  </Grid>
                </Card>
              </Grid>
              { start && end && (
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item>
                          <DefaultTitle>{Resources.CHALLENGE_CREATION_GOAL_AREA}</DefaultTitle>
                        </Grid>
                        <Grid item>
                          <DefaultTitle>
                            <MenuIconButton size={'small'} onClick={handleAddGoal} style={{marginTop: '-2px', color: '#555', fontSize: '18px' }}>
                              <FontAwesomeIcon icon={faPlus} style={{color: "#00E58D"}}/>
                            </MenuIconButton>
                          </DefaultTitle>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Grid item container spacing={2}>
                        {currentGoals.map((goal, index) => {
                          return (
                            <Goal
                              key={goal.key}
                              categories={categories}
                              deletionDisabled={deletionDisabled}
                              goal={goal}
                              index={index}
                              kpis={kpis}
                              onRemoveClick={() => handleRemoveGoalClick(goal.key)}
                              setNewKpiOpen={setNewKpiOpen}
                            />
                          )
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
        </div>
    )
}

export default Goals

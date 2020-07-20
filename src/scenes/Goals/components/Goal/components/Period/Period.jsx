import React from 'react'
import {InfoText} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import '../../../../../../helpers/DateHelper'
import '../../../../../../helpers/StringHelper'

const Period = ({ goal }) => {
    const startDate = goal.start.toDate()
    const endDate = goal.end.toDate()

    return (
        <InfoText>
            {
                goal.periodicity == 'Y' ? Resources.GOAL_YEAR_PERIOD.format(startDate.getFullYear())
                : goal.periodicity == 'S' ? Resources.GOAL_SEMESTER_PERIOD.format(startDate.getSemesterNumber())
                : goal.periodicity == 'Q' ? Resources.GOAL_QUARTER_PERIOD.format(startDate.getQuarterNumber(), startDate.getFullYear())
                : goal.periodicity == 'M' ? Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(startDate)
                : goal.periodicity == 'W' ? Resources.GOAL_WEEK_PERIOD.format(startDate.getWeekNumber(), startDate.getFullYear())
                : Resources.GOAL_OTHER_PERIOD.format(startDate.toDateString(), endDate.toDateString())
            }
        </InfoText>
    )
}

export default Period

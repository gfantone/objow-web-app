import React from 'react'
import {InfoText} from '../../../../../../components'
import '../../../../../../helpers/DateHelper'
import '../../../../../../helpers/StringHelper'

const Period = ({ goal }) => {
    const startDate = goal.start.toDate()
    const endDate = goal.end.toDate()

    return (
        <InfoText>
            {
                goal.periodicity == 'Y' ? 'Année ' + startDate.getFullYear()
                : goal.periodicity == 'S' ? 'Semestre ' + startDate.getSemesterNumber()
                : goal.periodicity == 'Q' ? 'Trimestre ' + startDate.getQuarterNumber() + ' (' + startDate.getFullYear() + ')'
                : goal.periodicity == 'M' ? Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(startDate)
                : goal.periodicity == 'W' ? 'Semaine ' + startDate.getWeekNumber() + ' (' + startDate.getFullYear() + ')'
                : 'Du ' + startDate.toDateString() + ' au ' + endDate.toDateString()
            }
        </InfoText>
    )
}

export default Period
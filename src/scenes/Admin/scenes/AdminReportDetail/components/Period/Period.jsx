import React from 'react'
import * as Resources from '../../../../../../Resources'
import '../../../../../../helpers/DateHelper'
import '../../../../../../helpers/NumberHelper'
import '../../../../../../helpers/StringHelper'

const Period = ({periodicity, start}) => {
    const startDate = start.toDate()

    return (
        <React.Fragment>
            {
                periodicity === 'Y' ? startDate.getFullYear()
                : periodicity === 'S' ? Resources.ADMIN_REPORT_DETAIL_SEMESTER_PERIOD.format(startDate.getSemesterNumber())
                : periodicity === 'Q' ? Resources.ADMIN_REPORT_DETAIL_QUARTER_PERIOD.format(startDate.getQuarterNumber())
                : periodicity === 'M' ? Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(startDate)
                : periodicity === 'W' ? Resources.ADMIN_REPORT_DETAIL_WEEK_PERIOD.format(startDate.getWeekNumber())
                : start.toDate2().toLocaleDateString()
            }
        </React.Fragment>
    )
}

export default Period

import React from 'react'
import {InfoText} from '../../../../../../../../../../../../..'
import * as Resources from '../../../../../../../../../../../../../../Resources'
import {getDifferenceWithToday} from '../../../../../../../../../../../../../../helpers/DateHelper'
import '../../../../../../../../../../../../../../helpers/NumberHelper'
import '../../../../../../../../../../../../../../helpers/StringHelper'

const NotificationDate = ({date, ...props}) => {
    const difference = getDifferenceWithToday(date);
    const today = new Date()
    const creationDate = Number(date).toDate()

    return (
        <InfoText align='right' noWrap>
            {difference === 0 && today.getHours() - creationDate.getHours() === 0 && <span>{Resources.NOTIFICATION_DATE_MINUTES.format(today.getMinutes() - creationDate.getMinutes())}</span>}
            {difference === 0 && today.getHours() - creationDate.getHours() > 0 && <span>{Resources.NOTIFICATION_DATE_HOURS.format(today.getHours() - creationDate.getHours())}</span>}
            {difference !== 0 && <span>{Resources.NOTIFICATION_DATE_DAYS.format(difference)}</span>}
        </InfoText>
    )
}

export default NotificationDate

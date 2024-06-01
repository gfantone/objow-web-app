import React from 'react';
import { InfoText } from '../../../../../../../../../../../../..';
import * as Resources from '../../../../../../../../../../../../../../Resources';
import { getDifferenceWithToday } from '../../../../../../../../../../../../../../helpers/DateHelper';
import '../../../../../../../../../../../../../../helpers/NumberHelper';
import '../../../../../../../../../../../../../../helpers/StringHelper';
import { useIntl } from 'react-intl';

const NotificationDate = ({ date, ...props }) => {
  const intl = useIntl();
  const difference = getDifferenceWithToday(date);
  const today = new Date();
  const creationDate = Number(date).toDate();

  return (
    <InfoText align='right' noWrap lowercase>
      {difference === 0 && today.getHours() - creationDate.getHours() === 0 && (
        <span>
          {intl
            .formatMessage({ id: 'notification.date.minutes' })
            .format(today.getMinutes() - creationDate.getMinutes())}
        </span>
      )}
      {difference === 0 && today.getHours() - creationDate.getHours() > 0 && (
        <span>
          {intl
            .formatMessage({ id: 'notification.date.hours' })
            .format(today.getHours() - creationDate.getHours())}
        </span>
      )}
      {difference !== 0 && (
        <span>
          {intl
            .formatMessage({ id: 'notification.date.days' })
            .format(difference)}
        </span>
      )}
    </InfoText>
  );
};

export default NotificationDate;

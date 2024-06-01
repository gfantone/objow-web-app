import React from 'react';
import { InfoText } from '../../../../../../components';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../../../helpers/DateHelper';
import '../../../../../../helpers/StringHelper';

const Period = ({ goal }) => {
  const intl = useIntl();
  const startDate = goal.start.toDate();
  const endDate = goal.end.toDate();
  const year = intl.formatDate(startDate, { year: 'numeric' });
  const month = intl.formatDate(startDate, { month: 'numeric' });
  const day = intl.formatDate(startDate, { day: 'numeric' });
  const referenceDate = new Date(Date.UTC(year, month - 1, day));
  const referenceEndDate = new Date(
    intl.formatDate(endDate, { year: 'numeric' }),
    intl.formatDate(endDate, { month: 'numeric' }) - 1,
    intl.formatDate(endDate, { day: 'numeric' }) - 1
  );

  return (
    <InfoText lowercase style={{ textTransform: 'capitalize' }}>
      {goal.periodicity == 'Y'
        ? intl
            .formatMessage({ id: 'admin.goal.thumbnail.year_period' })
            .format(referenceDate.getFullYear())
        : goal.periodicity == 'S'
        ? intl
            .formatMessage({ id: 'admin.goal.thumbnail.semester_period' })
            .format(referenceDate.getSemesterNumber())
        : goal.periodicity == 'Q'
        ? intl
            .formatMessage({ id: 'admin.goal.thumbnail.quarter_period' })
            .format(
              referenceDate.getQuarterNumber(),
              referenceDate.getFullYear()
            )
        : goal.periodicity == 'M'
        ? Intl.DateTimeFormat(intl.locale, {
            month: 'long',
            year: 'numeric',
          }).format(referenceDate)
        : goal.periodicity == 'W'
        ? intl
            .formatMessage({ id: 'admin.goal.thumbnail.week_period' })
            .format(referenceDate.getWeekNumber(), referenceDate.getFullYear())
        : intl
            .formatMessage({ id: 'admin.goal.thumbnail.other_period' })
            .format(
              referenceDate.toLocaleDateString(intl.locale, {
                day: 'numeric',
                month: 'long',
              }),
              referenceEndDate.toLocaleDateString(intl.locale, {
                day: 'numeric',
                month: 'long',
              })
            )}
    </InfoText>
  );
};

export default Period;

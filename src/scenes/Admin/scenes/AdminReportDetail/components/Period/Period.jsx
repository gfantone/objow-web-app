import React, { useContext } from 'react';
import { useIntl } from 'react-intl';
import { I18nWrapper } from '../../../../../../components';
import '../../../../../../helpers/DateHelper';
import '../../../../../../helpers/NumberHelper';
import '../../../../../../helpers/StringHelper';

const Period = ({ periodicity, start }) => {
  const context = useContext(I18nWrapper.Context);
  const startDate = start.toDate();
  const intl = useIntl();
  return (
    <React.Fragment>
      {periodicity === 'Y'
        ? startDate.getFullYear()
        : periodicity === 'S'
        ? intl
            .formatMessage({ id: 'admin.report_details.semester_period' })
            .format(startDate.getSemesterNumber())
        : periodicity === 'Q'
        ? intl
            .formatMessage({ id: 'admin.report_details.quarter_period' })
            .format(startDate.getQuarterNumber())
        : periodicity === 'M'
        ? Intl.DateTimeFormat(context.locale || 'fr-FR', {
            month: 'long',
          }).format(startDate)
        : periodicity === 'W'
        ? intl
            .formatMessage({ id: 'admin.report_details.week_period' })
            .format(startDate.getWeekNumber())
        : start.toDate2().toLocaleDateString()}
    </React.Fragment>
  );
};

export default Period;

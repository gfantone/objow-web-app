import React from 'react';
import { Timer } from '..';
import {
  AccentTag,
  DarkTag,
  LightTag,
  UltraLightTag,
  WarningTag,
} from '../../..';
import * as Resources from '../../../../../../Resources';
import { useIntl } from 'react-intl';
import { getDifferenceWithToday } from '../../../../../../helpers/DateHelper';
import '../../../../../../helpers/NumberHelper';

const TimerTag = ({ date, overtime }) => {
  const intl = useIntl();
  const difference = getDifferenceWithToday(date);
  const today = new Date().getTime();
  const text = intl
    .formatMessage({ id: 'admin.goal.thumbnail.timer_tag' })
    .format(difference >= 0 ? `+${difference}` : difference);
  const style = {
    borderRadius: 5,
  };

  return (
    <div>
      {overtime && date && difference === 0 && today > date && (
        <WarningTag style={style}>
          <Timer overtime={overtime} date={date.toDate2()} />
        </WarningTag>
      )}
      {overtime && date && difference > 0 && (
        <WarningTag style={style}>{text}</WarningTag>
      )}
      {!overtime && difference === 0 && (
        <AccentTag style={style}>
          <Timer date={date.toDate2()} />
        </AccentTag>
      )}
      {difference < 0 && difference >= -5 && (
        <DarkTag style={style}>{text}</DarkTag>
      )}
      {difference < -5 && difference >= -30 && (
        <LightTag style={style}>{text}</LightTag>
      )}
      {difference < -30 && <UltraLightTag style={style}>{text}</UltraLightTag>}
    </div>
  );
};

export default TimerTag;

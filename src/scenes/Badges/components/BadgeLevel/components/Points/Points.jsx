import React from 'react';
import { AccentTag, DarkTag } from '../../../../../../components';
import { useIntl } from 'react-intl';
import '../../../../../../helpers/StringHelper';

const Points = ({ level, ...props }) => {
  const intl = useIntl();
  const text = intl
    .formatMessage({ id: 'badge.level.point_text' })
    .format(level.points);
  const hasPoints = level.counter >= level.target;

  return (
    <div>
      {hasPoints && <AccentTag style={{ borderRadius: 5 }}>{text}</AccentTag>}
      {!hasPoints && <DarkTag style={{ borderRadius: 5 }}>{text}</DarkTag>}
    </div>
  );
};

export default Points;

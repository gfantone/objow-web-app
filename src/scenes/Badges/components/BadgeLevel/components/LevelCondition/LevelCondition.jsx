import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { AccentText, DefaultText } from '../../../../../../components';
import { useIntl } from 'react-intl';
import '../../../../../../helpers/StringHelper';

const LevelCondition = ({ level, ...props }) => {
  const intl = useIntl();
  const { collaborator } = props.collaboratorDetail;
  const hasLevel = collaborator
    ? level.level <= collaborator.level.number
    : false;
  const icon = hasLevel ? faUnlock : faLock;
  const text = (
    <div>
      <FontAwesomeIcon icon={icon} />{' '}
      {intl
        .formatMessage({ id: 'badge.level.condition_text' })
        .format(level.level)}
    </div>
  );
  return (
    <div>
      {hasLevel && (
        <AccentText style={{ textTransform: 'none', fontSize: 15 }}>
          {text}
        </AccentText>
      )}
      {!hasLevel && (
        <AccentText
          lowercase
          style={{ textTransform: 'none', fontSize: 22, fontWeight: 'bold' }}
        >
          {text}
        </AccentText>
      )}
    </div>
  );
};

const mapStateToProps = ({ collaboratorDetail }) => ({
  collaboratorDetail,
});

export default connect(mapStateToProps)(LevelCondition);

import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { AccentText, DefaultText } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import '../../../../../../helpers/StringHelper'

const LevelCondition = ({ level, ...props }) => {
    const { collaborator } = props.collaboratorDetail;
    const hasLevel = collaborator ? level.level <= collaborator.level.number : false;
    const icon = hasLevel ? faUnlock : faLock;
    const text = (
        <div>
            <FontAwesomeIcon icon={icon} /> {Resources.BADGE_LEVEL_CONDITION_TEXT.format(level.level)}
        </div>
    );
    return (
        <div>
            { hasLevel && <AccentText>{text}</AccentText> }
            { !hasLevel && <DefaultText>{text}</DefaultText> }
        </div>
    )
};

const mapStateToProps = ({ collaboratorDetail }) => ({
    collaboratorDetail
});

export default connect(mapStateToProps)(LevelCondition)

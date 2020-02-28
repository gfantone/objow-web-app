import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons'
import { AccentText, DefaultText } from '../../../../../../components'

const LevelCondition = ({ level, ...props }) => {
    const { collaborator } = props.collaboratorDetail;
    const hasLevel = level.level <= collaborator.level.number;
    const icon = hasLevel ? faUnlock : faLock;
    const text = (
        <div>
            <FontAwesomeIcon icon={icon} /> Condition : lvl {level.level}
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

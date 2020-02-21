import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUsers } from '@fortawesome/free-solid-svg-icons'

const ChallengeType = ({ type }) => {
    const icon = type != 'CT' ? faUser : faUsers;

    return (
        <div>
            <FontAwesomeIcon icon={icon} />
        </div>
    )
};

export default ChallengeType
import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import { BadgeLevel } from '../../../../components'
import { Loader } from '../../../../../../components'

const SubHeader = ({ ...props }) => {
    const { badge, loading } = props.currentCollaboratorBadgeDetail;
    const {collaborator} = props.collaboratorDetail

    const renderLoader = () => {
        return <Loader centered />
    };

    const renderData = () => {
        return (
            <Box p={2}>
                <BadgeLevel level={badge} />
            </Box>
        )
    };

    return (
        <div>
            { loading && renderLoader() }
            { !loading && badge && collaborator && renderData() }
        </div>
    )
};

const mapStateToProps = ({ currentCollaboratorBadgeDetail, collaboratorDetail }) => ({
    currentCollaboratorBadgeDetail,
    collaboratorDetail
});

export default connect(mapStateToProps)(SubHeader)

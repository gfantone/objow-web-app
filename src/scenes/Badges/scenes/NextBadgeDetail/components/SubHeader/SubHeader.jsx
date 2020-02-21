import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import { BadgeLevel } from '../../../../components'
import { Loader } from '../../../../../../components'

const SubHeader = ({ ...props }) => {
    const { badge, loading } = props.nextCollaboratorBadgeDetail;

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
            { !loading && badge && renderData() }
        </div>
    )
};

const mapStateToProps = ({ nextCollaboratorBadgeDetail }) => ({
    nextCollaboratorBadgeDetail
});

export default connect(mapStateToProps)(SubHeader)
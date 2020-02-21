import React from 'react'
import { connect } from 'react-redux'
import { Box } from '@material-ui/core'
import { Loader, DefaultText } from '../../../../../../components'

const SubHeader = ({ ...props }) => {
    const { badge, loading: badgeDetailLoading } = props.badgeDetail;
    const { loading: badgeLevelListLoading } = props.badgeLevelList;
    const { loading: levelListLoading } = props.levelList;
    const loading = badgeDetailLoading || badgeLevelListLoading || levelListLoading;

    const renderLoader = () => {
        return <Loader centered />
    };

    const renderData = () => {
        return <DefaultText align='center'>Configuration du défi « {badge.privateTitle} »</DefaultText>
    };

    return (
        <div>
            <Box p={2}>
                { loading && renderLoader() }
                { !loading && badge && renderData() }
            </Box>
        </div>
    )
};

const mapStateToProps = ({ badgeDetail, badgeLevelList, levelList }) => ({
    badgeDetail,
    badgeLevelList,
    levelList
});

export default connect(mapStateToProps)(SubHeader)
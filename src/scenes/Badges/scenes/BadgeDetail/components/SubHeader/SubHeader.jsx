import React from 'react'
import {connect} from 'react-redux'
import {Box} from '@material-ui/core'
import {BadgeLevel} from '../../../../components'
import {Loader} from '../../../../../../components'

const SubHeader = ({...props}) => {
    const {summary, loading} = props.collaboratorBadgeSummaryDetail

    const renderLoader = () => {
        return <Loader centered />
    }

    const renderData = () => {
        return (
            <Box p={2}>
                <BadgeLevel level={summary} />
            </Box>
        )
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && summary && renderData()}
        </div>
    )
}

const mapStateToProps = ({collaboratorBadgeSummaryDetail}) => ({
    collaboratorBadgeSummaryDetail
})

export default connect(mapStateToProps)(SubHeader)

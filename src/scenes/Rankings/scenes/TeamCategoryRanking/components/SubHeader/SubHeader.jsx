import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Category } from '../../../../components'
import { Loader } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const styles = {
    root: {
        padding: 16
    }
}
const SubHeader = (props) => {
    const { classes } = props
    const { category, loading: categoryDetailLoading } = props.categoryDetail
    const { loading: teamCategoryRankListLoading } = props.teamCategoryRankList
    const loading = categoryDetailLoading || teamCategoryRankListLoading

    function renderLoader() {
        return <Loader centered />
    }

    function renderData() {
        return <Category title={Resources.TEAM_CATEGORY_RANKING_TITLE} category={category} />
    }

    return (
        <div className={classes.root}>
            { loading && renderLoader() }
            { !loading && category && renderData() }
        </div>
    )
}

const mapStateToProps = ({ categoryDetail, teamCategoryRankList }) => ({
    categoryDetail,
    teamCategoryRankList
})

export default connect(mapStateToProps)(withStyles(styles)(SubHeader))

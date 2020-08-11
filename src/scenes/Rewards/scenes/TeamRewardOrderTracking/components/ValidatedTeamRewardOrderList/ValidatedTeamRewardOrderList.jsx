import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {DataTable, Loader} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as teamRewardOrderSummaryListActions from '../../../../../../services/TeamRewardOrderSummaries/TeamRewardOrderSummaryList/actions'

const ValidatedTeamRewardOrderList = ({...props}) => {
    const {orders, loading} = props.teamRewardOrderSummaryList
    const columns = [
        {name: 'id', label: Resources.TEAM_REWARD_ORDER_TRACKING_ID_COLUMN},
        {name: 'team', label: Resources.TEAM_REWARD_ORDER_TRACKING_TEAM_COLUMN},
        {name: 'points', label: Resources.TEAM_REWARD_ORDER_TRACKING_VALIDATED_POINTS_COLUMN},
        {name: 'value', label: Resources.TEAM_REWARD_ORDER_TRACKING_VALUE_COLUMN, options: {
                customBodyRender: value => {
                    return <span>{value} €</span>
                }
            }},
        {name: 'validationDate', label: Resources.TEAM_REWARD_ORDER_TRACKING_VALIDATION_DATE_COLUMN, options: {
                customBodyRender: value => {
                    return <span>{value ? value.toDate().toLocaleString() : ''}</span>
                },
                filter: false
            }}
    ]
    const options = {
        selectableRows: 'none',
        onRowClick: (colData, cellMeta) => { props.history.push(`/rewards/team-orders/${colData[0]}/summary`) }
    }

    useEffect(() => {
        props.teamRewardOrderSummaryListActions.getValidatedTeamRewardOrderSummaryList()
    }, [])

    function renderLoader() {
        return <Loader centered />
    }

    function renderData() {
        return <DataTable data={orders} columns={columns} options={options} />
    }

    return (
        <div>
            {loading && renderLoader()}
            {!loading && orders && renderData()}
        </div>
    )
}

const mapStateToProps = ({teamRewardOrderSummaryList}) => ({
    teamRewardOrderSummaryList
})

const mapDispatchToProps = (dispatch) => ({
    teamRewardOrderSummaryListActions: bindActionCreators(teamRewardOrderSummaryListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ValidatedTeamRewardOrderList))

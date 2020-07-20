import React, {useEffect} from 'react'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {DataTable, Loader} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as collaboratorRewardOrderSummaryListActions from '../../../../../../services/CollaboratorRewardOrderSummaries/CollaboratorRewardOrderSummaryList/actions'

const ValidatedCollaboratorRewardOrderList = ({...props}) => {
    const {orders, loading} = props.collaboratorRewardOrderSummaryList
    const columns = [
        {name: 'id', label: Resources.COLLABORATOR_REWARD_ORDER_TRACKING_ID_COLUMN},
        {name: 'name', label: Resources.COLLABORATOR_REWARD_ORDER_TRACKING_NAME_COLUMN},
        {name: 'email', label: Resources.COLLABORATOR_REWARD_ORDER_TRACKING_EMAIL_COLUMN},
        {name: 'team', label: Resources.COLLABORATOR_REWARD_ORDER_TRACKING_TEAM_COLUMN},
        {name: 'points', label: Resources.COLLABORATOR_REWARD_ORDER_TRACKING_VALIDATED_POINTS_COLUMN},
        {name: 'value', label: Resources.COLLABORATOR_REWARD_ORDER_TRACKING_VALUE_COLUMN, options: {
            customBodyRender: value => {
                return <span>{value} €</span>
            }
        }},
        {name: 'validationDate', label: Resources.COLLABORATOR_REWARD_ORDER_TRACKING_VALIDATION_DATE_COLUMN, options: {
            customBodyRender: value => {
                return <span>{value ? value.toDate().toLocaleString() : ''}</span>
            },
            filter: false
        }}
    ]
    const options = {
        selectableRows: 'none',
        onRowClick: (colData, cellMeta) => {props.history.push(`/rewards/collaborator-orders/${colData[0]}/summary`)}
    }

    useEffect(() => {
        props.collaboratorRewardOrderSummaryListActions.getValidatedCollaboratorRewardOrderSummaryList()
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

const mapStateToProps = ({collaboratorRewardOrderSummaryList}) => ({
    collaboratorRewardOrderSummaryList
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorRewardOrderSummaryListActions: bindActionCreators(collaboratorRewardOrderSummaryListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ValidatedCollaboratorRewardOrderList))

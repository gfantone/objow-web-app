import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react"
import {Switch} from "../../../../../../components"
import * as Resources from "../../../../../../Resources"
import * as configUpdateActions from "../../../../../../services/Configs/ConfigUpdate/actions"
import "../../../../../../helpers/StringHelper"

const RewardSettings = ({...props}) => {
    const {configs} = props.configList
    const {loading} = props.configUpdate
    const CRWA = configs.find(x => x.code === 'CRWA')
    const TRWA = configs.find(x => x.code === 'TRWA')

    const handleChange = id => value => {
        props.configUpdateActions.updateConfig(id, value.toString())
    }

    return (
        <div>
            <Formsy>
                <Switch name='collaborator_reward_activation' label={Resources.REWARD_SETTINGS_COLLABORATOR_REWARD_ACTIVATION_OPTION} initial={CRWA.value.toBoolean()} onChange={handleChange(CRWA.id)} disabled={loading} />
                <Switch name='team_reward_activation' label={Resources.REWARD_SETTINGS_TEAM_REWARD_ACTIVATION_OPTION} initial={TRWA.value.toBoolean()} onChange={handleChange(TRWA.id)} disabled={loading} />
            </Formsy>
        </div>
    )
}

const mapStateToProps = ({configList, configUpdate, rewardCategoryList}) => ({
    configList,
    configUpdate,
    rewardCategoryList
})

const mapDispatchToProps = (dispatch) => ({
    configUpdateActions: bindActionCreators(configUpdateActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(RewardSettings)

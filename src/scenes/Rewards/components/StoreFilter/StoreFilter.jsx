import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react"
import {Grid} from "@material-ui/core"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Select} from '../../../../components'
import * as Resources from '../../../../Resources'
import * as currentPeriodDetailActions from '../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../services/Periods/PreviousPeriodList/actions'
import * as rewardCategoryListActions from '../../../../services/RewardCategories/RewardCategoryList/actions'
import * as teamListActions from '../../../../services/Teams/TeamList/actions'

const StoreFilter = ({categoryId, collaboratorId, onChange, onClose, open, periodId, teamId, ...props}) => {
    const {categories} = props.rewardCategoryList
    const {period: currentPeriod} = props.currentPeriodDetail
    const {periods: previousPeriods} = props.previousPeriodList
    const {teams} = props.teamList
    const [selectedTeamId, setSelectedTeamId] = React.useState(teamId)
    const periods = currentPeriod && previousPeriods ? [currentPeriod].concat(previousPeriods) : null
    const selectedTeam = teams ? teams.filter(x => x.id === selectedTeamId)[0] : null
    const collaborators = selectedTeam ? selectedTeam.collaborators : null

    useEffect(() => {
        props.rewardCategoryListActions.getActiveRewardCategoryList()
        props.currentPeriodDetailActions.getCurrentPeriodDetail()
        props.previousPeriodListActions.getPreviousPeriodList()
        props.teamListActions.getTeamList()
    }, [])

    function handleSubmit(model) {
        onChange(model.category, model.team, model.collaborator, model.period)
        onClose()
    }

    function handleTeamChange(teamId) {
        setSelectedTeamId(Number(teamId))
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose} fullWidth>
                <Formsy onSubmit={handleSubmit}>
                    <DialogTitle>{Resources.REWARD_STORE_FILTER_TITLE}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Select name='category' label={Resources.REWARD_STORE_FILTER_CATEGORY_LABEL} options={categories ? categories : []} optionValueName='id' optionTextName='name' emptyText={Resources.REWARD_STORE_FILTER_CATEGORY_ALL_OPTION} fullWidth initial={categoryId} />
                            </Grid>
                            <Grid item xs={12}>
                                <Select name='team' label={Resources.REWARD_STORE_FILTER_TEAM_LABEL} options={teams ? teams : []} optionValueName='id' optionTextName='name' emptyDisabled fullWidth initial={teamId} onChange={handleTeamChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Select name='collaborator' label={Resources.REWARD_STORE_FILTER_COLLABORATOR_LABEL} options={collaborators ? collaborators : []} optionValueName='id' optionTextName='fullname' emptyText={Resources.REWARD_STORE_FILTER_COLLABORATOR_ALL_OPTION} fullWidth initial={collaboratorId} />
                            </Grid>
                            <Grid item xs={12}>
                                <Select name='period' label={Resources.REWARD_STORE_FILTER_PERIOD_LABEL} options={periods ? periods : []} optionValueName='id' optionTextName='name' emptyDisabled fullWidth initial={periodId ? periodId : currentPeriod ? currentPeriod.id : null} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color='secondary'>{Resources.REWARD_STORE_FILTER_CANCEL_BUTTON}</Button>
                        <Button type='submit'>{Resources.REWARD_STORE_FILTER_SUBMIT_BUTTON}</Button>
                    </DialogActions>
                </Formsy>
            </Dialog>
        </div>
    )
}

const mapStateToProps = ({accountDetail, currentPeriodDetail, previousPeriodList, rewardCategoryList, teamList}) => ({
    accountDetail,
    currentPeriodDetail,
    previousPeriodList,
    rewardCategoryList,
    teamList
})

const mapDispatchToProps = (dispatch) => ({
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch),
    teamListActions: bindActionCreators(teamListActions, dispatch),
    rewardCategoryListActions: bindActionCreators(rewardCategoryListActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreFilter)

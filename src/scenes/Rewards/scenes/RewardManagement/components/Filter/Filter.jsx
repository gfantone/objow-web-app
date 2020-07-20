import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Formsy from "formsy-react"
import {Grid} from "@material-ui/core"
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Select} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import * as currentPeriodDetailActions from '../../../../../../services/Periods/CurrentPeriodDetail/actions'
import * as previousPeriodListActions from '../../../../../../services/Periods/PreviousPeriodList/actions'

const Filter = ({onChange, onClose, open, periodId, ...props}) => {
    const {period: currentPeriod} = props.currentPeriodDetail
    const {periods: previousPeriods} = props.previousPeriodList
    const periods = [currentPeriod].concat(previousPeriods)

    useEffect(() => {
        props.currentPeriodDetailActions.getCurrentPeriodDetail()
        props.previousPeriodListActions.getPreviousPeriodList()
    }, [])

    function handleSubmit(model) {
        onChange(model.period)
    }

    return (
        <div>
            <Dialog open={open} onClose={onClose}>
                <Formsy onSubmit={handleSubmit}>
                    <DialogTitle>{Resources.REWARD_MANAGEMENT_FILTER_TITLE}</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Select name='period' label={Resources.REWARD_MANAGEMENT_PERIOD_LABEL} options={periods} optionValueName={'id'} optionTextName={'name'} emptyDisabled fullWidth initial={periodId} />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose} color='secondary'>{Resources.REWARD_MANAGEMENT_CANCEL_BUTTON}</Button>
                        <Button type='submit'>{Resources.REWARD_MANAGEMENT_SUBMIT_BUTTON}</Button>
                    </DialogActions>
                </Formsy>
            </Dialog>
        </div>
    )
}

const mapStateToProps = ({accountDetail, currentPeriodDetail, previousPeriodList}) => ({
    accountDetail,
    currentPeriodDetail,
    previousPeriodList
})

const mapDispatchToProps = (dispatch) => ({
    currentPeriodDetailActions: bindActionCreators(currentPeriodDetailActions, dispatch),
    previousPeriodListActions: bindActionCreators(previousPeriodListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)

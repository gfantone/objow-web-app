import React from 'react'
import {Divider, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {AccentText, BoldSpan, Button, Card, DefaultText, Dialog, DialogActions, DialogContent, DialogTitle, ErrorText, ProgressButton, RedButton} from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'

const styles = {
    divider: {
        marginLeft: -16,
        marginRight: -16
    }
}

const RewardOrderSummary = ({recipientPoints, onOrderClick, onRefuseClick, onValidateClick, orderId, orderLoading, orderPoints, orderValue, updateLoading, ...props}) => {
    const {classes} = props
    const remainingPoints = recipientPoints - orderPoints
    const [orderOpen, setOrderOpen] = React.useState(false)
    const [validateOpen, setValidateOpen] = React.useState(false)
    const [refuseOpen, setRefuseOpen] = React.useState(false)

    function changeOrderOpen(open) {
        setOrderOpen(open)
    }

    function changeRefuseOpen(open) {
        setRefuseOpen(open)
    }

    function changeValidateOpen(open) {
        setValidateOpen(open)
    }

    return (
        <div>
            <Card>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <DefaultText>{Resources.REWARD_ORDER_SUMMARY_RECIPIENT_POINTS_LABEL} : <BoldSpan>{Resources.REWARD_ORDER_SUMMARY_RECIPIENT_POINTS_VALUE.format(recipientPoints)}</BoldSpan></DefaultText>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <DefaultText>{onOrderClick ? Resources.REWARD_ORDER_SUMMARY_CART_POINTS_LABEL : Resources.REWARD_ORDER_SUMMARY_ORDER_POINTS_LABEL} : <BoldSpan>{Resources.REWARD_ORDER_SUMMARY_ORDER_POINTS_VALUE.format(orderPoints)}</BoldSpan></DefaultText>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>
                            <Grid item xs={12}>
                                <DefaultText>{Resources.REWARD_ORDER_SUMMARY_ORDER_VALUE_LABEL} : <BoldSpan>{Resources.REWARD_ORDER_SUMMARY_ORDER_VALUE_VALUE.format(orderValue)}</BoldSpan></DefaultText>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {remainingPoints >= 0 && <AccentText>{Resources.REWARD_ORDER_SUMMARY_REMAINING_POINTS_LABEL} : <BoldSpan>{Resources.REWARD_ORDER_SUMMARY_REMAINING_POINTS_VALUE.format(remainingPoints)}</BoldSpan></AccentText>}
                        {remainingPoints < 0 && <ErrorText>{Resources.REWARD_ORDER_SUMMARY_REMAINING_POINTS_LABEL} : <BoldSpan>{Resources.REWARD_ORDER_SUMMARY_REMAINING_POINTS_VALUE.format(remainingPoints)}</BoldSpan></ErrorText>}
                    </Grid>
                    {onValidateClick && onRefuseClick && <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Button onClick={() => changeValidateOpen(true)}>{Resources.REWARD_ORDER_SUMMARY_VALIDATE_BUTTON}</Button>
                            </Grid>
                            <Grid item>
                                <RedButton onClick={() => changeRefuseOpen(true)}>{Resources.REWARD_ORDER_SUMMARY_REFUSE_BUTTON}</RedButton>
                            </Grid>
                        </Grid>
                    </Grid>}
                    {onOrderClick && <Grid item xs={12}>
                        <Button disabled={remainingPoints < 0} onClick={() => changeOrderOpen(true)}>{Resources.REWARD_ORDER_SUMMARY_ORDER_BUTTON}</Button>
                    </Grid>}
                </Grid>
            </Card>
            {onOrderClick &&  <Dialog open={orderOpen} onClose={() => changeOrderOpen(false)}>
                <DialogTitle>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_ORDER_TITLE.format(orderPoints, orderValue)}</DialogTitle>
                <DialogContent>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_ORDER_MESSAGE}</DialogContent>
                <DialogActions>
                    <Button onClick={() => changeOrderOpen(false)} color='secondary'>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_ORDER_NO_BUTTON}</Button>
                    <ProgressButton type='button' text={Resources.REWARD_ORDER_SUMMARY_CONFIRM_ORDER_YES_BUTTON} loading={orderLoading} onClick={onOrderClick} />
                </DialogActions>
            </Dialog>}
            {onRefuseClick &&  <Dialog open={refuseOpen} onClose={() => changeRefuseOpen(false)}>
                <DialogTitle>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_REFUSE_TITLE.format(orderId, orderPoints, orderValue)}</DialogTitle>
                <DialogContent>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_REFUSE_MESSAGE}</DialogContent>
                <DialogActions>
                    <Button onClick={() => changeRefuseOpen(false)} color='secondary'>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_REFUSE_NO_BUTTON}</Button>
                    <ProgressButton type='button' text={Resources.REWARD_ORDER_SUMMARY_CONFIRM_REFUSE_YES_BUTTON} loading={updateLoading} onClick={onRefuseClick} />
                </DialogActions>
            </Dialog>}
            {onValidateClick &&  <Dialog open={validateOpen} onClose={() => changeValidateOpen(false)}>
                <DialogTitle>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_VALIDATE_TITLE.format(orderId, orderPoints, orderValue)}</DialogTitle>
                <DialogContent>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_VALIDATE_MESSAGE}</DialogContent>
                <DialogActions>
                    <Button onClick={() => changeValidateOpen(false)} color='secondary'>{Resources.REWARD_ORDER_SUMMARY_CONFIRM_VALIDATE_NO_BUTTON}</Button>
                    <ProgressButton type='button' text={Resources.REWARD_ORDER_SUMMARY_CONFIRM_VALIDATE_YES_BUTTON} loading={updateLoading} onClick={onValidateClick} />
                </DialogActions>
            </Dialog>}
        </div>
    )
}

export default withStyles(styles)(RewardOrderSummary)

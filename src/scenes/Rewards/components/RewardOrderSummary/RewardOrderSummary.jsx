import React from 'react'
import {Divider, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {AccentText, BoldSpan, Card, DefaultText, ErrorText} from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'

const styles = {
    divider: {
        marginLeft: -16,
        marginRight: -16
    }
}

const RewardOrderSummary = ({recipientPoints, orderPoints, orderValue, ...props}) => {
    const {classes} = props
    const remainingPoints = recipientPoints - orderPoints

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
                                <DefaultText>{Resources.REWARD_ORDER_SUMMARY_ORDER_POINTS_LABEL} : <BoldSpan>{Resources.REWARD_ORDER_SUMMARY_ORDER_POINTS_VALUE.format(orderPoints)}</BoldSpan></DefaultText>
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
                </Grid>
            </Card>
        </div>
    )
}

export default withStyles(styles)(RewardOrderSummary)

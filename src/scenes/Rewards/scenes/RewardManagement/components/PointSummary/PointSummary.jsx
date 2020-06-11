import React from 'react'
import {Grid} from '@material-ui/core'
import {AccentText, Badge, BoldSpan, Button, Card, DefaultText, DefaultTitle, ErrorText} from '../../../../../../components'
import '../../../../../../helpers/StringHelper'
import * as Resources from '../../../../../../Resources'

const PointSummary = ({points, usedPoints, waitingPoints, orders, ...props}) => {
    const usablePoints = points - usedPoints - waitingPoints
    const usablePointsText = Resources.REWARD_MANAGEMENT_USABLE_POINTS_VALUE.format(usablePoints)

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.REWARD_MANAGEMENT_INFO_AREA}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <DefaultText>{Resources.REWARD_MANAGEMENT_POINTS_LABEL} : <BoldSpan component='span'>{Resources.REWARD_MANAGEMENT_POINTS_VALUE.format(points)}</BoldSpan></DefaultText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DefaultText>{Resources.REWARD_MANAGEMENT_USED_POINTS_LABEL} : <BoldSpan component='span'>{Resources.REWARD_MANAGEMENT_USED_POINTS_VALUE.format(usedPoints)}</BoldSpan></DefaultText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DefaultText>{Resources.REWARD_MANAGEMENT_WAITING_POINTS_LABEL} : <BoldSpan component='span'>{Resources.REWARD_MANAGEMENT_WAITING_POINTS_VALUE.format(waitingPoints)}</BoldSpan></DefaultText>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction='column' justify='space-between' alignItems='flex-end' style={{height: '100%'}}>
                                    <Grid item>
                                        {usablePoints >= 0 && <AccentText>{Resources.REWARD_MANAGEMENT_USABLE_POINTS_LABEL} : <BoldSpan>{usablePointsText}</BoldSpan></AccentText>}
                                        {usablePoints < 0 && <ErrorText>{Resources.REWARD_MANAGEMENT_USABLE_POINTS_LABEL} : <BoldSpan>{usablePointsText}</BoldSpan></ErrorText>}
                                    </Grid>
                                    <Grid item>
                                        <Badge badgeContent={orders} color='secondary'>
                                            <Button>{Resources.REWARD_MANAGEMENT_ORDERS_BUTTON}</Button>
                                        </Badge>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default PointSummary

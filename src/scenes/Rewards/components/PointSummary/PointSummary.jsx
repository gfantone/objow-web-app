import React from 'react'
import {Grid} from '@material-ui/core'
import withWidth, {isWidthUp} from '@material-ui/core/withWidth'
import {AccentText, Badge, BoldSpan, Button, Card, DefaultText, DefaultTitle, ErrorText} from '../../../../components'
import '../../../../helpers/StringHelper'
import * as Resources from '../../../../Resources'

const PointSummary = ({points, usedPoints, waitingPoints, onTrackingClick, orders, ...props}) => {
    const usablePoints = points - usedPoints - waitingPoints
    const usablePointsText = Resources.POINT_SUMMARY_USABLE_POINTS_VALUE.format(usablePoints)
    const alignItems = isWidthUp('sm') ? 'flex-end' : 'flex-start'

    return (
        <div>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <DefaultTitle>{Resources.POINT_SUMMARY_TITLE}</DefaultTitle>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <DefaultText>{Resources.POINT_SUMMARY_POINTS_LABEL} : <BoldSpan component='span'>{Resources.POINT_SUMMARY_POINTS_VALUE.format(points)}</BoldSpan></DefaultText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DefaultText>{Resources.POINT_SUMMARY_USED_POINTS_LABEL} : <BoldSpan component='span'>{Resources.POINT_SUMMARY_USED_POINTS_VALUE.format(usedPoints)}</BoldSpan></DefaultText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DefaultText>{Resources.POINT_SUMMARY_WAITING_POINTS_LABEL} : <BoldSpan component='span'>{Resources.POINT_SUMMARY_WAITING_POINTS_VALUE.format(waitingPoints)}</BoldSpan></DefaultText>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm='auto'>
                                <Grid container direction='column' justify='space-between' alignItems={alignItems} style={{height: '100%'}}>
                                    <Grid item>
                                        {usablePoints >= 0 && <AccentText>{Resources.POINT_SUMMARY_USABLE_POINTS_LABEL} : <BoldSpan>{usablePointsText}</BoldSpan></AccentText>}
                                        {usablePoints < 0 && <ErrorText>{Resources.POINT_SUMMARY_USABLE_POINTS_LABEL} : <BoldSpan>{usablePointsText}</BoldSpan></ErrorText>}
                                    </Grid>
                                    {onTrackingClick && <Grid item>
                                        <Badge badgeContent={orders} color='secondary'>
                                            <Button onClick={onTrackingClick}>{Resources.POINT_SUMMARY_ORDERS_BUTTON}</Button>
                                        </Badge>
                                    </Grid>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default withWidth()(PointSummary)

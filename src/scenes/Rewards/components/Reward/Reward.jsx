import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {ButtonBase, CardMedia, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {RewardImage} from './components'
import {AccentTag, Button, DefaultText} from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'

const styles = {
    icon: {
        width: 39,
        height: 39
    },
    imageContainer: {
        position: 'relative'
    },
    name: {
        overflow: "hidden",
        position: "relative",
        lineHeight: "1.5em",
        maxHeight: "3em",
        textAlign: "justify",
        "&&:before": {
            content: '"..."',
            position: "absolute",
            right: 0,
            bottom: 1,
            paddingLeft: 2,
            background: "white"
        },
        "&&:after": {
            content: '""',
            position: "absolute",
            right: 0,
            width: "1em",
            height: "1em",
            marginTop: "0.2em",
            background: "white"
        }
    },
    timerContainer: {
        position: 'absolute',
        right: 0,
        top: 16
    }
}

const Reward = ({detailDisabled = false, onAddClick, reward, ...props}) => {
    const {classes} = props
    const {account} = props.accountDetail
    const image = reward.image ? reward.image.path : reward.customImage

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ButtonBase disabled={detailDisabled} disableRipple onClick={() => props.history.push(`/rewards/detail/${reward.id}`)} style={{width: '100%'}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div className={classes.imageContainer}>
                                    <div className={classes.timerContainer}>
                                        <AccentTag>{Resources.REWARD_POINT_TAG.format(reward.points)}</AccentTag>
                                    </div>
                                    <RewardImage image={image} />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <CardMedia image={reward.category.icon.path} className={classes.icon} />
                                    </Grid>
                                    <Grid item xs>
                                        <DefaultText className={classes.name}>{reward.name}</DefaultText>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </ButtonBase>
                </Grid>
                {onAddClick && (account.role.code === 'C' && reward.type.code === 'P' || account.role.code === 'M' && reward.type.code === 'T') && <Grid item xs={12}>
                    <Grid container spacing={12} direction='column' alignItems='flex-end'>
                        <Grid item>
                            <Button onClick={() => onAddClick(reward)}>{Resources.REWARD_ADD_BUTTON}</Button>
                        </Grid>
                    </Grid>
                </Grid>}
            </Grid>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default withStyles(styles)(connect(mapStateToProps)(withRouter(Reward)))

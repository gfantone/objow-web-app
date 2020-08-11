import React from 'react'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccentText, DefaultText } from '../../../../../../components'
import * as Resources from '../../../../../../Resources'
import '../../../../../../helpers/StringHelper'

const styles = {
    icon: {
        width: 60,
        height: 60
    }
};

const Badge = ({ badge, ...props }) => {
    const { classes } = props;
    const iconData = badge ? require(`../../../../../../assets/img/system/badge/icons/${badge.code}.svg`) : null;

    return (
        <div>
            <Grid container spacing={1} alignItems='center' direction='column'>
                <Grid item>
                    <CardMedia image={iconData} className={classes.icon} />
                </Grid>
                <Grid item>
                    <DefaultText align='center'>{badge.publicTitle}</DefaultText>
                </Grid>
                <Grid item>
                    <AccentText>{Resources.COLLABORATOR_DETAIL_BADGE_RANK.format(badge.rank)}</AccentText>
                </Grid>
            </Grid>
        </div>
    )
};

export default withStyles(styles)(Badge)

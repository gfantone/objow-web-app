import React from 'react'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {CollaboratorList, LevelCondition, Points} from './components'
import { AccentText, DefaultText, DefaultTitle, InfoText, ProgressBar } from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/NumberHelper'
import '../../../../helpers/StringHelper'

const styles = {
    icon: {
        height: 41,
        width: 41
    }
};

const BadgeLevel = ({ level, ...props }) => {
    const { classes } = props;
    const iconData = require(`../../../../assets/img/system/badge/icons/${level.code}.svg`);
    const counter = level.counter <= level.target ? level.counter : level.target;
    const progression = (counter / level.target).toFullPercentage();

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item container xs={12} spacing={2}>
                    <Grid item>
                        <CardMedia image={iconData} className={classes.icon} />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <DefaultTitle noWrap>{level.publicTitle}</DefaultTitle>
                        <InfoText>{Resources.BADGE_LEVEL_RANK_TEXT.format(level.rank)}</InfoText>
                    </Grid>
                    <Grid item>
                        <Points level={level} />
                    </Grid>
                </Grid>
                <Grid item>
                    <DefaultText>{level.privateTitle}</DefaultText>
                </Grid>
                <Grid item container xs={12} spacing={1}>
                    <Grid item container xs={12}>
                        <Grid item xs>
                            <DefaultText>
                                {Resources.BADGE_LEVEL_COUNTER_TEXT.format(counter)} <InfoText component='span'>/ {Resources.BADGE_LEVEL_TARGET_TEXT.format(level.target)}</InfoText>
                            </DefaultText>
                        </Grid>
                        <Grid item>
                            <AccentText>{progression} %</AccentText>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <ProgressBar value={progression} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify='space-between' alignItems='center'>
                        <Grid item>
                            <LevelCondition level={level} />
                        </Grid>
                        <Grid item style={{minHeight: 40}}>
                            <CollaboratorList collaborators={level.collaborators} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

export default withStyles(styles)(BadgeLevel)

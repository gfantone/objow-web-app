import React from 'react'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { LevelCondition, Points } from './components'
import { AccentText, DefaultText, DefaultTitle, InfoText, ProgressBar } from '../../../../components'
import '../../../../helpers/NumberHelper'

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
                        <InfoText>Rang {level.rank}</InfoText>
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
                                Réalisé : {counter} <InfoText component='span'>/ Objectif : {level.target}</InfoText>
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
                <Grid item container>
                    <LevelCondition level={level} />
                </Grid>
            </Grid>
        </div>
    )
};

export default withStyles(styles)(BadgeLevel)

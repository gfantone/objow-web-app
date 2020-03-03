import React from 'react'
import { connect } from 'react-redux'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccentText, DefaultText, DefaultTitle, ProgressBar, InfoText, TimerTag } from '../../../../components'
import { Period } from './components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireAlt, faFlagCheckered, faUser, faUsers } from '@fortawesome/free-solid-svg-icons'

const styles = {
    icon: {
        width: 41,
        height: 41,
        marginRight: 8
    },
    name: {
        marginRight: 16
    },
    progress: {
        marginTop: 16
    },
    progressBar: {
        marginTop: 8
    },
    infos: {
        marginTop: 16
    },
    info: {
        marginLeft: 16
    },
    subInfo: {
        marginLeft: 4
    }
};

const Goal = ({ goal, ...props }) => {
    const { classes } = props;
    const iconData = require(`../../../../assets/img/system/category/icons/${goal.icon}.svg`);
    const progression = Math.round((goal.counter / goal.target) * 100);

    return (
        <div>
            <Grid container>
                <Grid item>
                    <CardMedia image={iconData} className={classes.icon} />
                </Grid>
                <Grid item xs zeroMinWidth>
                    <DefaultTitle className={classes.name} noWrap>{goal.name}</DefaultTitle>
                    <Period goal={goal} />
                </Grid>
                <Grid item>
                    <TimerTag date={goal.end} />
                </Grid>
            </Grid>
            <Grid container className={classes.progress}>
                <Grid item>
                    <DefaultText>
                        Réalisé : {goal.counter} <InfoText component='span'>/ Objectif : {goal.target}</InfoText>
                    </DefaultText>
                </Grid>
                <Grid item xs>
                    <AccentText align='right'>{progression}%</AccentText>
                </Grid>
            </Grid>
            <Grid container className={classes.progressBar}>
                <Grid item xs>
                    <ProgressBar value={progression} />
                </Grid>
            </Grid>
            <Grid container className={classes.infos}>
                {goal.rank && <Grid item>
                    <DefaultText>
                        <FontAwesomeIcon icon={faFlagCheckered} /> {goal.rank}{ goal.rank == 1 ? 'er' : 'ème' } <InfoText component='span'>/ {goal.participants}</InfoText>
                    </DefaultText>
                </Grid>}
                {!goal.rank && <Grid item>
                    <DefaultText>
                        <FontAwesomeIcon icon={faFlagCheckered} /> {goal.participants} {goal.type == 'C' ? 'joueurs' : 'équipes'}
                    </DefaultText>
                </Grid>}
                <Grid item className={classes.info}>
                    <DefaultText>
                        <FontAwesomeIcon icon={faFireAlt} /> {goal.points} PTS <InfoText component='span'>/ {goal.maxPoints} MAX</InfoText>
                    </DefaultText>
                </Grid>
                <Grid item className={classes.info} xs zeroMinWidth>
                    <DefaultText align='right' noWrap>
                        <FontAwesomeIcon icon={goal.type == 'C' ? faUser : faUsers} /> { goal.type == 'C' ? 'Solo' : 'Équipe' }
                    </DefaultText>
                </Grid>
            </Grid>
        </div>
    )
};

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
});

export default connect(mapStateToProps)(withStyles(styles)(Goal))

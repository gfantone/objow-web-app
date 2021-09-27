import React from 'react'
import { connect } from 'react-redux'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccentText, DefaultText, DefaultTitle, ProgressBar, InfoText, TimerTag } from '../../../../components'
import * as Resources from '../../../../Resources'
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
}

const Goal = ({ goal, ...props }) => {
    const { classes } = props
    const progression = Math.round((goal.counter / goal.target) * 100)
    const typeStyle = goal.type === 'T' ? {color: goal.color} : null
    const hasRank = goal.rank && goal.allow_ranking

    let maxPointsKey
    maxPointsKey = 'maxPoints'
    // if(goal.pointRepartitionMode === 'G') {
    // } else {
    //   if(goal.type === 'T' && goal.pointRepartitionMode === 'T') {
    //     maxPointsKey = 'maxTeamPoints'
    //   } else {
    //     // if(goal.pointRepartitionMode === 'T') {
    //     //   maxPointsKey = 'maxTeamCollaboratorPoints'
    //     // } else if(goal.pointRepartitionMode === 'I') {
    //       maxPointsKey = 'maxCollaboratorPoints'
    //     // }
    //   }
    // }
    const maxPoints = goal[maxPointsKey]
    const hasPoints = goal[maxPointsKey] > 0


    return (
        <div>
            <Grid container>
                <Grid item>
                    <CardMedia image={goal.icon} className={classes.icon} />
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
                        {Resources.GOAL_COUNTER_TEXT.format(goal.counter)} <InfoText component='span'>{Resources.GOAL_TARGET_TEXT.format(goal.target)}</InfoText>
                    </DefaultText>
                </Grid>
                <Grid item xs>
                    <AccentText align='right'>{Resources.GOAL_PROGRESSION_TEXT.format(progression)}</AccentText>
                </Grid>
            </Grid>
            <Grid container className={classes.progressBar}>
                <Grid item xs>
                    <ProgressBar value={progression} />
                </Grid>
            </Grid>
            <Grid container className={classes.infos}>
                {hasRank && <Grid item>
                    <DefaultText>
                        <FontAwesomeIcon icon={faFlagCheckered} /> {goal.rank == 1 ? Resources.GOAL_FIRST_RANK_TEXT.format(goal.rank) : Resources.GOAL_OTHER_RANK_TEXT.format(goal.rank)} <InfoText component='span'>{Resources.GOAL_MAX_RANK_TEXT.format(goal.participants)}</InfoText>
                    </DefaultText>
                </Grid>}
                {!hasRank && <Grid item>
                    <DefaultText>
                        <FontAwesomeIcon icon={faFlagCheckered} /> {goal.type == 'C' ? Resources.GOAL_PLAYER_TEXT.format(goal.participants) : Resources.GOAL_TEAM_TEXT.format(goal.participants)}
                    </DefaultText>
                </Grid>}
                { hasPoints && <Grid item className={classes.info}>
                    <DefaultText>
                        <FontAwesomeIcon icon={faFireAlt} /> {Resources.GOAL_POINTS_TEXT.format(goal.points)} <InfoText component='span'>{Resources.GOAL_MAX_POINTS_TEXT.format(maxPoints)}</InfoText>
                    </DefaultText>
                </Grid>}
                <Grid item className={classes.info} xs zeroMinWidth>
                    <DefaultText align='right' noWrap style={typeStyle}>
                        <FontAwesomeIcon icon={goal.type == 'C' ? faUser : faUsers} /> { goal.type == 'C' ? Resources.GOAL_COLLABORATOR_TAG : Resources.GOAL_TEAM_TAG }
                    </DefaultText>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
})

export default connect(mapStateToProps)(withStyles(styles)(Goal))

import React from 'react'
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons'
import {faFireAlt} from '@fortawesome/free-solid-svg-icons'
import {ChallengeImage, ChallengeType} from '..'
import {DefaultText, InfoText, TimerTag} from '../../../../components'
import * as Resources from '../../../../Resources'

const styles = {
    imageContainer: {
        position: 'relative'
    },
    timerContainer: {
        position: 'absolute',
        right: 0,
        top: 16
    }
}

const Challenge = ({challenge, ...props}) => {
    const {classes} = props

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.imageContainer}>
                        <div className={classes.timerContainer}>
                            <TimerTag date={challenge.end} />
                        </div>
                        <ChallengeImage image={challenge.image} />
                    </div>
                </Grid>
                <Grid item>
                    <DefaultText>
                        {challenge.rank && (<div><FontAwesomeIcon icon={faFlagCheckered} /> {challenge.rank == 1 ? Resources.CHALLENGE_FIRST_RANK.format(challenge.rank) : Resources.CHALLENGE_OTHER_RANK.format(challenge.rank)} <InfoText component='span'>/ {challenge.participants}</InfoText></div>)}
                        {!challenge.rank && (<div><FontAwesomeIcon icon={faFlagCheckered} /> {challenge.typeCode !== 'CT' ? Resources.CHALLENGE_COLLABORATORS.format(challenge.participants) : Resources.CHALLENGE_TEAMS.format(challenge.participants)}</div>)}
                    </DefaultText>
                </Grid>
                <Grid item>
                    <DefaultText>
                        <FontAwesomeIcon icon={faFireAlt} /> {Resources.CHALLENGE_POINTS.format(challenge.points)} <InfoText component='span'>/ {Resources.CHALLENGE_MAX_POINTS.format(challenge.maxPoints)}</InfoText
                    ></DefaultText>
                </Grid>
                <Grid item xs>
                    <DefaultText align='right'>
                        <ChallengeType type={challenge.typeCode} />
                    </DefaultText>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Challenge)

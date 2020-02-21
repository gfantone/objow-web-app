import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { faFireAlt } from '@fortawesome/free-solid-svg-icons'
import { ChallengeImage, ChallengeType } from '..'
import { DefaultText, InfoText, TimerTag} from '../../../../components'

const styles = {
    imageContainer: {
        position: 'relative'
    },
    timerContainer: {
        position: 'absolute',
        right: 0,
        top: 16
    }
};

const Challenge = ({ challenge, ...props }) => {
    const { classes } = props;

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
                        { challenge.rank && (<div><FontAwesomeIcon icon={faFlagCheckered} /> {challenge.rank}{challenge.rank == 1 ? 'er' : 'ème'} <InfoText component='span'>/ {challenge.participants}</InfoText></div>) }
                        { !challenge.rank && (<div><FontAwesomeIcon icon={faFlagCheckered} /> {challenge.participants} {challenge.typeCode != 'CT' ? 'joueurs' : 'équipes'}</div>) }
                    </DefaultText>
                </Grid>
                <Grid item>
                    <DefaultText>
                        <FontAwesomeIcon icon={faFireAlt} /> {challenge.points} PTS <InfoText component='span'>/ {challenge.maxPoints} MAX</InfoText
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
};

export default withStyles(styles)(Challenge)
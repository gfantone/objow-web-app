import React from 'react'
import {Grid, Avatar, Tooltip} from '@material-ui/core'
import {AvatarGroup} from '@material-ui/lab'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons'
import {faFireAlt} from '@fortawesome/free-solid-svg-icons'
import {ChallengeImage, ChallengeType} from '..'
import {DefaultText, InfoText, TimerTag} from '../../../../components'
import * as Resources from '../../../../Resources'
import _ from 'lodash'

const styles = {
    imageContainer: {
        position: 'relative'
    },
    timerContainer: {
        position: 'absolute',
        right: 0,
        top: 16
    },
    avatarGroup: {
      marginTop: '-2px'
    },
    avatar: {
      // width: 22,
      // height: 22,
    },
    bigText: {
      textTransform: 'none',
      fontSize: 16
    },
    smallText: {
      textTransform: 'none',
      fontSize: 13
    }
}

const Challenge = ({challenge, ...props}) => {
    const {classes} = props
    console.log(challenge);
    const hasParticipants = !_.isEmpty(_.get(challenge, 'topParticipants'))

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.imageContainer}>
                        <div className={classes.timerContainer}>
                            <TimerTag date={challenge.end} />
                        </div>
                        <ChallengeImage image={challenge.custom_image || challenge.image} />
                    </div>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      <DefaultText className={ classes.bigText }>
                        { challenge.name }
                      </DefaultText>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1} direction="row">
                        { hasParticipants && (
                          <Grid item>
                            <AvatarGroup className={ classes.avatarGroup }>
                              {challenge.topParticipants.map(participant => (
                                <Tooltip title={ participant.fullname }>
                                  <Avatar src={ participant.photo } className={ classes.avatar }></Avatar>
                                </Tooltip>
                              ))}
                            </AvatarGroup>
                          </Grid>
                        )}
                        <Grid item style={{marginLeft:'auto'}}>
                          <DefaultText className={ classes.smallText }>
                            {challenge.rank && (<div><FontAwesomeIcon icon={faFlagCheckered} /> {challenge.rank == 1 ? Resources.CHALLENGE_FIRST_RANK.format(challenge.rank) : Resources.CHALLENGE_OTHER_RANK.format(challenge.rank)} <InfoText component='span'>/ {challenge.participants}</InfoText></div>)}
                            {!challenge.rank && (<div><FontAwesomeIcon icon={faFlagCheckered} /> {challenge.typeCode !== 'CT' ? Resources.CHALLENGE_COLLABORATORS.format(challenge.participants) : Resources.CHALLENGE_TEAMS.format(challenge.participants)}</div>)}
                          </DefaultText>
                        </Grid>
                      </Grid >
                    </Grid >
                    <Grid item>
                      <DefaultText className={ classes.smallText }>
                        <FontAwesomeIcon icon={faFireAlt} /> {Resources.CHALLENGE_POINTS.format(challenge.points)} <InfoText component='span'>/ {Resources.CHALLENGE_MAX_POINTS.format(challenge.maxPoints)}</InfoText>
                      </DefaultText>
                    </Grid>
                  </Grid>
                </Grid>

                    { !hasParticipants && (
                      <Grid item style={{marginLeft: 'auto'}}>
                        <DefaultText align='right'>
                            <ChallengeType type={challenge.typeCode} />
                        </DefaultText>
                      </Grid>
                    )}
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Challenge)

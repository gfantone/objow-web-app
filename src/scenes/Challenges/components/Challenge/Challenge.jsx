import React from 'react'
import {Grid, Avatar, Tooltip} from '@material-ui/core'
import {AvatarGroup} from '@material-ui/lab'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons'
import {faFireAlt} from '@fortawesome/free-solid-svg-icons'
import {ChallengeImage, ChallengeType} from '..'
import {DefaultText, InfoText, TimerTag, BoldTitle} from '../../../../components'
import * as Resources from '../../../../Resources'
import _ from 'lodash'
import chroma from 'chroma-js'

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
      marginLeft: '-2px',
      flexWrap: 'wrap',

      height: 35,
      overflow: 'hidden'
    },
    avatar: {
      width: 35,
      height: 35,
    },
    bigText: {
      fontSize: 18,

    },
    smallText: {
      fontSize: 12
    },
    challengeType: {
      lineHeight: 35,
      verticalAlign: 'center',
      whiteSpace: 'nowrap'
    }
}

const Challenge = ({challenge, ...props}) => {
    const { classes, configs } = props
    const hasParticipants = !_.isEmpty(_.get(challenge, 'topParticipants'))
    const initials = fullname => fullname && fullname.split(' ').map(name => name.slice(0,1).toUpperCase()).join('')

    const displayTitle = configs && _.get(configs.find(c => c.code === 'CTTA'), 'value', 'false').toBoolean()

    const avatarColors = [
      '#EFEFEF', '#DEDEE8', '#F3F0E0', '#E4EADE', '#DCE5E6', '#EDE8EA'
    ]
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
                <Grid item style={{width: '100%'}}>
                  <Grid container spacing={1} direction="column">
                    <Grid item>
                      <Grid container spacing={1} direction="row">
                        <Grid item>
                          <DefaultText className={ classes.smallText }>
                            {challenge.rank && (<div><FontAwesomeIcon icon={faFlagCheckered} /> {challenge.rank == 1 ? Resources.CHALLENGE_FIRST_RANK.format(challenge.rank) : Resources.CHALLENGE_OTHER_RANK.format(challenge.rank)} <InfoText component='span' className={ classes.smallText }>/ {challenge.participants}</InfoText></div>)}
                            {!challenge.rank && (<div><FontAwesomeIcon icon={faFlagCheckered} /> {challenge.typeCode !== 'CT' ? Resources.CHALLENGE_COLLABORATORS.format(challenge.participants) : Resources.CHALLENGE_TEAMS.format(challenge.participants)}</div>)}
                          </DefaultText>
                        </Grid>
                        <Grid item>
                          <DefaultText className={ classes.smallText }>
                            <FontAwesomeIcon icon={faFireAlt} />
                            &nbsp;
                            {Resources.CHALLENGE_POINTS.format(challenge.points)}
                            &nbsp;
                            <InfoText component='span' className={ classes.smallText }>/&nbsp;
                              {Resources.CHALLENGE_MAX_POINTS.format(challenge.maxPoints)}
                            </InfoText>
                          </DefaultText>
                        </Grid>
                      </Grid>
                    </Grid>
                    {displayTitle && (
                      <Grid item style={{paddingTop: 0}}>
                        <BoldTitle>
                          { challenge.name }
                        </BoldTitle>
                      </Grid>
                    )}
                    <Grid item>
                      <Grid container spacing={1} direction="row" style={{ flexWrap: 'noWrap' }}>
                        { hasParticipants && (
                          <Grid item style={{width: '100%'}}>
                            <AvatarGroup className={ classes.avatarGroup } max={10}>
                              {challenge.topParticipants.map((participant, index) => (
                                <Tooltip title={ participant.fullname || _.get(participant, 'team.name') }>
                                  <Avatar src={ participant.photo } className={ classes.avatar } style={{
                                      fontSize: '16px',
                                      backgroundColor: chroma(avatarColors[index % avatarColors.length]),
                                      color: chroma(avatarColors[index % avatarColors.length]).darken(1.5)
                                    }}>
                                    { participant.photo ? '' : initials(participant.fullname) || participant.rank }
                                  </Avatar>
                                </Tooltip>
                              ))}
                            </AvatarGroup>
                          </Grid>
                        )}
                        <Grid item className={ classes.challengeType }>
                          <DefaultText align='right' style={{ display: 'flex', lineHeight: '2.5' }}>
                              <span style={{ marginRight: '2px' }}>
                                <ChallengeType type={challenge.typeCode} />
                              </span>
                              <span>
                                { challenge.typeName }
                              </span>
                          </DefaultText>
                        </Grid>
                      </Grid >
                    </Grid >
                  </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Challenge)

import React from 'react'
import {Grid, Tooltip} from '@material-ui/core'
import {AvatarGroup} from '@material-ui/lab'
import {withStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFlagCheckered} from '@fortawesome/free-solid-svg-icons'
import {faFireAlt} from '@fortawesome/free-solid-svg-icons'
import {ChallengeImage, ChallengeType} from '..'
import {DefaultText, InfoText, TimerTag, BoldTitle, Avatar} from '../../../../components'
import * as Resources from '../../../../Resources'
import { getColorById } from '../../../../helpers/ColorsHelper'
import _ from 'lodash'
import chroma from 'chroma-js'

const styles = {
    challengeImage: {

        height: '600px'

    },
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
      fontSize: 13
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

    const displayTitle = configs && _.get(configs.find(c => c.code === 'CTTA'), 'value', 'false').toBoolean()

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div className={classes.imageContainer}>
                        <div className={classes.timerContainer}>
                            <TimerTag date={challenge.end} />
                        </div>
                        <ChallengeImage image={challenge.custom_image || challenge.image} style={{ height: hasParticipants ? '' : '189px' }}/>
                    </div>
                </Grid>
                <Grid item style={{width: '100%'}}>
                  <Grid container spacing={1} direction="column">
                    {displayTitle && (
                      <Grid item>
                        <BoldTitle style={{ lineHeight: 1 }}>
                          { challenge.name }
                        </BoldTitle>
                      </Grid>
                    )}
                <Grid item style={{ maxHeight: '27px' }}>
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
                            
                          </DefaultText>
                        </Grid>
                        { !hasParticipants &&
                          <Grid item style={{ marginLeft: 'auto' }}>
                            <DefaultText className={ classes.smallText }>
                              <ChallengeType type={challenge.typeCode} />
                            </DefaultText>
                          </Grid>
                        }
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={1} direction="row" style={{ flexWrap: 'noWrap' }}>
                        { hasParticipants && (
                          <React.Fragment>
                            <Grid item style={{width: '100%'}}>
                              <AvatarGroup className={ classes.avatarGroup } max={15}>
                                {challenge.topParticipants.map((participant, index) => (
                                  <Avatar
                                    src={ _.get(participant, 'collaborator.photo') }
                                    entityId={_.get(participant, 'collaborator.id')}
                                    className={ classes.avatar }
                                    fallbackName={_.get(participant, 'collaborator.photo') ? '' : _.get(participant, 'collaborator.fullname') || (_.get(participant, 'collaborator.rank') || index + 1)}
                                    backgroundColor={challenge.typeCode === 'CT' ? 'white' : null}
                                    color={challenge.typeCode === 'CT' ? '#555' : null}
                                    borderColor={ challenge.typeCode === 'CT' ? _.get(participant, 'team.color.hex') : null}
                                    tooltip={ _.get(participant, 'collaborator.fullname') || _.get(participant, 'team.name') }
                                    />
                                ))}
                              </AvatarGroup>
                            </Grid>
                            <Grid item className={ classes.challengeType }>
                              <DefaultText align='right' style={{ display: 'flex', lineHeight: '2.5' }}>
                                <span style={{ marginRight: '2px' }}>
                                  <ChallengeType type={challenge.typeCode} />
                                </span>
                                <span>
                                  { challenge.typeCode === 'CT' ? Resources.TEAM_TITLE_SINGULAR : challenge.typeName }
                                </span>
                              </DefaultText>
                            </Grid>
                          </React.Fragment>
                        )}
                      </Grid >
                    </Grid >
                  </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Challenge)

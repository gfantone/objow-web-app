import React, { useState } from 'react'
import {Grid, CardMedia} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight, faBalanceScale, faCalendarAlt, faEquals, faInfoCircle, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import {AccentTag, AccentText, AnimationController, BlueTag, BlueText, Card, DefaultText, DefaultTitle, InfoText, Table, TableBody, TableCell, TableChip, TableRow, Tooltip, RichText, Linkify, Dialog, BigText, ProgressBar} from '../../../../components'
import {ChallengeReward, ChallengeRewardDetail, ChallengeRewardCard} from '../'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'

const styles = {
  rewardDialog: {
    width: 900,
    maxWidth: 900
  },
  icon: {
    height: 100,
    width: 100
  }
}

const ChallengeCondition = ({ challenge, goals, ...props }) => {

    const [rewardDetail, setRewardDetail] = useState()
    const start = challenge.start.toDate2().toLocaleDateString()
    const end = challenge.end.toDate2().toLocaleDateString()
    const typeIcon = challenge.typeCode === 'CT' ? faUsers : faUser

    const coinImage = require(`../../../../assets/img/system/challenge/icons/coin.png`)
    const giftImage = require(`../../../../assets/img/system/challenge/icons/gift.png`)

    const modeIcons = {
      'R': require(`../../../../assets/img/system/challenge/icons/Ribbons.png`),
      'M': require(`../../../../assets/img/system/challenge/icons/Rocket.png`),
      'P': require(`../../../../assets/img/system/challenge/icons/Levels.png`),
      'C': require(`../../../../assets/img/system/challenge/icons/race.png`)
    }

    const rewardTypeIcon = challenge.rewardTypeCode === 'G' ? giftImage : coinImage

    const renderMaximumAward = () => {
        const award = challenge.awards[0]

        return (
            <Grid container spacing={1}>
              <Grid item>
                <TableChip label={'>'} />
              </Grid>
              <Grid item>
                <DefaultText>{challenge.typeCode === 'CT' ? Resources.CHALLENGE_CONDITION_TEAM_MAX_POINTS_LABEL : Resources.CHALLENGE_CONDITION_COLLABORATOR_MAX_POINTS_LABEL}</DefaultText>
              </Grid>
              <Grid item>
                <AccentTag>{Resources.CHALLENGE_CONDITION_AWARD_POINTS.format(award.points)}</AccentTag>
              </Grid>
            </Grid>
        )
    }


    const renderRankingAwards = () => {
        return (
              <Table backgroundDisabled>
                <TableBody>
                  <Grid container spacing={1}>
                  {challenge.awards.map(award => {

                    return (
                        <Grid item xs={12} style={{ cursor: 'pointer' }} onClick={() => award.reward && setRewardDetail(Object.assign({}, award.reward))}>
                            <div>
                                {challenge.rewardTypeCode === 'P' && (

                                  <Grid container spacing={1}>
                                    <Grid item>
                                      <TableChip label={'>'} />
                                    </Grid>
                                    <Grid item>
                                      <DefaultText>{challenge.typeCode === 'CT' ? Resources.CHALLENGE_CONDITION_TEAM_RANK.format(award.rank) : Resources.CHALLENGE_CONDITION_COLLABORATOR_RANK.format(award.rank)}</DefaultText>
                                    </Grid>
                                    <Grid item>
                                      <AccentTag>{Resources.CHALLENGE_CONDITION_AWARD_POINTS.format(award.points)}</AccentTag>
                                    </Grid>
                                  </Grid>
                                )}
                                {challenge.rewardTypeCode === 'G' && (
                                  <TableRow>
                                    <TableCell style={{width: 270}}>
                                      <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                          <Grid container spacing={1}>
                                            <Grid item>
                                              <TableChip label={'>'} />
                                            </Grid>
                                            <Grid item>
                                              <DefaultText>{challenge.typeCode === 'CT' ? Resources.CHALLENGE_CONDITION_TEAM_RANK.format(award.rank) : Resources.CHALLENGE_CONDITION_COLLABORATOR_RANK.format(award.rank)}</DefaultText>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item style={{maxWidth: 250}}>
                                          <ChallengeReward reward={award.reward} />
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                  </TableRow>
                                )}
                            </div>
                        </Grid>
                    )
                })}
                </Grid>
              </TableBody>
            </Table>
        )
    }

    const pointRewardImage = require(`../../../../assets/img/system/challenge/icons/points.png`)

    const renderStepAwards = () => {
        return (
              <Table backgroundDisabled>
                <TableBody>
                  <Grid container spacing={1}>
                  {challenge.awards.map(award => {

                    return (
                        <Grid item xs={12} style={{ cursor: 'pointer' }} onClick={() => award.reward && setRewardDetail(Object.assign({}, award.reward))}>
                            <div>
                                {challenge.rewardTypeCode === 'P' && (
                                  <Grid key={award.key} item xs={12} sm={6} md={4} >
                                    <Grid container spacing={1} direction="column">
                                      <Grid item xs={12}>
                                        <ChallengeRewardCard>
                                          <Grid container spacing={1} alignItems='flex-end'>
                                              <Grid item xs={12} >
                                                <Grid container direction='column' spacing={2}>
                                                  <Grid item>
                                                    <Grid container justify='space-between'>
                                                      <Grid item>

                                                        <DefaultText>{Resources.CHALLENGE_AWARD_STEP_POINT_LABEL.format(award.rank)}</DefaultText>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>


                                                  <Grid item>

                                                    <DefaultText>
                                                      { Resources.CHALLENGE_AWARD_TARGET_LABEL } : {award.target}
                                                    </DefaultText>
                                                  </Grid>
                                                  <Grid item xs={12}>
                                                    <CardMedia image={pointRewardImage} style={{height: 100, width: 100, margin: 'auto'}}/>
                                                  </Grid>
                                                  <Grid item>
                                                    <Grid container>
                                                      <Grid item>
                                                        <CardMedia image={coinImage} style={{height: 20, width: 20, marginRight: 5, marginTop: -2}} />
                                                      </Grid>
                                                      <Grid item>
                                                        <DefaultText>
                                                          {Resources.CHALLENGE_CONDITION_AWARD_POINTS.format(award.points)}

                                                        </DefaultText>
                                                      </Grid>
                                                    </Grid>
                                                  </Grid>



                                                </Grid>
                                              </Grid>

                                          </Grid>
                                        </ChallengeRewardCard>
                                      </Grid>
                                    </Grid>
                                  </Grid>

                                )}
                                {challenge.rewardTypeCode === 'G' && (
                                  <TableRow>
                                    <TableCell style={{width: 270}}>
                                      <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                          <Grid container spacing={1}>
                                            <Grid item>
                                              <TableChip label={'>'} />
                                            </Grid>
                                            <Grid item>
                                              <DefaultText>{Resources.CHALLENGE_AWARD_STEP_POINT_LABEL.format(award.rank)}</DefaultText>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                        <Grid item>
                                          <DefaultText>
                                            { Resources.CHALLENGE_AWARD_TARGET_LABEL } : {award.target}
                                          </DefaultText>
                                        </Grid>
                                        <Grid item style={{maxWidth: 250}}>
                                          <ChallengeReward reward={award.reward} />
                                        </Grid>
                                      </Grid>
                                    </TableCell>
                                  </TableRow>
                                )}
                            </div>
                        </Grid>
                    )
                })}
                </Grid>
              </TableBody>
            </Table>
        )
    }


    const renderAwards = () => {
      return (
        <Grid container spacing={2}>
          {challenge.awards.map(award => {
            return(
              <Grid key={award.key} item xs={12} sm={6} md={4} style={{ cursor: 'pointer' }} onClick={() => award.reward && setRewardDetail(Object.assign({}, award.reward))}>
              <Grid container spacing={1} direction="column">
                <Grid item xs={12}>
                  <ChallengeRewardCard>
                    <Grid container spacing={1} alignItems='flex-end'>
                      {challenge.rewardTypeCode === 'G' && (
                        <Grid item xs={12} >
                          <Grid container direction='column' spacing={2}>
                            <Grid item>
                              <Grid container justify='space-between'>
                                <Grid item>
                                  {challenge.awardCode === 'P' ? (
                                    <DefaultText>{Resources.CHALLENGE_AWARD_STEP_POINT_LABEL.format(award.rank)}</DefaultText>
                                  ) : (
                                    <DefaultTitle>
                                      {challenge.typeCode === 'CT' ? Resources.CHALLENGE_CONDITION_TEAM_RANK.format(award.rank) : Resources.CHALLENGE_CONDITION_COLLABORATOR_RANK.format(award.rank)}
                                    </DefaultTitle>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>

                            {challenge.awardCode === 'P' && (
                              <Grid item>
                                <DefaultText>
                                  { Resources.CHALLENGE_AWARD_TARGET_LABEL } : {award.target}
                                </DefaultText>
                              </Grid>
                            )}
                            <Grid item xs={12}>
                              {award.reward && (
                                <ChallengeReward reward={award.reward} />
                              )}
                            </Grid>

                          </Grid>
                        </Grid>
                      )}
                      {challenge.rewardTypeCode === 'P' && (
                        <React.Fragment>
                          <Grid item xs>
                            <DefaultText>
                              {challenge.typeCode === 'CT' ? Resources.CHALLENGE_CONDITION_TEAM_RANK.format(award.rank) : Resources.CHALLENGE_CONDITION_COLLABORATOR_RANK.format(award.rank)}
                            </DefaultText>
                          </Grid>
                        </React.Fragment>
                      )}
                    </Grid>
                  </ChallengeRewardCard>
                </Grid>
              </Grid>
            </Grid>
            )
          })}
        </Grid>

      )
    }


    const goalTooltip = challenge.awardCode === 'C' ? Resources.CHALLENGE_RACE_CONDITION_GOAL_INFO : Resources.CHALLENGE_CONDITION_GOAL_INFO
    const AwardWrapperComponent = challenge.awardCode === 'P' ? React.Fragment : Card
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12}>
                        <DefaultTitle>{Resources.CHALLENGE_CONDITION_CONDITION_AREA}</DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <Card marginDisabled>
                            <Grid container spacing={2} alignItems={'flex-end'}>
                                <Grid item xs={12} sm>
                                    <Table backgroundDisabled>
                                        <TableBody>
                                            { goals.map(goal => {
                                                const progression = Math.round((goal.counter / (goal.targetByTeam || goal.target)) * 100)
                                                return (
                                                    <TableRow>
                                                        <TableCell>
                                                            <Grid container spacing={2}>
                                                                <Grid item>
                                                                    <TableChip label={goal.number} />
                                                                </Grid>
                                                                <Grid item xs>
                                                                    <div>

                                                                        <Grid container spacing={1}>
                                                                            <Grid item xs={12}>
                                                                                <div>
                                                                                    <Grid container spacing={1}>
                                                                                        <Grid item xs zeroMinWidth>
                                                                                            <DefaultText>
                                                                                                {goal.name}&nbsp;
                                                                                                <Tooltip title={goalTooltip} placement={'right'}>
                                                                                                    <BlueText style={{ width: 'fit-content' }} component={'span'}>
                                                                                                        <FontAwesomeIcon icon={faInfoCircle} />
                                                                                                    </BlueText>
                                                                                                </Tooltip>
                                                                                            </DefaultText>
                                                                                        </Grid>
                                                                                        <Grid item>
                                                                                            <DefaultText>
                                                                                                <FontAwesomeIcon icon={faBalanceScale} /> ({goal.unit})
                                                                                            </DefaultText>
                                                                                        </Grid>
                                                                                    </Grid>
                                                                                </div>
                                                                            </Grid>
                                                                            {challenge.awardCode === 'C' && (
                                                                              <Grid item xs={12} style={{marginTop: 10, marginBottom: 15, maxWidth: 400}}>
                                                                                <Grid container>
                                                                                  <Grid item>
                                                                                    <DefaultText lowercase style={{fontSize: 13}}>
                                                                                      {Resources.GOAL_COUNTER_TEXT.format(goal.counter)} <InfoText lowercase  style={{fontSize: 13}} component='span'>{Resources.GOAL_TARGET_TEXT.format(goal.targetByTeam || goal.target)}</InfoText>
                                                                                    </DefaultText>
                                                                                  </Grid>
                                                                                  <Grid item xs>
                                                                                    <AccentText align='right'>{Resources.GOAL_PROGRESSION_TEXT.format(progression)}</AccentText>
                                                                                  </Grid>
                                                                                </Grid>
                                                                                <Grid container>
                                                                                  <Grid item xs>
                                                                                    <ProgressBar value={progression} />
                                                                                  </Grid>
                                                                                </Grid>
                                                                              </Grid>
                                                                            )}
                                                                            {challenge.awardCode !== 'C' && (
                                                                              <Grid item xs={12}>
                                                                                <div>
                                                                                  <table>
                                                                                    <tbody>
                                                                                      <tr>
                                                                                        <td style={{padding: 0, width: '30%'}}>
                                                                                          <DefaultText lowercase style={{textAlign: 'right', paddingRight: 5, fontSize: 13}}>
                                                                                            Condition :
                                                                                          </DefaultText>
                                                                                        </td>
                                                                                        <td>
                                                                                          <Grid container spacing={1} style={{marginTop: 0, width: '70%'}}>
                                                                                              <Grid item>
                                                                                                  <DefaultText>{goal.target}</DefaultText>
                                                                                              </Grid>

                                                                                                <React.Fragment>
                                                                                                  <Grid item>
                                                                                                    <DefaultText>
                                                                                                      <FontAwesomeIcon icon={faEquals} />
                                                                                                    </DefaultText>
                                                                                                  </Grid>
                                                                                                  <Grid item>
                                                                                                    <BlueTag>{Resources.CHALLENGE_CONDITION_POINT_TARGET.format(goal.targetPoints)}</BlueTag>
                                                                                                  </Grid>
                                                                                                </React.Fragment>

                                                                                          </Grid>
                                                                                        </td>
                                                                                      </tr>
                                                                                      <tr>
                                                                                        <td style={{padding: 0, width: '30%'}}>
                                                                                          <DefaultText lowercase style={{textAlign: 'right', paddingRight: 5, fontSize: 13}}>
                                                                                            👉 Réalisé :
                                                                                          </DefaultText>
                                                                                        </td>
                                                                                        <td style={{width: '70%'}}>
                                                                                          <Grid container spacing={1} style={{marginTop: '-1px'}}>
                                                                                              <Grid item>
                                                                                                  <AccentText>{goal.counter}</AccentText>
                                                                                              </Grid>

                                                                                                <React.Fragment>
                                                                                                  <Grid item>
                                                                                                    <AccentText>
                                                                                                      <FontAwesomeIcon icon={faAngleRight} />
                                                                                                    </AccentText>
                                                                                                  </Grid>
                                                                                                  <Grid item>
                                                                                                    <AccentTag>{Resources.CHALLENGE_CONDITION_POINT_COUNTER.format(goal.points)}</AccentTag>
                                                                                                  </Grid>
                                                                                                </React.Fragment>

                                                                                          </Grid>
                                                                                        </td>
                                                                                      </tr>
                                                                                    </tbody>
                                                                                  </table>

                                                                                </div>
                                                                            </Grid>
                                                                            )}

                                                                        </Grid>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }) }
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item xs={12} sm={'auto'}>
                                    <div>
                                        <Grid container justify={'center'}>
                                            <Grid item>
                                                <AnimationController />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12}>
                        <DefaultTitle>{Resources.CHALLENGE_CONDITION_DESCRIPTION_AREA}</DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={8}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12}>
                                      <DefaultTitle>{challenge.name}</DefaultTitle>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <DefaultText>
                                          <FontAwesomeIcon icon={faCalendarAlt} /> {Resources.CHALLENGE_CONDITION_PERIOD.format(start, end)}
                                      </DefaultText>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <DefaultText>
                                          <FontAwesomeIcon icon={typeIcon} /> {challenge.typeName}
                                      </DefaultText>
                                  </Grid>
                                  <Grid item xs={12}>
                                      <DefaultText>
                                        {Resources.CHALLENGE_CONDITION_DESCRIPTION_LABEL}
                                      </DefaultText>
                                      <RichText
                                        initial={JSON.parse(challenge.description)}
                                        readOnly={ true }
                                        onChange={() => {}}
                                        />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12} sm={4}>
                                <Grid container spacing={1} direction='column' alignItems='center'>
                                  <Grid item>
                                    <CardMedia image={modeIcons[challenge.awardCode]} className={props.classes.icon} />
                                  </Grid>
                                  <Grid item>
                                    <BigText>
                                      Mode {challenge.awardName}
                                      {challenge.awardCode === 'P' && (

                                        <span style={{marginLeft: 5, lineHeight: 1, verticalAlign: 'middle'}}>
                                          <Tooltip title={Resources.CHALLENGE_STEP_MODE_INFORMATION} placement={'right'}>
                                            <BlueText style={{ width: 'fit-content' }} component={'span'}>
                                              <FontAwesomeIcon icon={faInfoCircle} />
                                            </BlueText>
                                          </Tooltip>
                                        </span>
                                      )}
                                    </BigText>
                                  </Grid>
                                  <Grid item style={{textAlign: 'center'}}>
                                    <DefaultText lowercase style={{fontSize: 14}}>
                                      {Resources[`CHALLENGE_CREATION_AWARD_TYPE_DESCRIPTION_${challenge.awardCode}`].format(
                                        challenge.typeCode === 'CC' ? 'premiers' : 'premières équipes',
                                        challenge.typeCode === 'CC' ? 'participants' : 'équipes'
                                      )}
                                    </DefaultText>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>


                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12}>
                        <DefaultTitle>{Resources.CHALLENGE_CONDITION_AWARD_AREA}</DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>

                        <Grid container spacing={1} style={{marginBottom: 5}}>
                          <Grid item>
                            <CardMedia image={rewardTypeIcon} style={{height: 25, width: 25}} />
                          </Grid>
                          <Grid item>
                            <DefaultTitle style={{marginTop: 3}}>
                              {challenge.rewardTypeName}
                            </DefaultTitle>
                          </Grid>
                        </Grid>
                        { challenge.rewardTypeCode === 'G' ? renderAwards() : (

                          <AwardWrapperComponent>
                            { challenge.awardCode == 'M' && renderMaximumAward() }
                            { challenge.awardCode == 'R' && renderRankingAwards() }
                            { challenge.awardCode == 'C' && renderRankingAwards() }
                            { challenge.awardCode == 'P' && renderStepAwards() }
                          </AwardWrapperComponent>
                        ) }
                    </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={rewardDetail}
                classes={{ paper: props.classes.rewardDialog }}
                onClose={() => setRewardDetail(null)}
            >
                <Grid container spacing={1} direction="column">
                  <Grid item>
                      <ChallengeRewardDetail reward={rewardDetail}/>
                  </Grid>
                </Grid>
            </Dialog>
        </div>
    )
}

export default withStyles(styles)(ChallengeCondition)

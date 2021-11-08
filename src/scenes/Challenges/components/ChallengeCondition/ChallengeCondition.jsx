import React from 'react'
import {Grid, CardMedia} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight, faBalanceScale, faCalendarAlt, faEquals, faInfoCircle, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import {AccentTag, AccentText, AnimationController, BlueTag, BlueText, Card, DefaultText, DefaultTitle, InfoText, Table, TableBody, TableCell, TableChip, TableRow, Tooltip, RichText, Linkify} from '../../../../components'
import {ChallengeReward} from '../'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'

const ChallengeCondition = ({ challenge, goals, ...props }) => {
    const start = challenge.start.toDate2().toLocaleDateString()
    const end = challenge.end.toDate2().toLocaleDateString()
    const typeIcon = challenge.typeCode === 'CT' ? faUsers : faUser

    const coinImage = require(`../../../../assets/img/system/challenge/icons/coin.png`)
    const giftImage = require(`../../../../assets/img/system/challenge/icons/gift.png`)

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
                        <Grid item xs={12}>
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
                                                                                                <Tooltip title={Resources.CHALLENGE_CONDITION_GOAL_INFO} placement={'right'}>
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
                                                                            <Grid item xs={12}>
                                                                                <div>
                                                                                  <table >
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
                                                                                              <Grid item>
                                                                                                  <DefaultText>
                                                                                                      <FontAwesomeIcon icon={faEquals} />
                                                                                                  </DefaultText>
                                                                                              </Grid>
                                                                                              <Grid item>
                                                                                                  <BlueTag>{Resources.CHALLENGE_CONDITION_POINT_TARGET.format(goal.targetPoints)}</BlueTag>
                                                                                              </Grid>
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
                                                                                              <Grid item>
                                                                                                  <AccentText>
                                                                                                      <FontAwesomeIcon icon={faAngleRight} />
                                                                                                  </AccentText>
                                                                                              </Grid>
                                                                                              <Grid item>
                                                                                                  <AccentTag>{Resources.CHALLENGE_CONDITION_POINT_COUNTER.format(goal.points)}</AccentTag>
                                                                                              </Grid>
                                                                                          </Grid>
                                                                                        </td>
                                                                                      </tr>
                                                                                    </tbody>
                                                                                  </table>

                                                                                </div>
                                                                            </Grid>

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
                                        <FontAwesomeIcon icon={faStar} /> {Resources.CHALLENGE_CONDITION_TYPE.format(challenge.awardName)}
                                        <InfoText>{Resources.[`CHALLENGE_CREATION_AWARD_TYPE_DESCRIPTION_${challenge.awardCode}`]}</InfoText>

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
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12}>
                        <DefaultTitle>{Resources.CHALLENGE_CONDITION_AWARD_AREA}</DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
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
                            { challenge.awardCode == 'M' && renderMaximumAward() }
                            { challenge.awardCode == 'R' && renderRankingAwards() }
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ChallengeCondition

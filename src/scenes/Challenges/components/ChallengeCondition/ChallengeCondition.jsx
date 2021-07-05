import React from 'react'
import {Grid} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight, faBalanceScale, faCalendarAlt, faEquals, faInfoCircle, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'
import {faStar} from '@fortawesome/free-regular-svg-icons'
import {AccentTag, AccentText, AnimationController, BlueTag, BlueText, Card, DefaultText, DefaultTitle, InfoText, Table, TableBody, TableCell, TableChip, TableRow, Tooltip, RichText, Linkify} from '../../../../components'
import * as Resources from '../../../../Resources'
import '../../../../helpers/StringHelper'

const ChallengeCondition = ({ challenge, goals, ...props }) => {
    const start = challenge.start.toDate2().toLocaleDateString()
    const end = challenge.end.toDate2().toLocaleDateString()
    const typeIcon = challenge.typeCode === 'CT' ? faUsers : faUser

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
            <Grid container spacing={1}>
                {challenge.awards.map(award => {
                    return (
                        <Grid item xs={12}>
                            <div>
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
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
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
                                                                                    <Grid container spacing={1}>
                                                                                        <Grid item>
                                                                                            <TableChip label={'>'} />
                                                                                        </Grid>
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
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid item xs={12}>
                                                                                <div>
                                                                                    <Grid container spacing={1}>
                                                                                        <Grid item>
                                                                                            <TableChip label={'>'} color={'primary'} />
                                                                                        </Grid>
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
                                        { challenge.awardCode == 'M' && <InfoText>Dans ce challenge, les participants peuvent tous gagner des points, dans la limite du maximum défini.</InfoText> }
                                        { challenge.awardCode == 'R' && <InfoText>Dans ce challenge, les points réellement gagnés en fin de challenge sont les gains définis ci-après.</InfoText> }
                                    </DefaultText>
                                </Grid>
                                <Grid item xs={12}>
                                    <DefaultTitle>
                                      {Resources.CHALLENGE_CONDITION_DESCRIPTION_LABEL}
                                    </DefaultTitle>
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

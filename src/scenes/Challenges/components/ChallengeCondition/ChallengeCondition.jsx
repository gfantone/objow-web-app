import React from 'react'
import {Grid, Tooltip} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight, faBalanceScale, faCalendarAlt, faEquals, faInfoCircle, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import {AccentTag, AccentText, AnimationController, BlueTag, BlueText, Card, DefaultText, DefaultTitle, InfoText, Table, TableBody, TableCell, TableChip, TableRow} from '../../../../components'
import '../../../../helpers/StringHelper'

const ChallengeCondition = ({ challenge, goals, ...props }) => {
    const start = challenge.start.toDate2().toLocaleDateString();
    const end = challenge.end.toDate2().toLocaleDateString();
    const typeIcon = challenge.typeCode == 'CT' ? faUsers : faUser;
    const participantName = challenge.typeCode == 'CT' ? 'équipe' : 'joueur';

    const renderMaximumAward = () => {
        const award = challenge.awards[0];

        return (
            <Grid container spacing={1}>
                <Grid item>
                    <TableChip label={'>'} />
                </Grid>
                <Grid item>
                    <DefaultText>Maximum / {participantName}</DefaultText>
                </Grid>
                <Grid item>
                    <AccentTag>{award.points} PTS</AccentTag>
                </Grid>
            </Grid>
        )
    };

    const renderRankingAwards = () => {
        return (
            <Grid container spacing={1}>
                { challenge.awards.map(award => {
                    return (
                        <Grid item xs={12}>
                            <div>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <TableChip label={'>'} />
                                    </Grid>
                                    <Grid item>
                                        <DefaultText>{participantName} #{award.rank}</DefaultText>
                                    </Grid>
                                    <Grid item>
                                        <AccentTag>{award.points} PTS</AccentTag>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    )
                }) }
            </Grid>
        )
    };

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12}>
                        <DefaultTitle>Conditions</DefaultTitle>
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
                                                                                                <Tooltip title={'L’objectif fixé ici peut être atteint plusieurs fois. Chaque fois que celui-ci est atteint il rapporte le nombre de points associés'} placement={'right'}>
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
                                                                                            <BlueTag>{goal.targetPoints} PTS</BlueTag>
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
                                                                                            <AccentTag>{goal.points} PTS</AccentTag>
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
                        <DefaultTitle>Description</DefaultTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <DefaultTitle>{challenge.name}</DefaultTitle>
                                </Grid>
                                <Grid item xs={12}>
                                    <DefaultText>
                                        <FontAwesomeIcon icon={faCalendarAlt} /> Du {start} au {end}
                                    </DefaultText>
                                </Grid>
                                <Grid item xs={12}>
                                    <DefaultText>
                                        <FontAwesomeIcon icon={typeIcon} /> {challenge.typeName}
                                    </DefaultText>
                                </Grid>
                                <Grid item xs={12}>
                                    <DefaultText>
                                        <FontAwesomeIcon icon={faStar} /> Type : {challenge.awardName}
                                        { challenge.awardCode == 'M' && <InfoText>Dans ce challenge, les participants peuvent tous gagner des points, dans la limite du maximum défini.</InfoText> }
                                        { challenge.awardCode == 'R' && <InfoText>Dans ce challenge, les points réellement gagnés en fin de challenge sont les gains définis ci-après.</InfoText> }
                                    </DefaultText>
                                </Grid>
                                <Grid item xs={12}>
                                    <DefaultText>
                                        Description
                                        <InfoText>
                                            {challenge.description.split("\n").map((i, key) => {
                                                return <div key={key}>{i}</div>;
                                            })}
                                        </InfoText>
                                    </DefaultText>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} container spacing={1}>
                    <Grid item xs={12}>
                        <DefaultTitle>Gains en fin de challenge</DefaultTitle>
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
};

export default ChallengeCondition

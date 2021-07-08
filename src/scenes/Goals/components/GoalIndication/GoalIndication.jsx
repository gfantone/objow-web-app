import React from 'react'
import {connect} from 'react-redux'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight, faBalanceScale, faCalendarAlt, faFolderOpen, faInfoCircle} from '@fortawesome/free-solid-svg-icons'
import { AdviceList, LiveStatus, ReadonlyAdviceList } from './components'
import {AnimationController, BlueText, Card, DefaultText, DefaultTitle, InfoText, Linkify, Table, TableBody, TableCell, TableChip, TableRow, Tooltip, RichText} from '../../../../components'
import * as Resources from '../../../../Resources'
import {getDifferenceWithToday} from '../../../../helpers/DateHelper'

const GoalIndication = ({ goal, type, ...props }) => {
    const {account} = props.accountDetail;
    const difference = getDifferenceWithToday(goal.end);
    const canEdit = (account.role.code == 'M' && account.team.id == goal.teamId || account.role.code == 'A') && difference <= 0;
    const hasLevels = goal.levels && goal.levels.length > 0
    return (
        <div>
            <Grid container spacing={2}>
                { hasLevels && <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>{Resources.GOAL_INDICATION_LEVEL_AREA}</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <Card marginDisabled>
                                <Grid container justify='space-between'>
                                    <Grid item>
                                        <Table backgroundDisabled>
                                            <TableBody>
                                                { goal.levels.map((level, index) => {
                                                    return (
                                                        <TableRow key={level.id}>
                                                            <TableCell>
                                                                <TableChip label={index+1} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <DefaultText noWrap>{Resources.GOAL_INDICATION_LEVEL_PROGRESSION_TEXT.format(Math.round(level.percentage*100))}</DefaultText>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FontAwesomeIcon icon={faAngleRight} />
                                                            </TableCell>
                                                            <TableCell align='right'>
                                                                <DefaultText noWrap>{Resources.GOAL_INDICATION_LEVEL_POINTS_TEXT.format(level.points)}</DefaultText>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }) }
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                    <Grid item>
                                        <AnimationController />
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>}
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>{Resources.GOAL_INDICATION_DESCRIPTION_AREA}</DefaultTitle>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <Grid container spacing={2}>
                                    <Grid item zeroMinWidth>
                                        <DefaultText noWrap>
                                            <FontAwesomeIcon icon={faFolderOpen} /> {goal.definition.category.name}
                                        </DefaultText>
                                    </Grid>
                                    <Grid item xs>
                                        <DefaultText align='right'>
                                            <FontAwesomeIcon icon={faBalanceScale} /> {goal.definition.kpi.unit.symbol ? Resources.GOAL_INDICATION_UNIT_WITH_SYMBOL_TEXT.format(goal.definition.kpi.unit.name, goal.definition.kpi.unit.symbol) : Resources.GOAL_INDICATION_UNIT_WITHOUT_SYMBOL_TEXT.format(goal.definition.kpi.unit.name)}
                                        </DefaultText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DefaultText>
                                            <FontAwesomeIcon icon={faCalendarAlt} /> {Resources.GOAL_INDICATION_PERIOD_TEXT.format(goal.start.toDate2().toLocaleDateString(), goal.end.toDate2().toLocaleDateString())}
                                        </DefaultText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1} alignItems='center'>
                                            <Grid item>
                                                <LiveStatus live={goal.definition.live} />
                                            </Grid>
                                            <Grid item>
                                                <DefaultText>
                                                    {Resources.GOAL_INDICATION_LIVE_LABEL}&nbsp;
                                                    <Tooltip title={Resources.GOAL_INDICATION_LIVE_INFO} placement={'right'}>
                                                        <BlueText style={{ width: 'fit-content' }} component={'span'}>
                                                            <FontAwesomeIcon icon={faInfoCircle} />
                                                        </BlueText>
                                                    </Tooltip>
                                                </DefaultText>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Linkify>
                                              <RichText initial={JSON.parse(goal.definition.indication)} readOnly={ true } onChange={() => {}} />
                                        </Linkify>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    {!canEdit && <ReadonlyAdviceList advices={goal.advices}/>}
                    {canEdit && <AdviceList advices={goal.advices} goal={goal} type={type} />}
                </Grid>
            </Grid>
        </div>
    )
};

const mapStateToProps = ({accountDetail}) => ({
    accountDetail
});

export default connect(mapStateToProps)(GoalIndication)

import React from 'react'
import {connect} from 'react-redux'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleRight, faBalanceScale, faCalendarAlt, faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import { AdviceList, ReadonlyAdviceList } from './components'
import { AnimationController, Card, DefaultText, DefaultTitle, InfoText, Table, TableBody, TableCell, TableChip, TableRow } from '../../../../components'
import {getDifferenceWithToday} from '../../../../helpers/DateHelper'

const GoalIndication = ({ goal, type, ...props }) => {
    const {account} = props.accountDetail;
    const difference = getDifferenceWithToday(goal.end);
    const canEdit = (account.role.code == 'M' && goal.type == 'C' || account.role.code == 'A') && difference <= 0;

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>Paliers</DefaultTitle>
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
                                                                <DefaultText noWrap>{Math.round(level.percentage*100)} %</DefaultText>
                                                            </TableCell>
                                                            <TableCell>
                                                                <FontAwesomeIcon icon={faAngleRight} />
                                                            </TableCell>
                                                            <TableCell align='right'>
                                                                <DefaultText noWrap>{level.points} PTS</DefaultText>
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
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <DefaultTitle>Description</DefaultTitle>
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
                                            <FontAwesomeIcon icon={faBalanceScale} /> Unité : {goal.definition.kpi.unit.name} {goal.definition.kpi.unit.symbol ? `(${goal.definition.kpi.unit.symbol})` : null}
                                        </DefaultText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DefaultText>
                                            <FontAwesomeIcon icon={faCalendarAlt} /> Du {goal.start.toDate2().toLocaleDateString()} au {goal.end.toDate2().toLocaleDateString()}
                                        </DefaultText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <InfoText>
                                            {goal.definition.indication.split("\n").map((i, key) => {
                                                return <div key={key}>{i}</div>;
                                            })}
                                        </InfoText>
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

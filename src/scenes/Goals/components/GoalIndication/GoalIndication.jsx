import React from 'react'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faBalanceScale, faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { AnimationController, Card, DefaultText, DefaultTitle, InfoText, Table, TableBody, TableCell, TableChip, TableRow } from '../../../../components'

const GoalIndication = ({ goal, ...props }) => {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DefaultTitle>Paliers</DefaultTitle>
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
                <Grid item xs={12}>
                    <DefaultTitle>Description</DefaultTitle>
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
                                    <FontAwesomeIcon icon={faBalanceScale} /> Du {goal.start.toDate2().toLocaleDateString()} au {goal.end.toDate2().toLocaleDateString()}
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
        </div>
    )
}

export default GoalIndication

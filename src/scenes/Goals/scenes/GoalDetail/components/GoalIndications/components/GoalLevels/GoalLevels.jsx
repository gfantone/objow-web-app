import React from 'react'
import {Grid, Table} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {AnimationController, Card, DefaultTitle, TableBody} from '../../../../../../../../components'
import {GoalLevel} from './components'

const styles = {
    title: {
        marginBottom: 8
    }
}

const GoalLevels = (props) => {
    const {classes, levels} = props

    return (
        <div>
            <DefaultTitle className={classes.title}>Paliers</DefaultTitle>
            <Card marginDisabled={false}>
                <Grid container>
                    <Grid item>
                        <Table>
                            <TableBody>
                                {levels.map((level, index) => {
                                    return <GoalLevel key={index} number={index+1} level={level} />
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item>
                        <AnimationController />
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default withStyles(styles)(GoalLevels)

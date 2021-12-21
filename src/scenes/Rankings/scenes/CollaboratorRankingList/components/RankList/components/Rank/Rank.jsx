import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FixedTableCell, FlexibleTableCell, TableCell, TableRow, RankEvolution } from '../../../../../../../../components'

const styles = {
    root: {
        cursor: 'pointer'
    }
}

const Rank = ({ image, name, rank, onClick, ...props }) => {
    const { classes } = props
    return (
        <TableRow onClick={onClick} className={classes.root}>
            <FixedTableCell align='center'>
                { image }
            </FixedTableCell>
            <FlexibleTableCell>
                { name }
            </FlexibleTableCell>
            <TableCell align='right'>
                { rank.rank ? rank.rank : '-' }
            </TableCell>
            <TableCell align='right'>
                { rank.victories }
            </TableCell>
            <TableCell align='right'>
                { rank.points }
            </TableCell>
            <TableCell align='right'>
                <RankEvolution evolution={rank.evolution} />
            </TableCell>
        </TableRow>
    )
}

export default withStyles(styles)(Rank)

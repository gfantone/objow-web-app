import React from 'react'
import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FixedTableCell, FlexibleTableCell, RankEvolution, TableCell, TableChip, TableRow } from '../../../../../../components'

const styles = {
    photo: {
        height: 34,
        width: 34
    }
};

const PlayerRank = ({ rank, ...props }) => {
    const { classes } = props;
    const photo = rank.photo ? rank.photo : '/assets/img/user/avatar.svg';

    return (
        <TableRow>
            <TableCell>
                <TableChip size='small' label={rank.rank ? rank.rank : '-'} />
            </TableCell>
            <FixedTableCell>
                <Avatar src={photo} className={classes.photo} />
            </FixedTableCell>
            <FlexibleTableCell>
                { rank.firstName } { rank.lastName }
            </FlexibleTableCell>
            <TableCell align='right'>
                { rank.level }
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
};

export default withStyles(styles)(PlayerRank)
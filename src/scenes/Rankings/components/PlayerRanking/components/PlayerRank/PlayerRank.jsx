import React from 'react'
import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import {FixedTableCell, FlexibleTableCell, FullTableCell, RankEvolution, TableCell, TableChip, TableRow} from '../../../../../../components'

const styles = {
    photo: {
        height: 34,
        width: 34
    }
};

const PlayerRank = ({rank, selected, ...props}) => {
    const { classes } = props;
    const photo = rank.photo ? rank.photo : '/assets/img/user/avatar.svg';
    const color = !selected ? 'default' : 'primary'
    const teamColor = rank.color ? rank.color : '#fff'

    return (
        <TableRow>
            {rank.color && <FullTableCell style={{backgroundColor: teamColor, width: 4}} />}
            <TableCell>
                <TableChip size='small' color={color} label={rank.rank ? rank.rank : '-'} />
            </TableCell>
            <FixedTableCell>
                <Avatar src={photo} className={classes.photo} />
            </FixedTableCell>
            <FlexibleTableCell color={color}>
                { rank.firstName } { rank.lastName }
            </FlexibleTableCell>
            <TableCell align='right' color={color}>
                { rank.level }
            </TableCell>
            <TableCell align='right' color={color}>
                { rank.victories }
            </TableCell>
            <TableCell align='right' color={color}>
                { rank.points }
            </TableCell>
            <TableCell align='right'>
                <RankEvolution evolution={rank.evolution} />
            </TableCell>
        </TableRow>
    )
};

export default withStyles(styles)(PlayerRank)

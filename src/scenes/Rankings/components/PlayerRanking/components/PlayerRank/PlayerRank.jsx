import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {FixedTableCell, FlexibleTableCell, FullTableCell, RankEvolution, TableCell, TableChip, TableRow, TableRowHighlight, Avatar} from '../../../../../../components'
import _ from 'lodash'

const styles = {
    photo: {
        height: 34,
        width: 34
    }
};

const PlayerRank = ({rank, selected, raceFinisher, ...props}) => {
    const { classes } = props;
    const photo = rank.photo ? rank.photo : '/assets/img/user/avatar.svg';
    const color = !selected ? 'default' : 'primary'
    const TableRowComponent = raceFinisher ? TableRowHighlight : TableRow
    const teamColor = rank.color ? rank.color : '#fff'
    return (
        <TableRowComponent>
            {<FullTableCell style={{backgroundColor: teamColor || 'white', width: 4}} />}
            <TableCell>
                <TableChip size='small' color={color} label={rank.rank ? rank.rank : '-'} />
            </TableCell>
            <FixedTableCell>
                <Avatar src={photo} className={classes.photo} entityId={ _.get(rank, 'collaboratorId') }  fallbackName={ `${ _.get(rank, 'firstName') } ${ _.get(rank, 'lastName') }` }/>
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
        </TableRowComponent>
    )
};

export default withStyles(styles)(PlayerRank)

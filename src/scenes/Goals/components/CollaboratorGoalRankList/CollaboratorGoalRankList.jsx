import React from 'react'
import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye, faSortAmountDown, faRandom } from '@fortawesome/free-solid-svg-icons'
import { FixedTableCell, FlexibleTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow } from '../../../../components'
import '../../../../helpers/NumberHelper'

const styles = {
    photo: {
        height: 34,
        width: 34
    }
}

const CollaboratorGoalRankList = ({ ranks, ...props }) => {
    const { classes } = props

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell colSpan={2}>Joueurs</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faBullseye} />
                        </TableHeadCell>
                        <TableHeadCell>PTS</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranks.map(rank => {
                        const photo = rank.collaborator.photo ? rank.collaborator.photo : '/assets/img/user/avatar.svg'

                        return (
                            <TableRow key={rank.id}>
                                <TableCell>
                                    <TableChip label={rank.rank ? rank.rank : '-'} />
                                </TableCell>
                                <FixedTableCell>
                                    <Avatar src={photo} className={classes.photo} />
                                </FixedTableCell>
                                <FlexibleTableCell>{rank.collaborator.firstname} {rank.collaborator.lastname}</FlexibleTableCell>
                                <TableCell>{rank.progression.toPercentage()}</TableCell>
                                <TableCell>{rank.points}</TableCell>
                                <TableCell>
                                    <RankEvolution evolution={rank.evolution} />
                                </TableCell>
                            </TableRow>
                        )
                    }) }
                </TableBody>
            </Table>
        </div>
    )
}

export default withStyles(styles)(CollaboratorGoalRankList)
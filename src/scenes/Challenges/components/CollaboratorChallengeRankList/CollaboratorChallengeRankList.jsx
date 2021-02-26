import React from 'react'
import { Avatar } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDown, faRandom } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { FixedTableCell, FlexibleTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow, FullTableCell } from '../../../../components'
import * as Resources from '../../../../Resources'

const styles = {
    photo: {
        height: 34,
        width: 34
    }
}

const CollaboratorChallengeRankList = ({ranks, collaboratorId, ...props}) => {
    const { classes } = props
    const colspan = _.get(ranks, '[0].collaborator.team.color.hex') ? 2 : 1

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell colspan={ colspan }>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        <TableHeadCell colSpan={2}>{Resources.COLLABORATOR_CHALLENGE_RANKING_COLLABORATOR_COLUMN}</TableHeadCell>
                        <TableHeadCell>{Resources.COLLABORATOR_CHALLENGE_RANKING_POINTS_COLUMN}</TableHeadCell>
                        <TableHeadCell>
                            <FontAwesomeIcon icon={faRandom} />
                        </TableHeadCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { ranks.map(rank => {
                        const photo = rank.collaborator.photo ? rank.collaborator.photo : '/assets/img/user/avatar.svg'
                        const selected = rank.collaborator ? rank.collaborator.id == collaboratorId : false
                        const color = !selected ? 'default' : 'primary'
                        const teamColor = _.get(rank, 'collaborator.team.color.hex')
                        return (
                            <TableRow key={rank.id}>
                                <FullTableCell style={{backgroundColor: teamColor, width: 4}} />
                                <TableCell>
                                    <TableChip color={color} label={rank.rank ? rank.rank : '-'} />
                                </TableCell>
                                <FixedTableCell>
                                    <Avatar src={photo} className={classes.photo} />
                                </FixedTableCell>
                                <FlexibleTableCell color={color}>{rank.collaborator.firstname} {rank.collaborator.lastname}</FlexibleTableCell>
                                <TableCell color={color}>{rank.points}</TableCell>
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

export default withStyles(styles)(CollaboratorChallengeRankList)

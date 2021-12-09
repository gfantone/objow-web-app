import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDown, faRandom, faCheck, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { FixedTableCell, FlexibleTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow, TableRowDisabled, FullTableCell, Avatar } from '../../../../components'
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
    const hasRacePositions = ranks.reduce((acc, rank) => rank.race_position || acc  ,false)
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeadCell colspan={ colspan }>
                            <FontAwesomeIcon icon={faSortAmountDown} />
                        </TableHeadCell>
                        { hasRacePositions && (
                          <TableHeadCell>
                            <FontAwesomeIcon icon={faFlagCheckered} />
                          </TableHeadCell>
                        ) }
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
                        const TableRowComponent = rank.race_position ? TableRowDisabled : TableRow
                        return (
                            <TableRowComponent key={rank.id}>
                                <FullTableCell style={{backgroundColor: teamColor, width: 4}} />
                                <TableCell>
                                    <TableChip color={color} label={rank.rank ? rank.rank : '-'} />
                                </TableCell>
                                { hasRacePositions && rank.race_position && (
                                  <TableCell>
                                    <FontAwesomeIcon icon={faCheck} />
                                  </TableCell>
                                ) }
                                { hasRacePositions && !rank.race_position && (
                                  <TableCell />
                                )}
                                <FixedTableCell>
                                    <Avatar src={photo} className={classes.photo} entityId={rank.collaborator.id} fallbackName={rank.collaborator.fullname}/>
                                </FixedTableCell>
                                <FlexibleTableCell color={color}>{rank.collaborator.firstname} {rank.collaborator.lastname}</FlexibleTableCell>
                                <TableCell color={color}>{rank.points}</TableCell>
                                <TableCell>
                                    <RankEvolution evolution={rank.evolution} />
                                </TableCell>
                            </TableRowComponent>
                        )
                    }) }
                </TableBody>
            </Table>
        </div>
    )
}

export default withStyles(styles)(CollaboratorChallengeRankList)

import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortAmountDown, faRandom, faCheck, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { FixedTableCell, FlexibleTableCell, RankEvolution, Table, TableBody, TableCell, TableChip, TableHead, TableHeadCell, TableRow, TableRowHighlight, FullTableCell, Avatar } from '../../../../components'
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
    const hasRanking = ranks.reduce((acc, rank) => rank.rank || acc  ,false)
    const hasAwards = ranks.reduce((acc, rank) => rank.awards.length > 0 || acc  ,false)

    let borderTop = false
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
                    { ranks.map((rank, index) => {
                        const photo = rank.collaborator.photo ? rank.collaborator.photo : '/assets/img/user/avatar.svg'
                        const selected = rank.collaborator ? rank.collaborator.id == collaboratorId : false
                        const color = !selected ? 'default' : 'primary'
                        const teamColor = _.get(rank, 'collaborator.team.color.hex')
                        const hasAward = rank.awards.length > 0 && (
                          (rank.award_type_code === 'C' && rank.race_position) ||
                          rank.award_type_code === 'R'
                        )
                        const isRaceMode = rank.award_type_code === 'C'

                        if(hasAwards && !hasAward && hasRanking  && index > 0 && borderTop === false) {
                          borderTop = index
                        }

                        const TableRowComponent = hasAward ? TableRowHighlight : TableRow
                        return (
                            <TableRowComponent key={rank.id} style={{borderTop: borderTop === index ? '2px solid #333' : ''}}>
                                <FullTableCell style={{backgroundColor: teamColor, width: 4}} />
                                <TableCell>
                                    <TableChip color={color} label={rank.rank ? rank.rank : '-'} />
                                </TableCell>

                                <FixedTableCell>
                                    <Avatar src={photo} className={classes.photo} entityId={rank.collaborator.id} fallbackName={rank.collaborator.fullname}/>
                                </FixedTableCell>
                                <FlexibleTableCell style={{fontWeight: hasAward ? 'bold' : ''}} color={color}>{rank.collaborator.firstname} {rank.collaborator.lastname}</FlexibleTableCell>
                                <TableCell color={color} style={{fontWeight: hasAward ? 'bold' : ''}}>{rank.points}{ isRaceMode ? `/${rank.goals_count}` : '' }</TableCell>
                                <TableCell style={{fontWeight: hasAward ? 'bold' : ''}}>
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

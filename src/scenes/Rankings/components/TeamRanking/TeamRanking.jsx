import React from 'react';
import { TableBody } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faRandom, faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { TeamRank } from './components';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';

const TeamRanking = ({ ranking, teamId }) => {
  const intl = useIntl();
  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell align="left" colSpan={2}>
              <FontAwesomeIcon icon={faSortAmountDown} />
            </TableHeadCell>
            <TableHeadCell>
              {intl.formatMessage({ id: 'ranking.columns.team' })}
            </TableHeadCell>

            <TableHeadCell align="center">
              {Resources.TEAM_RANKING_POINTS_COLUMN}
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ranking.map((rank) => {
            const selected = rank.teamId == teamId;
            return <TeamRank key={rank.id} rank={rank} selected={selected} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamRanking;

import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullseye,
  faSortAmountDown,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import {
  FlexibleTableCell,
  RankEvolution,
  Table,
  TableBody,
  TableCell,
  FullTableCell,
  TableChip,
  TableHead,
  TableHeadCell,
  TableRow,
  Avatar,
  TableRowHighlight,
  ThemeWrapper,
} from '../../../../components';
import * as Resources from '../../../../Resources';
import { useIntl } from 'react-intl';
import '../../../../helpers/NumberHelper';
import _ from 'lodash';

const styles = {
  photo: {
    height: 34,
    width: 34,
  },
  tableWrapper: {
    boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
    overflowX: 'auto',
  },
  positionCell: {
    paddingLeft: 5,
    paddingRight: 5,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
};

const CollaboratorGoalRankList = ({
  ranks,
  collaboratorId,
  account,
  goal,
  ...props
}) => {
  const intl = useIntl();
  const { classes } = props;
  const mobileScreen = isWidthDown('xs', props.width);

  const hasPoints = _.get(goal, 'levels.length', 0) > 0;
  const cellWidth = mobileScreen ? 90 : 'auto';

  const { successColor, errorColor } = useContext(ThemeWrapper.Context);
  return (
    <div className={classes.tableWrapper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell colSpan={2}>
              <FontAwesomeIcon icon={faSortAmountDown} />
            </TableHeadCell>
            <TableHeadCell colSpan={2}>
              {intl.formatMessage({ id: 'admin.goal.rank_list.player_column' })}
            </TableHeadCell>
            <TableHeadCell style={{ textAlign: 'center' }}>
              <FontAwesomeIcon icon={faBullseye} />
            </TableHeadCell>
            {hasPoints && goal.allow_ranking_points && (
              <TableHeadCell style={{ textAlign: 'center' }}>
                {Resources.COLLABORATOR_GOAL_RANK_LIST_POINTS_COLUMN}
              </TableHeadCell>
            )}
            {goal.allow_ranking_latest_value && (
              <TableHeadCell style={{ textAlign: 'center' }}>
                <FontAwesomeIcon icon={faChartLine} />
              </TableHeadCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {ranks.map((rank) => {
            const photo = rank.collaborator.photo
              ? rank.collaborator.photo
              : '/assets/img/user/avatar.svg';
            const selected = rank.collaborator
              ? rank.collaborator.id == collaboratorId
              : false;
            const color = !selected ? 'default' : 'primary';
            const TableRowComponent = selected ? TableRowHighlight : TableRow;
            const teamColor = _.get(rank, 'collaborator.team.color.hex');
            return (
              <TableRowComponent
                key={rank.id}
                style={{ background: selected ? '#E4F6E0' : 'auto' }}
              >
                <FullTableCell
                  style={{ backgroundColor: teamColor, width: 4, minWidth: 4 }}
                />
                <FullTableCell>
                  <div
                    className={classes.positionCell}
                    style={{ width: mobileScreen ? 60 : 90 }}
                  >
                    <span>
                      <TableChip
                        color='default'
                        label={rank.rank ? rank.rank : '-'}
                      />
                    </span>
                    {rank.evolution !== 0 && (
                      <React.Fragment>
                        <span style={{ marginLeft: 8 }}>
                          <RankEvolution evolution={rank.evolution} />
                        </span>
                        <span
                          style={{
                            marginLeft: 3,
                            color:
                              rank.evolution > 0
                                ? successColor
                                : rank.evolution < 0
                                ? errorColor
                                : 'auto',
                          }}
                        >
                          {Math.abs(rank.evolution)}
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                </FullTableCell>
                <TableCell style={{ width: 50 }}>
                  <Avatar
                    src={photo}
                    className={classes.photo}
                    entityId={_.get(rank, 'collaborator.id')}
                    fallbackName={_.get(rank, 'collaborator.fullname')}
                  />
                </TableCell>
                <FlexibleTableCell
                  color={color}
                  style={{ minWidth: cellWidth, maxWidth: cellWidth }}
                >
                  {mobileScreen ? (
                    <React.Fragment>
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {rank.collaborator.firstname}
                      </div>
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {rank.collaborator.lastname}
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <div
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {rank.collaborator.firstname}{' '}
                        {rank.collaborator.lastname}
                      </div>
                    </React.Fragment>
                  )}
                </FlexibleTableCell>
                <TableCell
                  color={color}
                  style={{ textAlign: 'center', verticalAlign: 'middle' }}
                >
                  <div>
                    {parseFloat(
                      ((rank.counter / rank.target) * 100).toFixed(2)
                    )}
                    %
                  </div>
                  {(_.get(account, 'role.code') === 'A' ||
                    _.get(account, 'role.code') === 'M' ||
                    _.get(account, 'role.code') === 'S') && (
                    <div style={{ fontSize: 10, opacity: 0.6 }}>
                      {rank.counter.toLocaleString()}&nbsp;/&nbsp;
                      {rank.target.toLocaleString()}
                    </div>
                  )}
                </TableCell>
                {hasPoints && goal.allow_ranking_points && (
                  <TableCell color={color} style={{ textAlign: 'center' }}>
                    {rank.points}
                  </TableCell>
                )}
                {goal.allow_ranking_latest_value && (
                  <TableCell
                    color={color}
                    style={{
                      textAlign: 'center',
                      color: rank.latest_result ? successColor : 'auto',
                    }}
                  >
                    {rank.latest_result ? `+${rank.latest_result}` : 0}
                  </TableCell>
                )}
              </TableRowComponent>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(withWidth()(CollaboratorGoalRankList));

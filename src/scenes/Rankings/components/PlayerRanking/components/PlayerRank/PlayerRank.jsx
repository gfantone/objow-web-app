import React from 'react';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import {
  FixedTableCell,
  FlexibleTableCell,
  FullTableCell,
  RankEvolution,
  TableCell,
  TableChip,
  TableRow,
  TableRowHighlight,
  Avatar,
} from '../../../../../../components';
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

const PlayerRank = ({ rank, selected, raceFinisher, ...props }) => {
  const { classes } = props;
  const photo = rank.photo ? rank.photo : '/assets/img/user/avatar.svg';
  const color = !selected ? 'default' : 'primary';
  const TableRowComponent = raceFinisher ? TableRowHighlight : TableRow;
  const teamColor = rank.color ? rank.color : '#fff';
  const mobileScreen = isWidthDown('xs', props.width);
  const cellWidth = mobileScreen ? 120 : 'auto';
  return (
    <TableRowComponent style={{ background: selected ? '#E4F6E0' : 'auto' }}>
      <FullTableCell
        style={{ backgroundColor: teamColor || 'white', width: 4 }}
      />
      <FullTableCell style={{ whiteSpace: 'nowrap' }}>
        <div
          className={classes.positionCell}
          style={{ width: mobileScreen ? 76 : 90 }}
        >
          <span>
            <TableChip color="default" label={rank.rank ? rank.rank : '-'} />
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
                      ? '#00E58D'
                      : rank.evolution < 0
                      ? '#E50000'
                      : 'auto',
                }}
              >
                {Math.abs(rank.evolution)}
              </span>
            </React.Fragment>
          )}
        </div>
      </FullTableCell>
      <FullTableCell style={{ verticalAlign: 'middle' }} color={color}>
        <div style={{ paddingLeft: 10, paddingRight: 10 }}>{rank.level}</div>
      </FullTableCell>
      <FixedTableCell
        style={{ paddingRight: 0, verticalAlign: 'middle', width: 50 }}
      >
        <Avatar
          src={photo}
          className={classes.photo}
          entityId={_.get(rank, 'collaboratorId')}
          fallbackName={`${_.get(rank, 'firstName')} ${_.get(
            rank,
            'lastName',
          )}`}
        />
      </FixedTableCell>
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
              {rank.firstName}
            </div>
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {rank.lastName}
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
              {rank.firstName} {rank.lastName}
            </div>
          </React.Fragment>
        )}
      </FlexibleTableCell>

      <TableCell align="center" color={color}>
        {rank.points}
      </TableCell>
    </TableRowComponent>
  );
};

export default withStyles(styles)(withWidth()(PlayerRank));

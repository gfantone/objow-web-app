import React, { useContext } from 'react';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';
import {
  FlexibleTableCell,
  FullTableCell,
  RankEvolution,
  TableCell,
  TableChip,
  TableRow,
  FixedTableCell,
  ThemeWrapper,
} from '../../../../../../components';

const styles = {
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

const TeamRank = ({ rank, selected, classes, ...props }) => {
  const color = !selected ? 'default' : 'primary';
  const mobileScreen = isWidthDown('xs', props.width);
  const cellWidth = mobileScreen ? 120 : 'auto';

  const { successColor, errorColor } = useContext(ThemeWrapper.Context);
  return (
    <TableRow style={{ background: selected ? '#E4F6E0' : 'auto' }}>
      <FullTableCell
        style={{ backgroundColor: rank.team.color.hex, width: 4, maxWidth: 4 }}
      />
      <FullTableCell style={{ whiteSpace: 'nowrap' }}>
        <div
          className={classes.positionCell}
          style={{ width: mobileScreen ? 76 : 90 }}
        >
          <span>
            <TableChip color='default' label={rank.rank ? rank.rank : '-'} />
          </span>
          {!!(rank.evolution && parseInt(rank.evolution) !== 0) && (
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
      <FlexibleTableCell
        color={color}
        style={{
          minWidth: cellWidth,
          maxWidth: cellWidth,
          whiteSpace: 'normal',
        }}
      >
        {rank.team.name}
      </FlexibleTableCell>

      <TableCell align='center' color={color}>
        {rank.points}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(withWidth()(TeamRank));

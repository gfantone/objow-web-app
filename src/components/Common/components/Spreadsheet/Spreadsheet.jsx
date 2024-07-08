import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from 'formsy-react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ReactDataSheet from 'react-datasheet';
import _ from 'lodash';
import { toast } from 'react-toastify';

const styles = {
  root: {
    padding: 16,
  },
  mainWrapper: {
    marginTop: 50,
  },
  defaultSpreadsheet: {
    paddingLeft: '250px',
  },
  spreadsheet: {
    width: 'calc(100%)',
    position: 'relative',
    '& .data-grid-container .data-grid': {
      overflowX: 'auto',
      display: 'block',
      width: 'calc(100%)',
      whiteSpace: 'nowrap',
      '&::-webkit-scrollbar-track': {
        background: '#ddd',
        borderRadius: 8,
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: 8,
        border: '2px solid #ddd',
        background: '#888',
      },
      '&::-webkit-scrollbar': {
        '-webkit-appearance': 'none',
        '&:horizontal': {
          height: 11,
        },
      },
    },
    '& .data-grid-container .data-grid .cell > input': {
      width: '100%',
      height: '100%',
    },
    '& .data-grid-container .data-grid .cell.read-only': {
      color: '#555555',
      background: 'white',
      '&.empty': {
        background: 'rgb(251, 238, 237)',
        border: 'none',
        '&.selected': {
          borderTop: '1px double rgb(33, 133, 208)',
          borderRight: '1px double rgb(33, 133, 208)',
          borderLeft: '1px double rgb(33, 133, 208)',
          borderBottom: '1px double rgb(33, 133, 208)',
        },
      },
    },
    '& .data-grid-container .data-grid .cell .value-viewer': {
      height: '100%',
      display: 'inline',
    },

    '& .data-grid-container .data-grid .cell.read-only.firstCell': {
      textAlign: 'left',
    },
    '& .cell.baseCell.firstCell': {
      paddingLeft: 5,
      position: 'absolute',
      lineHeight: 2,
      // marginTop: '-1px',
      width: '250px',
      height: 31,
      zIndex: 30,
      left: 0,
      fontWeight: 'bold',
      borderTop: 0,
      borderBottom: 0,
      fontSize: 14,

      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderRight: '1px double rgb(33, 133, 208)',
        borderLeft: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
        zIndex: 40,
      },
    },

    '& .data-grid-container .data-grid .cell.noBorder': {
      border: '1px double #ADD8E6',
      padding: '4px 8px',
      textAlign: 'left',
      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderRight: '1px double rgb(33, 133, 208)',
        borderLeft: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
      },
    },

    // First cell of first line
    '& tr:first-of-type .cell.baseCell.firstCell': {
      borderTop: '1px solid #ddd',
      marginTop: '-1px',
      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderRight: '1px double rgb(33, 133, 208)',
        borderLeft: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
      },
    },
    // First cell of last line
    '& tr:last-of-type .cell.baseCell.firstCell': {
      borderBottom: '1px solid #ddd',
      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderRight: '1px double rgb(33, 133, 208)',
        borderLeft: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
      },
    },
    '&  .data-grid-container .data-grid .cell.baseCell.firstLine': {
      '&.read-only': {
        color: '#333',
        textTransform: 'capitalize',
        fontWeight: 'bold',
      },
    },
    '&  .data-grid-container .data-grid .cell.baseCell.headerCell': {
      background: '#0F3D5C',
      color: 'white',
      fontWeight: 'bold',
    },
    // '& .cell.bottomSeparator': {
    //   borderBottom: '1px solid #333'
    // },
    '& .cell.baseCell': {
      lineHeight: 2,
      height: 30,
      zIndex: 10,
    },
    '& .data-grid-container .data-grid .cell.dataCell': {
      '&.read-only': {
        textAlign: 'right',
        color: '#ddd',
      },
      '&.period-W': {
        minWidth: 110,
      },
      '&.period-M': {
        minWidth: 150,
      },
      '&.period-Q': {
        minWidth: 300,
      },
      '&.period-S': {
        minWidth: 300,
      },
      '&.period-Y': {
        minWidth: 300,
      },
      '&.highlighted': {
        border: '1px double #ADD8E6',
      },
    },

    '& .data-grid-container .data-grid .cell.collaboratorCell': {
      borderRight: '1px double #ADD8E6',
      '&.read-only': {
        // color: 'white',
        color: '#333',
        background: '#ADD8E6',
      },
      '&.whiteCell': {
        background: 'white',
        border: 'none',
      },
    },
    '&  .data-grid-container .data-grid .cell.read-only.footerCell': {
      fontWeight: 'bold',
      border: 'none',
      color: '#333',
      background: '#ddd',
      textAlign: 'right',
      fontSize: 16,
      lineHeight: 1.7,
      '&.error': {
        color: '#E50000',
      },
      '&.valid': {
        color: '#00E58D',
      },
      '&.firstCell': {
        textAlign: 'left',
      },
      '&.selected': {
        borderTop: '1px double rgb(33, 133, 208)',
        borderRight: '1px double rgb(33, 133, 208)',
        borderLeft: '1px double rgb(33, 133, 208)',
        borderBottom: '1px double rgb(33, 133, 208)',
      },
    },
  },
  error: {
    marginBottom: 16,
  },
};

const Spreadsheet = ({
  grid,
  onCellsChanged,
  ref,
  classes,
  baseClassName,
  ...props
}) => {
  const onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;
  return (
    <div
      className={`${classes.spreadsheet} ${
        baseClassName ? baseClassName : classes.defaultSpreadsheet
      }`}
    >
      <ReactDataSheet
        data={grid}
        ref={ref}
        valueRenderer={(cell) => cell.value}
        onCellsChanged={(changes) => {
          const currentGrid = grid.map((row) => [...row]);
          if (
            changes.filter(
              ({ cell, row, col, value }) => !isNaN(parseFloat(value))
            ).length > 0
          ) {
            changes.forEach(({ cell, row, col, value }) => {
              // Only numeric values are valid and converted to Float
              if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0) {
                currentGrid[row][col] = {
                  ...currentGrid[row][col],
                  value: parseFloat(value.replace(/,/g, '.')),
                };
              }
            });
            if (onCellsChanged) {
              onCellsChanged(changes, currentGrid);
            }
          }
        }}
        onContextMenu={onContextMenu}
        onSelect={({ start, end }) => {
          // this.selectLine({start, end})
          // TODO : update scrollLeft when move selection outside of grid
          // if(this.lastSelected) {
          //
          //   const dataGrid = _.get(ref, 'current.dgDom.children[0]')
          //   let movingCell;
          //   let direction;
          //
          //   if(start.j !== this.lastSelected.start.j) {
          //     movingCell = 'start'
          //     direction = this.lastSelected.start.j < start.j ? 'right' : 'left'
          //   }
          //   if(end.j !== this.lastSelected.end.j) {
          //     movingCell = 'end'
          //     direction = this.lastSelected.end.j < end.j ? 'right' : 'left'
          //   }
          //
          //   // dataGrid.scrollLeft = 150
          // }
          // this.lastSelected = { start, end }
        }}
        cellRenderer={(cellProps) => {
          // console.log('cellProps', cellProps.children);
          return (
            <td {...cellProps} style={cellProps.cell.style}>
              {cellProps.children}
            </td>
          );
        }}
      />
    </div>
  );
};

export default withStyles(styles)(Spreadsheet);

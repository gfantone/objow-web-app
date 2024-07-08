import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { IconButton } from '../../../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { ClassNames } from '@emotion/react';

const styles = {};

// entries is an array of objects with the following structure:
// {
//  title: 'string',
//  icon: '<FontawesomeIcon />',
//  onClick: () => {}
const PostMenu = ({ entries, classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // useEffect(() => {
  //     setOpen(Boolean(anchorEl))
  // }, [anchorEl])

  return (
    <React.Fragment>
      {entries.length > 0 && (
        <React.Fragment>
          <IconButton
            aria-controls="basic-menu"
            aria-haspopup="true"
            size={'small'}
            onClick={(event) => setAnchorEl(open ? null : event.currentTarget)}
          >
            <FontAwesomeIcon icon={faEllipsisH} style={{ color: '#333' }} />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl()}
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            {entries.map((entry, index) => (
              <MenuItem
                onClick={() => {
                  setAnchorEl();
                  entry.onClick();
                }}
              >
                <ListItemIcon
                  style={{ color: '#333', minWidth: 0, marginRight: 10 }}
                >
                  {entry.icon}
                </ListItemIcon>
                <ListItemText>{entry.title}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(PostMenu);

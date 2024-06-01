import React from 'react';
import { withRouter } from 'react-router-dom';
import { ListItemText, Grid } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItem, ListItemIcon } from './components';
import { Badge } from '../../../../../../../Badge';
import configureStore from '../../../../../../../../../../store/configureStore';
import local from '../../../../../../../../../../data/local/local';
import { useClearCache } from 'react-clear-cache';

const DrawerButton = ({
  badgeContent,
  icon,
  onNavigate,
  text,
  src,
  MaterialIcon,
  ...props
}) => {
  const selected =
    src === '/'
      ? src === props.history.location.pathname
      : props.history.location.pathname.startsWith(src);
  const { isLatestVersion, emptyCacheStorage } = useClearCache();

  const handleClick = () => {
    if (src == '/logout') {
      local.removeAccessToken();
      local.removeRefreshToken();
      local.removeStore();
      emptyCacheStorage();
      window.location = '/';
    } else {
      if (onNavigate) onNavigate();
      props.history.push(src);
    }
  };

  return (
    <ListItem button selected={selected} onClick={handleClick}>
      <Badge badgeContent={badgeContent} color='secondary'>
        <ListItemIcon style={{ width: 20 }}>
          {icon && <FontAwesomeIcon icon={icon} />}
          {MaterialIcon && <MaterialIcon style={{ fontSize: 20 }} />}
        </ListItemIcon>
      </Badge>
      <ListItemText>{text}</ListItemText>
    </ListItem>
  );
};

export default withRouter(DrawerButton);

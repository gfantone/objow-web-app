import React, { useEffect, useState } from 'react';
import { Home2, UserOctagon, Cup, Setting2 } from 'iconsax-react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';

const SideBar = () => {
  const intl = useIntl();
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(location.pathname);

  const handleListeItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setSelectedIndex(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    {
      text: intl.formatMessage({ id: 'spider.sidebar.home' }),
      icon: <Home2 />,
      src: '/home',
    },
    {
      text: intl.formatMessage({ id: 'spider.sidebar.participants' }),
      icon: <UserOctagon />,
      src: '/users',
    },

    {
      text: intl.formatMessage({ id: 'spider.sidebar.points' }),
      icon: <Cup />,
      src: '/points',
    },
    {
      text: intl.formatMessage({ id: 'spider.sidebar.administration' }),
      icon: <Setting2 />,
      src: '/nodes/1/administration/personnalisation',
    },
  ];
  return (
    <Drawer variant='permanent' anchor='left'>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={selectedIndex === item.src}
            component={Link}
            to={item.src}
            onClick={(event) => handleListeItemClick(event, item.src)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
export default SideBar;

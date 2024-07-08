import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {Link, useHistory, useLocation, useParams} from 'react-router-dom';
import {Home2, UserOctagon, Cup, Setting2} from 'iconsax-react';
import {Drawer, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';

const SideBar = () => {
    const history = useHistory();
    const intl = useIntl();
    const location = useLocation();
    const {contract} = useParams();
    const [selectedIndex, setSelectedIndex] = useState(location.pathname);

    const handleListeItemClick = (event, index) => {
        setSelectedIndex(index);
        history.push(index);
    };

    useEffect(() => {
        setSelectedIndex(location.pathname);
    }, [location.pathname]);

    const menuItems = [
        {
            text: intl.formatMessage({id: 'spider.sidebar.home'}),
            icon: <Home2/>,
            src: `/nodes/${contract}/home`,
        },
        {
            text: intl.formatMessage({id: 'spider.sidebar.participants'}),
            icon: <UserOctagon/>,
            src: `/nodes/${contract}/users`,
        },

        {
            text: intl.formatMessage({id: 'spider.sidebar.points'}),
            icon: <Cup/>,
            src: `/nodes/${contract}/points`,
        },
        {
            text: intl.formatMessage({id: 'spider.sidebar.administration'}),
            icon: <Setting2/>,
            src: `/nodes/${contract}/administration/personnalisation`,
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
                        to={'#'}
                        onClick={(event) => handleListeItemClick(event, item.src)}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
export default SideBar;

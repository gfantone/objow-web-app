import React from 'react'
import { withRouter } from 'react-router-dom'
import { ListItemText } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListItem, ListItemIcon } from './components'
import {Badge} from "../../../../../../../Badge"

const DrawerButton = ({badgeContent, icon, onNavigate, text, src, ...props}) => {
    const selected = props.history.location.pathname.startsWith(src)

    const handleClick = () => {
        if (src == '/logout') {
            localStorage.clear()
            window.location = '/'
        } else {
            if (onNavigate) onNavigate()
            props.history.push(src)
        }
    }

    return (
        <ListItem button selected={selected} onClick={handleClick}>
            <Badge badgeContent={badgeContent} color='secondary'>
                <ListItemIcon style={{width: 20}}>
                    <FontAwesomeIcon icon={icon} />
                </ListItemIcon>
            </Badge>
            <ListItemText>{text}</ListItemText>
        </ListItem>
    )
}

export default withRouter(DrawerButton)

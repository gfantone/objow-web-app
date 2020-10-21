import React from 'react'
import {IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLink} from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#0073b1',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#0073b1'
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    }
})

const WebsiteButton = ({...props}) => {
    const classes = useStyles()

    return (
        <IconButton className={classes.root} onClick={() => window.open("http://firetiger.fr/", "_blank")}>
            <FontAwesomeIcon icon={faLink} />
        </IconButton>
    )
}

export default WebsiteButton

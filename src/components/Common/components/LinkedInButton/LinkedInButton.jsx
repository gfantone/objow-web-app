import React from 'react'
import {IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons'

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

const LinkedInButton = ({...props}) => {
    const classes = useStyles()

    return (
        <IconButton className={classes.root} onClick={() => window.open("https://www.linkedin.com/company/fire-tiger/", "_blank")}>
            <FontAwesomeIcon icon={faLinkedinIn} />
        </IconButton>
    )
}

export default LinkedInButton

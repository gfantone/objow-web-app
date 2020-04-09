import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        right: '24px'
    }
});

const HeaderContainerRight = ({...props}) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>{props.children}</div>
    )
};

export default HeaderContainerRight

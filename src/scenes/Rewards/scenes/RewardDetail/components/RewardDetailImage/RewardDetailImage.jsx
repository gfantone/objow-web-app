import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {CardMedia} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    image: {
        height: 250,
        [theme.breakpoints.up('md')]: {
            width: 412,
        }
    }
}))

const RewardDetailImage = ({image, ...props}) => {
    const classes = useStyles()

    return (
        <div>
            <CardMedia image={image} className={classes.image} />
        </div>
    )
}

export default RewardDetailImage

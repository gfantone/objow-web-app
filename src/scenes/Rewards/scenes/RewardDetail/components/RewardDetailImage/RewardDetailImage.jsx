import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {CardMedia} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    image: {
        borderRadius: 16,
        height: 200,
        maxWidth: 300,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 300
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

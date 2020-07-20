import React from 'react'
import {CardMedia, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import {BoldTitle} from '../../../../components'

const styles = {
    icon: {
        width: 120,
        height: 120
    }
}

const Category = ({ category, ...props }) => {
    const { classes } = props

    return (
        <div>
            <Grid container spacing={1} alignItems='center' direction='column'>
                <Grid item>
                    <CardMedia image={category.icon} className={classes.icon} />
                </Grid>
                <Grid item>
                    <BoldTitle align='center'>{category.name}</BoldTitle>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(Category)

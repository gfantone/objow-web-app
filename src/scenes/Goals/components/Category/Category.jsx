import React from 'react'
import { CardMedia, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { DefaultText } from '../../../../components'

const styles = {
    icon: {
        width: 60,
        height: 60
    }
};

const Category = ({ category, ...props }) => {
    const { classes } = props;
    const iconData = require(`../../../../assets/img/system/category/icons/${category.icon}.svg`);

    return (
        <div>
            <Grid container spacing={1} alignItems='center' direction='column'>
                <Grid item>
                    <CardMedia image={iconData} className={classes.icon} />
                </Grid>
                <Grid item>
                    <DefaultText align='center'>{category.name}</DefaultText>
                </Grid>
            </Grid>
        </div>
    )
};

export default withStyles(styles)(Category)

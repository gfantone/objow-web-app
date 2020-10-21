import React from 'react'
import {Card, CardMedia, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {DefaultText} from '../../../../../../components'

const useStyles = makeStyles({
    card: {
        borderRadius: 50,
        boxShadow: '0 2px 16px 0 rgba(16,61,92,0.25)',
        height: 200,
        width: 200
    },
    container: {
        height: '100%',
    },
    logo: {
        height: 40,
        width: 40
    }
})

const Partner = ({partner, ...props}) => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <Grid container direction='column' justify='center' alignItems='center' spacing={1} className={classes.container}>
                    <Grid item>
                        <CardMedia image={partner.logo} className={classes.logo} />
                    </Grid>
                    <Grid item>
                        <DefaultText>{partner.name}</DefaultText>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default Partner

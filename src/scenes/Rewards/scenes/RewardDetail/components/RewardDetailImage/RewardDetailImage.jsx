import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {CardMedia} from "@material-ui/core";
import {Button, Dialog, DialogActions, DialogContent} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const useStyles = makeStyles(theme => ({
    image: {
        borderRadius: 16,
        cursor: 'pointer',
        height: 200,
        maxWidth: 300,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 300
        }
    },
    detailImage: {
        backgroundSize: 'contain',
        height: 400,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            height: 200
        }
    }
}))

const RewardDetailImage = ({image, ...props}) => {
    const classes = useStyles()
    const [detailOpen, setDetailOpen] = React.useState(false)

    const handleCloseClick = open => () => {
        setDetailOpen(open)
    }

    return (
        <div>
            <CardMedia image={image} className={classes.image} onClick={handleCloseClick(true)} />
            <Dialog open={detailOpen} onClose={handleCloseClick(false)} maxWidth='sm' fullWidth={true}>
                <DialogContent>
                    <CardMedia image={image} className={classes.detailImage} onClick={handleCloseClick(true)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseClick(false)}>{Resources.REWARD_DETAIL_IMAGE_CLOSE_BUTTON}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default RewardDetailImage

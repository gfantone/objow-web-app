import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {CardMedia, Avatar} from "@material-ui/core";
import {Button, Dialog, DialogActions, DialogContent} from '../../../../../../components'
import * as Resources from '../../../../../../Resources'

const useStyles = makeStyles(theme => ({
    image: {
        cursor: 'pointer',
        height: 100,
        width: 100,
        border: '3px solid #00E58D'
    },
    detailImage: {
        height: 250,
        width: 250,
        margin: 'auto'
    }
}))

const LevelIcon = ({image, ...props}) => {
    const classes = useStyles()
    const [detailOpen, setDetailOpen] = React.useState(false)

    const handleCloseClick = open => () => {
        setDetailOpen(open)
    }

    return (
        <div>
            <Avatar src={image} className={classes.image} onClick={handleCloseClick(true)} />
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

export default LevelIcon

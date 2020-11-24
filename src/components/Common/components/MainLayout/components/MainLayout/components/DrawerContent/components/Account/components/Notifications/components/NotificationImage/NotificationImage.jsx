import React from 'react'
import {Avatar} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
    image: {
        objectFit: 'contain'
    },
    imageContainer: {
        borderRadius: 0,
        height: 50,
        width: 50
    },
    roundedImageContainer: {
        height: 50,
        width: 50
    }
})

function getImage(notification) {
    if (['CCA', 'CGR', 'CLE', 'TCA'].includes(notification.type) && notification.image) {
        return notification.image
    }

    if (notification.type === 'CBA' && notification.data) {
        const data = JSON.parse(notification.data)
        return require(`../../../../../../../../../../../../../../assets/img/system/badge/icons/${data.icon}.svg`)
    }

    if (['CCH', 'TCH'].includes(notification.type)) {
        return require(`../../../../../../../../../../../../../../assets/img/system/notifications/rocket-solid.svg`)
    }

    if (notification.type === 'TGR') {
        return require(`../../../../../../../../../../../../../../assets/img/system/notifications/users-solid.svg`)
    }

    return null
}

const NotificationImage = ({notification, ...props}) => {
    const classes = useStyles()
    const image = getImage(notification)
    const imageClass = ['CCH', 'TCH', 'TGR'].includes(notification.type) ? classes.imageContainer : classes.roundedImageContainer

    return <Avatar src={image} classes={{root: imageClass, img: classes.image}} />
}

export default NotificationImage

import React, {useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {DialogContent, NotificationDate, NotificationImage, TableRow} from './components'
import {Button, DefaultText, Dialog, DialogActions, DialogTitle, FixedTableCell, InfoText, Loader, Table, TableBody, TableCell} from '../../../../../../../../../..'
import * as inAppNotificationListActions from '../../../../../../../../../../../../services/InAppNotifications/InAppNotificationList/actions'

const Notifications = ({open, onClose, ...props}) => {
    const {notifications, loading} = props.inAppNotificationList

    useEffect(() => {
        if (open) {
            props.inAppNotificationListActions.getInAppNotificationList()
        }
    }, [open])

    const handleNotificationClick = notification => () => {
        if (notification.type === 'CGR') {
            // props.history.push()
        }
    }

    function renderData() {
        return (
            <Table>
                <TableBody>
                    {notifications.map((notification, index) => {
                        return (
                            <TableRow key={notification.id} onClick={handleNotificationClick(notification)}>
                                <FixedTableCell>
                                    <NotificationImage notification={notification} />
                                </FixedTableCell>
                                <TableCell>
                                    <DefaultText>{notification.message}</DefaultText>
                                </TableCell>
                                <FixedTableCell>
                                    <NotificationDate date={notification.creationDate} />
                                </FixedTableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }

    function renderEmptyState() {
        return <InfoText>Aucune notification reçue</InfoText>
    }

    function renderLoader() {
        return <Loader centered />
    }

    return (
        <Dialog maxWidth='xs' open={open} on onClose={onClose}>
            <DialogTitle>Notifications</DialogTitle>
            <DialogContent>
                {loading && renderLoader()}
                {!loading && notifications && notifications.length > 0 && renderData()}
                {!loading && notifications && notifications.length === 0 && renderEmptyState()}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Fermer</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = ({inAppNotificationList}) => ({
    inAppNotificationList
})

const mapDispatchToProps = (dispatch) => ({
    inAppNotificationListActions: bindActionCreators(inAppNotificationListActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Notifications))

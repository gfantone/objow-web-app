import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  DialogContent,
  NotificationDate,
  NotificationImage,
  TableCell,
  TableRow,
} from './components';
import {
  Button,
  DefaultText,
  Dialog,
  DialogActions,
  DialogTitle,
  FixedTableCell,
  InfoText,
  Loader,
  Table,
  TableBody,
} from '../../../../../../../../../..';
import { useIntl } from 'react-intl';
import * as inAppNotificationListActions from '../../../../../../../../../../../../services/InAppNotifications/InAppNotificationList/actions';

const useStyles = makeStyles({
  new: {
    backgroundColor: '#EDF1FF',
  },
});

const Notifications = ({ open, onClose, ...props }) => {
  const intl = useIntl();
  const classes = useStyles();
  const { notifications, loading } = props.inAppNotificationList;
  const fullScreen = isWidthDown('xs', props.width);

  useEffect(() => {
    if (open) {
      props.inAppNotificationListActions.getInAppNotificationList();
    }
  }, [open]);

  const handleNotificationClick = (notification) => () => {
    if (
      notification.data ||
      notification.type === 'NCH' ||
      notification.type === 'NPN'
    ) {
      const data = JSON.parse(notification.data);

      if (notification.type === 'CBA') {
        props.history.push(`/badges/detail/${data.level}`);
      } else if (notification.type === 'CCA') {
        props.history.push(
          `/rankings/collaborators/${data.collaborator}/categories/${data.category}/years/${data.period}`
        );
      } else if (notification.type === 'CCH') {
        props.history.push(
          `/rankings/collaborators/${data.collaborator}/challenges/${data.period}`
        );
      } else if (notification.type === 'CLE') {
        props.history.push(
          `/collaborators/${data.collaborator}/detail?year=${data.period}`
        );
      } else if (notification.type === 'CGR') {
        props.history.push(
          `/rankings/collaborators/${data.collaborator}/general/${data.period}`
        );
      } else if (notification.type === 'TCA') {
        props.history.push(
          `/rankings/teams/${data.team}/categories/${data.category}/years/${data.period}`
        );
      } else if (notification.type === 'TCH') {
        props.history.push(
          `/rankings/teams/${data.team}/challenges/${data.period}`
        );
      } else if (notification.type === 'TGR') {
        props.history.push(
          `/rankings/teams/${data.team}/general/${data.period}`
        );
      } else if (notification.type === 'NCH') {
        props.history.push(`/challenges`);
      } else if (notification.type === 'NPN') {
        props.history.push(`/newsfeed`);
      }

      onClose();
    }
  };

  function renderData() {
    return (
      <Table>
        <TableBody>
          {notifications.map((notification, index) => {
            const rowClass = !notification.read ? classes.new : null;

            return (
              <TableRow
                key={notification.id}
                onClick={handleNotificationClick(notification)}
                className={rowClass}
              >
                <FixedTableCell>
                  <NotificationImage notification={notification} />
                </FixedTableCell>
                <TableCell>
                  <DefaultText
                    lowercase
                    dangerouslySetInnerHTML={{ __html: notification.message }}
                  />
                </TableCell>
                <FixedTableCell>
                  <NotificationDate date={notification.creationDate} />
                </FixedTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  function renderEmptyState() {
    return (
      <InfoText>
        {intl.formatMessage({ id: 'notification.empty_message' })}
      </InfoText>
    );
  }

  function renderLoader() {
    return <Loader centered />;
  }

  return (
    <Dialog fullScreen={fullScreen} maxWidth='xs' open={open} onClose={onClose}>
      <DialogTitle>
        {intl.formatMessage({ id: 'admin.notifications_rights.title' })}
      </DialogTitle>
      <DialogContent>
        {loading && renderLoader()}
        {!loading && notifications && notifications.length > 0 && renderData()}
        {!loading &&
          notifications &&
          notifications.length === 0 &&
          renderEmptyState()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          {intl.formatMessage({ id: 'common.close' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({ inAppNotificationList }) => ({
  inAppNotificationList,
});

const mapDispatchToProps = (dispatch) => ({
  inAppNotificationListActions: bindActionCreators(
    inAppNotificationListActions,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWidth()(Notifications)));

import React from 'react';
import { withRouter } from 'react-router-dom';
import Formsy, { withFormsy } from 'formsy-react';
import {
  MainLayoutComponent,
  Card,
  DefaultTitle,
  RoleFilter,
  DefaultText,
  TextField,
  ProgressButton,
  Loader,
} from '../../../../components';
import { injectIntl } from 'react-intl';
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import * as notificationListActions from '../../../../services/Notifications/NotifictionList/actions';
import * as notificationListUpdateActions from '../../../../services/Notifications/NotificationListUpdate/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  faBullseye,
  faComment,
  faLandmark,
  faRandom,
  faRocket,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

const Checkbox = withFormsy(MuiCheckbox);
const styles = {};
class AdminNotificatonsList extends MainLayoutComponent {
  constructor(props) {
    super(props);
    this.state = {
      isChevronDown: false,
      chevrons: {
        openNotifsGoals: false,
        openNotifsChallenges: false,
        openNotifsBadges: false,
        openNotifsNewsFeed: false,
        openNotifsRankings: false,
        openNotifsGenerals: false,
      },
      notificationCheckboxes: {},
      inactivityDays: {},
    };
  }
  // Toggles the chevron state for the specified section
  toggleChevron = (chevronKey) => {
    this.setState((prevState) => {
      const newChevrons = {
        ...prevState.chevrons,
        [chevronKey]: !prevState.chevrons[chevronKey],
      };
      localStorage.setItem('chevronsState', JSON.stringify(newChevrons));

      return { chevrons: newChevrons };
    });
  };
  // Loads the list of notifications
  loadNotifications = () => {
    const { notificationListActions } = this.props;
    notificationListActions.getNotificationList();
  };

  componentDidMount() {
    const { intl } = this.props;

    this.props.handleTitle(intl.formatMessage({ id: 'admin.title' }));
    this.props.handleSubHeader(<RoleFilter />);
    this.props.handleMaxWidth('md');
    this.props.activateReturn();

    const savedChevrons = localStorage.getItem('chevronsState');
    if (savedChevrons) {
      this.setState({ chevrons: JSON.parse(savedChevrons) });
    }
    this.loadNotifications();
  }
  // Handles the change of the checkbox
  handleCheckboxChange = (notificationId, channel, isChecked) => {
    const { notifications } = this.props.notificationList;

    const EWM_IDS = notifications
      .filter(
        (notificationValue) =>
          notificationValue.notification.code === 'EWM' &&
          notificationValue.channel.code === 'P'
      )
      .map((v) => v.id);

    this.setState((prevState) => {
      let newState = { ...prevState.notificationCheckboxes };

      if (EWM_IDS.includes(notificationId)) {
        EWM_IDS.forEach((id) => {
          newState[id] = {
            ...newState[id],
            [channel]: isChecked,
          };
        });
      } else {
        newState[notificationId] = {
          ...newState[notificationId],
          [channel]: isChecked,
        };
      }

      return { notificationCheckboxes: newState };
    });

    // Ensure inactivityDays is kept in sync
    const notification = notifications.find((n) => n.id === notificationId);
    if (notification) {
      this.setState((prevState) => ({
        inactivityDays: {
          ...prevState.inactivityDays,
          [notificationId]: notification.inactivity_days,
        },
      }));
    }
  };
  // Handles the change of inactivity days
  handleInactivityDaysChange = (notificationId, value) => {
    const { notifications } = this.props.notificationList;
    const notificationToUpdate = notifications.find(
      (n) => n.id === notificationId
    );

    if (
      !notificationToUpdate ||
      notificationToUpdate.notification.code !== 'UINC'
    ) {
      return;
    }

    const relatedNotifications = notifications
      .filter(
        (notification) =>
          notification.notification.code === 'UINC' &&
          notification.notification.id === notificationToUpdate.notification.id
      )
      .map((notification) => notification.id);

    this.setState((prevState) => {
      const updatedInactivityDays = { ...prevState.inactivityDays };
      relatedNotifications.forEach((id) => {
        updatedInactivityDays[id] = value;
      });

      return {
        inactivityDays: updatedInactivityDays,
      };
    });
  };
  // Creates form control labels for the channels
  createFormControlLabels = (channels, notificationCode) => {
    const { intl } = this.props;
    const orderedKeys = ['IA', 'P', 'E'];
    const checkBoxNameMap = {
      IA: intl.formatMessage({
        id: 'admin.notifications_rights.title_in_app',
      }),
      P: intl.formatMessage({ id: 'admin.notifications_rights.title_push' }),
      E: intl.formatMessage({ id: 'admin.notifications_rights.title_email' }),
    };

    return (
      <>
        {orderedKeys
          .map((key) => {
            const channel = channels[key];
            if (!channel) return null;

            const isDisabled = !channel.enabled;
            const currentCheck = this.state.notificationCheckboxes[channel.id];
            const defaultChecked = currentCheck
              ? currentCheck[key]
              : channel.value;
            return (
              <FormControlLabel
                label={checkBoxNameMap[key]}
                labelPlacement='top'
                control={
                  <Checkbox
                    key={`notification_value_${channel.id}`}
                    name={channel.id}
                    defaultChecked={defaultChecked}
                    onChange={(e) =>
                      this.handleCheckboxChange(
                        channel.id,
                        key,
                        e.target.checked
                      )
                    }
                    disabled={isDisabled}
                  />
                }
              />
            );
          })
          .filter(Boolean)}
      </>
    );
  };
  // Renders notifications for a specific chevron section
  renderNotificationsForChevron = (chevronKey) => {
    const { intl } = this.props;
    const { notifications } = this.props.notificationList;
    const currentRole = new URLSearchParams(this.props.location.search).get(
      'current'
    );
    const filteredNotificationsByRole = (notification) => {
      const roleMap = ['C', 'M', 'A'];

      return notification.role.code === roleMap[currentRole];
    };

    const notificationCodeMappings = {
      // openNotifsGoals: [],
      openNotifsChallenges: ['NECH', 'NLP'],
      openNotifsBadges: ['NLB'],
      openNotifsNewsFeed: ['NPIN'],
      openNotifsRankings: ['RFR', 'RFCR', 'RFGR', 'TRFR', 'TRCR', 'TRGR'],
      openNotifsGenerals: ['MNL', 'EWM', 'NPE', 'SWE', 'NROE', 'UINC'],
    };

    const notificationsByChevron = notifications
      ?.filter(filteredNotificationsByRole)
      ?.filter((notification) =>
        notificationCodeMappings[chevronKey]?.includes(
          notification.notification.code
        )
      );

    const notificationCodes = [];
    let notificationValues = notificationsByChevron?.reduce(
      (acc, notification) => {
        if (!(notification.notification.code in acc)) {
          acc[notification.notification.code] = Object.assign(
            {},
            { description: notification.notification.description },
            { channels: {}, inactivity_days: notification.inactivity_days }
          );

          notificationCodes.push(notification.notification.code);
        }

        if (acc[notification.notification.code].inactivity_days === null) {
          acc[notification.notification.code].inactivity_days =
            notification.inactivity_days;
        }
        const new_channels = Object.assign(
          {},
          acc[notification.notification.code].channels,
          {
            [notification.channel.code]: {
              id: notification.id,
              value: notification.value,
              enabled: notification.enabled,
              inactivity_days: notification.inactivity_days,
            },
          }
        );

        const new_notification = Object.assign(
          {},
          acc[notification.notification.code],
          {
            channels: new_channels,
          }
        );
        return Object.assign({}, acc, {
          [notification.notification.code]: new_notification,
        });
      },
      {}
    );
    const { loading } = this.props.notificationList;
    if (!notificationsByChevron) {
      return <Loader centered />;
    }
    if (notificationsByChevron.length === 0) {
      return (
        <DefaultText lowercase>
          {intl.formatMessage({
            id: `admin.notifications_rights.no_notifications`,
          })}
        </DefaultText>
      );
    }
    return (
      <>
        {loading && <Loader centered />}
        <Grid container>
          {notificationCodes.map((notificationCode) => {
            const notification = notificationValues[notificationCode];
            return (
              <Grid
                container
                item
                alignItems='center'
                justifyContent='space-between'
                key={notificationCode}
              >
                <Grid item lg={8} md={6} sm={12}>
                  <DefaultText lowercase style={{ fontSize: 16 }}>
                    {intl.formatMessage({
                      id: `admin.notifications_rights.notification_${notificationCode}`,
                    })}
                  </DefaultText>
                </Grid>
                <Grid item>
                  {this.createFormControlLabels(
                    notification.channels,
                    notificationCode
                  )}
                </Grid>
                {notificationCode === 'UINC' && (
                  <Grid item lg={2} md={3} sm={12}>
                    <TextField
                      name={'inactivity_days'}
                      // name={`inactivity_days_${notification.channels.P.id}`}
                      type='number'
                      initial={notification.inactivity_days}
                      onChange={(value) =>
                        this.handleInactivityDaysChange(
                          notification.channels.P.id,
                          value
                        )
                      }
                      label='jours'
                      style={{ marginLeft: '10px' }}
                    />
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  };
  // Handles the form submit action
  handleSubmit = () => {
    const { intl } = this.props;

    const combinedUpdates = {};

    Object.entries(this.state.notificationCheckboxes).forEach(
      ([id, channels]) => {
        combinedUpdates[id] = combinedUpdates[id] || {};
        combinedUpdates[id].value = Object.values(channels).some(
          (value) => value
        );
      }
    );

    Object.entries(this.state.inactivityDays).forEach(([id, days]) => {
      combinedUpdates[id] = combinedUpdates[id] || {};
      combinedUpdates[id].inactivity_days = days;
    });

    // Ensure value is set for all updates
    Object.keys(combinedUpdates).forEach((id) => {
      if (combinedUpdates[id].value === undefined) {
        const notification = this.props.notificationList.notifications.find(
          (n) => n.id.toString() === id
        );
        if (notification) {
          combinedUpdates[id].value = notification.value;
        }
      }
    });
    const notificationToUpdate = Object.entries(combinedUpdates).map(
      ([id, updates]) => ({
        id,
        ...updates,
      })
    );

    this.props.notificationListUpdateActions.updateNotificationList(
      notificationToUpdate
    );
    this.props.history.replace('/admin');
    toast.success(
      intl.formatMessage({
        id: 'admin.notifications_rights.notification_update_success',
      })
    );
  };

  render() {
    const { loading } = this.props.notificationList;
    const { intl } = this.props;
    const { chevrons } = this.state;
    const notificationTypes = [
      { icon: faBullseye, key: 'openNotifsGoals', titleId: 'admin.goal.title' },
      {
        icon: faRocket,
        key: 'openNotifsChallenges',
        titleId: 'challenge.title_plural',
        explication: 'admin.notifications_rights.explication_challenge',
      },
      {
        icon: faTrophy,
        key: 'openNotifsBadges',
        titleId: 'admin.home.badge_link',
        explication: 'admin.notifications_rights.explication_badge',
      },
      {
        icon: faComment,
        key: 'openNotifsNewsFeed',
        titleId: 'newsfeed.title',
        explication: 'admin.notifications_rights.explication_newsfeed',
      },
      {
        icon: faRandom,
        key: 'openNotifsRankings',
        titleId: 'ranking.title',
        explication: 'admin.notifications_rights.explication_ranking',
      },
      {
        icon: faLandmark,
        key: 'openNotifsGenerals',
        titleId: 'admin.notifications_rights.global',
        explication: 'admin.notifications_rights.explication_global',
      },
    ];

    return (
      <>
        <Formsy onValidSubmit={this.handleSubmit}>
          <div>
            <DefaultTitle isContrast>
              {intl.formatMessage({ id: 'admin.notifications_rights.title' })}
            </DefaultTitle>
          </div>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card>
                <DefaultTitle lowercase bold>
                  {intl.formatMessage({
                    id: 'admin.notifications_rights.title_explication',
                  })}
                </DefaultTitle>
                <DefaultText lowercase>
                  {intl.formatMessage({
                    id: 'admin.notifications_rights.explication_type',
                  })}
                </DefaultText>
                <DefaultText lowercase>
                  {intl.formatMessage({
                    id: 'admin.notifications_rights.explication_push',
                  })}
                </DefaultText>
                <DefaultText lowercase>
                  {intl.formatMessage({
                    id: 'admin.notifications_rights.explication_in_app',
                  })}
                </DefaultText>
                <DefaultText lowercase>
                  {intl.formatMessage({
                    id: 'admin.notifications_rights.explication_email',
                  })}
                </DefaultText>
                <DefaultTitle lowercase bold>
                  {intl.formatMessage({
                    id: 'admin.notifications_rights.remark_explication',
                  })}
                </DefaultTitle>
                <DefaultText lowercase style={{ paddingBottom: 10 }}>
                  {intl.formatMessage({
                    id: 'admin.notifications_rights.remark_explication_checkbox',
                  })}
                </DefaultText>
                {notificationTypes.map(
                  ({ icon, key, titleId, explication }) => (
                    <Accordion
                      expanded={chevrons[key]}
                      onChange={() => this.toggleChevron(key)}
                      key={key}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container item alignItems='center'>
                          <FontAwesomeIcon
                            icon={icon}
                            style={{ paddingRight: 10 }}
                          />
                          <DefaultTitle lowercase bold>
                            {intl.formatMessage({ id: titleId })}
                          </DefaultTitle>
                        </Grid>
                      </AccordionSummary>
                      <AccordionDetails>
                        {explication && intl.messages[explication] ? (
                          <DefaultText lowercase>
                            *{intl.formatMessage({ id: explication })}
                          </DefaultText>
                        ) : null}
                        {this.renderNotificationsForChevron(key)}
                      </AccordionDetails>
                    </Accordion>
                  )
                )}
                <Grid item xs={12} style={{ paddingTop: 10 }}>
                  <ProgressButton
                    type='submit'
                    text={intl.formatMessage({ id: 'common.submit' })}
                    loading={loading}
                    centered
                  />
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Formsy>
      </>
    );
  }
}
const mapStateToProps = ({ notificationList, notificationListUpdate }) => ({
  notificationList,
  notificationListUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  notificationListActions: bindActionCreators(
    notificationListActions,
    dispatch
  ),
  notificationListUpdateActions: bindActionCreators(
    notificationListUpdateActions,
    dispatch
  ),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(injectIntl(AdminNotificatonsList)))
);

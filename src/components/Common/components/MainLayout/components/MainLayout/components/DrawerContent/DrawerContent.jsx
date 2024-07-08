import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Account, Divider, DrawerButton, List, Logo } from './components';
import {
  faBook,
  faBullseye,
  faChartLine,
  faGift,
  faListUl,
  faQuestion,
  faRandom,
  faRocket,
  faSignOutAlt,
  faTools,
  faTrophy,
  faUsers,
  faComment,
  faHome,
  faGamepad,
  faMapSigns,
} from '@fortawesome/free-solid-svg-icons';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as Resources from '../../../../../../../../Resources';
import { FormattedMessage, FormattedDate } from 'react-intl';
import * as collaboratorRewardOrdersActions from '../../../../../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderCount/actions';
import * as teamRewardOrderCountActions from '../../../../../../../../services/TeamRewardOrders/TeamRewardOrderCount/actions';
import * as systemImageListActions from '../../../../../../../../services/SystemImages/SystemImageList/actions';
import * as menuNotificationListActions from '../../../../../../../../services/MenuNotifications/MenuNotificationList/actions';
import _ from 'lodash';

const DrawerContent = ({ onNavigate: baseOnNavigate, ...props }) => {
  const { account } = props.accountDetail;
  const { images } = props.systemImageList;
  const { configs } = props.configList;
  const { orders: collaboratorOrders } = props.collaboratorRewardOrderCount;
  const { orders: teamOrders } = props.teamRewardOrderCount;
  const { notifications, loading } = props.menuNotificationList;
  const isAdministrator = account.role.code === 'A';
  const orders =
    isAdministrator && collaboratorOrders != null && teamOrders != null
      ? collaboratorOrders + teamOrders
      : 0;
  const [logo, setLogo] = useState('/assets/img/system/logo.png');
  const [refreshMenuNotification, setRefreshMenuNotification] = useState(true);

  const [challengeNotifications, setChallengeNotifications] = useState(
    notifications
      ? notifications.filter((n) => n.type === 'challenge').length
      : 0
  );
  const [coachingNotifications, setCoachingNotifications] = useState(
    notifications
      ? notifications.filter((n) => n.type === 'coaching_item').length
      : 0
  );
  const [badgeNotifications, setBadgeNotifications] = useState(
    notifications ? notifications.filter((n) => n.type === 'badge').length : 0
  );
  const [goalNotifications, setGoalNotifications] = useState(
    notifications ? notifications.filter((n) => n.type === 'goal').length : 0
  );
  const [postNotifications, setPostNotifications] = useState(
    notifications ? notifications.filter((n) => n.type === 'post').length : 0
  );
  // var logo = images ? images.find(x => x.code === 'LOGO').src : null
  //
  // if (!logo) {
  //     logo = '/assets/img/system/logo.png'
  // }
  useEffect(() => {
    const newChallengeNotifications = notifications
      ? notifications.filter((n) => n.type === 'challenge').length
      : null;
    const newCoachingNotifications = notifications
      ? notifications.filter((n) => n.type === 'coaching_item').length
      : null;
    const newBadgeNotifications = notifications
      ? notifications.filter((n) => n.type === 'badge').length
      : null;
    const newGoalNotifications = notifications
      ? notifications.filter((n) => n.type === 'goal').length
      : null;
    const newPostNotifications = notifications
      ? notifications.filter((n) => n.type === 'post').length
      : null;
    if (
      newChallengeNotifications != null &&
      newChallengeNotifications !== challengeNotifications
    ) {
      setChallengeNotifications(newChallengeNotifications);
    }
    if (
      newCoachingNotifications != null &&
      newCoachingNotifications !== coachingNotifications
    ) {
      setCoachingNotifications(newCoachingNotifications);
    }
    if (
      newGoalNotifications != null &&
      newGoalNotifications !== goalNotifications
    ) {
      setGoalNotifications(newGoalNotifications);
    }
    if (
      newBadgeNotifications != null &&
      newBadgeNotifications !== badgeNotifications
    ) {
      setBadgeNotifications(newBadgeNotifications);
    }
    if (
      newPostNotifications != null &&
      newPostNotifications !== postNotifications
    ) {
      setPostNotifications(newPostNotifications);
    }
  }, [notifications]);
  // if(refreshMenuNotification) {
  //   setRefreshMenuNotification(false)
  //   setTimeout(() => {
  //     setRefreshMenuNotification(true)
  //   }, 1000)
  //   // props.MenuNotificationListActions.getMenuNotificationList()
  // }
  const onNavigate = () => {
    baseOnNavigate();
    // props.menuNotificationListActions.getMenuNotificationList()
  };

  useEffect(() => {
    props.collaboratorRewardOrdersActions.countWaitingCollaboratorRewardOrders();
    props.teamRewardOrderCountActions.countWaitingTeamRewardOrders();
    props.systemImageListActions.getSystemImageList();
    props.menuNotificationListActions.getMenuNotificationList();
  }, []);

  useEffect(() => {
    if (images && images.length > 0) {
      setLogo(images.find((x) => x.code === 'LOGO').src);
    }
  }, [images]);

  const allowJtiGame =
    configs &&
    _.get(
      configs.find((c) => c.code === 'JTIG'),
      'value'
    ) === 'true';

  const menuEntries = [
    {
      component: (
        <DrawerButton
          MaterialIcon={DashboardIcon}
          text={
            account.dashboardWording || <FormattedMessage id='common.home' />
          }
          src='/home'
          onNavigate={onNavigate}
        />
      ),
      permission:
        account.hasDashboardAccess &&
        (!account.isJtiEnv || _.get(account, 'role.code') !== 'C'),
    },
    {
      component: (
        <DrawerButton
          MaterialIcon={DashboardIcon}
          text={
            account.dashboardWording || <FormattedMessage id='common.home' />
          }
          src={`/collaborators/jti/${account.id}/detail`}
          onNavigate={onNavigate}
        />
      ),
      permission: account.isJtiEnv && _.get(account, 'role.code') === 'C',
    },
    {
      component: (
        <DrawerButton
          icon={faBullseye}
          text={
            account.goalWording || <FormattedMessage id='admin.goal.title' />
          }
          src='/goals'
          onNavigate={onNavigate}
          badgeContent={goalNotifications}
        />
      ),
      permission: account.hasGoalAccess,
    },
    {
      component: (
        <DrawerButton
          icon={faRocket}
          text={
            account.challengeWording || (
              <FormattedMessage id='challenge.title_plural' />
            )
          }
          src='/challenges'
          onNavigate={onNavigate}
          badgeContent={challengeNotifications}
        />
      ),
      permission: account.hasChallengeAccess,
    },
    {
      component: (
        <DrawerButton
          icon={faTrophy}
          text={account.badgeWording || <FormattedMessage id='badge.title' />}
          src='/badges'
          onNavigate={onNavigate}
          badgeContent={badgeNotifications}
        />
      ),
      permission: account.hasBadgeAccess,
    },
    {
      component: (
        <DrawerButton
          icon={faGamepad}
          text={<FormattedMessage id='game.title' />}
          src='/game'
          onNavigate={onNavigate}
        />
      ),
      permission: account.isJtiEnv && allowJtiGame && !account.isTestAccount,
    },
    {
      component: (
        <DrawerButton
          icon={faMapSigns}
          text={<FormattedMessage id='apptour.title' />}
          src='/apptour'
          onNavigate={onNavigate}
        />
      ),
      permission: account.isJtiEnv && allowJtiGame && !account.isTestAccount,
    },
    {
      component: (
        <DrawerButton
          icon={faComment}
          text={<FormattedMessage id='newsfeed.title' />}
          src='/newsfeed'
          onNavigate={onNavigate}
          badgeContent={postNotifications}
        />
      ),
      permission: account.hasNewsFeedAccess,
    },
    {
      component: (
        <DrawerButton
          icon={faListUl}
          text={<FormattedMessage id='coaching_list.title' />}
          src='/coaching'
          onNavigate={onNavigate}
          badgeContent={coachingNotifications}
        />
      ),
      permission: account.hasCoachingAccess,
    },
    {
      component: (
        <DrawerButton
          icon={faRandom}
          text={<FormattedMessage id='ranking.title' />}
          src='/rankings'
          onNavigate={onNavigate}
        />
      ),
      permission:
        account.hasRankingAccess &&
        (account.hasGeneralRankAccess ||
          account.hasCategoryRankAccess ||
          account.hasChallengeRankAccess),
    },
    {
      component: (
        <DrawerButton
          icon={faUsers}
          text={<FormattedMessage id='team.title' />}
          src='/teams'
          onNavigate={onNavigate}
        />
      ),
      permission: account.hasTeamsAccess,
    },

    {
      component: (
        <DrawerButton
          icon={faChartLine}
          text={<FormattedMessage id='statistics.title' />}
          src='/stats'
          onNavigate={onNavigate}
        />
      ),
      permission: account.hasStatisticsAccess,
    },

    {
      component: (
        <DrawerButton
          icon={faGift}
          text={<FormattedMessage id='reward.title' />}
          src='/rewards'
          onNavigate={onNavigate}
          badgeContent={orders}
        />
      ),
      permission: account.hasRewardAccess,
    },
    {
      component: (
        <DrawerButton
          icon={faBook}
          text={
            account.rulesWording || <FormattedMessage id='menu.rules_button' />
          }
          src='/rules'
          onNavigate={onNavigate}
        />
      ),
      permission: account.hasRulesAccess,
    },

    {
      component: (
        <DrawerButton
          icon={faTools}
          text={<FormattedMessage id='menu.admin_button' />}
          src='/admin'
          onNavigate={onNavigate}
        />
      ),
      permission: isAdministrator,
    },
    {
      component: (
        <DrawerButton
          icon={faQuestion}
          text={<FormattedMessage id='menu.help_button' />}
          src='/help'
          onNavigate={onNavigate}
        />
      ),
      permission: account.hasHelpAccess,
    },
    {
      component: (
        <DrawerButton
          icon={faSignOutAlt}
          text={<FormattedMessage id='menu.logout_button' />}
          src='/logout'
          onNavigate={onNavigate}
        />
      ),
      permission: true,
    },
  ];
  return (
    <div>
      <Account onNavigate={onNavigate} />
      <List>
        {menuEntries.map((entry, index) => (
          <React.Fragment>
            {entry.permission && entry.component}
            {entry.permission && menuEntries.length > index + 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      <List>
        <Logo image={logo} />
        <Divider />
        <Divider />
      </List>
    </div>
  );
};

const mapStateToProps = ({
  accountDetail,
  collaboratorRewardOrderCount,
  systemImageList,
  teamRewardOrderCount,
  menuNotificationList,
  configList,
}) => ({
  accountDetail,
  collaboratorRewardOrderCount,
  systemImageList,
  teamRewardOrderCount,
  menuNotificationList,
  configList,
});

const mapDispatchToProps = (dispatch) => ({
  collaboratorRewardOrdersActions: bindActionCreators(
    collaboratorRewardOrdersActions,
    dispatch
  ),
  teamRewardOrderCountActions: bindActionCreators(
    teamRewardOrderCountActions,
    dispatch
  ),
  systemImageListActions: bindActionCreators(systemImageListActions, dispatch),
  menuNotificationListActions: bindActionCreators(
    menuNotificationListActions,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);

import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-regular-svg-icons'
import {Badge, Notifications} from './components'
import {AccentText, DefaultText, GridLink, InfoText, ProgressBar, AnimatedCounter} from '../../../../../../../../..'
import * as Resources from '../../../../../../../../../../Resources'
import '../../../../../../../../../../helpers/NumberHelper'
import '../../../../../../../../../../helpers/StringHelper'
import * as accountDetailActions from '../../../../../../../../../../services/Account/AccountDetail/actions'
import {bindActionCreators} from "redux";

const styles = {
    root: {
        marginLeft: 32,
        marginTop: 32,
        marginRight: 32
    },
    avatar: {
        width: 72,
        height: 72
    },
    infos: {
        marginTop: 8
    },
    notificationContainer: {
        marginTop: 8
    },
    notifications: {
        cursor: 'pointer',
    },
    menuLabel: {
      textTransform: 'none',
      fontSize: 14
    }
};

const Account = ({onNavigate, ...props}) => {
    const { classes } = props;
    const { account } = props.accountDetail;
    const { count } = props.inAppNotificationCount
    const isCollaborator = account.role.code == 'C';
    const photo = account.photo ? account.photo : '/assets/img/user/avatar.svg';
    const percentage = isCollaborator && account.nextLevel ?
      (account.rank.points / account.nextLevel.points).toFullPercentage() :
      isCollaborator && !account.nextLevel ?
        100 :
        0;
    const [initialized, setInitialized] = React.useState(false);
    const [notificationOpen, setNotificationOpen] = React.useState(false)

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            props.accountDetailActions.getAccountDetail();
        }
    });

    function handleNotificationClose() {
        setNotificationOpen(false)
        if (onNavigate) onNavigate()
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                { isCollaborator && <GridLink item component={Link} to={`/collaborators/${account.id}/detail`}>
                    <Avatar src={photo} className={classes.avatar} />
                </GridLink> }
                { !isCollaborator && <Grid item>
                    <Avatar src={photo} className={classes.avatar} />
                </Grid> }
                <Grid item xs zeroMinWidth>
                    <div>
                        <Grid container>
                            {isCollaborator && <Grid item xs>
                                <InfoText>{Resources.DRAWER_LEVEL_LABEL.format(account.level.number)}</InfoText>
                            </Grid>}
                            { isCollaborator && <Grid item>
                                <AccentText>
                                  <AnimatedCounter counter={ account.rank.points } timer={ 750 } resource={ Resources.DRAWER_POINTS_LABEL }/>
                                </AccentText>
                            </Grid> }
                            { isCollaborator && <Grid item xs={12}>
                                <ProgressBar value={percentage} animate />
                            </Grid> }
                            <GridLink item xs={12} component={Link} to='/account' onClick={onNavigate} className={classes.infos}>
                                <AccentText>
                                    <FontAwesomeIcon icon={faEdit} />
                                    &nbsp;&nbsp;
                                    <span className={classes.menuLabel}>
                                      {Resources.DRAWER_INFOS_BUTTON}
                                    </span>
                                </AccentText>
                            </GridLink>
                            <Grid item xs={12} className={classes.notificationContainer} onClick={() => setNotificationOpen(true)}>
                                <DefaultText className={classes.notifications}>
                                    <Badge badgeContent={count} color='secondary'>
                                      <FontAwesomeIcon icon={faBell} />
                                    </Badge>
                                    &nbsp;&nbsp;&nbsp;
                                    <span className={classes.menuLabel}>
                                      {Resources.DRAWER_NOTIFICATIONS_BUTTON}
                                    </span>
                                </DefaultText>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
            <Notifications open={notificationOpen} onClose={handleNotificationClose} />
        </div>
    )
};

const mapStateToProps = ({ accountDetail, inAppNotificationCount }) => ({
    accountDetail,
    inAppNotificationCount
});

const mapDispatchToProps = (dispatch) => ({
    accountDetailActions: bindActionCreators(accountDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))

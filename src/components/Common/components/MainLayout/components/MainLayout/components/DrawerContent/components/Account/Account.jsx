import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {AccentText, DefaultTitle, GridLink, InfoText, ProgressBar} from '../../../../../../../../..'
import * as Resources from '../../../../../../../../../../Resources'
import '../../../../../../../../../../helpers/NumberHelper'
import '../../../../../../../../../../helpers/StringHelper'
import * as accountDetailActions from '../../../../../../../../../../services/Account/AccountDetail/actions'
import {bindActionCreators} from "redux";

const styles = {
    root: {
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
    }
};

const Account = ({...props}) => {
    const { classes } = props;
    const { account } = props.accountDetail;
    const isCollaborator = account.role.code == 'C';
    const isManager = account.role.code == 'M';
    const isAdministrator = account.role.code == 'A';
    const photo = account.photo ? account.photo : '/assets/img/user/avatar.svg';
    const percentage = isCollaborator && account.nextLevel ? (account.rank.points / account.nextLevel.points).toFullPercentage() : isCollaborator && !account.nextLevel ? 100 : 0;
    const [initialized, setInitialized] = React.useState(false);

    useEffect(() => {
        if (!initialized) {
            setInitialized(true);
            props.accountDetailActions.getAccountDetail();
        }
    });

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
                            <Grid item xs={12} zeroMinWidth>
                                <DefaultTitle noWrap>{account.firstname} {account.lastname}</DefaultTitle>
                            </Grid>
                            <Grid item xs>
                                <InfoText>
                                    { isCollaborator && Resources.DRAWER_LEVEL_LABEL.format(account.level.number) }
                                    { isManager && Resources.DRAWER_MANAGER_LABEL }
                                    { isAdministrator && Resources.DRAWER_ADMINISTRATOR_LABEL }
                                </InfoText>
                            </Grid>
                            { isCollaborator && <Grid item>
                                <AccentText>{Resources.DRAWER_POINTS_LABEL.format(account.rank.points)}</AccentText>
                            </Grid> }
                            { isCollaborator && <Grid item xs={12}>
                                <ProgressBar value={percentage} />
                            </Grid> }
                            <GridLink item xs={12} component={Link} to='/account' onClick={props.onNavigate} className={classes.infos}>
                                <AccentText>
                                    <FontAwesomeIcon icon={faEdit} /> {Resources.DRAWER_INFOS_BUTTON}
                                </AccentText>
                            </GridLink>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
};

const mapStateToProps = ({ accountDetail }) => ({
    accountDetail
});

const mapDispatchToProps = (dispatch) => ({
    accountDetailActions: bindActionCreators(accountDetailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account))

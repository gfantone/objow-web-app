import React from 'react'
import {connect} from 'react-redux'
import {Account, Divider, DrawerButton, List, Logo} from './components'
import {faBook, faBullseye, faGift, faListUl, faQuestion, faRandom, faRocket, faSignOutAlt, faTools, faTrophy, faUsers} from '@fortawesome/free-solid-svg-icons'
import * as Resources from '../../../../../../../../Resources'

const DrawerContent = ({ onNavigate, ...props }) => {
    const { account } = props.accountDetail;
    const { images } = props.systemImageList;
    const isAdministrator = account.role.code == 'A';
    var logo = images ? images.find(x => x.code == 'LOGO').src : null;

    if (!logo) {
        logo = '/assets/img/system/logo.png'
    }

    return (
        <div>
            <Account onNavigate={onNavigate} />
            <List>
                <DrawerButton icon={faBullseye} text={Resources.DRAWER_GOALS_BUTTON} src='/goals' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faRocket} text={Resources.DRAWER_CHALLENGES_BUTTON} src='/challenges' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faTrophy} text={Resources.DRAWER_BADGES_BUTTON} src='/badges' onNavigate={onNavigate} />
                { account.hasCoachingAccess && <Divider /> }
                { account.hasCoachingAccess && <DrawerButton icon={faListUl} text={Resources.DRAWER_COACHING_LIST_BUTTON} src='/coaching' onNavigate={onNavigate} /> }
                { (account.hasGeneralRankAccess || account.hasCategoryRankAccess || account.hasChallengeRankAccess) && <Divider /> }
                { (account.hasGeneralRankAccess || account.hasCategoryRankAccess || account.hasChallengeRankAccess) && <DrawerButton icon={faRandom} text={Resources.DRAWER_RANKINGS_BUTTON} src='/rankings' onNavigate={onNavigate} /> }
                <Divider />
                <DrawerButton icon={faUsers} text={Resources.DRAWER_TEAMS_BUTTON} src='/teams' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faGift} text={Resources.DRAWER_REWARDS_BUTTON} src='/rewards' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faBook} text={Resources.DRAWER_RULES_BUTTON} src='/rules' onNavigate={onNavigate} />
                {  isAdministrator && <Divider /> }
                {  isAdministrator && <DrawerButton icon={faTools} text={Resources.DRAWER_ADMIN_BUTTON} src='/admin' onNavigate={onNavigate} /> }
                {  isAdministrator && <Divider /> }
                {  isAdministrator && <DrawerButton icon={faQuestion} text={Resources.DRAWER_HELP_BUTTON} src='/help' onNavigate={onNavigate} /> }
                <Divider />
                <DrawerButton icon={faSignOutAlt} text={Resources.DRAWER_LOGOUT_BUTTON} src='/logout' onNavigate={onNavigate} />
            </List>
            <List>
                <Logo image={logo} />
                <Divider />
                <Divider />
            </List>
        </div>
    )
};

const mapStateToProps = ({ accountDetail, systemImageList }) => ({
    accountDetail,
    systemImageList
});

export default connect(mapStateToProps)(DrawerContent)

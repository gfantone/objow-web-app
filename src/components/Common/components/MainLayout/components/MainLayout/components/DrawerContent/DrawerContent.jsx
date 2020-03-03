import React from 'react'
import { connect } from 'react-redux'
import { Account, Divider, DrawerButton, List, Logo } from './components'
import { faBook, faBullseye, faListUl, faQuestion, faRandom, faRocket, faSignOutAlt, faTools, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons'

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
                <DrawerButton icon={faBullseye} text='Objectifs' src='/goals' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faRocket} text='Challenges' src='/challenges' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faTrophy} text='Défis' src='/badges' onNavigate={onNavigate} />
                { account.hasCoachingAccess && <Divider /> }
                { account.hasCoachingAccess && <DrawerButton icon={faListUl} text='Coaching list' src='/coaching' onNavigate={onNavigate} /> }
                { (account.hasGeneralRankAccess || account.hasCategoryRankAccess || account.hasChallengeRankAccess) && <Divider /> }
                { (account.hasGeneralRankAccess || account.hasCategoryRankAccess || account.hasChallengeRankAccess) && <DrawerButton icon={faRandom} text='Classements' src='/rankings' onNavigate={onNavigate} /> }
                <Divider />
                <DrawerButton icon={faUsers} text='Équipes' src='/teams' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faBook} text='Règles du jeu' src='/rules' onNavigate={onNavigate} />
                {  isAdministrator && <Divider /> }
                {  isAdministrator && <DrawerButton icon={faTools} text='Administration' src='/admin' onNavigate={onNavigate} /> }
                {  isAdministrator && <Divider /> }
                {  isAdministrator && <DrawerButton icon={faQuestion} text='Aide' src='/help' onNavigate={onNavigate} /> }
                <Divider />
                <DrawerButton icon={faSignOutAlt} text='Déconnexion' src='/logout' onNavigate={onNavigate} />
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

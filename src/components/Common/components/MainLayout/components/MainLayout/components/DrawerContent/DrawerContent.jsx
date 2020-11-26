import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Account, Divider, DrawerButton, List, Logo} from './components'
import {faBook, faBullseye, faChartLine, faGift, faListUl, faQuestion, faRandom, faRocket, faSignOutAlt, faTools, faTrophy, faUsers} from '@fortawesome/free-solid-svg-icons'
import * as Resources from '../../../../../../../../Resources'
import * as collaboratorRewardOrdersActions from '../../../../../../../../services/CollaboratorRewardOrders/CollaboratorRewardOrderCount/actions'
import * as teamRewardOrderCountActions from '../../../../../../../../services/TeamRewardOrders/TeamRewardOrderCount/actions'

const DrawerContent = ({onNavigate, ...props }) => {
    const {account} = props.accountDetail
    const {images} = props.systemImageList
    const {orders: collaboratorOrders} = props.collaboratorRewardOrderCount
    const {orders: teamOrders} = props.teamRewardOrderCount
    const isAdministrator = account.role.code === 'A'
    const orders = isAdministrator && collaboratorOrders != null && teamOrders != null ? collaboratorOrders + teamOrders : 0
    var logo = images ? images.find(x => x.code === 'LOGO').src : null

    if (!logo) {
        logo = '/assets/img/system/logo.png'
    }

    useEffect(() => {
        props.collaboratorRewardOrdersActions.countWaitingCollaboratorRewardOrders()
        props.teamRewardOrderCountActions.countWaitingTeamRewardOrders()
    }, [])

    return (
        <div>
            <Account onNavigate={onNavigate} />
            <List>
                <DrawerButton icon={faBullseye} text={Resources.DRAWER_GOALS_BUTTON} src='/goals' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faRocket} text={Resources.DRAWER_CHALLENGES_BUTTON} src='/challenges' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faTrophy} text={Resources.DRAWER_BADGES_BUTTON} src='/badges' onNavigate={onNavigate} />
                {account.hasCoachingAccess && <Divider />}
                {account.hasCoachingAccess && <DrawerButton icon={faListUl} text={Resources.DRAWER_COACHING_LIST_BUTTON} src='/coaching' onNavigate={onNavigate} />}
                {(account.hasGeneralRankAccess || account.hasCategoryRankAccess || account.hasChallengeRankAccess) && <Divider />}
                {(account.hasGeneralRankAccess || account.hasCategoryRankAccess || account.hasChallengeRankAccess) && <DrawerButton icon={faRandom} text={Resources.DRAWER_RANKINGS_BUTTON} src='/rankings' onNavigate={onNavigate} />}
                <Divider />
                <DrawerButton icon={faUsers} text={Resources.DRAWER_TEAMS_BUTTON} src='/teams' onNavigate={onNavigate} />
                <Divider />
                <DrawerButton icon={faChartLine} text={Resources.DRAWER_STATS_BUTTON} src='/stats' onNavigate={onNavigate} />
                {account.hasRewardAccess && <Divider />}
                {account.hasRewardAccess && <DrawerButton icon={faGift} text={Resources.DRAWER_REWARDS_BUTTON} src='/rewards' onNavigate={onNavigate} badgeContent={orders} />}
                <Divider />
                <DrawerButton icon={faBook} text={Resources.DRAWER_RULES_BUTTON} src='/rules' onNavigate={onNavigate} />
                {isAdministrator && <Divider />}
                {isAdministrator && <DrawerButton icon={faTools} text={Resources.DRAWER_ADMIN_BUTTON} src='/admin' onNavigate={onNavigate} />}
                {isAdministrator && <Divider />}
                {isAdministrator && <DrawerButton icon={faQuestion} text={Resources.DRAWER_HELP_BUTTON} src='/help' onNavigate={onNavigate} />}
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
}

const mapStateToProps = ({accountDetail, collaboratorRewardOrderCount, systemImageList, teamRewardOrderCount}) => ({
    accountDetail,
    collaboratorRewardOrderCount,
    systemImageList,
    teamRewardOrderCount
})

const mapDispatchToProps = (dispatch) => ({
    collaboratorRewardOrdersActions: bindActionCreators(collaboratorRewardOrdersActions, dispatch),
    teamRewardOrderCountActions: bindActionCreators(teamRewardOrderCountActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)

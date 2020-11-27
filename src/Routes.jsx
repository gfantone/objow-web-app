import React from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'
import {AdminRoutes, AnonymousRoutes, FileRoutes, PartnerRoutes, MaintenanceRoutes, MainRoutes, ManagerRoutes} from './components'
import * as scenes from './scenes'
import IntermediateRoutes from "./components/Common/components/IntermadiateRoutes/IntermadiateRoutes";

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* Main routes */}
                <MainRoutes exact path='/' component={scenes.Main} />
                {/*<MaintenanceRoutes component={scenes.Maintenance} />*/}
                {/* Account */}
                <MainRoutes exact path='/account' component={scenes.AccountDetail} />
                {/* Collaboratos */}
                <MainRoutes exact path='/collaborators/:id/detail' component={scenes.CollaboratorDetail} />
                <ManagerRoutes exact path='/collaborators/:id/password' component={scenes.CollaboratorPassword} />
                {/* Stats */}
                <MainRoutes exact path='/stats' component={scenes.HomeStats} />
                <MainRoutes exact path='/stats/collaborators/:collaboratorId/categories' component={scenes.CollaboratorGoalCategoryStats} />
                <MainRoutes exact path='/stats/collaborators/:collaboratorId/categories/:categoryId/goals' component={scenes.CollaboratorGoalStats} />
                <MainRoutes exact path='/stats/teams/:teamId/categories' component={scenes.TeamCollaboratorGoalCategoryStats} />
                <MainRoutes exact path='/stats/teams/:teamId/categories/:categoryId/goals' component={scenes.TeamCollaboratorGoalStats} />
                {/* Goals */}
                <MainRoutes exact path='/goals' component={scenes.GoalListHome} />
                <MainRoutes exact path='/goals/collaborators/:id/list' component={scenes.CollaboratorGoalList} />
                <MainRoutes exact path='/goals/collaborators/:id/categories' component={scenes.CollaboratorGoalCategoryList} />
                <MainRoutes exact path='/goals/teams/:id/list' component={scenes.TeamGoalList} />
                <MainRoutes exact path='/goals/teams/:id/categories' component={scenes.TeamGoalCategoryList} />
                <MainRoutes exact path='/goals/detail/collaborator/:id' component={scenes.CollaboratorGoalDetail} />
                <MainRoutes exact path='/goals/detail/team/:id' component={scenes.TeamGoalDetail} />
                <MainRoutes exact path='/goals/detail/team-collaborator/:id' component={scenes.TeamCollaboratorGoalDetail} />
                {/* Challenges */}
                <MainRoutes exact path='/challenges' component={scenes.ChallengeHome} />
                <MainRoutes exact path='/challenges/creation' component={scenes.ChallengeCreation} />
                <MainRoutes exact path='/challenges/team/:id/creation' component={scenes.ChallengeCreation} />
                <MainRoutes exact path='/challenges/modification/:id' component={scenes.ChallengeUpdate} />
                <MainRoutes exact path='/challenges/duplication/:id' component={scenes.ChallengeDuplication} />
                <MainRoutes exact path='/challenges/collaborator/:id' component={scenes.CollaboratorChallengeList} />
                <MainRoutes exact path='/challenges/team/:id' component={scenes.TeamChallengeList} />
                <MainRoutes exact path='/challenges/detail/collaborator/:id' component={scenes.CollaboratorChallengeDetail} />
                <MainRoutes exact path='/challenges/detail/team/:id' component={scenes.TeamChallengeDetail} />
                <MainRoutes exact path='/challenges/detail/team-collaborator/:id' component={scenes.TeamCollaboratorChallengeDetail} />
                {/* Badges */}
                <MainRoutes exact path='/badges' component={scenes.BadgeHome} />
                <MainRoutes exact path='/badges/collaborator/:id' component={scenes.BadgeList} />
                <MainRoutes exact path='/badges/detail/:id' component={scenes.BadgeDetail} />
                {/* Coaching lists */}
                <MainRoutes exact path='/coaching' component={scenes.CoachingHome} />
                <MainRoutes exact path='/coaching/:id' component={scenes.CoachingList} />
                {/* Game rules */}
                <MainRoutes exact path='/rules' component={scenes.GameRules} />
                {/* Partners */}
                <PartnerRoutes exact path='/aircall/oauth/install' component={scenes.AircallInstall} />
                {/* Rankings */}
                <MainRoutes exact path='/rankings' component={scenes.RankingList} />
                <MainRoutes exact path='/rankings/collaborators/:collaborator/list' component={scenes.CollaboratorRankingList} />
                <MainRoutes exact path='/rankings/collaborators/:collaborator/general/:period' component={scenes.CollaboratorGeneralRanking} />
                <MainRoutes exact path='/rankings/collaborators/:collaborator/categories/:category/years/:period' component={scenes.CollaboratorCategoryRanking} />
                <MainRoutes exact path='/rankings/collaborators/:collaborator/challenges/:period' component={scenes.CollaboratorChallengeRanking} />
                <MainRoutes exact path='/rankings/teams/:team/general/:period' component={scenes.TeamGeneralRanking} />
                <MainRoutes exact path='/rankings/teams/:team/categories/:category/years/:period' component={scenes.TeamCategoryRanking} />
                <MainRoutes exact path='/rankings/teams/:team/challenges/:period' component={scenes.TeamChallengeRanking} />
                {/* Rewards */}
                <MainRoutes exact path='/rewards' component={scenes.RewardHome} />
                <AdminRoutes exact path='/rewards/creation' component={scenes.RewardCreation} />
                <MainRoutes exact path='/rewards/collaborators/:id' component={scenes.CollaboratorRewardStore} />
                <AdminRoutes exact path='/rewards/collaborator-orders/:id/summary' component={scenes.CollaboratorRewardOrderSummary} />
                <AdminRoutes exact path='/rewards/collaborator-orders/:id/validation' component={scenes.CollaboratorRewardOrderValidation} />
                <MainRoutes exact path='/rewards/detail/:id' component={scenes.RewardDetail} />
                <AdminRoutes exact path='/rewards/duplication/:id' component={scenes.RewardDuplication} />
                <AdminRoutes exact path='/rewards/management' component={scenes.RewardManagement} />
                <AdminRoutes exact path='/rewards/modification/:id' component={scenes.RewardUpdate} />
                <MainRoutes exact path='/rewards/shopping-cart' component={scenes.ShoppingCart} />
                <ManagerRoutes exact path='/rewards/teams/:id' component={scenes.TeamRewardStore} />
                <AdminRoutes exact path='/rewards/team-orders/:id/summary' component={scenes.TeamRewardOrderSummary} />
                <AdminRoutes exact path='/rewards/team-orders/:id/validation' component={scenes.TeamRewardOrderValidation} />
                <AdminRoutes exact path='/rewards/tracking/collaborators' component={scenes.CollaboratorRewardOrderTracking} />
                <AdminRoutes exact path='/rewards/tracking/teams' component={scenes.TeamRewardOrderTracking} />
                {/* Teams */}
                <MainRoutes exact path='/teams' component={scenes.TeamList} />
                <MainRoutes exact path='/teams/:id' component={scenes.TeamDetail} />
                <MainRoutes exact path='/teams/:teamId/collaborators/:id/detail' component={scenes.CollaboratorDetail} />
                {/* Admin routes */}
                <AdminRoutes exact path='/admin' component={scenes.AdminHome} />
                <AdminRoutes exact path='/admin/periods/:periodId/badges' component={scenes.AdminBadgeList} />
                <AdminRoutes exact path='/admin/periods/:periodId/badges/:id' component={scenes.AdminBadgeDetail} />
                <AdminRoutes exact path='/admin/categories' component={scenes.AdminCategoryList} />
                <AdminRoutes exact path='/admin/categories/creation' component={scenes.AdminCategoryCreation} />
                <AdminRoutes exact path='/admin/categories/modification/:id' component={scenes.AdminCategoryUpdate} />
                <AdminRoutes exact path='/admin/partners' component={scenes.AdminPartnerList} />
                <AdminRoutes exact path='/admin/partners/:id' component={scenes.AdminPartnerDetail} />
                <AdminRoutes exact path='/admin/periods/:periodId/challenges' component={scenes.AdminChallenge} />
                <AdminRoutes exact path='/admin/periods/:periodId/goals' component={scenes.AdminGoalList} />
                <AdminRoutes exact path='/admin/periods/:periodId/goals/creation' component={scenes.AdminGoalCreation} />
                <AdminRoutes exact path='/admin/periods/:periodId/goals/modification/:id' component={scenes.AdminGoalUpdate} />
                <AdminRoutes exact path='/admin/periods/:periodId/levels' component={scenes.AdminLevelList} />
                <AdminRoutes exact path='/admin/logo' component={scenes.AdminLogo} />
                <AdminRoutes exact path='/admin/periods/:periodId/points' component={scenes.AdminPointConfig} />
                <AdminRoutes exact path='/admin/periods/:periodId/goal-levels' component={scenes.AdminGoalPointList} />
                <AdminRoutes exact path='/admin/periods/:periodId/goal-levels/:id' component={scenes.AdminGoalPointConfig} />
                <AdminRoutes exact path='/admin/access/' component={scenes.AdminAccessRightList} />
                <AdminRoutes exact path='/admin/teams/' component={scenes.AdminTeamList} />
                <AdminRoutes exact path='/admin/teams/creation' component={scenes.AdminTeamCreation} />
                <AdminRoutes exact path='/admin/teams/modification/:id' component={scenes.AdminTeamUpdate} />
                <AdminRoutes exact path='/admin/users' component={scenes.AdminUserList} />
                <AdminRoutes exact path='/admin/users/modification/:id' component={scenes.AdminUserUpdate} />
                <AdminRoutes exact path='/admin/users/creation' component={scenes.AdminUserCreation} />
                <AdminRoutes exact path='/admin/reports' component={scenes.AdminReportList} />
                <AdminRoutes exact path='/admin/reward-categories' component={scenes.AdminRewardCategoryList} />
                <AdminRoutes exact path='/admin/reward-categories/creation' component={scenes.AdminRewardCategoryCreation} />
                <AdminRoutes exact path='/admin/reward-categories/modification/:id' component={scenes.AdminRewardCategoryUpdate} />
                <AdminRoutes exact path='/admin/reports/:id' component={scenes.AdminReportDetail} />
                <AdminRoutes exact path='/admin/imports/logs' component={scenes.AdminImportLogList} />
                {/* Other routes */}
                <MainRoutes exact path={'/help'} component={scenes.Contact} />
                {/* Anonymous routes */}
                <AnonymousRoutes exact path='/login' component={scenes.Login} />
                {/* Intermediate routes */}
                <IntermediateRoutes exact path='/accept-terms' component={scenes.AcceptTerms} />
                {/* File routes */}
                <FileRoutes exact path={'/privacy-policy'} component={scenes.PrivacyPolicy} />
                <FileRoutes exact path={'/use-terms'} component={scenes.UseTerms} />
            </Switch>
        </BrowserRouter>
    )
}

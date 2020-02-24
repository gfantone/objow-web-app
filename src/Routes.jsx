import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'
import {AdminRoutes, AnonymousRoutes, FileRoutes, MainRoutes, ManagerRoutes} from './components'
import * as scenes from './scenes'

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* Main routes */}
                <MainRoutes exact path='/' component={scenes.Main} />
                {/* Account */}
                <MainRoutes exact path='/account' component={scenes.AccountDetail} />
                {/* Collaboratos */}
                <MainRoutes exact path='/collaborators/:id/detail' component={scenes.CollaboratorDetail} />
                <ManagerRoutes exact path='/collaborators/:id/password' component={scenes.CollaboratorPassword} />
                {/* Goals */}
                <MainRoutes exact path='/goals' component={scenes.GoalListHome} />
                <MainRoutes exact path='/goals/collaborator/:id' component={scenes.CollaboratorGoalList} />
                <MainRoutes exact path='/goals/team/:id' component={scenes.TeamGoalList} />
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
                <MainRoutes exact path='/badges/detail/current/:id' component={scenes.CurrentBadgeDetail} />
                <MainRoutes exact path='/badges/detail/next/:id' component={scenes.NextBadgeDetail} />
                {/* Coaching lists */}
                <MainRoutes exact path='/coaching' component={scenes.CoachingHome} />
                <MainRoutes exact path='/coaching/:id' component={scenes.CoachingList} />
                {/* Game rules */}
                <MainRoutes exact path='/rules' component={scenes.GameRules} />
                {/* Rankings */}
                <MainRoutes exact path='/rankings' component={scenes.RankingList} />
                <MainRoutes exact path='/rankings/collaborator/:id' component={scenes.CollaboratorRankingList} />
                <MainRoutes exact path='/rankings/general/collaborator/:period' component={scenes.CollaboratorGeneralRanking} />
                <MainRoutes exact path='/rankings/collaborator/category/:id/:periodId' component={scenes.CollaboratorCategoryRanking} />
                <MainRoutes exact path='/rankings/general/team/:period' component={scenes.TeamGeneralRanking} />
                <MainRoutes exact path='/rankings/team/category/:id/:periodId' component={scenes.TeamCategoryRanking} />
                <MainRoutes exact path='/rankings/challenge/collaborator/:period' component={scenes.CollaboratorChallengeRanking} />
                <MainRoutes exact path='/rankings/challenge/team/:period' component={scenes.TeamChallengeRanking} />
                {/* Teams */}
                <MainRoutes exact path='/teams' component={scenes.TeamList} />
                <MainRoutes exact path='/teams/:id' component={scenes.TeamDetail} />
                <MainRoutes exact path='/teams/:teamId/collaborators/:id/detail' component={scenes.CollaboratorDetail} />
                {/* Admin routes */}
                <AdminRoutes exact path='/admin' component={scenes.AdminHome} />
                <AdminRoutes exact path='/admin/periods/:periodId/badges' component={scenes.AdminBadgeList} />
                <AdminRoutes exact path='/admin/periods/:periodId/badges/:id' component={scenes.AdminBadgeDetail} />
                <AdminRoutes exact path='/admin/category' component={scenes.AdminCategory} />
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
                <AdminRoutes exact path='/admin/reports/:id' component={scenes.AdminReportDetail} />
                <AdminRoutes exact path='/admin/imports/logs' component={scenes.AdminImportLogList} />
                {/* Other routes */}
                <MainRoutes exact path={'/contact'} component={scenes.Contact} />
                {/* Anonymous routes */}
                <AnonymousRoutes exact path='/login' component={scenes.Login} />
                {/* File routes */}
                <FileRoutes exact path={'/privacy-policy'} component={scenes.PrivacyPolicy} />
                <FileRoutes exact path={'/use-terms'} component={scenes.UseTerms} />
            </Switch>
        </BrowserRouter>
    )
}

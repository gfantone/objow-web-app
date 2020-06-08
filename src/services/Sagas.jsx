import { all } from 'redux-saga/effects'
import watchAccountDetail from './Account/AccountDetail/sagas'
import watchAccountUpdate from './Account/AccountUpdate/sagas'
import watchAdminReferenceData from './AdminReferenceData/sagas'
import watchAuth from './Auth/sagas'
import watchTermsAcceptance from './Account/TermsAcceptance/sagas'
import watchBadgeDetail from './Badges/BadgeDetail/sagas'
import watchBadgeLevelList from './BadgeLevels/BadgeLevelList/sagas'
import watchBadgeLevelListCreation from './BadgeLevels/BadgeLevelListCreation/sagas'
import watchBadgeLevelListRemoving from './BadgeLevels/BadgeLevelListRemoving/sagas'
import watchBadgeLevelListUpdate from './BadgeLevels/BadgeLevelListUpdate/sagas'
import watchCategoryUpdate from "./Categories/CategoryUpdate/sagas";
import watchBadgeLevelRemaining from './BadgeLevels/BadgeLevelRemainingPoints/sagas'
import watchBadgeList from './Badges/BadgeList/sagas'
import watchCategoryActivationUpdate from "./Categories/CategoryActivationUpdate/sagas";
import watchBadgeUpdate from './Badges/BadgeUpdate/sagas'
import {watchUsableCategoryIconList, watchUsableCategoryIconListForCategory} from './CategoryIcons/CategoryIconList/sagas'
import watchCurrentCollaboratorBadgeSummaryList from './CollaboratorBadges/CurrentCollaboratorBadgeSummaryList/sagas'
import watchChallengeAwardTypeList from './ChallengeAwardTypes/ChallengeAwardTypeList/sagas'
import watchChallengeCreation from './Challanges/ChallangeCreaton/sagas'
import watchChallengeUpdate from './Challanges/ChallengeUpdate/sagas'
import watchChallengeDetail from './Challanges/ChallengeDetail/sagas'
import {watchChallengeTypeList, watchCurrentChallengeTypeList, watchUsableChallengeTypeList} from './ChallengeTypes/ChallengeTypeList/sagas'
import watchChallengeTypeSummaryList from './ChallengeTypeSummaries/ChallengeTypeSummaryList/sagas'
import watchChallengeTypeListUpdate from './ChallengeTypes/ChallengeTypeListUpdate/sagas'
import {watchChallengeTypeUsablePoints, watchChallengeTypeUsablePointsByChallenge} from "./ChallengeTypes/ChallengeTypeUsablePoints/sagas";
import { watchCollaboratorBadgeLevelList, watchCollaboratorNextBadgeLevelList } from './CollaboratorBadgeLevels/CollaboratorBadgeLevelList/sagas'
import { watchCollaboratorCategoryRankListByCategory, watchCollaboratorCategoryRankListByCollaborator } from './CollaboratorCategoryRanks/CollaboratorCategoryRankList/sagas'
import watchCollaboratorChallengeGeneralRankDetail from './CollaboratorChallengeGeneralRanks/CollaboratorChallengeGeneralRankDetail/sagas'
import watchCollaboratorChallengeGeneralRankList from './CollaboratorChallengeGeneralRanks/CollaboratorChallengeGeneralRankList/sagas'
import watchCollaboratorChallengeDetail from './CollaboratorChallenges/CollaboratorChallengeDetail/sagas'
import watchCollaboratorChallengeGoalList from './CollaboratorChallengeGoals/CollaboratorChallengeGoalList/sagas'
import watchCollaboratorChallengeList from './CollaboratorChallenges/CollaboratorChallengeList/sagas'
import { watchCollaboratorChalengeRankListByCollaboratorChallenge, watchCollaboratorChalengeRankListByTeamCollaboratorChallenge } from './CollaboratorChallengeRanks/CollaboratorChallengeRankList/sagas'
import watchCollaboratorDataList from './CollaboratorData/CollaboratorDataList/sagas'
import watchCollaboratorDataUpdate from './CollaboratorData/CollaboratorDataUpdate/sagas'
import watchCollaboratorGeneralRankDetail from './CollaboratorGeneralRanks/CollaboratorGeneralRankDetail/sagas'
import { watchCollaboratorGoalRankListByCollaboratorGOal, watchCollaboratorGoalRankListByTeamCollaboratorGoal } from './CollaboratorGoalRanks/CollaboratorGoalRankList/sagas'
import watchCollaboratorGeneralRankList from './CollaboratorGeneralRanks/CollaboratorGeneralRankList/sagas'
import watchFreeCollaboratorList from './Collaborators/CollaboratorList/sagas'
import watchCategoryCreation from './Categories/CategoryCreation/sagas'
import watchCategoryDetail from './Categories/CategoryDetail/sagas'
import {watchActiveCategoryList, watchInactiveCategoryList} from './Categories/CategoryList/sagas'
import watchChallengeImageList from './ChallengeImages/ChallengeImageList/sagas'
import watchCoachingItemUpdate from './CoachingItems/CoachingItemUpdate/sagas'
import watchCoachingItemList from './CoachingItems/CoachingItemList/sagas'
import watchCoachingItemListCreation from './CoachingItems/CoachingItemListCreation/sagas'
import watchCoachingItemListUpdate from './CoachingItems/CoachingItemListUpdate/sagas'
import watchCoachingItemRemoving from './CoachingItems/CoachingItemRemoving/sagas'
import watchCollaboratorDetail from './Collaborators/CollaboratorDetail/sagas'
import watchCollaboratorGoalDetail from './CollaboratorGoals/CollaboratorGoalDetail/sagas'
import { watchCollaboratorGoalListByTeamCollaboratorGoal } from './CollaboratorGoals/CollaboratorGoalList/sagas'
import watchCollaboratorGoalSummaryList from './CollaboratorGoalSummaries/CollaboratorGoalSummaryList/sagas'
import watchConfigDetail from './Configs/ConfigDetail/sagas'
import { watchConfigList, watchPermanentConfigList } from './Configs/ConfigList/sagas'
import watchConfigListUpdate from './Configs/ConfigListUpdate/sagas'
import watchConfigUpdate from './Configs/ConfigUpdate/sagas'
import watchCurrentCollaboratorBadgeDetail from "./CollaboratorBadges/CurrentCollaboratorBadgeDetail/sagas";
import watchFreeColorList from './Colors/ColorList/sagas'
import {watchGoalAdviceListByCollaboratorGoal, watchGoalAdviceListByTeamCollaboratorGoal, watchGoalAdviceListByTeamGoal} from './GoalAdvices/GoalAdviceList/sagas'
import {watchGoalAdviceListCreationByCollaboratorGoal, watchGoalAdviceListCreationByTeamCollaboratorGoal, watchGoalAdviceListCreationByTeamGoal} from './GoalAdvices/GoalAdviceListCreation/sagas'
import watchGoalListUpdate from './Goals/GoalListUpdate/sagas'
import watchGoalDefinitionDetail from './GoalDefinitions/GoalDefinitionDetail/sagas'
import watchGoalDefinitionCreation from './GoalDefinitions/GoalDefinitionCreation/sagas'
import watchGoalDefinitionLevelCollaboratorPoints from './GoalDefinitionLevels/GoalDefinitionLevelCollaoratorPoints/sagas'
import watchGoalDefinitionLevelTeamPoints from './GoalDefinitionLevels/GoalDefinitionLevelTeamPoints/sagas'
import watchGoalDefinitionList from './GoalDefinitions/GoalDefinitionList/sagas'
import watchGoalDefinitionUpdate from './GoalDefinitions/GoalDefinitionUpdate/sagas'
import watchGoalDefinitionActivationUpdate from './GoalDefinitions/GoalDefinitionActivationUpdate/sagas'
import watchGoalDefinitionLevelList from './GoalDefinitionLevels/GoalDefinitionLevelList/sagas'
import watchGoalDefinitionLevelListUpdate from './GoalDefinitionLevels/GoalDefinitionLevelListUpdate/sagas'
import watchGoalPoints from './GoalPoints/sagas'
import watchGoalDetail from './Goals/GoalDetail/sagas'
import watchGoalList from './Goals/GoalList/sagas'
import watchGoalTypeList from './GoalTypes/GoalTypeList/sagas'
import watchKpiDetail from './Kpis/KpiDetail/sagas'
import watchKpiList from './Kpis/KpiList/sagas'
import watchLevelList from './Levels/LevelList/sagas'
import watchLevelListCreation from './Levels/LevelListCreation/sagas'
import watchManagerGoalList from './ManagerGoals/ManagerGoalList/sagas'
import watchNextCollaboratorBadgeDetail from "./CollaboratorBadges/NextCollaboratorBadgeDetail/sagas";
import watchEvolutionRequest from './Mail/EvolutionRequest/sagas'
import watchFreeManagerList from './Managers/ManagerList/sagas'
import watchImportLogList from './ImportLogs/ImportLogList/sagas'
import watchCurrentPeriodDetail from './Periods/CurrentPeriodDetail/sagas'
import watchNextPeriodList from "./Periods/NextPeriodList/sagas";
import watchPreviousPeriodList from "./Periods/PreviousPeriodList/sagas";
import watchPeriodicityList from './Periodicities/PeriodicityList/sagas'
import watchPeriodList from "./Periods/PeriodList/sagas";
import watchPlayerGoalList from './PlayerGoals/PlayerGoalList/sagas'
import watchPlayerGoalListUpdate from './PlayerGoals/PlayerGoalListUpdate/sagas'
import watchRewardCategoryCreation from "./RewardCategories/RewardCategoryCreation/sagas";
import {watchActiveRewardCategoryList, watchInactiveRewardCategoryList} from "./RewardCategories/RewardCategoryList/sagas";
import watchUsableRewardCategoryIconList from "./RewardCategoryIcons/RewardCategoryIconList/sagas";
import watchRewardCategoryUpdate from "./RewardCategories/RewardCategoryUpdate/sagas";
import watchRoleList from './Roles/RoleList/sagas'
import watchSystemImageList from './SystemImages/SystemImageList/sagas'
import watchSystemImageUpdate from './SystemImages/SystemImageUpdate/sagas'
import { watchTeamCategoryRankListByCategory, watchTeamCategoryRankListByTeam } from './TeamCategoryRanks/TeamCategoryRankList/sagas'
import watchTeamChallengeGeneralRankDetail from './TeamChallengeGeneralRanks/TeamChallengeGeneralRankDetail/sagas'
import watchTeamChallengeGeneralRankList from './TeamChallengeGeneralRanks/TeamChallengeGeneralRankList/sagas'
import watchTeamChallengeDetail from './TeamChallenges/TeamChallengeDetail/sagas'
import { watchTeamChallengeListByCollaborator, watchTeamChallengeListByTeam } from './TeamChallenges/TeamChallengeList/sagas'
import watchTeamChallengeGoalList from './TeamChallengeGoals/TeamChallengeGoalList/sagas'
import watchTeamChallengeRankList from './TeamChallengeRanks/TeamChallengeRankList/sagas'
import watchTeamCollaboratorChallengeDetail from './TeamCollaboratorChallenges/TeamCollaboratorChallengeDetail/sagas'
import watchTeamCollaboratorChallengeGoalList from './TeamCollaboratorChallengeGoals/TeamCollaboratorChallengeGoalList/sagas'
import watchTeamCollaboratorChallengeList from './TeamCollaboratorChallenges/TeamCollaboratorChallengeList/sagas'
import watchTeamCollaboratorGoalDetail from './TeamCollaboratorGoals/TeamCollaboratorGoalDetail/sagas'
import watchTeamCollaboratorGoalList from './TeamCollaboratorGoals/TeamCollaboratorGoalList/sagas'
import watchTeamGeneralRankDetail from './TeamGeneralRanks/TeamGeneralRankDetail/sagas'
import watchTeamGeneralRankList from './TeamGeneralRanks/TeamGeneralRankList/sagas'
import watchTeamGoalDetail from './TeamGoals/TeamGoalDetail/sagas'
import watchTeamGoalRankList from './TeamGoalRanks/TeamGoalRankList/sagas'
import watchTeamGoalListByDefinition from './TeamGoals/TeamGoalList/sagas'
import { watchTeamGoalSummaryListByCollaborator, watchTeamGoalSummaryListByTeam } from './TeamGoalSummaries/TeamGoalSummaryList/sagas'
import watchTeamGoalListUpdate from './TeamGoals/TeamGoalListUpdate/sagas'
import watchTeamCreation from './Teams/TeamCreation/sagas'
import watchTeamUpdate from './Teams/TeamUpdate/sagas'
import watchTeamRemoving from './Teams/TeamRemoving/sagas'
import { watchTeamDetail, watchTeamDetailByAccount } from './Teams/TeamDetail/sagas'
import watchTeamList from './Teams/TeamList/sagas'
import watchTeamPlayerGoalDetail from './TeamPlayerGoals/TeamPlayerGoalDetail/sagas'
import watchTeamPlayerGoalList from './TeamPlayerGoals/TeamPlayerGoalList/sagas'
import watchTeamPlayerGoalListUpdate from './TeamPlayerGoals/TeamPlayerGoalListUpdate/sagas'
import watchUserCreation from './Users/UserCreation/sagas'
import watchUserDetail from './Users/UserDetail/sagas'
import watchUserList from './Users/UserList/sagas'
import watchUserListImport from './Users/UserListImport/sagas'
import watchUserUpdate from './Users/UserUpdate/sagas'
import watchUserUpdateActivation from './Users/UserUpdateActivation/sagas'
import watchUserUpdatePassword from './Users/UserUpdatePassword/sagas'
import watchUserGoalDetail from './UserGoals/UserGoalDetail/sagas'
import watchUserGoalList from './UserGoals/UserGoalList/sagas'
import watchCollaboratorGoalCategoryList from "./CollaboratorGoalCategories/CollaboratorGoalCategoryList/sagas";
import watchTeamGoalCategoryList from "./TeamGoalCategories/TeamGoalCategoryList/sagas";

function* rootSaga() {
    yield all([
        watchAccountDetail(),
        watchAccountUpdate(),
        watchActiveCategoryList(),
        watchActiveRewardCategoryList(),
        watchAdminReferenceData(),
        watchAuth(),
        watchBadgeDetail(),
        watchBadgeLevelList(),
        watchBadgeLevelListCreation(),
        watchBadgeLevelListRemoving(),
        watchBadgeLevelListUpdate(),
        watchBadgeLevelRemaining(),
        watchBadgeList(),
        watchBadgeUpdate(),
        watchCategoryActivationUpdate(),
        watchCategoryCreation(),
        watchCategoryDetail(),
        watchCategoryUpdate(),
        watchChallengeAwardTypeList(),
        watchChallengeCreation(),
        watchChallengeDetail(),
        watchChallengeImageList(),
        watchChallengeTypeList(),
        watchChallengeTypeListUpdate(),
        watchChallengeTypeSummaryList(),
        watchChallengeTypeUsablePoints(),
        watchChallengeTypeUsablePointsByChallenge(),
        watchChallengeUpdate(),
        watchCoachingItemList(),
        watchCoachingItemListCreation(),
        watchCoachingItemListUpdate(),
        watchCoachingItemRemoving(),
        watchCoachingItemUpdate(),
        watchCollaboratorBadgeLevelList(),
        watchCollaboratorCategoryRankListByCategory(),
        watchCollaboratorCategoryRankListByCollaborator(),
        watchCollaboratorChalengeRankListByCollaboratorChallenge(),
        watchCollaboratorChalengeRankListByTeamCollaboratorChallenge(),
        watchCollaboratorChallengeDetail(),
        watchCollaboratorChallengeGeneralRankDetail(),
        watchCollaboratorChallengeGeneralRankList(),
        watchCollaboratorChallengeGoalList(),
        watchCollaboratorChallengeList(),
        watchCollaboratorDataList(),
        watchCollaboratorDataUpdate(),
        watchCollaboratorDetail(),
        watchCollaboratorGeneralRankDetail(),
        watchCollaboratorGeneralRankList(),
        watchCollaboratorGoalCategoryList(),
        watchCollaboratorGoalDetail(),
        watchCollaboratorGoalListByTeamCollaboratorGoal(),
        watchCollaboratorGoalRankListByCollaboratorGOal(),
        watchCollaboratorGoalRankListByTeamCollaboratorGoal(),
        watchCollaboratorGoalSummaryList(),
        watchCollaboratorNextBadgeLevelList(),
        watchConfigDetail(),
        watchConfigList(),
        watchConfigListUpdate(),
        watchConfigUpdate(),
        watchCurrentChallengeTypeList(),
        watchCurrentCollaboratorBadgeDetail(),
        watchCurrentCollaboratorBadgeSummaryList(),
        watchCurrentPeriodDetail(),
        watchEvolutionRequest(),
        watchFreeCollaboratorList(),
        watchFreeColorList(),
        watchFreeManagerList(),
        watchGoalAdviceListByCollaboratorGoal(),
        watchGoalAdviceListByTeamCollaboratorGoal(),
        watchGoalAdviceListByTeamGoal(),
        watchGoalAdviceListCreationByCollaboratorGoal(),
        watchGoalAdviceListCreationByTeamCollaboratorGoal(),
        watchGoalAdviceListCreationByTeamGoal(),
        watchGoalDefinitionActivationUpdate(),
        watchGoalDefinitionCreation(),
        watchGoalDefinitionDetail(),
        watchGoalDefinitionLevelCollaboratorPoints(),
        watchGoalDefinitionLevelList(),
        watchGoalDefinitionLevelListUpdate(),
        watchGoalDefinitionLevelTeamPoints(),
        watchGoalDefinitionList(),
        watchGoalDefinitionUpdate(),
        watchGoalDetail(),
        watchGoalList(),
        watchGoalListUpdate(),
        watchGoalPoints(),
        watchGoalTypeList(),
        watchImportLogList(),
        watchInactiveCategoryList(),
        watchInactiveRewardCategoryList(),
        watchKpiDetail(),
        watchKpiList(),
        watchLevelList(),
        watchLevelListCreation(),
        watchManagerGoalList(),
        watchNextCollaboratorBadgeDetail(),
        watchNextPeriodList(),
        watchPeriodicityList(),
        watchPeriodList(),
        watchPermanentConfigList(),
        watchPlayerGoalList(),
        watchPlayerGoalListUpdate(),
        watchPreviousPeriodList(),
        watchRewardCategoryCreation(),
        watchRewardCategoryUpdate(),
        watchRoleList(),
        watchSystemImageList(),
        watchSystemImageUpdate(),
        watchTeamCategoryRankListByCategory(),
        watchTeamCategoryRankListByTeam(),
        watchTeamChallengeDetail(),
        watchTeamChallengeGeneralRankDetail(),
        watchTeamChallengeGeneralRankList(),
        watchTeamChallengeGoalList(),
        watchTeamChallengeListByCollaborator(),
        watchTeamChallengeListByTeam(),
        watchTeamChallengeRankList(),
        watchTeamCollaboratorChallengeDetail(),
        watchTeamCollaboratorChallengeGoalList(),
        watchTeamCollaboratorChallengeList(),
        watchTeamCollaboratorGoalDetail(),
        watchTeamCollaboratorGoalList(),
        watchTeamCreation(),
        watchTeamDetail(),
        watchTeamDetailByAccount(),
        watchTeamGeneralRankDetail(),
        watchTeamGeneralRankList(),
        watchTeamGoalCategoryList(),
        watchTeamGoalDetail(),
        watchTeamGoalListByDefinition(),
        watchTeamGoalListUpdate(),
        watchTeamGoalRankList(),
        watchTeamGoalSummaryListByCollaborator(),
        watchTeamGoalSummaryListByTeam(),
        watchTeamList(),
        watchTeamPlayerGoalDetail(),
        watchTeamPlayerGoalList(),
        watchTeamPlayerGoalListUpdate(),
        watchTeamRemoving(),
        watchTeamUpdate(),
        watchTermsAcceptance(),
        watchUsableCategoryIconList(),
        watchUsableCategoryIconListForCategory(),
        watchUsableChallengeTypeList(),
        watchUsableRewardCategoryIconList(),
        watchUserCreation(),
        watchUserDetail(),
        watchUserGoalDetail(),
        watchUserGoalList(),
        watchUserList(),
        watchUserListImport(),
        watchUserUpdate(),
        watchUserUpdateActivation(),
        watchUserUpdatePassword()
    ])
}

export default rootSaga

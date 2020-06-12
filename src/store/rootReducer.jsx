import { combineReducers } from 'redux'
import accountDetail from '../services/Account/AccountDetail/reducer'
import accountUpdate from '../services/Account/AccountUpdate/reducer'
import adminReferenceData from '../services/AdminReferenceData/reducer'
import auth from '../services/Auth/reducer'
import badgeDetail from '../services/Badges/BadgeDetail/reducer'
import badgeLevelList from '../services/BadgeLevels/BadgeLevelList/reducer'
import badgeLevelListCreation from '../services/BadgeLevels/BadgeLevelListCreation/reducer'
import badgeLevelListRemoving from '../services/BadgeLevels/BadgeLevelListRemoving/reducer'
import badgeLevelListUpdate from '../services/BadgeLevels/BadgeLevelListUpdate/reducer'
import badgeLevelRemainingPoints from '../services/BadgeLevels/BadgeLevelRemainingPoints/reducer'
import badgeList from '../services/Badges/BadgeList/reducer'
import badgeUpdate from '../services/Badges/BadgeUpdate/reducer'
import categoryActivationUpdate from '../services/Categories/CategoryActivationUpdate/reducer'
import categoryCreation from '../services/Categories/CategoryCreation/reducer'
import categoryDetail from '../services/Categories/CategoryDetail/reducer'
import categoryIconList from '../services/CategoryIcons/CategoryIconList/reducer'
import categoryList from '../services/Categories/CategoryList/reducer'
import categoryUpdate from '../services/Categories/CategoryUpdate/reducer'
import challengeAwardTypeList from '../services/ChallengeAwardTypes/ChallengeAwardTypeList/reducer'
import challengeCreation from '../services/Challanges/ChallangeCreaton/reducer'
import challengeDetail from '../services/Challanges/ChallengeDetail/reducer'
import challengeImageList from '../services/ChallengeImages/ChallengeImageList/reducer'
import challengeTypeList from '../services/ChallengeTypes/ChallengeTypeList/reducer'
import challengeTypeListUpdate from '../services/ChallengeTypes/ChallengeTypeListUpdate/reducer'
import challengeTypeSummaryList from '../services/ChallengeTypeSummaries/ChallengeTypeSummaryList/reducer'
import challengeTypeUsablePoints from "../services/ChallengeTypes/ChallengeTypeUsablePoints/reducer";
import challengeUpdate from '../services/Challanges/ChallengeUpdate/reducer'
import coachingItemList from '../services/CoachingItems/CoachingItemList/reducer'
import coachingItemListCreation from '../services/CoachingItems/CoachingItemListCreation/reducer'
import coachingItemListUpdate from '../services/CoachingItems/CoachingItemListUpdate/reducer'
import coachingItemRemoving from '../services/CoachingItems/CoachingItemRemoving/reducer'
import coachingItemUpdate from '../services/CoachingItems/CoachingItemUpdate/reducer'
import collaboratorBadgeLevelList from '../services/CollaboratorBadgeLevels/CollaboratorBadgeLevelList/reducer'
import collaboratorCategoryRankList from '../services/CollaboratorCategoryRanks/CollaboratorCategoryRankList/reducer'
import collaboratorChallengeDetail from '../services/CollaboratorChallenges/CollaboratorChallengeDetail/reducer'
import collaboratorChallengeGeneralRankDetail from '../services/CollaboratorChallengeGeneralRanks/CollaboratorChallengeGeneralRankDetail/reducer'
import collaboratorChallengeGeneralRankList from '../services/CollaboratorChallengeGeneralRanks/CollaboratorChallengeGeneralRankList/reducer'
import collaboratorChallengeGoalList from '../services/CollaboratorChallengeGoals/CollaboratorChallengeGoalList/reducer'
import collaboratorChallengeList from '../services/CollaboratorChallenges/CollaboratorChallengeList/reducer'
import collaboratorChallengeRankList from '../services/CollaboratorChallengeRanks/CollaboratorChallengeRankList/reducer'
import collaboratorDataList from '../services/CollaboratorData/CollaboratorDataList/reducer'
import collaboratorDataUpdate from '../services/CollaboratorData/CollaboratorDataUpdate/reducer'
import collaboratorDetail from '../services/Collaborators/CollaboratorDetail/reducer'
import collaboratorGeneralRankDetail from '../services/CollaboratorGeneralRanks/CollaboratorGeneralRankDetail/reducer'
import collaboratorGeneralRankList from '../services/CollaboratorGeneralRanks/CollaboratorGeneralRankList/reducer'
import collaboratorGlobalPointSummaryDetail from '../services/CollaboratorGlobalPointSummaries/CollaboratorGlobalPointSummaryDetail/reducer'
import collaboratorGoalCategoryList from "../services/CollaboratorGoalCategories/CollaboratorGoalCategoryList/reducer";
import collaboratorGoalDetail from '../services/CollaboratorGoals/CollaboratorGoalDetail/reducer'
import collaboratorGoalList from '../services/CollaboratorGoals/CollaboratorGoalList/reducer'
import collaboratorGoalRankList from '../services/CollaboratorGoalRanks/CollaboratorGoalRankList/reducer'
import collaboratorGoalSummaryList from '../services/CollaboratorGoalSummaries/CollaboratorGoalSummaryList/reducer'
import collaboratorList from '../services/Collaborators/CollaboratorList/reducer'
import collaboratorPointSummaryDetail from '../services/CollaboratorPointSummaries/CollaboratorPointSummaryDetail/reducer'
import collaboratorRewardOrderCount from '../services/CollaboratorRewardOrders/CollaboratorRewardOrderCount/reducer'
import colorList from '../services/Colors/ColorList/reducer'
import configDetail from '../services/Configs/ConfigDetail/reducer'
import configList from '../services/Configs/ConfigList/reducer'
import configListUpdate from '../services/Configs/ConfigListUpdate/reducer'
import configUpdate from '../services/Configs/ConfigUpdate/reducer'
import currentCollaboratorBadgeDetail from '../services/CollaboratorBadges/CurrentCollaboratorBadgeDetail/reducer'
import currentCollaboratorBadgeSummaryList from '../services/CollaboratorBadges/CurrentCollaboratorBadgeSummaryList/reducer'
import currentPeriodDetail from '../services/Periods/CurrentPeriodDetail/reducer'
import evolutionRequest from '../services/Mail/EvolutionRequest/reducer'
import goalAdviceList from '../services/GoalAdvices/GoalAdviceList/reducer'
import goalAdviceListCreation from '../services/GoalAdvices/GoalAdviceListCreation/reducer'
import goalDefinitionActivationUpdate from '../services/GoalDefinitions/GoalDefinitionActivationUpdate/reducer'
import goalDefinitionCreation from '../services/GoalDefinitions/GoalDefinitionCreation/reducer'
import goalDefinitionDetail from '../services/GoalDefinitions/GoalDefinitionDetail/reducer'
import goalDefinitionLevelCollaboratorPoints from '../services/GoalDefinitionLevels/GoalDefinitionLevelCollaoratorPoints/reducer'
import goalDefinitionLevelList from '../services/GoalDefinitionLevels/GoalDefinitionLevelList/reducer'
import goalDefinitionLevelListUpdate from '../services/GoalDefinitionLevels/GoalDefinitionLevelListUpdate/reducer'
import goalDefinitionLevelTeamPoints from '../services/GoalDefinitionLevels/GoalDefinitionLevelTeamPoints/reducer'
import goalDefinitionList from '../services/GoalDefinitions/GoalDefinitionList/reducer'
import goalDefinitionUpdate from '../services/GoalDefinitions/GoalDefinitionUpdate/reducer'
import goalDetail from '../services/Goals/GoalDetail/reducer'
import goalList from '../services/Goals/GoalList/reducer'
import goalListUpdate from '../services/Goals/GoalListUpdate/reducer'
import goalPoints from '../services/GoalPoints/reducers'
import goalTypeList from '../services/GoalTypes/GoalTypeList/reducer'
import importLogList from '../services/ImportLogs/ImportLogList/reducer'
import kpiDetail from '../services/Kpis/KpiDetail/reducer'
import kpiList from '../services/Kpis/KpiList/reducer'
import levelList from '../services/Levels/LevelList/reducer'
import levelListCreation from '../services/Levels/LevelListCreation/reducer'
import managerGoalList from '../services/ManagerGoals/ManagerGoalList/reducer'
import managerList from '../services/Managers/ManagerList/reducer'
import nextCollaboratorBadgeDetail from '../services/CollaboratorBadges/NextCollaboratorBadgeDetail/reducer'
import nextPeriodList from '../services/Periods/NextPeriodList/reducer'
import periodicityList from '../services/Periodicities/PeriodicityList/reducer'
import periodList from '../services/Periods/PeriodList/reducer'
import playerGoalList from '../services/PlayerGoals/PlayerGoalList/reducer'
import playerGoalListUpdate from '../services/PlayerGoals/PlayerGoalListUpdate/reducer'
import previousPeriodList from '../services/Periods/PreviousPeriodList/reducer'
import rewardCategory from '../services/RewardCategories/RewardCategory/reducer';
import rewardCategoryCreation from '../services/RewardCategories/RewardCategoryCreation/reducer';
import rewardCategoryIconList from '../services/RewardCategoryIcons/RewardCategoryIconList/reducer';
import rewardCategoryList from '../services/RewardCategories/RewardCategoryList/reducer';
import rewardCategoryUpdate from '../services/RewardCategories/RewardCategoryUpdate/reducer';
import rewardCreation from '../services/Rewards/RewardCreation/reducer';
import rewardDetail from '../services/Rewards/RewardDetail/reducer';
import rewardImageList from '../services/RewardImages/RewardImageList/reducer'
import rewardList from '../services/Rewards/RewardList/reducer'
import rewardTypeList from '../services/RewardTypes/RewardTypeList/reducer'
import rewardUpdate from '../services/Rewards/RewardUpdate/reducer'
import roleList from '../services/Roles/RoleList/reducer'
import systemImageList from '../services/SystemImages/SystemImageList/reducer'
import systemImageUpdate from '../services/SystemImages/SystemImageUpdate/reducer'
import teamCategoryRankList from '../services/TeamCategoryRanks/TeamCategoryRankList/reducer'
import teamChallengeDetail from '../services/TeamChallenges/TeamChallengeDetail/reducer'
import teamChallengeGeneralRankDetail from '../services/TeamChallengeGeneralRanks/TeamChallengeGeneralRankDetail/reducer'
import teamChallengeGeneralRankList from '../services/TeamChallengeGeneralRanks/TeamChallengeGeneralRankList/reducer'
import teamChallengeGoalList from '../services/TeamChallengeGoals/TeamChallengeGoalList/reducer'
import teamChallengeList from '../services/TeamChallenges/TeamChallengeList/reducer'
import teamChallengeRankList from '../services/TeamChallengeRanks/TeamChallengeRankList/reducer'
import teamCollaboratorChallengeDetail from '../services/TeamCollaboratorChallenges/TeamCollaboratorChallengeDetail/reducer'
import teamCollaboratorChallengeGoalList from '../services/TeamCollaboratorChallengeGoals/TeamCollaboratorChallengeGoalList/reducer'
import teamCollaboratorChallengeList from '../services/TeamCollaboratorChallenges/TeamCollaboratorChallengeList/reducer'
import teamCollaboratorGoalDetail from '../services/TeamCollaboratorGoals/TeamCollaboratorGoalDetail/reducer'
import teamCollaboratorGoalList from '../services/TeamCollaboratorGoals/TeamCollaboratorGoalList/reducer'
import teamCreation from '../services/Teams/TeamCreation/reducer'
import teamDetail from '../services/Teams/TeamDetail/reducer'
import teamGeneralRankDetail from '../services/TeamGeneralRanks/TeamGeneralRankDetail/reducer'
import teamGeneralRankList from '../services/TeamGeneralRanks/TeamGeneralRankList/reducer'
import teamGlobalPointSummaryDetail from '../services/TeamGlobalPointSummaries/TeamGlobalPointSummaryDetail/reducer'
import teamGoalCategoryList from "../services/TeamGoalCategories/TeamGoalCategoryList/reducer";
import teamGoalDetail from '../services/TeamGoals/TeamGoalDetail/reducer'
import teamGoalList from '../services/TeamGoals/TeamGoalList/reducer'
import teamGoalListUpdate from '../services/TeamGoals/TeamGoalListUpdate/reducer'
import teamGoalRankList from '../services/TeamGoalRanks/TeamGoalRankList/reducer'
import teamGoalSummaryList from '../services/TeamGoalSummaries/TeamGoalSummaryList/reducer'
import teamList from '../services/Teams/TeamList/reducer'
import teamPlayerGoalDetail from '../services/TeamPlayerGoals/TeamPlayerGoalDetail/reducer'
import teamPlayerGoalList from '../services/TeamPlayerGoals/TeamPlayerGoalList/reducer'
import teamPlayerGoalListUpdate from '../services/TeamPlayerGoals/TeamPlayerGoalListUpdate/reducer'
import teamPointSummaryDetail from '../services/TeamPointSummaries/TeamPointSummaryDetail/reducer'
import teamRemoving from '../services/Teams/TeamRemoving/reducer'
import teamRewardOrderCount from '../services/TeamRewardOrders/TeamRewardOrderCount/reducer'
import teamUpdate from '../services/Teams/TeamUpdate/reducer'
import termsAcceptance from "../services/Account/TermsAcceptance/reducer";
import userCreation from '../services/Users/UserCreation/reducer'
import userDetail from '../services/Users/UserDetail/reducer'
import userGoalDetail from '../services/UserGoals/UserGoalDetail/reducer'
import userGoalList from '../services/UserGoals/UserGoalList/reducer'
import userList from '../services/Users/UserList/reducer'
import userListImport from '../services/Users/UserListImport/reducer'
import userUpdate from '../services/Users/UserUpdate/reducer'
import userUpdateActivation from '../services/Users/UserUpdateActivation/reducer'
import userUpdatePassword from '../services/Users/UserUpdatePassword/reducer'

const rootReducer = combineReducers({
    accountDetail,
    accountUpdate,
    adminReferenceData,
    auth,
    badgeDetail,
    badgeLevelList,
    badgeLevelListCreation,
    badgeLevelListRemoving,
    badgeLevelListUpdate,
    badgeLevelRemainingPoints,
    badgeList,
    badgeUpdate,
    categoryActivationUpdate,
    categoryCreation,
    categoryDetail,
    categoryIconList,
    categoryList,
    categoryUpdate,
    challengeAwardTypeList,
    challengeCreation,
    challengeDetail,
    challengeImageList,
    challengeTypeList,
    challengeTypeListUpdate,
    challengeTypeSummaryList,
    challengeTypeUsablePoints,
    challengeUpdate,
    coachingItemList,
    coachingItemListCreation,
    coachingItemListUpdate,
    coachingItemRemoving,
    coachingItemUpdate,
    collaboratorBadgeLevelList,
    collaboratorCategoryRankList,
    collaboratorChallengeDetail,
    collaboratorChallengeGeneralRankDetail,
    collaboratorChallengeGeneralRankList,
    collaboratorChallengeGoalList,
    collaboratorChallengeList,
    collaboratorChallengeRankList,
    collaboratorDataList,
    collaboratorDataUpdate,
    collaboratorDetail,
    collaboratorGeneralRankDetail,
    collaboratorGeneralRankList,
    collaboratorGlobalPointSummaryDetail,
    collaboratorGoalCategoryList,
    collaboratorGoalDetail,
    collaboratorGoalList,
    collaboratorGoalRankList,
    collaboratorGoalSummaryList,
    collaboratorList,
    collaboratorPointSummaryDetail,
    collaboratorRewardOrderCount,
    colorList,
    configDetail,
    configList,
    configListUpdate,
    configUpdate,
    currentCollaboratorBadgeDetail,
    currentCollaboratorBadgeSummaryList,
    currentPeriodDetail,
    evolutionRequest,
    goalAdviceList,
    goalAdviceListCreation,
    goalDefinitionActivationUpdate,
    goalDefinitionCreation,
    goalDefinitionDetail,
    goalDefinitionLevelCollaboratorPoints,
    goalDefinitionLevelList,
    goalDefinitionLevelListUpdate,
    goalDefinitionLevelTeamPoints,
    goalDefinitionList,
    goalDefinitionUpdate,
    goalDetail,
    goalList,
    goalListUpdate,
    goalPoints,
    goalTypeList,
    importLogList,
    kpiDetail,
    kpiList,
    levelList,
    levelListCreation,
    managerGoalList,
    managerList,
    nextCollaboratorBadgeDetail,
    nextPeriodList,
    periodicityList,
    periodList,
    playerGoalList,
    playerGoalListUpdate,
    previousPeriodList,
    rewardCategory,
    rewardCategoryCreation,
    rewardCategoryIconList,
    rewardCategoryList,
    rewardCategoryUpdate,
    rewardCreation,
    rewardDetail,
    rewardImageList,
    rewardList,
    rewardTypeList,
    rewardUpdate,
    roleList,
    systemImageList,
    systemImageUpdate,
    teamCategoryRankList,
    teamChallengeDetail,
    teamChallengeGeneralRankDetail,
    teamChallengeGeneralRankList,
    teamChallengeGoalList,
    teamChallengeList,
    teamChallengeRankList,
    teamCollaboratorChallengeDetail,
    teamCollaboratorChallengeGoalList,
    teamCollaboratorChallengeList,
    teamCollaboratorGoalDetail,
    teamCollaboratorGoalList,
    teamCreation,
    teamDetail,
    teamGeneralRankDetail,
    teamGeneralRankList,
    teamGlobalPointSummaryDetail,
    teamGoalCategoryList,
    teamGoalDetail,
    teamGoalList,
    teamGoalListUpdate,
    teamGoalRankList,
    teamGoalSummaryList,
    teamList,
    teamPlayerGoalDetail,
    teamPlayerGoalList,
    teamPlayerGoalListUpdate,
    teamPointSummaryDetail,
    teamRemoving,
    teamRewardOrderCount,
    teamUpdate,
    termsAcceptance,
    userCreation,
    userDetail,
    userGoalDetail,
    userGoalList,
    userList,
    userListImport,
    userUpdate,
    userUpdateActivation,
    userUpdatePassword
});

export default rootReducer

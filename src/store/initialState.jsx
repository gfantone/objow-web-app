const initialState = {
    accountDetail: {
        account: null,
        loading: false,
        hasError: false
    },
    accountUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    termsAcceptance: {
        success: false,
        loading: false,
        hasError: false
    },
    adminReferenceData: {
        categories: [],
        categoryIcons: [],
        goalTypes: [],
        kpis: [],
        periodicities: [],
        loading: false,
        hasError: false
    },
    auth: {
        success: false,
        loading: false,
        error: null
    },
    badgeDetail: {
        badge: null,
        loading: false,
        hasError: false
    },
    badgeLevelList: {
        levels: null,
        loading: false,
        hasError: false
    },
    badgeLevelListCreation: {
        success: false,
        loading: false,
        hasError: false
    },
    badgeLevelListRemoving: {
        success: false,
        loading: false,
        hasError: false
    },
    badgeLevelListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    badgeLevelRemainingPoints: {
        points: null,
        loading: false,
        hasError: false
    },
    badgeLevelRemoving: {
        success: false,
        loading: false,
        hasError: false
    },
    badgeList: {
        badges: null,
        loading: false,
        hasError: false
    },
    badgeUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    categoryCreation: {
        success: false,
        loading: false,
        hasError:false
    },
    categoryDetail: {
        category: null,
        loading: false,
        hasError: false
    },
    categoryActivationUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    categoryUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    categoryIconList: {
        icons: null,
        loading: false,
        hasError: false
    },
    categoryList: {
        categories: null,
        loading: false,
        hasError: false
    },
    challengeAwardTypeList: {
        types: null,
        loading: false,
        hasError: false
    },
    challengeCreation: {
        success: false,
        loading: false,
        hasError: false
    },
    challengeDetail: {
        challenge: null,
        loading: false,
        hasError: false
    },
    challengeUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    challengeImageList: {
        images: null,
        loading: false,
        hasError: false
    },
    challengePeriodConfigList: {
        configs: null,
        loading: false,
        hasError: false
    },
    challengeTypeList: {
        types: null,
        loading: false,
        hasError: false
    },
    challengeTypeListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    challengeTypeUsablePoints: {
        points: null,
        loading: false,
        hasError: false
    },
    challengeTypeSummaryList: {
        types: null,
        loading: false,
        hasError: false
    },
    coachingItemList: {
        items: null,
        loading: false,
        hasError: false
    },
    coachingItemListCreation: {
        success: false,
        loading: false,
        hasError: false
    },
    coachingItemListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    coachingItemUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    coachingItemRemoving: {
        success: false,
        loading: false,
        hasError: false
    },
    collaboratorBadgeLevelList: {
        levels: null,
        loading: false,
        hasError: false
    },
    CurrentCollaboratorBadgeSummaryList: {
        badges: null,
        loading: false,
        hasError: false
    },
    collaboratorCategoryRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    collaboratorChallengeGeneralRankDetail: {
        rank: null,
        loading: false,
        hasError: false
    },
    collaboratorChallengeGeneralRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    collaboratorChallengeDetail: {
        challenge: null,
        loading: false,
        hasError: false
    },
    collaboratorChallengeGoalList: {
        goals: null,
        loading: false,
        hasError: false
    },
    collaboratorChallengeList: {
        challenges: null,
        loading: false,
        hasError: false
    },
    collaboratorChallengeRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    collaboratorData: {
        data: null,
        loading: false,
        hasError: false
    },
    collaboratorDataUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    collaboratorDetail: {
        collaborator: null,
        loading: false,
        hasError: false
    },
    collaboratorList: {
        collaborators: null,
        loading: false,
        hasError: false
    },
    collaboratorGeneralRankDetail: {
        rank: null,
        loading: false,
        hasError: false
    },
    collaboratorGeneralRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    collaboratorGoalDetail: {
        goal: null,
        loading: false,
        hasError: false
    },
    collaboratorGoalList: {
        goals: null,
        loading: false,
        hasError: false
    },
    collaboratorGoalSummaryList: {
        goals: null,
        loading: false,
        hasError: false
    },
    collaboratorGoalRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    configList: {
        configs: null,
        loading: false,
        hasError: false
    },
    currentCollaboratorBadgeDetail: {
        badge: null,
        loading: false,
        hasError: false
    },
    goalDefinition: {
        definition: null,
        loading: false,
        hasError: false
    },
    goalDefinitionCreation: {
        definition: false,
        loading: false,
        hasError: false
    },
    goalDefinitionList: {
        definitions: [],
        count: 0,
        loading: false,
        hasError: false
    },
    goalDefinitionLevelCollaoratorPoints: {
        points: null,
        loading: false,
        hasError: false
    },
    goalDefinitionLevelTeamPoints: {
        points: null,
        loading: false,
        hasError: false
    },
    goalDefinitionLevelListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    goalDefinitionUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    goalDefinitionLevelList: {
        levels: null,
        loading: false,
        hasError: false
    },
    goalPoints: {
        points: [],
        loading: false,
        hasError: false
    },
    goalDetail: {
        goal: null,
        loading: false,
        hasError: false
    },
    goalList: {
        goals: null,
        loading: false,
        hasError: false
    },
    goalListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    goalTypeList: {
        types: null,
        loading: false,
        hasError: false
    },
    importLogList: {
        logs: null,
        loading: false,
        hasError: false
    },
    kpiDetail: {
        kpi: null,
        loading: false,
        hasError: false
    },
    kpiList:{
        kpis: null,
        loading: false,
        hasError: false
    },
    evolutionRequest: {
        success: false,
        loading: false,
        hasError: false
    },
    levelList: {
        levels: null,
        loading: false,
        hasError: false
    },
    levelListCreation: {
        success: false,
        loading: false,
        hasError: false
    },
    managerGoalList: {
        goals: [],
        loading: false,
        hasError: false
    },
    managerList: {
        managers: null,
        loading: false,
        hasError: false
    },
    periodList: {
        periods: null,
        loading: false,
        hasError: false
    },
    currentPeriodDetail: {
        period: null,
        loading: false,
        hasError: false
    },
    nextPeriodList: {
        periods: null,
        loading: false,
        hasError: false
    },
    previousPeriodList: {
        periods: null,
        loading: false,
        hasError: false
    },
    periodicityList: {
        periodicities: null,
        loading: false,
        hasError: false
    },
    systemImageList: {
        images: null,
        loading: false,
        hasError: false
    },
    systemImageUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    playerGoalList: {
        goals: [],
        loading: false,
        hasError: false
    },
    playerGoalListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    playerRankList: {
        generalRank: null,
        categoryRanks: [],
        loading: false,
        hasError: false
    },
    goalAdviceList: {
        advices: null,
        loading: false,
        hasError: false
    },
    goalAdviceListCreation: {
        success: false,
        loading: false,
        hasError: false
    },
    colorList: {
        colors: null,
        loading: false,
        hasError: false
    },
    configDetail: {
        config: null,
        loading : false,
        hasError: false
    },
    configUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    configListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    nextCollaboratorBadgeDetail: {
        badge: null,
        loading: false,
        hasError: false
    },
    roleList: {
        roles: null,
        loading: false,
        hasError: false
    },
    teamCategoryRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    teamChallengeDetail: {
        challenge: null,
        loading: false,
        hasError: false
    },
    teamChallengeList: {
        challenges: null,
        loading: false,
        hasError: false
    },
    teamChallengeGeneralRankDetail: {
        rank: null,
        loading: false,
        hasError: false
    },
    teamChallengeGeneralRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    teamChallengeGoalList: {
        goals: null,
        loading: false,
        hasError: false
    },
    teamChallengeRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    teamCollaboratorChallengeDetail: {
        challenge: null,
        loading: false,
        hasError: false
    },
    teamCollaboratorChallengeGoalList: {
        goals: null,
        loading: false,
        hasError: false
    },
    teamCollaboratorChallengeList: {
        challenges: null,
        loading: false,
        hasError: false
    },
    teamCollaboratorGoalDetail: {
        goal: null,
        loading: false,
        hasError: false
    },
    teamCollaboratorGoalList: {
        goals: null,
        loading: false,
        hasError: false
    },
    teamGeneralRankDetail: {
        rank: null,
        loading: false,
        hasError: false
    },
    teamGeneralRankList: {
        ranking: [],
        loading: false,
        hasError: false
    },
    teamGoalDetail: {
        goal: null,
        laoding: false,
        hasError: false
    },
    teamGoalList: {
        goals: null,
        loading: false,
        hasError: false
    },
    teamGoalSummaryList: {
        goals: null,
        loading: false,
        hasError: false
    },
    teamGoalListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    teamGoalRankList: {
        ranks: null,
        loading: false,
        hasError: false
    },
    teamCreation: {
        success: false,
        loading: false,
        hasError: false
    },
    teamList: {
        teams: [],
        loading: false,
        hasError: false
    },
    teamDetail: {
        team: null,
        loading: false,
        hasError: false
    },
    teamUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    teamRemoving: {
        success: false,
        loading: false,
        hasError: false
    },
    teamPlayerGoalDetail: {
        goal: null,
        loading: false,
        hasError: false
    },
    teamPlayerGoalList: {
        goals: [],
        loading: false,
        hasError: false
    },
    teamPlayerGoalListUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    teamRankList: {
        generalRank: null,
        categoryRanks: [],
        loading: false,
        hasError: false
    },
    userCreation: {
        success: false,
        loading: false,
        hasError: false
    },
    userUpdate: {
        success: false,
        loading: false,
        hasError: false
    },
    userUpdateActivation: {
      success: false,
      loading: false,
      hasError: false
    },
    userUpdatePassword: {
        success: false,
        loading: false,
        hasError: false
    },
    userDetail: {
        user: null,
        loading: false,
        hasError: false
    },
    userList: {
        user: null,
        loading: false,
        hasError: false
    },
    userGoalDetail: {
        goal: null,
        ranking: null,
        indications: null,
        playerGoals: [],
        loading: false,
        hasError: false
    },
    userGoalList: {
        loading: false,
        goals: [],
        hasError: false
    },
    userPlayerCategoryRankList: {
        ranks: [],
        loading: false,
        hasError: false
    },
    userTeamDetail: {
        team: null,
        loading: false,
        hasError: false
    },
    userTeamCategoryRankList: {
        ranks: [],
        loading: false,
        hasError: false
    }
};

export default initialState

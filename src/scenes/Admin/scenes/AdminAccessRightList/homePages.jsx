import * as Resources from '../../../../Resources'

const homePages = [
  {
    path: 'goals',
    title: Resources.DRAWER_GOALS_BUTTON,
    availability: ['C', 'M']
  },
  {
    path: 'challenges',
    title: Resources.DRAWER_CHALLENGES_BUTTON,
    availability: ['C', 'M']
  },
  {
    path: 'teams/:teamId/collaborators/:id/detail',
    title: Resources.ACCOUNT_TITLE,
    availability: ['C']
  },
  {
    path: 'rankings',
    title: Resources.DRAWER_RANKINGS_BUTTON,
    availability: ['C', 'M']
  },
]

export {
  homePages
};

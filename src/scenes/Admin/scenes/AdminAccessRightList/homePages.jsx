import * as Resources from '../../../../Resources';

const homePages = (account, intl) => [
  {
    path: 'home',
    title: intl.formatMessage({ id: 'common.home' }),
    availability: ['C', 'M'],
  },
  {
    path: 'goals',
    title: intl.formatMessage({ id: 'admin.goal.title' }),
    availability: ['C', 'M'],
  },
  {
    path: 'challenges',
    title:
      account.challengeWording || intl.formatMessage({ id: 'challenge.title' }),
    availability: ['C', 'M'],
  },
  {
    path: 'collaborators/:id/detail',
    title: intl.formatMessage({ id: 'account.title' }),
    availability: ['C'],
  },
  {
    path: 'rankings',
    title: intl.formatMessage({ id: 'ranking.title' }),
    availability: ['C', 'M'],
  },
  {
    path: 'newsfeed',
    title: intl.formatMessage({ id: 'newsfeed.title' }),
    availability: ['C', 'M'],
  },
];

export { homePages };

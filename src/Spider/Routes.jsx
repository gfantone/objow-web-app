import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { GuestRoutes, UserRoutes } from './components';
import * as scenes from './scenes';
import { AuthCallback } from '../auth';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserRoutes exact path='/' component={scenes.Home} />
        <UserRoutes exact path='/home' component={scenes.Home} />
        <UserRoutes
          exact
          path='/nodes/:contract/administration/personnalisation'
          component={scenes.Admin}
        />
        <UserRoutes exact path='/users' component={scenes.Users} />
        <UserRoutes exact path='/points' component={scenes.Points} />
        <GuestRoutes exact path='/callback' component={AuthCallback} />
        <GuestRoutes
          exact
          path='/nodes/:contract/activate'
          component={scenes.AccountActivation}
        />
        <GuestRoutes
          exact
          path='/nodes/:contract/finalize-activation'
          component={scenes.AccountActivationFinalization}
        />
        <GuestRoutes
          exact
          path='/nodes/:contract/account-activation-key-expired'
          component={scenes.AccountActivationKeyExpired}
        />
        <GuestRoutes
          exact
          path='/nodes/:contract/inaccessible'
          component={scenes.ContractInaccessible}
        />
      </Switch>
    </BrowserRouter>
  );
};

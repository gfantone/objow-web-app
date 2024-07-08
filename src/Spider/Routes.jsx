import React from 'react';
import {BrowserRouter, Switch} from 'react-router-dom';

import {GuestRoutes, UserRoutes} from './components';
import * as scenes from './scenes';
import {AuthCallback} from '../auth';

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                {/* Auth routes */}
                <UserRoutes exact path='/' component={AuthCallback}/>
                <GuestRoutes exact path='/callback' component={AuthCallback}/>
                <UserRoutes exact path='/nodes' component={scenes.ContractSelection} useGuestLayout/>

                {/* Home routes */}
                <UserRoutes exact path='/nodes/:contract/home' component={scenes.Home}/>

                {/* Users routes */}
                <UserRoutes exact path='/nodes/:contract/users' component={scenes.Users}/>

                {/* Points routes */}
                <UserRoutes exact path='/nodes/:contract/points' component={scenes.Points}/>

                {/* Administration routes */}
                <UserRoutes exact path='/nodes/:contract/administration/:tab' component={scenes.Admin} />

                {/* Account activation routes */}
                <GuestRoutes exact path='/nodes/:contract/activate' component={scenes.AccountActivation}/>
                <GuestRoutes exact path='/nodes/:contract/finalize-activation' component={scenes.AccountActivationFinalization}/>
                <GuestRoutes exact path='/nodes/:contract/account-activation-key-expired' component={scenes.AccountActivationKeyExpired}/>
                <GuestRoutes exact path='/nodes/:contract/inaccessible' component={scenes.ContractInaccessible}/>
            </Switch>
        </BrowserRouter>
    );
};

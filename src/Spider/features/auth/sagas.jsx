import {all} from 'redux-saga/effects';

import {default as accountActivationSaga} from './accountActivation/sagas';

export default function* authSaga() {
    yield all([
        accountActivationSaga(),
    ]);
<<<<<<< HEAD
}
=======
}
>>>>>>> dev

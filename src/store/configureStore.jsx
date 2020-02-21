import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleWare from 'redux-saga'
import rootReducer from './rootReducer'
import Sagas from '../services/Sagas'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import local from '../data/local/local'

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleWare();

const configureStore = () => {
    const currentVersion = '0.9.3';
    const lastVersion = local.getVersion();
    const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
    const persistor = persistStore(store);
    if (currentVersion !== lastVersion) {
        persistor.purge().then(() => {
            local.setVersion(currentVersion);
            return persistor.flush()
        })
    }
    sagaMiddleware.run(Sagas);
    return { store, persistor }
};

export default configureStore
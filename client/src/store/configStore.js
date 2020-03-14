
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [ReduxThunk];


/**
 * Create and return store
 * @param {object} initialState - this is for testing
 * @returns {store} - store
 */
export const createStoreWithMiddlewares = (initialState = {}) => {
    const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    );
    return store;
};

export default createStoreWithMiddlewares();
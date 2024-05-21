import personReducer from './reducers/personReducer';
import gameReducer from './reducers/gameReducer';
import userReducer from './reducers/userReducer';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';

const allReducer = combineReducers({
  game: gameReducer,
  person: personReducer,
  users: userReducer});

const InitialStates = {
  game: {name: 'footall'},
  person: {name: 'emulya'},
  users: [],
};

const middieware = [thunk];


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
     applyMiddleware(...middieware),
    // other store enhancers if any
);
const store = createStore(allReducer, InitialStates, enhancer);


// const store = createStore(
//     allReducer, InitialStates, applyMiddleware(...middieware));

export default store;

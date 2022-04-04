import { createStore, combineReducers, applyMiddleware } from "redux";
import { loginReducer, registerReducer, mainAlertReducer, headerReducer } from "./reducer.js"

const messageMiddleware = store => next => action => {
    console.log("Action: " + action.type);
    next(action);
};

const middlewareEnhancer = applyMiddleware(messageMiddleware)

const store = createStore(combineReducers({
    login: loginReducer,
    register: registerReducer,
    mainAlert: mainAlertReducer,
    header: headerReducer

}));

export default store;


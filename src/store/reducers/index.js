import {combineReducers} from 'redux';

import {authReducer} from "./authReducer";
import {resourcesReducer} from "./resourcesReducer";
import {bildsReducer} from "./bildsReducer";

export default combineReducers(
    {
        authReducer,
        resourcesReducer,
        bildsReducer,

    }
);
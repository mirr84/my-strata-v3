import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../utils/getStorage";

const initState = {

    isProgressGetAll: false,
    isProgressGet: false,

    r1: 0,
    r2: 0,
    r3: 0,
    r4: 0,
    r5: 0

}

export const resourcesReducer = (state = getStorage().getInitStorage('resourcesReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'resourcesReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../utils/getStorage";

const initState = {

    isProgressGetAll: false,
    isProgressCreate: false,

    items: []

}

export const bildsReducer = (state = getStorage().getInitStorage('bildsReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'bildsReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}
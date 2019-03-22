import {request} from "./utils";

const reducer = 'resourcesReducer';

export const resourcesService = ({dispatch}) => {

    return {

        getAll: (progresser) => request({dispatch, reducer, progresser, method: 'get', url: `/resources/getAll`}),
        get: ({id}, progresser) => request({dispatch, reducer, progresser, method: 'get', url: `/resources/get?id=${id}`}),

    }

}

export const doGetAllResources = ({dispatch}) =>
    resourcesService({dispatch})
        .getAll('isProgressGetAll')
        .then(
            ({data, status}) => {
                switch (status) {
                    case 200:
                        dispatch.setter(reducer, data.body[0]);
                        return true;
                    default: dispatch.setter(reducer, {r1:0, r2:0, r3:0, r4:0, r5:0});
                        return false;
                }
            }
        )

export const doGetResources = ({id, dispatch}) => {
    if (id) {
        return resourcesService({dispatch})
            .get({id}, 'isProgressGet')
            .then(
                ({data, status}) => {
                    switch (status) {
                        case 200:
                            return true;
                        default:
                            return false;
                    }
                }
            )
    } else {
        return new Promise( () => false )
    }
}
import {request} from "./utils";

const reducer = 'bildsReducer';

export const bildsService = ({dispatch}) => {

    return {

        getAll: (progresser) => request({dispatch, reducer, progresser, method: 'get', url: `/bilds/getAll`}),
        create: (progresser) => request({dispatch, reducer, progresser, method: 'get', url: `/bilds/create`}),

    }

}

export const doGetAllBilds = ({dispatch}) =>
    bildsService({dispatch})
        .getAll('isProgressGetAll')
        .then(
            ({data, status}) => {
                switch (status) {
                    case 200:
                        dispatch.setter(reducer, { items: data.body });
                        return true;
                    default: dispatch.setter(reducer, {});
                        return false;
                }
            }
        )

export const doCreateBilds = ({dispatch}) =>
    bildsService({dispatch})
        .create('isProgressCreate')
        .then(
            ({data, status}) => {
                switch (status) {
                    case 200:
                        dispatch.setter(reducer, {});
                        return true;
                    default: dispatch.setter(reducer, {});
                        return false;
                }
            }
        )
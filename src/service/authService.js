import {request} from "./utils";
import * as md5 from "md5";

const reducer = 'authReducer';

export const authService = ({dispatch}) => {

    return {

        auth: ({login, password}, progresser) => request({dispatch, reducer, progresser, method: 'post', data: {login, password: md5(password.trim())}, url: `/auth/auth`}),
        check: (progresser) => request({dispatch, reducer, progresser, method: 'get', url: `/auth/check`}),
        logout: (progresser) => request({dispatch, reducer, progresser, method: 'get', url: `/auth/logout`}),
        reg: ({login, email, password},progresser) => request({dispatch, reducer, progresser, method: 'post', data: {login, email, password: md5(password.trim())}, url: `/auth/reg`}),

    }

}

export const doLogin = ({dispatch, login, password}) =>
    authService({dispatch})
        .auth({login, password}, 'isProgressAuth')
        .then(
            ({data, status, headers: {token}}) => {
                switch (status) {
                    case 200: dispatch.setter('authReducer', {isAuthenticated: true, token, password: ''});
                    return true;
                    default: dispatch.setter('authReducer', {isAuthenticated: false, token: '', password: ''});
                    return false;
                }
            }
        )

export const doCheck = ({dispatch}) =>
    authService({dispatch})
        .check('isProgressCheck')
        .then(
            ({data, status, headers: {token}}) => {
                switch (status) {
                    case 200:
                        dispatch.setter('authReducer', {isAuthenticated: true, token});
                        return true;
                    default:
                        dispatch.setter('authReducer', {isAuthenticated: false, token: ''});
                        return false;
                }
            }
        )

export const doLogout = ({dispatch}) =>
    authService({dispatch})
        .logout('isProgressLogout')
        .then(
            ({status}) => {
                switch (status) {
                    case 200: dispatch.setter('authReducer', {isAuthenticated: false, token: ''});
                    return true;
                    default: dispatch.setter('authReducer', {isAuthenticated: false, token: ''});
                    return false;
                }
            }
        )

export const doReg = ({dispatch, email, password, login}) =>
    authService({dispatch})
        .reg({login, email, password}, 'isProgressReg')
        .then(
            ({data, status}) => {
                switch (status) {
                    case 200: dispatch.setter('authReducer', {password: ''});
                        return true;
                    default: dispatch.setter('authReducer', {password: ''});
                        return false;
                }
            }
        )
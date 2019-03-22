import React from "react";

import {Route, withRouter} from "react-router-dom";
import {connector} from "../store/utils/connector";
import lifecycle from "react-pure-lifecycle";
import {doCheck} from "../service/authService";
import Login from "../login/Login";

const methods = {
    componentWillMount({location, dispatch}) {
        console.log('init Private');

        doCheck({dispatch})
            .then(
                (r) => console.log('doCheck', r)
            )

    }
}

const Private = ({state, dispatch, component: Component, ...rest}) =>
    <Route
        {...rest}
        render={props =>
            state.authReducer.isAuthenticated ?
                (
                    <Component {...props} />
                )
                :
                (
                    <div>
                        неоходимо авторизироваться
                        <Login />
                    </div>
                )
        }
    />

export default withRouter(connector(lifecycle(methods)(Private)));
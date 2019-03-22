import React from 'react';

import {Route, withRouter} from 'react-router-dom';
import {connector} from "../store/utils/connector";
import lifecycle from "react-pure-lifecycle";

const methods = {
    componentWillMount({location}) {
        console.log('init Publuc');
    }
}

const Public = ({state, dispatch, component: Component, ...rest}) =>
    <Route
        {...rest}
        render={props => <Component {...props} />}
    />

export default withRouter(connector(lifecycle(methods)(Public)));
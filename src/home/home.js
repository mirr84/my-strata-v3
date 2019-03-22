import React from 'react';

import lifecycle from 'react-pure-lifecycle';
import {connector} from "../store/utils/connector";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init Home');

    }
}

const Home = ({state, dispatch}) =>
    <div>
        Home
    </div>

export default connector(lifecycle(methods)(Home));

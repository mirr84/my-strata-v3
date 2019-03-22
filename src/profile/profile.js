import React from 'react';

import lifecycle from 'react-pure-lifecycle';
import {connector} from "../store/utils/connector";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init Profile');

    }
}

const Profile = ({state, dispatch}) =>
    <div>
        profile
    </div>

export default connector(lifecycle(methods)(Profile));
